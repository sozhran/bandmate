"use client";

import * as React from "react";
import * as Tone from "tone";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { presets } from "@/data/presets";
import { useNumberOfStepsStore, useMeterStore, useBPMStore, useGridStore, useIsPlayingStore } from "@/data/global-state-store";
import { Preset } from "@/data/interfaces";

export default function Combobox() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
    const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
    const meter = useMeterStore((state) => state.meter);
    const setMeter = useMeterStore((state) => state.setMeter);
    const bpm = useBPMStore((state) => state.bpm);
    const setBpm = useBPMStore((state) => state.setBpm);
    const grid = useGridStore((state) => state.grid);
    const setGrid = useGridStore((state) => state.setGrid);

    const handleBPMChange = (value: number) => {
        setBpm(value);
        Tone.Transport.bpm.value = value;
    };

    const loadPreset = (preset: any) => {
        if (preset && preset.steps && preset.meter && preset.bpm && preset.grid) {
            try {
                setNumberOfSteps(preset.steps);
                setMeter(preset.meter);
                setGrid(preset.grid);
                handleBPMChange(preset.bpm);
            } catch (e) {
                console.log("Error: couldn't load parts of preset");
            }
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {value ? value : "Select preset..."}
                    {/* {value ? frameworks.find((framework) => framework.value === value)?.label : "Select preset..."} */}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[500px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {presets.map((preset) => (
                                <CommandItem
                                    key={preset.presetName}
                                    value={preset.presetName}
                                    onSelect={(currentValue) => {
                                        // const getPreset = presets.find((x) => x.presetName === currentValue);
                                        // if (getPreset) {
                                        loadPreset(preset);
                                        // }
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn("mr-2 h-4 w-4", value === preset.presetName ? "opacity-100" : "opacity-0")} />
                                    {preset.presetName}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
