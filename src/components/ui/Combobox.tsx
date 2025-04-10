"use client";

import * as React from "react";
import * as Tone from "tone";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { presets } from "@/data/presets";
import { useNumberOfStepsStore, useMeterStore, useBPMStore, useGridStore, useAddCrashStore, useAddFillStore } from "@/data/global-state-store";

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
	const addCrash = useAddCrashStore((state) => state.addCrash);
	const setAddCrash = useAddCrashStore((state) => state.setAddCrash);
	const addFill = useAddFillStore((state) => state.addFill);
	const setAddFill = useAddFillStore((state) => state.setAddFill);

	const handleBPMChange = (value: number) => {
		setBpm(value);
		Tone.Transport.bpm.value = value;
	};

	const loadPreset = (preset: any) => {
		try {
			setNumberOfSteps(preset.steps);
			setMeter(preset.meter);
			setGrid(preset.grid);
			handleBPMChange(preset.bpm);
			setAddCrash(preset.addCrash);
			setAddFill(preset.addFill);
		} catch (e) {
			console.log("Error: couldn't load parts of preset");
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-[320px] justify-between">
					{value ? value : "Select preset..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[480px] p-0 bg-gray-900">
				<Command>
					<CommandInput placeholder="Search presets..." />
					<CommandList>
						<CommandEmpty>No preset found.</CommandEmpty>
						<CommandGroup>
							{presets.map((preset) => (
								<CommandItem
									key={preset.presetName}
									value={preset.presetName}
									onSelect={(currentValue) => {
										loadPreset(preset);
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
