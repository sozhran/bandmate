import { z } from "zod";

export const BPMValidator = z
    .number()
    .int()
    .min(40, "Tempo must be between 40 and 300")
    .max(300, "Tempo must be between 40 and 300");

export const StepValidator = z.number().int().positive();

export type BPM = z.infer<typeof BPMValidator>;
export type Step = z.infer<typeof StepValidator>;

export type Grid = { rowName: string; rowButtonName: string; rowSteps: ("1" | "2" | "3" | null)[] }[];

export interface Pattern {
    steps: string;
    meter: string;
    bpm: string;
    grid: string;
}

export interface Drumkit {
    name: string;
    buttonName: string;
}
