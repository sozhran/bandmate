"use client";
import { create } from "zustand";
import { BPM, Step, Grid } from "@/data/interfaces";
import { default_BPM, default_Steps } from "./global-defaults";

export interface NumberOfStepsState {
    numberOfSteps: Step;
    setNumberOfSteps: (numberOfSteps: Step) => void;
}

export const useNumberOfStepsStore = create<NumberOfStepsState>()((set) => ({
    numberOfSteps: default_Steps,
    setNumberOfSteps: (value) => set({ numberOfSteps: value }),
}));

export interface MeterState {
    meter: "triple" | "quadruple";
    setMeter: (meter: "triple" | "quadruple") => void;
}

export const useMeterStore = create<MeterState>()((set) => ({
    meter: "quadruple",
    setMeter: (value) => set({ meter: value }),
}));

export interface BPMState {
    bpm: BPM;
    setBpm: (numberOfSteps: Step) => void;
}

export const useBPMStore = create<BPMState>()((set) => ({
    bpm: default_BPM,
    setBpm: (value) => set({ bpm: value }),
}));

export interface GridState {
    grid: Grid | null;
    setGrid: (grid: Grid | null) => void;
}

export const useGridStore = create<GridState>()((set) => ({
    grid: null,
    setGrid: (value) => set({ grid: value }),
}));

export interface IsPlayingState {
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}

export const useIsPlayingStore = create<IsPlayingState>()((set) => ({
    isPlaying: false,
    setIsPlaying: (value) => set({ isPlaying: value }),
}));
