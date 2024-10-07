import { Pattern } from "@/data/interfaces";

export default function loadPatternIntoLocalStorage(pattern: Pattern, number: number) {
    if (!pattern) return;
    const patternKey: string = "BeateRRR_" + "Pattern" + number.toString();
    const patternSteps = pattern.steps;
    const patternMeter = pattern.meter;
    const patternBPM = pattern.bpm;
    const patternGrid = pattern.grid;
    const patternValue = {
        steps: patternSteps,
        meter: patternMeter,
        bpm: patternBPM,
        grid: patternGrid
    };

    localStorage.setItem(patternKey, JSON.stringify(patternValue));
}
