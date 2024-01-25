"use client";
import Image from "next/image";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import * as Tone from "tone";
import { z } from "zod";
import { default_BPM, default_Steps, default_Patterns } from "@/components/global-defaults";
import createEmptyGrid from "@/components/create-empty-grid";
import { kit as kit_default, kitPreloader as kitPreloader_default } from "@/data/kits/default/default";
import { kit as kit_green, kitPreloader as kitPreloader_green } from "@/data/kits/green/green";
import { ModeToggle } from "@/components/mode-toggle";
// import { PatternButton } from "@/components/pattern-button";

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
    const [chosenKit, setChosenKit] = React.useState<"default" | "green">("default");
    const [bpm, setBpm] = React.useState<BPM>(default_BPM);

    const [numberOfSteps, setNumberOfSteps] = React.useState<Step>(default_Steps);
    const [grid, setGrid] = React.useState<Grid | null>(null);
    const [meter, setMeter] = React.useState<"triple" | "quadruple">("quadruple");

    const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

    const sequenceRef = React.useRef<Tone.Sequence | null>(null);
    const [lamps, setLamps] = React.useState<number | null>(null);

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

    // when user switches kits, load his kit of choice
    React.useEffect(() => {
        if (!kitPreloader_default || !kitPreloader_green) return;

        if (chosenKit === "default") {
            setDrumkit(kit_default);
            const preloadSamples = new Tone.Players(kitPreloader_default).toDestination();
            setPlayer(preloadSamples);
        }

        if (chosenKit === "green") {
            setDrumkit(kit_green);
            const preloadSamples = new Tone.Players(kitPreloader_green).toDestination();
            setPlayer(preloadSamples);
        }
    }, [chosenKit]);

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
        setLamps(null);

        sequenceRef.current?.dispose();

        sequenceRef.current = new Tone.Sequence(
            (time, step) => {
                setLamps(step);
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
            setLamps(null);
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

    // switch between 4/4 and 3/4 (cosmetic only)
    const handleMeterChange = () => {
        if (meter === "quadruple") {
            setMeter("triple");
            setNumberOfSteps(24);
        }
        if (meter === "triple") {
            setMeter("quadruple");
            setNumberOfSteps(32);
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

    // save current grid to localstorage
    const handleSavePattern = (id: number) => {
        if (!grid) return;
        const patternKey: string = "BeateRRR_" + "Pattern" + id.toString();
        const patternId = id.toString();
        const patternSteps = numberOfSteps.toString();
        const patternMeter = meter.toString();
        const patternBPM = bpm.toString();
        const patternGrid = JSON.stringify(grid);
        const patternValue = {
            id: patternId,
            steps: patternSteps,
            meter: patternMeter,
            bpm: patternBPM,
            grid: patternGrid,
        };

        localStorage.setItem(patternKey, JSON.stringify(patternValue));
    };

    // load saved pattern from local storage
    const handleLoadPattern = (id: number) => {
        const patternKey: string = "BeateRRR_" + "Pattern" + id.toString();
        const storageItem = localStorage.getItem(patternKey);
        if (storageItem) {
            try {
                const item = JSON.parse(storageItem);

                if ("steps" && "meter" && "bpm" && "grid" in item) {
                    try {
                        setNumberOfSteps(parseInt(item.steps));
                        setMeter(item.meter);
                        setBpm(parseInt(item.bpm));
                        setGrid(JSON.parse(item.grid));
                    } catch (e) {
                        console.log("NOPE SORRY");
                    }
                } else {
                    console.log("Failed to find the 4 in item");
                }
            } catch (e) {
                console.log("item is false");
            }
        }
    };

    // delete all saved patterns in local storage
    const nuclearPurge = () => {
        default_Patterns.map((x) => {
            const storageKey: string = "BeateRRR_" + "Pattern" + x.toString();
            localStorage.removeItem(storageKey);
        });
    };

    // finally, RENDERING
    return (
        <>
            <div className="header">
                <span className="logo">
                    <Image src="/icons/icon.png" width={35} height={35} alt="Drummer"></Image>
                    <h1 className="text-3xl font-bold">BEATER</h1>
                    <Button
                        variant="ghost"
                        className="w-[4rem] h-[4rem] opacity-0 hover:opacity-100 bg-opacity-90 line-through"
                        onClick={nuclearPurge}
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
                        <div key={"sequencer-row-" + `${indexOf}`} className="sequencer-row">
                            <button
                                className="button cell-size w-[8rem] min-w-[7rem]"
                                onClick={() => player?.player(x.rowName).start()}
                            >
                                {x.rowButtonName}
                            </button>
                            <button
                                className="button cell-size w-[2rem] min-w-[1.5rem]"
                                onClick={() => clearRow(indexOf)}
                            >
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
            <div className="sequencer-row">
                <span className="m-[1px] mr-[10px] cell-size w-[8rem] min-w-[7rem]"></span>
                <span className="m-[1px] mr-[10px] cell-size w-[2rem] min-w-[1.5rem]"></span>
                <span>
                    {[...Array(numberOfSteps)].map((_, i) => {
                        return (
                            <button
                                key={"lamp-" + { i }}
                                data-step={i}
                                className={
                                    "w-[var(--cell-size)] h-[var(--cell-size)] m-[1px] justify-center items-center " +
                                    " " +
                                    `${meter}`
                                }
                            >
                                <button className={"lamp" + " " + (lamps === i ? "red" : "")}></button>
                            </button>
                        );
                    })}
                </span>
            </div>
            <div className="controls">
                <button
                    className={"button main-button font-bold min-w-[3.5rem]" + (isPlaying ? " text-amber-600" : "")}
                    onClick={handlePlayButton}
                >
                    {isPlaying ? "STOP" : "PLAY"}
                </button>
                <button className="button main-button min-w-[3.5rem]" onClick={handleMeterChange}>
                    {meter === "quadruple" ? "4/4" : "3/4"}
                </button>
                <button className="button main-button min-w-[3.5rem]" onClick={clearGrid}>
                    CLEAR
                </button>
                <button
                    className={
                        "button main-button mr-0 min-w-[5rem]" + (chosenKit === "default" ? " text-amber-600" : "")
                    }
                    onClick={() => setChosenKit("default")}
                >
                    Default Kit
                </button>
                <button
                    className={"button main-button min-w-[5rem]" + (chosenKit === "green" ? " text-amber-600" : "")}
                    onClick={() => setChosenKit("green")}
                >
                    Green Kit
                </button>
                <Slider
                    className="w-[300px] min-w-[120px] bg-slate-700 ml-[10px] mr-[10px]"
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
                    className="w-[150px] min-w-[60px] bg-slate-700 ml-[10px] mr-[10px]"
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
                {default_Patterns.map((x) => {
                    return (
                        <div key={"pattern-row-" + `${x}`}>
                            <p>
                                <button className="button savepattern" onClick={() => handleSavePattern(x)}>
                                    Save <b>({x})</b>
                                </button>
                            </p>
                            <p>
                                <button className="button savepattern" onClick={() => handleLoadPattern(x)}>
                                    Load <b>({x})</b>
                                </button>
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

// onClick={() => setPattern6(structuredClone(grid))

// onClick={() => Pattern4 && setGrid(Pattern4)}

// return <PatternButton key={x} id={x} />;
