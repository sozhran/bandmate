"use client";
import * as React from "react";
import { Slider } from "@/components/ui/slider";
import * as Tone from "tone";
import { default_Patterns } from "@/data/global-defaults";
import createEmptyGrid from "@/functions/create-empty-grid";
import { kit as kit_default, kitPreloader as kitPreloader_default } from "@/data/kits/default/default";
import { kit as kit_green, kitPreloader as kitPreloader_green } from "@/data/kits/green/green";
import {
    useNumberOfStepsStore,
    useMeterStore,
    useBPMStore,
    useGridStore,
    useIsPlayingStore,
    useDrumkitStore,
} from "@/data/global-state-store";
import Header from "@/components/header";

export default function Home() {
    const [player, setPlayer] = React.useState<Tone.Players | null>(null);
    const [chosenKit, setChosenKit] = React.useState<"default" | "green">("default");
    const [dynamics, setDynamics] = React.useState<"1" | "2" | "3">("2");
    const [lamps, setLamps] = React.useState<number | null>(null);
    const sequenceRef = React.useRef<Tone.Sequence | null>(null);

    // Man, is it verbose as hell, and doesn't look too nice importing a ton of same stuff in different places.
    // But I was eager to try Zustand, and it's working, so I'll leave it for now.
    // Will likely replace with a reducer later.
    const drumkit = useDrumkitStore((state) => state.drumkit);
    const setDrumkit = useDrumkitStore((state) => state.setDrumkit);
    const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
    const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
    const meter = useMeterStore((state) => state.meter);
    const setMeter = useMeterStore((state) => state.setMeter);
    const bpm = useBPMStore((state) => state.bpm);
    const setBpm = useBPMStore((state) => state.setBpm);
    const grid = useGridStore((state) => state.grid);
    const setGrid = useGridStore((state) => state.setGrid);
    const isPlaying = useIsPlayingStore((state) => state.isPlaying);
    const setIsPlaying = useIsPlayingStore((state) => state.setIsPlaying);

    // when user switches between kits, load his kit of choice
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
    }, [chosenKit, setDrumkit]);

    // create an empty sequencer grid
    React.useEffect(() => {
        if (drumkit) {
            const emptyGrid = createEmptyGrid(drumkit, 32);

            if (emptyGrid) {
                setGrid(emptyGrid);
            }
        }
    }, [drumkit, setGrid]);

    // function to save input when user is programming a beat
    const toggleNote = (x: number, y: number) => {
        if (grid) {
            const changedGrid = [...grid];

            changedGrid.map((row, index) => {
                if (index === y) {
                    if (row.rowSteps[x] === null) {
                        row.rowSteps[x] = dynamics;
                    } else {
                        if (row.rowSteps[x] !== dynamics) {
                            row.rowSteps[x] = dynamics;
                        } else {
                            row.rowSteps[x] = null;
                        }
                    }
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
                    if (kitElement.rowSteps[step] !== null) {
                        player.player(`${kitElement.rowName}` + "_" + `${kitElement.rowSteps[step]}`).start(time);
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

    // change the tempo via slider
    const handleBPMChange = (values: number[]) => {
        setBpm(values[0]);
        Tone.Transport.bpm.value = values[0];
    };

    // change the grid size (number of steps)
    const handleNumberOfStepsChange = (values: number[]) => {
        setNumberOfSteps(values[0]);
    };

    // switch between 4/4 and 3/4
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

    // clear the gird
    const clearGrid = () => {
        const emptyGrid = createEmptyGrid(drumkit, numberOfSteps);
        if (emptyGrid) {
            setGrid(structuredClone(emptyGrid));
        }
    };

    // clear a single row (resets all notes in this row)
    const clearRow = (y: number) => {
        if (grid) {
            const changedGrid = [...grid];

            const setOfNulls: ("1" | "2" | "3" | null)[] = [];
            for (let i = 0; i < numberOfSteps; i++) {
                setOfNulls.push(null);
            }
            changedGrid.map((row, index) => {
                if (index === y) {
                    row.rowSteps = setOfNulls;
                }
                setGrid(changedGrid);
            });
        }
    };

    // save current beat to localStorage
    const handleSavePattern = (id: number) => {
        if (!grid) return;
        const patternKey: string = "BeateRRR_" + "Pattern" + id.toString();
        const patternSteps = numberOfSteps.toString();
        const patternMeter = meter.toString();
        const patternBPM = bpm.toString();
        const patternGrid = JSON.stringify(grid);
        const patternValue = {
            steps: patternSteps,
            meter: patternMeter,
            bpm: patternBPM,
            grid: patternGrid,
        };

        localStorage.setItem(patternKey, JSON.stringify(patternValue));
    };

    const checkIfInLocalStorage = (id: number) => {
        const patternKey: string = "BeateRRR_" + "Pattern" + id.toString();
        if (typeof window !== undefined) {
            if (localStorage.getItem(patternKey)) {
                return true;
            } else {
                return false;
            }
        }
    };

    // load saved pattern from localStorage
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
                        console.log("Error: Failed to setStates");
                    }
                } else {
                    console.log("Error: Failed to find all 4 variables in 'item'");
                }
            } catch (e) {
                console.log("Error: 'item' is false");
            }
        }
    };

    // finally, RENDERING
    return (
        <>
            <Header />
            {grid ? (
                grid.map((x, indexOf) => {
                    return (
                        <div key={"sequencer-row-" + `${indexOf}`} className="sequencer-row">
                            <button
                                className="button cell-size w-[8rem] min-w-[7rem]"
                                onClick={() => player?.player(`${x.rowName}` + "_" + `${dynamics}`).start()}
                            >
                                {x.rowButtonName}
                            </button>
                            <button
                                className="button cell-size w-[2rem] min-w-[1.5rem] hover:bg-gray-700"
                                onClick={() => clearRow(indexOf)}
                            >
                                X
                            </button>
                            <span className="flex align-center">
                                {[...Array(numberOfSteps)].map((_, i) => {
                                    return (
                                        <button
                                            key={i}
                                            className={
                                                (x.rowSteps[i] !== null
                                                    ? "note active-" + `${x.rowSteps[i]}`
                                                    : "note inactive") +
                                                " " +
                                                `${meter}`
                                            }
                                            onClick={() => toggleNote(i, indexOf)}
                                        >
                                            <span className="opacity-50">{x.rowSteps[i] ? x.rowSteps[i] : ""}</span>
                                        </button>
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
                    className={
                        "button main-button font-bold min-w-[3.5rem] hover:bg-gray-700" +
                        (isPlaying ? " text-amber-600" : "")
                    }
                    onClick={handlePlayButton}
                >
                    {isPlaying ? "STOP" : "PLAY"}
                </button>
                <button className="button main-button min-w-[3.5rem] hover:bg-gray-700" onClick={handleMeterChange}>
                    {meter === "quadruple" ? "4/4" : "3/4"}
                </button>
                <button className="button main-button min-w-[3.5rem] hover:bg-gray-700" onClick={clearGrid}>
                    CLEAR
                </button>
                {/* <button
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
                </button> */}
                <span className="note-controls">
                    <button
                        className={
                            "button-dynamic min-w-[2rem] w-[4rem] h-[2.5rem] hover:bg-gray-700" +
                            (dynamics === "1" ? " text-amber-950 font-bold" : "")
                        }
                        onClick={() => setDynamics("1")}
                    >
                        1
                    </button>
                    <button
                        className={
                            "button-dynamic min-w-[2rem] w-[4rem] h-[2.5rem] hover:bg-gray-700" +
                            (dynamics === "2" ? " text-amber-600 font-bold" : "")
                        }
                        onClick={() => setDynamics("2")}
                    >
                        2
                    </button>
                    <button
                        className={
                            "button-dynamic min-w-[2rem] w-[4rem] h-[2.5rem] hover:bg-gray-700" +
                            (dynamics === "3" ? " text-red-700 font-bold" : "")
                        }
                        onClick={() => setDynamics("3")}
                    >
                        3
                    </button>
                </span>
                <Slider
                    className="w-[300px] min-w-[120px] bg-slate-700 ml-[10px] mr-[10px] hover:bg-gray-600"
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
                    className="w-[150px] min-w-[60px] bg-slate-700 ml-[10px] mr-[10px] hover:bg-gray-600"
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
                                <button
                                    className="button savepattern hover:bg-gray-700"
                                    onClick={() => handleSavePattern(x)}
                                >
                                    Save <b>({x})</b>
                                </button>
                            </p>
                            <p>
                                <button
                                    className={
                                        "button savepattern hover:bg-gray-700"
                                        // + (checkIfInLocalStorage(x) === true ? "" : " transparent")
                                    }
                                    onClick={() => handleLoadPattern(x)}
                                >
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
