"use client";
import Image from "next/image";
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
import PatternButton from "@/components/pattern-button";

const BPMValidator = z
    .number()
    .int()
    .min(40, "Tempo must be between 40 and 300")
    .max(300, "Tempo must be between 40 and 300");

const StepValidator = z.number().int().positive();

export type BPM = z.infer<typeof BPMValidator>;
export type Step = z.infer<typeof StepValidator>;

export type Grid = { rowName: string; rowButtonName: string; rowSteps: boolean[] }[];

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
    const [meter, setMeter] = React.useState<"triple" | "quadruple">("quadruple");

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

    const handleNumberOfStepsChange = (values: number[]) => {
        setNumberOfSteps(values[0]);
    };

    const handleMeterChange = () => {
        if (meter === "quadruple") {
            setMeter("triple");
        }
        if (meter === "triple") {
            setMeter("quadruple");
        }
    };

    // clearing the gird
    const clearGrid = () => {
        const emptyGrid = createEmptyGrid(drumkit, numberOfSteps);
        if (emptyGrid) {
            setGrid(structuredClone(emptyGrid));
        }
    };

    // clear a single row (reset all notes in this row)
    const clearRow = (y: number) => {
        if (grid) {
            const changedGrid = [...grid];

            const setOfFalses: boolean[] = [];
            for (let i = 0; i < numberOfSteps; i++) {
                setOfFalses.push(false);
            }
            changedGrid.map((row, index) => {
                if (index === y) {
                    row.rowSteps = setOfFalses;
                }
                setGrid(changedGrid);
            });
        }
    };

    const handleSavePattern = (id: string) => {
        return id;
    };

    const handleLoadPattern = (id: string) => {
        return id;
    };

    // finally, RENDERING
    return (
        <>
            <div className="header">
                <span className="logo">
                    <Image src="/icon.png" width={35} height={35} alt="Drummer"></Image>
                    <h1 className="text-3xl font-bold">BEATER</h1>
                    <Button
                        variant="ghost"
                        className="w-[4rem] h-[4rem] opacity-0 hover:opacity-100 bg-opacity-90 line-through"
                    >
                        <Image src="https://i.imgur.com/mgifSOk.png" width={50} height={50} alt=""></Image>
                    </Button>
                </span>
                <span className="logo">
                    <button className="button main-button line-through">DEMO</button>
                    <ModeToggle />
                </span>
            </div>
            {grid ? (
                grid.map((x, indexOf) => {
                    return (
                        <div key="sequencer" className="sequencer-row">
                            <button
                                className="button cell-size w-[8rem]"
                                onClick={() => player?.player(x.rowName).start()}
                            >
                                {x.rowButtonName}
                            </button>
                            <button className="button cell-size w-[2rem]" onClick={() => clearRow(indexOf)}>
                                X
                            </button>
                            <span className="flex align-center">
                                {[...Array(numberOfSteps)].map((_, i) => {
                                    return (
                                        <button
                                            key={i}
                                            data-isactive={x.rowSteps[i] ? true : false}
                                            className={
                                                (x.rowSteps[i] ? "note active" : "note inactive") + " " + `${meter}`
                                            }
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
                <button className="button main-button" onClick={handlePlayButton}>
                    {isPlaying ? "STOP" : "PLAY"}
                </button>
                <button className="button main-button" onClick={handleMeterChange}>
                    {meter === "quadruple" ? "4/4" : "3/4"}
                </button>
                <button className="button main-button" onClick={clearGrid}>
                    CLEAR
                </button>
                <Slider
                    className="w-[300px] bg-slate-700 ml-[10px] mr-[10px]"
                    value={[bpm]}
                    defaultValue={[120]}
                    min={30}
                    max={300}
                    step={1}
                    onValueChange={handleBPMChange}
                />

                <label className="ml-[10px] mr-[10px]" htmlFor="BPM">
                    BPM: {bpm ? bpm : <></>}
                </label>
                <Slider
                    className="w-[150px] bg-slate-700 ml-[10px] mr-[10px]"
                    value={[numberOfSteps]}
                    defaultValue={[16]}
                    min={4}
                    max={32}
                    step={1}
                    onValueChange={handleNumberOfStepsChange}
                />
                <label className="ml-[10px] mr-[10px]" htmlFor="BPM">
                    Steps: {numberOfSteps ? numberOfSteps : <></>}
                </label>
            </div>
            <div className="saved-patterns">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((x) => {
                    return <PatternButton key={x} id={x} />;
                })}
            </div>
        </>
    );
}

// onClick={() => setPattern6(structuredClone(grid))

// onClick={() => Pattern4 && setGrid(Pattern4)}
