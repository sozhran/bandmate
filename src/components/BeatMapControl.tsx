interface BeatMapControlProps {
	label: string;
	rowIndex: number;
	extraCss: string;
	title?: string;
	disabled?: boolean;
	action?: (rowIndex: number) => void;
}

export default function BeatMapControl({
	label,
	rowIndex,
	extraCss,
	disabled = false,
	title,
	action,
}: BeatMapControlProps) {
	const handleAction = () => {
		if (disabled) return;

		if (action) action(rowIndex);
	};

	return (
		<button
			className={`button cell-size w-[2rem] min-w-[1.5rem] m-[1px] ${extraCss}`}
			disabled={disabled}
			title={title}
			onClick={handleAction}
		>
			{label}
		</button>
	);
}
