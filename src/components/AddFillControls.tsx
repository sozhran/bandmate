import { AdditionsUnion, AdditionsOption } from "@/data/interfaces";

interface AddFillControlsProps {
	addFill: AdditionsUnion;
	setAddFill: (value: AdditionsUnion) => void;
}

export default function AddFillControls({ addFill, setAddFill }: AddFillControlsProps) {
	const options: AdditionsOption[] = [
		{ label: "Off", value: null },
		{ label: "Every 2 bars", value: 2 },
		{ label: "Every 4 bars", value: 4 },
		{ label: "Every 8 bars", value: 8 },
	];

	return (
		<span className="flex flex-row">
			<button className="extra-control w-36" disabled>
				<p>Add fill</p>
			</button>

			{options.map(({ label, value }) => (
				<button
					key={label}
					className={"button extra-control min-w-[2rem] w-[6rem] h-[2.5rem]" + (addFill === value ? " active-font-2" : "")}
					onClick={() => setAddFill(value)}
				>
					{label}
				</button>
			))}
		</span>
	);
}
