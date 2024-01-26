import { Drumkit, Step } from "@/app/page";

const createGrid = (drumkit: Drumkit[] | null, measures: Step) => {
    if (!drumkit || !measures) return;

    const rows: { rowName: string; rowButtonName: string; rowSteps: ("1" | "2" | "3" | null)[] }[] = [];

    const mapper = drumkit.map((element: Drumkit) => {
        const setOfNulls = [];
        for (let i = 0; i < measures; i++) {
            setOfNulls.push(null);
        }
        const key = { rowName: element.name, rowButtonName: element.buttonName, rowSteps: setOfNulls };
        rows.push(key);
    });
    return rows;
};

export default createGrid;
