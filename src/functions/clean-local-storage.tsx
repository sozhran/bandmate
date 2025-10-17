import { DEFAULT_PATTERNS } from "@/data/global-defaults";

export default function cleanLocalStorage() {
	DEFAULT_PATTERNS.map((x) => {
		const storageKey: string = "BANDMATE_" + x.toString();
		localStorage.removeItem(storageKey);
	});
}
