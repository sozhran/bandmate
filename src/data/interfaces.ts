import { z } from "zod";
import { DYNAMICS } from "./global-defaults";

export const BPMValidator = z.number().int().min(40).max(300);
export const StepValidator = z.number().int().positive().max(32);

export type BPM = z.infer<typeof BPMValidator>;
export type Step = z.infer<typeof StepValidator>;

export type Meter = "quadruple" | "triple";

export const Additions = [2, 4, 8, null]
export type AdditionsUnion = typeof Additions[number]
export interface AdditionsOption {
	label: string;
	value: AdditionsUnion;
}

export type DynamicUnion = typeof DYNAMICS[number];

export type RowStep = DynamicUnion | null;
export type GridRow = { rowName: string; rowButtonName: string; rowSteps: RowStep[] };
export type Grid = GridRow[];

export interface Drumkit {
	name: string;
	buttonName: string;
}