import { default_Patterns } from "@/data/global-defaults";

// delete all saved patterns in local storage
export default function useNuclearButton() {
    default_Patterns.map((x) => {
        const storageKey: string = "BANDMATE_" + x.toString();
        localStorage.removeItem(storageKey);
    });
}
