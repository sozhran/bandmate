import * as Tone from "tone";
import { BPM } from "@/data/interfaces";
import Slider from "./ui/Slider";

interface BPMSliderProps {
	bpm: BPM;
	setBpm: (value: BPM) => void;
}

export default function BPMSlider({ bpm, setBpm }: BPMSliderProps) {
	function handleBPMSliderChange(values: number[]) {
		setBpm(values[0]);
		Tone.Transport.bpm.value = values[0];
	}

	return (
		<>
			<Slider
				className="w-[300px] min-w-[120px] ml-[10px] mr-[10px] bg-slate-700 hover:bg-gray-600"
				value={[bpm]}
				defaultValue={[120]}
				min={30}
				max={300}
				step={1}
				onValueChange={handleBPMSliderChange}
			/>
			<span className="ml-[5px] mr-[5px] w-[70px]">
				<label htmlFor="BPM">BPM: {bpm ? bpm : <></>}</label>
			</span>
		</>
	);
}
