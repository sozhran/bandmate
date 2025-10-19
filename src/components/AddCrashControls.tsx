import { AdditionsUnion, AdditionsOption } from "@/data/interfaces";

interface AddCrashControlsProps {
	addCrash: AdditionsUnion;
	setAddCrash: (value: AdditionsUnion) => void;
}

export default function AddCrashControls({ addCrash, setAddCrash }: AddCrashControlsProps) {
	const options: AdditionsOption[] = [
		{ label: "Off", value: null },
		{ label: "Every 2 bars", value: 2 },
		{ label: "Every 4 bars", value: 4 },
		{ label: "Every 8 bars", value: 8 },
	];

	return (
		<span className="flex flex-row">
			<button className="extra-control w-36" disabled>
				<p>Add accent</p>
			</button>

			{options.map(({ label, value }) => (
				<button
					key={label}
					className={"button extra-control min-w-[2rem] w-[6rem] h-[2.5rem]" + (addCrash === value ? " active-font-2" : "")}
					onClick={() => setAddCrash(value)}
				>
					{label}
				</button>
			))}
		</span>
	);
}
