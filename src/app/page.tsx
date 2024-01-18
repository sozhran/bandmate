"use client";
import Image from "next/image";
import * as React from "react";
import * as Tone from "tone";
import { number, z } from "zod";
import { default_BPM, default_Steps } from "@/defaults";
import createGrid from "@/components/createGrid";
// import createSequence from "@/components/createSequence";
// import savePattern from "@/components/savePattern";
import { Slider } from "@/components/ui/slider";
import { kit, kitPreloader } from "@/data/kits/rock/rock";

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

    // load default kit
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
        const emptyGrid = createGrid(drumkit, numberOfSteps);
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

    const handleBPMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const zodSaysHello = BPMValidator.safeParse(Math.round(parseInt(e.target.value)));
        if (!zodSaysHello.success) {
            return;
        } else {
            Tone.Transport.bpm.value = zodSaysHello.data;
            setBpm(zodSaysHello.data);
        }
    };

    return (
        <>
            <h1>BEATER</h1>
            <h4>Your favourite non-working drum machine app!</h4>
            {grid ? (
                grid.map((x, indexOf) => {
                    return (
                        <div className="sequencer-row>">
                            <button className="element-title" onClick={() => player?.player(x.rowName).start()}>
                                {x.rowName}
                            </button>
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
                        </div>
                    );
                })
            ) : (
                <p>Loading...</p>
            )}
            <div className="controls">
                <div className="bpm-slider">
                    <Slider defaultValue={[120]} min={30} max={300} step={1} onChange={handleBPMChange} />
                    <label htmlFor="BPM">BPM: {bpm ? bpm : <></>}</label>
                </div>
                <div className="play-button">
                    <button className="element-title" onClick={handlePlayButton}>
                        {isPlaying ? "STOP" : "PLAY"}
                    </button>
                </div>
            </div>
            <p>
                <button className="element-title" onClick={() => setPattern1(grid)}>
                    Save Pattern 1
                </button>
                <button className="element-title" onClick={() => Pattern1 && setGrid(Pattern1)}>
                    Load Pattern 1
                </button>
            </p>
            <p>
                <button className="element-title" onClick={() => setPattern2(grid)}>
                    Save Pattern 2
                </button>
                <button className="element-title" onClick={() => Pattern2 && setGrid(Pattern2)}>
                    Load Pattern 2
                </button>
            </p>
            <p>
                <button className="element-title" onClick={() => setPattern3(grid)}>
                    Save Pattern 3
                </button>
                <button className="element-title" onClick={() => Pattern3 && setGrid(Pattern3)}>
                    Load Pattern 3
                </button>
            </p>
            <p>
                <button className="element-title" onClick={() => setPattern4(grid)}>
                    Save Pattern 4
                </button>
                <button className="element-title" onClick={() => Pattern4 && setGrid(Pattern4)}>
                    Load Pattern 4
                </button>
            </p>
        </>
    );
}
