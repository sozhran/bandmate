import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNumberOfStepsStore, useMeterStore, useBPMStore, useGridStore } from "@/data/global-state-store";

export default function UploadFile() {
    const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
    const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
    const meter = useMeterStore((state) => state.meter);
    const setMeter = useMeterStore((state) => state.setMeter);
    const bpm = useBPMStore((state) => state.bpm);
    const setBpm = useBPMStore((state) => state.setBpm);
    const grid = useGridStore((state) => state.grid);
    const setGrid = useGridStore((state) => state.setGrid);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.readAsText(e.target.files[0], "UTF-8");
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    const result = e.target.result.toString();
                    const item = JSON.parse(result);

                    if (item.steps && item.meter && item.bpm && item.grid) {
                        setNumberOfSteps(parseInt(item.steps));
                        setMeter(item.meter);
                        setBpm(parseInt(item.bpm));
                        setGrid(JSON.parse(item.grid));
                    } else {
                        console.log("4 in item are FALSE");
                    }
                } else {
                    console.log("e.target FALSE");
                }
            };
        } else console.log("e.target.files FALSE");
    };
    return (
        <Button component="label">
            UPLOAD
            <input type="file" id="upload" onChange={handleUpload} hidden />
        </Button>
    );
}
