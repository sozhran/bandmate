import { defaultPatterns } from "@/data/global-defaults";

export default function cleanLocalStorage() {
	defaultPatterns.map((x) => {
		const storageKey: string = "BANDMATE_" + x.toString();
		localStorage.removeItem(storageKey);
	});
}
