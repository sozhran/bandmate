// import { useDrumkitStore } from "@/data/global-state-store";
// import createEmptyGrid from "./create-empty-grid";
import { default_Patterns } from "@/data/global-defaults";

// delete all saved patterns in local storage
export default function useNuclearButton() {
    // const drumkit = useDrumkitStore((state) => state.drumkit);

    default_Patterns.map((x) => {
        const storageKey: string = "BeateRRR_" + "Pattern" + x.toString();
        localStorage.removeItem(storageKey);
    });
    // createEmptyGrid(drumkit, 32);
}
