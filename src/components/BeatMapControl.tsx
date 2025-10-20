interface BeatMapControlProps {
	label: string;
	rowIndex: number;
	extraCss: string;
	action: (rowIndex: number) => void;
}

export default function BeatMapControl({ label, rowIndex, extraCss, action }: BeatMapControlProps) {
	return (
		<button className={`button cell-size w-[2rem] min-w-[1.5rem] m-[1px] ${extraCss}`} onClick={() => action(rowIndex)}>
			{label}
		</button>
	);
}
