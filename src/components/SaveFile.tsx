import { saveAs } from "file-saver";
import { useNumberOfStepsStore, useMeterStore, useBPMStore, useGridStore, useAddCrashStore, useAddFillStore } from "@/data/global-state-store";
import createPreset from "@/functions/create-preset";

export default function SaveFile() {
	const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
	const meter = useMeterStore((state) => state.meter);
	const bpm = useBPMStore((state) => state.bpm);
	const grid = useGridStore((state) => state.grid);
	const addCrash = useAddCrashStore((state) => state.addCrash);
	const addFill = useAddFillStore((state) => state.addFill);

	if (!grid) return;

	function downloadPreset() {
		if (!grid) {
			return;
		}

		const content = createPreset(numberOfSteps, meter, bpm, addCrash, addFill, grid);

		if (!content) return;

		const file = new Blob([content], { type: "text/plain" });
		saveAs(file, "New preset.bandmate");
	}

	return (
		<button className="button main-controls" onClick={downloadPreset}>
			Save
		</button>
	);
}
