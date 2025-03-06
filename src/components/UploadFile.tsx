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
	const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
	const meter = useMeterStore((state) => state.meter);
	const bpm = useBPMStore((state) => state.bpm);
	const grid = useGridStore((state) => state.grid);
	const addCrash = useAddCrashStore((state) => state.addCrash);
	const addFill = useAddFillStore((state) => state.addFill);

	const inputFile: MutableRefObject<any> | null = useRef(null);

	const uploadPreset = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || !e.target.files[0]) {
			console.log("e.target.files FALSE");
			return;
		}

		const reader = new FileReader();

		reader.readAsText(e.target.files[0], "UTF-8");
		reader.onload = (e) => {
			console.log("I start");
			if (!e.target || !e.target.result) {
				return;
			}

			const result = e.target.result.toString();
			const item = JSON.parse(result);

			console.log("I result");

			if (item.steps && item.meter && item.bpm && item.grid && item.addCrash && item.addFill) {
				try {
					setNumberOfSteps(parseInt(item.steps));
					setMeter(item.meter);
					setBpm(parseInt(item.bpm));
					setGrid(item.grid);
					setAddCrash(item.addCrash);
					setAddFill(item.addFill);
				} catch {
					console.log("Couldn't set states from upload: False data");
				}
			}
			console.log("I finish");
			console.log("steps", numberOfSteps);
			console.log("meter", meter);
			console.log("bpm", bpm);
			console.log("crash", addCrash);
			console.log("fill", addFill);
			console.log("grid", grid);
		};
	};

	return (
		//<Button component="label">
		//UPLOAD
		<button className="button main-controls" onClick={() => inputFile.current.click()}>
			UPLOAD
			<input type="file" onChange={uploadPreset} ref={inputFile} hidden></input>
		</button>
		//</Button>
	);
}
