export default function getSampleName(element: string, dynamic: string, step: number) {
	return `${element}_${dynamic}${step % 2 === 0 ? "" : "_even"}`;
}
