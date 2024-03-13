import * as Tone from "tone";
import * as demo1 from "@/data/demo/pattern1.json";
import * as demo2 from "@/data/demo/pattern2.json";
import * as demo3 from "@/data/demo/pattern3.json";
import * as demo4 from "@/data/demo/pattern4.json";
import * as demo5 from "@/data/demo/pattern5.json";
import * as demo6 from "@/data/demo/pattern6.json";
import {
    useNumberOfStepsStore,
    useMeterStore,
    useBPMStore,
    useGridStore,
    useIsPlayingStore,
} from "@/data/global-state-store";
import loadPatternIntoLocalStorage from "@/functions/load-pattern-into-storage";

export default function Demo() {
    const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
    const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
    const meter = useMeterStore((state) => state.meter);
    const setMeter = useMeterStore((state) => state.setMeter);
    const bpm = useBPMStore((state) => state.bpm);
    const setBpm = useBPMStore((state) => state.setBpm);
    const grid = useGridStore((state) => state.grid);
    const setGrid = useGridStore((state) => state.setGrid);
    const isPlaying = useIsPlayingStore((state) => state.isPlaying);
    const setIsPlaying = useIsPlayingStore((state) => state.setIsPlaying);

    const loadActivePattern = (id: number) => {
        const patternKey: string = "BeateRRR_" + "Pattern" + id.toString();
        const storageItem = localStorage.getItem(patternKey);
        if (storageItem) {
            try {
                const item = JSON.parse(storageItem);

                if ("steps" && "meter" && "bpm" && "grid" in item) {
                    try {
                        setNumberOfSteps(parseInt(item.steps));
                        setMeter(item.meter);
                        setBpm(parseInt(item.bpm));
                        setGrid(JSON.parse(item.grid));
                    } catch (e) {
                        console.log("Error: Failed to setStates");
                    }
                } else {
                    console.log("Error: Failed to find all 4 variables in 'item'");
                }
            } catch (e) {
                console.log("Error: 'item' is false");
            }
        }
    };

    const handleDemo = async () => {
        loadPatternIntoLocalStorage(demo1, 1);
        loadPatternIntoLocalStorage(demo2, 2);
        loadPatternIntoLocalStorage(demo3, 3);
        loadPatternIntoLocalStorage(demo4, 4);
        loadPatternIntoLocalStorage(demo5, 5);
        loadPatternIntoLocalStorage(demo6, 6);
        loadActivePattern(1);
        await Tone.start();
        Tone.Transport.toggle();
        setIsPlaying(true);
    };
    return (
        <button className="button main-button" onClick={handleDemo}>
            DEMO
        </button>
    );
}
