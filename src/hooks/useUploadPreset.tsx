import * as Tone from "tone";
import { useNumberOfStepsStore, useMeterStore, useBPMStore, useGridStore, useAddCrashStore, useAddFillStore } from "@/data/global-state-store";
import { Preset } from "@/data/interfaces";

export default function useUploadPreset() {
	const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
	const setMeter = useMeterStore((state) => state.setMeter);
	const setBpm = useBPMStore((state) => state.setBpm);
	const setGrid = useGridStore((state) => state.setGrid);
	const setAddCrash = useAddCrashStore((state) => state.setAddCrash);
	const setAddFill = useAddFillStore((state) => state.setAddFill);

	return (content: Preset) => {
		setNumberOfSteps(content.steps);
		setMeter(content.meter);
		setBpm(content.bpm);
		Tone.Transport.bpm.value = content.bpm;
		setGrid(content.grid);
		setAddCrash(content.addCrash);
		setAddFill(content.addFill);
	};
}
