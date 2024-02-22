import { Pattern } from "@/app/page";

export default function loadDemoPattern(pattern: Pattern, number: number) {
    if (!pattern) return;
    const patternKey: string = "BeateRRR_" + "Pattern" + number.toString();
    const patternSteps = parseInt(pattern.steps);
    const patternMeter = pattern.meter;
    const patternBPM = parseInt(pattern.bpm);
    const patternGrid = JSON.parse(pattern.grid);
    const patternValue = {
        steps: patternSteps,
        meter: patternMeter,
        bpm: patternBPM,
        grid: patternGrid,
    };

    localStorage.setItem(patternKey, JSON.stringify(patternValue));
}