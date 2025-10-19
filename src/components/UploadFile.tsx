import { MutableRefObject, useRef } from "react";
import useUploadPreset from "@/hooks/useUploadPreset";

export default function UploadFile() {
	const inputFile: MutableRefObject<any> | null = useRef(null);
	const uploadPresetToBandmate = useUploadPreset();

	function uploadPreset(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) {
			return;
		}

		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onloadend = (e) => {
			if (!e.target?.result || typeof e.target.result != "string") {
				return;
			}

			const content = JSON.parse(e.target.result);

			uploadPresetToBandmate(content);
		};

		reader.readAsText(file);
	}

	return (
		<button className="button main-controls" onClick={() => inputFile.current.click()}>
			Upload
			<input type="file" onChange={uploadPreset} ref={inputFile} hidden></input>
		</button>
	);
}
