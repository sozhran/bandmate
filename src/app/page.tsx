"use client";
// import Image from "next/image";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import * as Tone from "tone";
import { z } from "zod";
import { default_BPM, default_Steps } from "@/components/global-defaults";
import createEmptyGrid from "@/components/create-empty-grid";
import { kit, kitPreloader } from "@/data/kits/rock/rock";
import { ModeToggle } from "@/components/mode-toggle";

const BPMValidator = z
    .number()
    .int()
    .min(40, "Tempo must be between 40 and 300")
    .max(300, "Tempo must be between 40 and 300");

const StepValidator = z.number().int().positive();

export type BPM = z.infer<typeof BPMValidator>;
export type Step = z.infer<typeof StepValidator>;

export type Grid = { rowName: string; rowSteps: boolean[] }[];

export interface Drumkit {
    name: string;
    buttonName: string;
    sampleUrl: string;
}

export default function Home() {
    const [player, setPlayer] = React.useState<Tone.Players | null>(null);
    const [drumkit, setDrumkit] = React.useState<Drumkit[] | null>(null);
    const [bpm, setBpm] = React.useState<BPM>(default_BPM);

    const [numberOfSteps, setNumberOfSteps] = React.useState<Step>(default_Steps);
    const [grid, setGrid] = React.useState<Grid | null>(null);

    const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

    const [Pattern1, setPattern1] = React.useState<Grid | null>(null);
    const [Pattern2, setPattern2] = React.useState<Grid | null>(null);
    const [Pattern3, setPattern3] = React.useState<Grid | null>(null);
    const [Pattern4, setPattern4] = React.useState<Grid | null>(null);

    const sequenceRef = React.useRef<Tone.Sequence | null>(null);

    // set initial BPM, with validation
    // I might want to store personal BPM default for users later, hence this logic.
    // If I choose not to, it can be easily removed, and does not affect anything atm.
    //
    // Also, I store bpm in 2 places because rendering can't access Tone.Transport.bpm.value
    React.useEffect(() => {
        const zodSaysHello = BPMValidator.safeParse(Math.round(default_BPM));
        if (!zodSaysHello.success) {
            setBpm(120);
            Tone.Transport.bpm.value = 120;
        } else {
            setBpm(zodSaysHello.data);
            Tone.Transport.bpm.value = zodSaysHello.data;
        }
    }, []);

    // preload default kit
    React.useEffect(() => {
        setDrumkit(kit);
    }, []);

    // preload MP3 Samples
    React.useEffect(() => {
        if (!kitPreloader) return;

        const preloadSamples = new Tone.Players(kitPreloader).toDestination();
        setPlayer(preloadSamples);
    }, [drumkit]);

    // create an empty sequencer grid
    React.useEffect(() => {
        const emptyGrid = createEmptyGrid(drumkit, numberOfSteps);
        if (emptyGrid) {
            setGrid(emptyGrid);
        }
    }, [drumkit, numberOfSteps]);

    // function to program the beat
    const toggleNote = (x: number, y: number) => {
        if (grid) {
            const changedGrid = [...grid];

            changedGrid.map((row, index) => {
                if (index === y) {
                    row.rowSteps[x] = !row.rowSteps[x];
                }
                setGrid(changedGrid);
            });
        }
    };

    // taking the grid and preparing the sequence for playback
    // renews every time the grid is changed
    React.useEffect(() => {
        if (!grid || !player) {
            return;
        }

        const steps = [...new Array(numberOfSteps)].map((_, index) => index);

        sequenceRef.current?.dispose();

        sequenceRef.current = new Tone.Sequence(
            (time, step) => {
                grid.forEach((kitElement) => {
                    if (kitElement.rowSteps[step]) {
                        player.player(kitElement.rowName).start(time);
                    }
                });
            },
            steps,
            "16n"
        );
        sequenceRef.current.start(0);
    }, [numberOfSteps, grid, player]);

    // play/stop functions
    const handlePlayButton = async () => {
        if (!isPlaying) {
            await Tone.start();
            Tone.Transport.toggle();
            setIsPlaying(true);
        }
        if (isPlaying) {
            Tone.Transport.toggle();
            setIsPlaying(false);
        }
    };

    // changing the tempo via page slider
    const handleBPMChange = (values: number[]) => {
        setBpm(values[0]);
        Tone.Transport.bpm.value = values[0];
        // const zodSaysHello = BPMValidator.safeParse(Math.round(parseInt(e.target.value)));
        // if (!zodSaysHello.success) {
        //     return;
        // } else {
        //     Tone.Transport.bpm.value = zodSaysHello.data;
        //     setBpm(zodSaysHello.data);
        // }
    };

    // clearing the gird
    const clearGrid = () => {
        const emptyGrid = createEmptyGrid(drumkit, numberOfSteps);
        if (emptyGrid) {
            setGrid(structuredClone(emptyGrid));
        }
    };
    // finally, RENDERING
    return (
        <>
            <h1>BEATER</h1>
            <h4>
                Your favourite <s>non-</s>working drum machine app!
            </h4>
            {grid ? (
                grid.map((x, indexOf) => {
                    return (
                        <div key="sequencer" className="sequencer-row">
                            <button className="element-title" onClick={() => player?.player(x.rowName).start()}>
                                {x.rowName}
                            </button>
                            <span className="flex align-center">
                                {[...Array(numberOfSteps)].map((_, i) => {
                                    return (
                                        <button
                                            key={i}
                                            data-isactive={x.rowSteps[i] ? true : false}
                                            className={x.rowSteps[i] ? "note active" : "note inactive"}
                                            onClick={() => toggleNote(i, indexOf)}
                                        ></button>
                                    );
                                })}
                            </span>
                        </div>
                    );
                })
            ) : (
                <p>Loading...</p>
            )}
            <div className="controls">
                <div className="bpm-slider">
                    <Slider
                        className="w-300 md:w-auto"
                        value={[bpm]}
                        defaultValue={[120]}
                        min={30}
                        max={300}
                        step={1}
                        onValueChange={handleBPMChange}
                    />
                    <label htmlFor="BPM">BPM: {bpm ? bpm : <></>}</label>
                </div>
                <div className="play-button">
                    <button className="element-title" onClick={handlePlayButton}>
                        {isPlaying ? "STOP" : "PLAY"}
                    </button>
                </div>
            </div>
            <p>
                <button className="element-title" onClick={() => setPattern1(structuredClone(grid))}>
                    Save Pattern 1
                </button>
                <button className="element-title" onClick={() => Pattern1 && setGrid(Pattern1)}>
                    Load Pattern 1
                </button>
            </p>
            <p>
                <button className="element-title" onClick={() => setPattern2(structuredClone(grid))}>
                    Save Pattern 2
                </button>
                <button className="element-title" onClick={() => Pattern2 && setGrid(Pattern2)}>
                    Load Pattern 2
                </button>
            </p>
            <p>
                <button className="element-title" onClick={() => setPattern3(structuredClone(grid))}>
                    Save Pattern 3
                </button>
                <button className="element-title" onClick={() => Pattern3 && setGrid(Pattern3)}>
                    Load Pattern 3
                </button>
            </p>
            <p>
                <button className="element-title" onClick={() => setPattern4(structuredClone(grid))}>
                    Save Pattern 4
                </button>
                <button className="element-title" onClick={() => Pattern4 && setGrid(Pattern4)}>
                    Load Pattern 4
                </button>
            </p>
            <button className="element-title" onClick={clearGrid}>
                CLEAR
            </button>
            <ModeToggle />
        </>
    );
}
