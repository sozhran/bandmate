//import { useNumberOfStepsStore, useMeterStore, useBPMStore, useGridStore, useAddCrashStore, useAddFillStore } from "@/data/global-state-store";

//export default function uploadPreset(e: React.ChangeEvent<HTMLInputElement>) {
//	if (!e.target.files) {
//		return;
//	}

//	const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
//	const setMeter = useMeterStore((state) => state.setMeter);
//	const setBpm = useBPMStore((state) => state.setBpm);
//	const setGrid = useGridStore((state) => state.setGrid);
//	const setAddCrash = useAddCrashStore((state) => state.setAddCrash);
//	const setAddFill = useAddFillStore((state) => state.setAddFill);

//	const file = e.target.files[0];
//	const reader = new FileReader();

//	reader.onloadend = (e) => {
//		if (!e.target?.result || typeof e.target.result != "string") {
//			return;
//		}

//		const content = JSON.parse(e.target.result);

//		setNumberOfSteps(content.steps);
//		setMeter(content.meter);
//		setBpm(parseInt(content.bpm));
//		setGrid(content.grid);
//		setAddCrash(content.addCrash);
//		setAddFill(content.addFill);
//	};

//	reader.readAsText(file);
//}
