import { default_Patterns } from "@/data/global-defaults";

export default function cleanLocalStorage() {
	default_Patterns.map((x) => {
		const storageKey: string = "BANDMATE_" + x.toString();
		localStorage.removeItem(storageKey);
	});
}
