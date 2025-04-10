"use client";
import { create } from "zustand";
import { Drumkit, Step, Meter, BPM, Grid, Add } from "@/data/interfaces";
import { defaultBPM, defaultSteps } from "@/data/global-defaults";

// Interfaces

export interface DrumkitState {
	drumkit: Drumkit[] | null;
	setDrumkit: (drumkit: Drumkit[] | null) => void;
}

export interface NumberOfStepsState {
	numberOfSteps: Step;
	setNumberOfSteps: (numberOfSteps: Step) => void;
}

export interface MeterState {
	meter: Meter;
	setMeter: (meter: Meter) => void;
}

export interface BPMState {
	bpm: BPM;
	setBpm: (bpm: BPM) => void;
}

export interface GridState {
	grid: Grid | null;
	setGrid: (grid: Grid | null) => void;
}

export interface IsPlayingState {
	isPlaying: boolean;
	setIsPlaying: (isPlaying: boolean) => void;
}

export interface AddCrashState {
	addCrash: Add;
	setAddCrash: (addCrash: Add) => void;
}

export interface AddFillState {
	addFill: Add;
	setAddFill: (addCrash: Add) => void;
}

// Stores

export const useDrumkitStore = create<DrumkitState>()((set) => ({
	drumkit: null,
	setDrumkit: (value) => set({ drumkit: value }),
}));

export const useNumberOfStepsStore = create<NumberOfStepsState>()((set) => ({
	numberOfSteps: defaultSteps,
	setNumberOfSteps: (value) => set({ numberOfSteps: value }),
}));

export const useMeterStore = create<MeterState>()((set) => ({
	meter: "quadruple",
	setMeter: (value) => set({ meter: value }),
}));

export const useBPMStore = create<BPMState>()((set) => ({
	bpm: defaultBPM,
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
