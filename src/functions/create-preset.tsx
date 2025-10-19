import { BPM, Step, Meter, Grid, AdditionsUnion, Preset } from "@/data/interfaces";

export default function createPreset(numberOfSteps: Step, meter: Meter, bpm: BPM, addCrash: AdditionsUnion, addFill: AdditionsUnion, grid: Grid) {
	const preset: Preset = {
		description: "Bandmate Preset",
		steps: numberOfSteps,
		meter: meter,
		bpm: bpm,
		addCrash: addCrash,
		addFill: addFill,
		grid: grid,
	};

	const content = JSON.stringify(preset);

	if (!content) {
		return null;
	}

	return content;
}
