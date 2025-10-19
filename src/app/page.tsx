"use client";
import * as React from "react";
import * as Tone from "tone";
import Header from "@/components/Header";
import { DEFAULT_PATTERNS } from "@/data/global-defaults";
import { DynamicUnion, RowStep } from "@/data/interfaces";
import { useDropzone } from "react-dropzone";
import { drumkitDefault, drumkitPreloader } from "@/data/kits/default/default";
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
import createPreset from "@/functions/create-preset";
import AddFillControls from "@/components/AddFillControls";
import AddCrashControls from "@/components/AddCrashControls";
import BeatMapCell from "@/components/BeatMapCell";
import BeatMapControl from "@/components/BeatMapControl";
import DynamicControls from "@/components/DynamicControls";
import BPMSlider from "@/components/BPMSlider";
import StepSlider from "@/components/StepSlider";

export default function Home() {
	const [player, setPlayer] = React.useState<Tone.Players | null>(null);
	const [dynamics, setDynamics] = React.useState<DynamicUnion>("2");
	const [lamps, setLamps] = React.useState<number | null>(null);
	const [loopCounter, setLoopCounter] = React.useState<number>(0);
	const sequenceRef = React.useRef<Tone.Sequence | null>(null);

	// Dropzone
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

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

	React.useEffect(() => {
		if (!drumkitDefault) return;

		setDrumkit(drumkit);
		const preloadSamples = new Tone.Players(drumkitPreloader).toDestination();
		setPlayer(preloadSamples);

		const emptyGrid = createEmptyGrid(drumkit, 32);

		if (emptyGrid) {
			setGrid(emptyGrid);
		}
	}, [drumkit, setDrumkit]);

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
			},
			steps,
			"16n"
		);
		sequenceRef.current.start(0);
	}, [numberOfSteps, grid, player, loopCounter, lamps, addCrash, addFill]);

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

	async function togglePlayButton() {
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

	function handleMeterChange() {
		if (isPlaying) {
			togglePlayButton();
		}

		clearGrid();
		setAddCrash(null);
		setAddFill(null);

		if (meter === "quadruple") {
			setMeter("triple");
			setNumberOfSteps(24);
		}
		if (meter === "triple") {
			setMeter("quadruple");
			setNumberOfSteps(16);
		}
	}

	function clearGrid() {
		const emptyGrid = createEmptyGrid(drumkit, 32);
		if (emptyGrid) {
			setGrid(structuredClone(emptyGrid));
		}
	}

	function clearEntireRow(y: number) {
		if (grid) {
			const changedGrid = [...grid];

			const setOfNulls: null[] = [];
			for (let i = 0; i < 32; i++) {
				setOfNulls.push(null);
			}

			if (changedGrid[y]) {
				changedGrid[y].rowSteps = setOfNulls;
				setGrid(changedGrid);
			}
		}
	}

	function fillEntireRow(y: number) {
		if (grid) {
			const changedGrid = [...grid];

			const newRow: RowStep[] = [];
			for (let i = 0; i < numberOfSteps; i++) {
				newRow.push(dynamics);
			}

			while (newRow.length < 32) {
				newRow.push(null);
			}

			if (changedGrid[y]) {
				changedGrid[y].rowSteps = newRow;
				setGrid(changedGrid);
			}
		}
	}

	function fillStrongBeats(y: number) {
		if (grid) {
			const changedGrid = [...grid];

			const newRow: RowStep[] = [];
			for (let i = 0; i < numberOfSteps; i++) {
				if (i % (meter === "quadruple" ? 2 : 3) === 0) {
					newRow.push(dynamics);
				} else newRow.push(grid[y].rowSteps[i]);
			}

			while (newRow.length < 32) {
				newRow.push(null);
			}

			if (changedGrid[y]) {
				changedGrid[y].rowSteps = newRow;
				setGrid(changedGrid);
			}
		}
	}

	function fillWeakBeats(y: number) {
		if (grid) {
			const changedGrid = [...grid];

			const newRow: RowStep[] = [];
			for (let i = 0; i < numberOfSteps; i++) {
				if (i % (meter === "quadruple" ? 2 : 3) !== 0) {
					newRow.push(dynamics);
				} else newRow.push(grid[y].rowSteps[i]);
			}

			while (newRow.length < 32) {
				newRow.push(null);
			}

			if (changedGrid[y]) {
				changedGrid[y].rowSteps = newRow;
				setGrid(changedGrid);
			}
		}
	}

	const savePresetToLocalStorage = (id: number) => {
		if (!grid) {
			return;
		}
		const Preset = createPreset(numberOfSteps, meter, bpm, addCrash, addFill, grid);

		if (!Preset) return;

		const fileName: string = "BANDMATE_" + id.toString();

		localStorage.setItem(fileName, Preset);
	};

	const loadPresetFromLocalStorage = (id: number) => {
		const patternKey: string = "BANDMATE_" + id.toString();
		const storageItem = localStorage.getItem(patternKey);
		if (!storageItem) return;

		const item = JSON.parse(storageItem);

		if (!item.steps || !item.meter || !item.bpm || !item.grid || !item.addCrash || !item.addFill) {
			return;
		}

		setNumberOfSteps(item.steps);
		setMeter(item.meter);
		setGrid(item.grid);
		setBpm(item.bpm);
		setAddCrash(item.addCrash);
		setAddFill(item.addFill);
		Tone.Transport.bpm.value = item.bpm;
	};

	const handleHotKeys = (e: KeyboardEvent) => {
		if (e.key === "1") {
			setDynamics("1");
		} else if (e.key === "2") {
			setDynamics("2");
		} else if (e.key === "3") {
			setDynamics("3");
		} else if (e.key === "x" || e.key === "X") {
			togglePlayButton();
		}
	};

	React.useEffect(() => {
		window.addEventListener("keyup", handleHotKeys);
		return () => {
			window.removeEventListener("keyup", handleHotKeys);
		};
	});

	return (
		<>
			<Header />

			<section className="ml-[20px]">
				{grid ? (
					grid.map((rowData, rowIndex) => {
						return (
							<div key={"sequencer-row-" + `${rowIndex}`} className="flex justify-start items-center">
								<button
									className="button cell-size w-[8rem] min-w-[7rem] m-[1px] mr-[10px]"
									onClick={() => player?.player(`${rowData.rowName}` + "_" + `${dynamics}`).start()}
								>
									{rowData.rowButtonName}
								</button>

								<BeatMapControl label={"⬛⬛⬛⬛"} rowIndex={rowIndex} extraCss={"text-[4px]"} action={fillEntireRow} />
								<BeatMapControl label={"♪"} rowIndex={rowIndex} extraCss={"font-extrabold text-xl"} action={fillStrongBeats} />
								<BeatMapControl label={"♪"} rowIndex={rowIndex} extraCss={"font-extralight text-xs"} action={fillWeakBeats} />
								<BeatMapControl label={"X"} rowIndex={rowIndex} extraCss={"mr-[10px]"} action={clearEntireRow} />

								<span className="flex align-center">
									{[...Array(numberOfSteps)].map((_, cellIndex) => {
										return (
											<BeatMapCell
												key={cellIndex}
												rowData={rowData}
												rowIndex={rowIndex}
												cellIndex={cellIndex}
												meter={meter}
												toggleNote={toggleNote}
											/>
										);
									})}
								</span>
							</div>
						);
					})
				) : (
					<p>Loading...</p>
				)}
				<div className="flex flex-row justify-start items-center">
					<span className="w-[16rem] h-[30px] mr-[28px]"></span>

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
				<div className="flex flex-row flex-start items-center m-[20px] gap-[8px]">
					<button className={"button main-controls font-bold " + (isPlaying ? " text-amber-600" : "")} onClick={togglePlayButton}>
						{isPlaying ? "STOP" : "PLAY"}
					</button>
					<button className="button main-controls" onClick={handleMeterChange}>
						{meter === "quadruple" ? "4/4" : "3/4"}
					</button>
					<button className="button main-controls" onClick={clearGrid}>
						CLEAR
					</button>

					<DynamicControls dynamics={dynamics} setDynamics={setDynamics} />
					<BPMSlider bpm={bpm} setBpm={setBpm} />
					<StepSlider numberOfSteps={numberOfSteps} setNumberOfSteps={setNumberOfSteps} />
				</div>
				<div className="saved-patterns">
					{DEFAULT_PATTERNS.map((x) => {
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

					<span className="flex flex-col flex-nowrap ml-[48px]">
						<AddCrashControls addCrash={addCrash} setAddCrash={setAddCrash} />
						<AddFillControls addFill={addFill} setAddFill={setAddFill} />
					</span>
				</div>
			</section>
		</>
	);
}
