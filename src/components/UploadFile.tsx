import Button from "@mui/material/Button";
import { useNumberOfStepsStore, useMeterStore, useBPMStore, useGridStore, useAddCrashStore, useAddFillStore } from "@/data/global-state-store";
import { MutableRefObject, useRef } from "react";

export default function UploadFile() {
	const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
	const setMeter = useMeterStore((state) => state.setMeter);
	const setBpm = useBPMStore((state) => state.setBpm);
	const setGrid = useGridStore((state) => state.setGrid);
	const setAddCrash = useAddCrashStore((state) => state.setAddCrash);
	const setAddFill = useAddFillStore((state) => state.setAddFill);

	const inputFile: MutableRefObject<any> | null = useRef(null);

	const uploadPreset = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			console.log("no target files");
			return;
		}

		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onloadend = (e) => {
			if (!e.target?.result || typeof e.target.result != "string") {
				console.log("result broken");
				return;
			}

			const content = JSON.parse(e.target.result);
			console.log("typeof content: ", typeof content);

			setNumberOfSteps(content.steps);
			setMeter(content.meter);
			setBpm(parseInt(content.bpm));
			setGrid(content.grid);
			setAddCrash(content.addCrash);
			setAddFill(content.addFill);
		};

		reader.readAsText(file);
	};

	return (
		<button className="button main-controls" onClick={() => inputFile.current.click()}>
			Upload
			<input type="file" onChange={uploadPreset} ref={inputFile} hidden></input>
		</button>
	);
}
