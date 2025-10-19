"use client";
import { create } from "zustand";
import { Drumkit, Step, Meter, BPM, Grid, Add } from "@/data/interfaces";
import { DEFAULT_BPM, DEFAULT_STEPS } from "@/data/global-defaults";
import { drumkitDefault } from "./kits/default/default";

// Interfaces

interface DrumkitState {
	drumkit: Drumkit[];
	setDrumkit: (drumkit: Drumkit[]) => void;
}

interface NumberOfStepsState {
	numberOfSteps: Step;
	setNumberOfSteps: (numberOfSteps: Step) => void;
}

interface MeterState {
	meter: Meter;
	setMeter: (meter: Meter) => void;
}

interface BPMState {
	bpm: BPM;
	setBpm: (bpm: BPM) => void;
}

interface GridState {
	grid: Grid | null;
	setGrid: (grid: Grid | null) => void;
}

interface IsPlayingState {
	isPlaying: boolean;
	setIsPlaying: (isPlaying: boolean) => void;
}

interface AddCrashState {
	addCrash: Add;
	setAddCrash: (addCrash: Add) => void;
}

interface AddFillState {
	addFill: Add;
	setAddFill: (addCrash: Add) => void;
}

// Stores

export const useDrumkitStore = create<DrumkitState>()((set) => ({
	drumkit: drumkitDefault,
	setDrumkit: (value) => set({ drumkit: value }),
}));

export const useNumberOfStepsStore = create<NumberOfStepsState>()((set) => ({
	numberOfSteps: DEFAULT_STEPS,
	setNumberOfSteps: (value) => set({ numberOfSteps: value }),
}));

export const useMeterStore = create<MeterState>()((set) => ({
	meter: "quadruple",
	setMeter: (value) => set({ meter: value }),
}));

export const useBPMStore = create<BPMState>()((set) => ({
	bpm: DEFAULT_BPM,
	setBpm: (value) => set({ bpm: value }),
}));

export const useGridStore = create<GridState>()((set) => ({
	grid: null,
	setGrid: (value) => set({ grid: value }),
}));

export const useIsPlayingStore = create<IsPlayingState>()((set) => ({
	isPlaying: false,
	setIsPlaying: (value) => set({ isPlaying: value }),
}));

export const useAddCrashStore = create<AddCrashState>()((set) => ({
	addCrash: null,
	setAddCrash: (value) => set({ addCrash: value }),
}));

export const useAddFillStore = create<AddFillState>()((set) => ({
	addFill: null,
	setAddFill: (value) => set({ addFill: value }),
}));
