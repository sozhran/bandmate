import { BPM, Step, Meter, Grid, Add } from "@/data/interfaces";

export default function createPresetFile(numberOfSteps: Step, meter: Meter, bpm: BPM, addCrash: Add, addFill: Add, grid: Grid) {
	const Preset = {
		description: "Bandmate Preset",
		steps: numberOfSteps,
		meter: meter,
		bpm: bpm,
		addCrash: addCrash,
		addFill: addFill,
		grid: grid,
	};

	const content = JSON.stringify(Preset);

	if (!content) {
		return null;
	}

	return content;
}
