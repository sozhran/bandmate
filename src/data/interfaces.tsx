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
    bpm: string;
    grid: string;
}

export interface Drumkit {
    name: string;
    buttonName: string;
}

// Battleplan
//
// TOP PRIORITY
//
// Dropdown with N presets
// Make these presets
// Replace drum sounds (1-2 kits)
// Remove the Local Storage stuff
// Re-do layout of buttons below
//
// NICE TO HAVE
//
// Save preset in a file
// Drag-drop preset
// 'About' page (last priority really)

// Songs for presets: Custard pie, AC/DC beat, skank, double bass PM beat, something 5/4 and 7/4, floor tom beat, Hunger style blastbeat, Breed, SLTS, Ska-P beat?, Rock And Roll
