import { Step } from "@/data/interfaces";
import Slider from "./ui/Slider";

interface StepSliderProps {
	numberOfSteps: Step;
	setNumberOfSteps: (value: Step) => void;
}

export default function StepSlider({ numberOfSteps, setNumberOfSteps }: StepSliderProps) {
	function handleNumberOfStepsChange(values: number[]) {
		setNumberOfSteps(values[0]);
	}

	return (
		<>
			<Slider
				className="w-[150px] min-w-[60px] ml-[10px] mr-[10px] bg-slate-700 hover:bg-gray-600"
				value={[numberOfSteps]}
				defaultValue={[16]}
				min={4}
				max={32}
				step={1}
				onValueChange={handleNumberOfStepsChange}
			/>
			<span className="ml-[5px] mr-[5px] w-[70px]">
				<label htmlFor="Steps">Steps: {numberOfSteps ? numberOfSteps : <></>}</label>
			</span>
		</>
	);
}
