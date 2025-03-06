import { z } from "zod";

export const BPMValidator = z.number().int().min(40).max(300);
export const StepValidator = z.number().int().positive().max(32);

export type BPM = z.infer<typeof BPMValidator>;
export type Step = z.infer<typeof StepValidator>;

export type Meter = "quadruple" | "triple";
export type Add = 2 | 4 | 8 | null;

export type Grid = { rowName: string; rowButtonName: string; rowSteps: ("1" | "2" | "3" | null)[] }[];

export interface Drumkit {
	name: string;
	buttonName: string;
}
