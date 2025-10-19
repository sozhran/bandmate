import { Drumkit, Step, Grid } from "@/data/interfaces";

export default function createEmptyGrid(drumkit: Drumkit[], measures: Step) {
	if (!drumkit || !measures) return;

	const setOfNulls: null[] = [];
	for (let i = 0; i < measures; i++) {
		setOfNulls.push(null);
	}

	const grid: Grid = [];

	drumkit.map((element: Drumkit) => grid.push({ rowName: element.name, rowButtonName: element.buttonName, rowSteps: [...setOfNulls] }));

	return grid;
}
