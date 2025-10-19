//import {
//	useNumberOfStepsStore,
//	useMeterStore,
//	useBPMStore,
//	useGridStore,
//	useIsPlayingStore,
//	useDrumkitStore,
//	useAddCrashStore,
//	useAddFillStore,
//} from "@/data/global-state-store";

//// Stores
//const drumkit = useDrumkitStore((state) => state.drumkit);
//const setDrumkit = useDrumkitStore((state) => state.setDrumkit);
//const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
//const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
//const meter = useMeterStore((state) => state.meter);
//const setMeter = useMeterStore((state) => state.setMeter);

//const grid = useGridStore((state) => state.grid);
//const setGrid = useGridStore((state) => state.setGrid);
//const isPlaying = useIsPlayingStore((state) => state.isPlaying);
//const setIsPlaying = useIsPlayingStore((state) => state.setIsPlaying);
//const addCrash = useAddCrashStore((state) => state.addCrash);
//const setAddCrash = useAddCrashStore((state) => state.setAddCrash);
//const addFill = useAddFillStore((state) => state.addFill);
//const setAddFill = useAddFillStore((state) => state.setAddFill);

//export function handleBPMChange(values: number[]) {
//	const bpm = useBPMStore((state) => state.bpm);
//	const setBpm = useBPMStore((state) => state.setBpm);

//	setBpm(values[0]);
//	Tone.Transport.bpm.value = values[0];
//}

//export function handleNumberOfStepsChange(values: number[]) {
//	setNumberOfSteps(values[0]);
//}

//export function handleMeterChange() {
//	if (meter === "quadruple") {
//		setMeter("triple");
//		setNumberOfSteps(24);
//	}
//	if (meter === "triple") {
//		setMeter("quadruple");
//		setNumberOfSteps(32);
//	}
//}
