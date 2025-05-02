"use client";
import * as React from "react";
import * as Tone from "tone";
import Slider from "@/components/ui/Slider";
import { defaultPatterns } from "@/data/global-defaults";
import { kit as kit_default, kitPreloader as kitPreloader_default } from "@/data/kits/default/default";
import {
	useNumberOfStepsStore,
	useMeterStore,
	useBPMStore,
	useGridStore,
	useIsPlayingStore,
	useDrumkitStore,
	useAddCrashStore,
	useAddFillStore,
} from "@/data/global-state-store";
import createEmptyGrid from "@/functions/create-empty-grid";
import { DndContext } from "@dnd-kit/core";

import Header from "@/components/Header";
import Droppable from "@/components/Droppable";
import Draggable from "@/components/Draggable";
import createPresetFile from "@/functions/create-preset-file";
import dynamic from "next/dynamic";
import UploadFile from "@/components/UploadFile";
import { useDropzone } from "react-dropzone";
import { GridRow } from "@/data/interfaces";
//import uploadPreset from "@/functions/upload-preset";

export default function Home() {
	const [player, setPlayer] = React.useState<Tone.Players | null>(null);
	const [chosenKit, setChosenKit] = React.useState<"default" | "greenrock">("default");
	const [dynamics, setDynamics] = React.useState<"1" | "2" | "3">("2");
	const [lamps, setLamps] = React.useState<number | null>(null);
	const [loopCounter, setLoopCounter] = React.useState<number>(0);
	const sequenceRef = React.useRef<Tone.Sequence | null>(null);

	// DnDKit
	const [isDropped, setIsDropped] = React.useState<true | false>(false);

	// Dropzone
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

	//const files = acceptedFiles.map((file) =>)

	// Stores
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
	const addCrash = useAddCrashStore((state) => state.addCrash);
	const setAddCrash = useAddCrashStore((state) => state.setAddCrash);
	const addFill = useAddFillStore((state) => state.addFill);
	const setAddFill = useAddFillStore((state) => state.setAddFill);

	// load chosen kit - only 1 currently available
	React.useEffect(() => {
		if (!kitPreloader_default) return;

		if (chosenKit === "default") {
			setDrumkit(kit_default);
			const preloadSamples = new Tone.Players(kitPreloader_default).toDestination();
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

	// save input while user is programming a beat
	function toggleNote(x: number, y: number) {
		if (!grid) return;

		const changedGrid = [...grid];

		if (changedGrid[y].rowSteps[x] !== dynamics) {
			changedGrid[y].rowSteps[x] = dynamics;
		} else {
			changedGrid[y].rowSteps[x] = null;
		}

		setGrid(changedGrid);
	}

	// take the grid and prepare the sequence for playback
	// renews every time the grid is changed
	React.useEffect(() => {
		if (!grid || !player) return;

		const steps = [...new Array(numberOfSteps)].map((_, index) => index);

		sequenceRef.current?.dispose();

		sequenceRef.current = new Tone.Sequence(
			(time, step) => {
				if (step === 0) {
					setLoopCounter(loopCounter + 1);
				}

				if (addCrash && loopCounter % addCrash === 0 && step === 0) {
					player.player("extra_crash").stop();
					player.player("extra_crash").start();
				}

				if (addFill && loopCounter % addFill === 0 && step > numberOfSteps - 4) {
					if (grid[0].rowSteps[step] !== null) {
						player.player(`${grid[0].rowName}` + "_" + `${grid[0].rowSteps[step]}`).start(time);
					}
					if (numberOfSteps % step === 0) {
						player.player("extra_snare").start(time);
					} else {
						player.player("snare_2").start(time);
					}
				} else {
					grid.forEach((kitElement) => {
						if (kitElement.rowSteps[step] !== null) {
							player.player(`${kitElement.rowName}` + "_" + `${kitElement.rowSteps[step]}`).start(time);
						}
					});
				}
				setLamps(step);
				console.log("LAMPS", lamps);
			},
			steps,
			"16n"
		);
		sequenceRef.current.start(0);
	}, [numberOfSteps, grid, player, loopCounter, lamps, addCrash, addFill]);

	// play/stop functions
	async function handlePlayButton() {
		if (!isPlaying) {
			await Tone.start();
			Tone.Transport.toggle();
			setIsPlaying(true);
		}

		if (isPlaying) {
			Tone.Transport.toggle();
			setIsPlaying(false);
			setLamps(null);
			setLoopCounter(0);
		}
	}

	// change the tempo by slider
	function handleBPMSliderChange(values: number[]) {
		setBpm(values[0]);
		Tone.Transport.bpm.value = values[0];
	}

	// change the tempo when loading presets
	function handleBPMChange(value: number) {
		setBpm(value);
		Tone.Transport.bpm.value = value;
	}

	// change grid size (number of steps)
	function handleNumberOfStepsChange(values: number[]) {
		setNumberOfSteps(values[0]);
	}

	// switch between 4/4 and 3/4
	function handleMeterChange() {
		if (meter === "quadruple") {
			setMeter("triple");
			setNumberOfSteps(24);
		}
		if (meter === "triple") {
			setMeter("quadruple");
			setNumberOfSteps(32);
		}
	}

	// clear the grid
	function clearGrid() {
		const emptyGrid = createEmptyGrid(drumkit, 32);
		if (emptyGrid) {
			setGrid(structuredClone(emptyGrid));
		}
	}

	// clear a single row (resets all notes in this row)
	function clearRow(y: number) {
		if (grid) {
			const changedGrid = [...grid];

			const setOfNulls: null[] = [];
			for (let i = 0; i < 32; i++) {
				setOfNulls.push(null);
			}
			changedGrid.map((row, index) => {
				if (index === y) {
					row.rowSteps = setOfNulls;
				}
				setGrid(changedGrid);
			});
		}
	}

	// clear a single row (resets all notes in this row)
	function fillEntireRow(y: number) {
		if (grid) {
			const changedGrid = [...grid];

			const newRow: GridRow = [];
			for (let i = 0; i < numberOfSteps; i++) {
				newRow.push(dynamics);
			}

			while (newRow.length < 32) {
				newRow.push(null);
			}

			changedGrid.map((row, index) => {
				if (index === y) {
					row.rowSteps = newRow;
				}
				setGrid(changedGrid);
			});
		}
	}

	// save current beat to localStorage
	const savePresetToLocalStorage = (id: number) => {
		if (!grid) {
			return;
		}
		const Preset = createPresetFile(numberOfSteps, meter, bpm, addCrash, addFill, grid);

		if (!Preset) return;

		const fileName: string = "BANDMATE_" + id.toString();

		localStorage.setItem(fileName, Preset);
	};

	// load saved pattern from localStorage
	const loadPresetFromLocalStorage = (id: number) => {
		const patternKey: string = "BANDMATE_" + id.toString();
		const storageItem = localStorage.getItem(patternKey);
		if (!storageItem) return;

		try {
			const item = JSON.parse(storageItem);

			if (!item.steps || !item.meter || !item.bpm || !item.grid || !item.addCrash || !item.addFill) {
				console.log("Error: Failed to find all 6 variables in 'item'");
				return;
			}
			try {
				setNumberOfSteps(item.steps);
				setMeter(item.meter);
				setGrid(item.grid);
				handleBPMChange(item.bpm);
				setAddCrash(item.addCrash);
				setAddFill(item.addFill);
			} catch (e) {
				console.log("Error: Failed to setStates");
			}
		} catch (e) {
			console.log("Error: 'item' is false");
		}
	};

	const handleHotKeys = (e: KeyboardEvent) => {
		if (e.key === "1") {
			setDynamics("1");
		} else if (e.key === "2") {
			setDynamics("2");
		} else if (e.key === "3") {
			setDynamics("3");
			//} else if (e.key === "x" || "X") {xx
			//	handlePlayButton();
		}
	};

	React.useEffect(() => {
		window.addEventListener("keyup", handleHotKeys);
		return () => {
			window.removeEventListener("keyup", handleHotKeys);
		};
	});

	const handleDragEnd = (event: any) => {
		if (event.over && event.over.id === "droppable") {
			setIsDropped(true);
		}
	};

	return (
		<>
			<Header />
			{/*<div className="dropzone" onDrop={() => uploadPreset}></div>*/}
			{grid ? (
				grid.map((x, indexOf) => {
					return (
						<div key={"sequencer-row-" + `${indexOf}`} className="sequencer-row">
							<button
								className="button cell-size w-[8rem] min-w-[7rem] m-[1px] mr-[10px]"
								onClick={() => player?.player(`${x.rowName}` + "_" + `${dynamics}`).start()}
							>
								{x.rowButtonName}
							</button>
							<button className="button cell-size w-[2rem] min-w-[1.5rem] m-[1px] mr-[10px]" onClick={() => fillEntireRow(indexOf)}>
								F
							</button>
							<button className="button cell-size w-[2rem] min-w-[1.5rem] m-[1px] mr-[10px]" onClick={() => clearRow(indexOf)}>
								X
							</button>
							<span className="flex align-center">
								{[...Array(numberOfSteps)].map((_, i) => {
									return (
										<button
											key={i}
											className={
												(x.rowSteps[i] !== null ? "note active-" + `${x.rowSteps[i]}` : "note inactive") + " " + `${meter}`
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
				<span className="cell-size w-[8rem] min-w-[7rem] m-[1px] mr-[10px]"></span>
				<span className="cell-size w-[2rem] min-w-[1.5rem] m-[1px] mr-[10px]"></span>
				<span className="flex flex-row">
					{[...Array(numberOfSteps)].map((_, i) => {
						return (
							<span key={"lamp-" + i} className={`lamp-square ${meter}`}>
								{lamps === i ? <span key={"lamp_" + i} className="lamp bg-red-700"></span> : <></>}
							</span>
						);
					})}
				</span>
			</div>
			<div className="controls">
				<button className={"button main-controls font-bold " + (isPlaying ? " text-amber-600" : "")} onClick={handlePlayButton}>
					{isPlaying ? "STOP" : "PLAY"}
				</button>
				<button className="button main-controls" onClick={handleMeterChange}>
					{meter === "quadruple" ? "4/4" : "3/4"}
				</button>
				<button className="button main-controls" onClick={clearGrid}>
					CLEAR
				</button>
				{/* <button className={"button main-button mr-0 min-w-[5rem]" + (chosenKit === "default" ? " text-amber-600" : "")} onClick={() => setChosenKit("default")}>
                    Default
                </button>
                <button className={"button main-button min-w-[5rem]" + (chosenKit === "greenrock" ? " text-amber-600" : "")} onClick={() => setChosenKit("greenrock")}>
                    Greenrock
                </button> */}
				<span className="controls-group">
					<button
						className={"button min-w-[2rem] w-[4rem] h-[2.5rem] " + (dynamics === "1" ? " active-font-1" : "")}
						onClick={() => setDynamics("1")}
					>
						1
					</button>
					<button
						className={"button min-w-[2rem] w-[4rem] h-[2.5rem] " + (dynamics === "2" ? " active-font-2" : "")}
						onClick={() => setDynamics("2")}
					>
						2
					</button>
					<button
						className={"button min-w-[2rem] w-[4rem] h-[2.5rem] " + (dynamics === "3" ? " active-font-3" : "")}
						onClick={() => setDynamics("3")}
					>
						3
					</button>
				</span>
				<Slider
					className="w-[300px] min-w-[120px] ml-[10px] mr-[10px] bg-slate-700 hover:bg-gray-600"
					value={[bpm]}
					defaultValue={[120]}
					min={30}
					max={300}
					step={1}
					onValueChange={handleBPMSliderChange}
				/>

				<label className="ml-[10px] mr-[10px]" htmlFor="BPM">
					BPM: {bpm ? bpm : <></>}
				</label>
				<Slider
					className="w-[150px] min-w-[60px] ml-[10px] mr-[10px] bg-slate-700 hover:bg-gray-600"
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
				{defaultPatterns.map((x) => {
					return (
						<span key={"pattern-row-" + `${x}`}>
							<p>
								<button className="button savepattern" onClick={() => savePresetToLocalStorage(x)}>
									Save <b>({x})</b>
								</button>
							</p>
							<p>
								<button className={"button savepattern"} onClick={() => loadPresetFromLocalStorage(x)}>
									Load <b>({x})</b>
								</button>
							</p>
						</span>
					);
				})}

				{/*<span className="export-preset">
					<button className="button min-w-[2rem] w-[6.5rem] h-[3rem]" onClick={downloadPreset}>
						Save preset
					</button>
				</span>*/}
				<span className="extra-controls-table">
					<span className="extra-controls-row">
						<button className="extra-control min-w-[2rem] w-[4rem] h-[2.5rem]" disabled>
							Add accent
						</button>
						<button
							className={"button extra-control min-w-[2rem] w-[4rem] h-[2.5rem]" + (addCrash === null ? " active-font-2" : "")}
							onClick={() => setAddCrash(null)}
						>
							Off
						</button>
						<button
							className={"button extra-control min-w-[2rem] w-[6rem] h-[2.5rem]" + (addCrash === 2 ? " active-font-2" : "")}
							onClick={() => setAddCrash(2)}
						>
							Every 2 bars
						</button>
						<button
							className={"button extra-control min-w-[2rem] w-[6rem] h-[2.5rem]" + (addCrash === 4 ? " active-font-2" : "")}
							onClick={() => setAddCrash(4)}
						>
							Every 4 bars
						</button>
						<button
							className={"button extra-control min-w-[2rem] w-[6rem] h-[2.5rem]" + (addCrash === 8 ? " active-font-2" : "")}
							onClick={() => setAddCrash(8)}
						>
							Every 8 bars
						</button>
					</span>
					<span className="extra-controls-row">
						<button className="extra-control w-36" disabled>
							<p>Add fill</p>
						</button>
						<button
							className={"button extra-control min-w-[2rem] w-[4rem] h-[2.5rem]" + (addFill === null ? " active-font-2" : "")}
							onClick={() => setAddFill(null)}
						>
							Off
						</button>
						<button
							className={"button extra-control min-w-[2rem] w-[6rem] h-[2.5rem]" + (addFill === 2 ? " active-font-2" : "")}
							onClick={() => setAddFill(2)}
						>
							Every 2 bars
						</button>
						<button
							className={"button extra-control min-w-[2rem] w-[6rem] h-[2.5rem]" + (addFill === 4 ? " active-font-2" : "")}
							onClick={() => setAddFill(4)}
						>
							Every 4 bars
						</button>
						<button
							className={"button extra-control min-w-[2rem] w-[6rem] h-[2.5rem]" + (addFill === 8 ? " active-font-2" : "")}
							onClick={() => setAddFill(8)}
						>
							Every 8 bars
						</button>
					</span>
				</span>
			</div>
		</>
	);
}
