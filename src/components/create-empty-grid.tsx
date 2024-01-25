import { Drumkit, Step } from "@/app/page";

const createGrid = (drumkit: Drumkit[] | null, measures: Step) => {
    if (!drumkit || !measures) return;

    const rows: { rowName: string; rowButtonName: string; rowSteps: boolean[] }[] = [];

    const mapper = drumkit.map((element: Drumkit) => {
        const setOfFalses = [];
        for (let i = 0; i < measures; i++) {
            setOfFalses.push(false);
        }
        const key = { rowName: element.name, rowButtonName: element.buttonName, rowSteps: setOfFalses };
        rows.push(key);
    });
    return rows;
};

export default createGrid;
