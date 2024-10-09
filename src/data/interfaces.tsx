import { z } from "zod";

export const BPMValidator = z.number().int().min(40).max(300);

export const StepValidator = z.number().int().positive().max(32);

export type BPM = z.infer<typeof BPMValidator>;
export type Step = z.infer<typeof StepValidator>;

export type Grid = { rowName: string; rowButtonName: string; rowSteps: ("1" | "2" | "3" | null)[] }[];

export interface Preset {
    presetName: string;
    steps: Step;
    meter: "triple" | "quadruple";
    bpm: BPM;
    grid: Grid;
}

export interface Pattern {
    steps: string;
    meter: string;
    bpm: BPM;
    grid: string;
}

export interface Drumkit {
    name: string;
    buttonName: string;
}
