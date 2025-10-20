import { DYNAMICS } from "@/data/global-defaults";
import { DynamicUnion } from "@/data/interfaces";

interface DynamicControlsProps {
	dynamics: DynamicUnion;
	setDynamics: (value: DynamicUnion) => void;
}

export default function DynamicControls({ dynamics, setDynamics }: DynamicControlsProps) {
	return (
		<span>
			{DYNAMICS.map((elm) => {
				return (
					<button
						key={elm}
						className={"button min-w-[2rem] w-[4rem] h-[2.5rem] " + (dynamics === elm ? ` active-font-${elm}` : "")}
						onClick={() => setDynamics(elm)}
					>
						{elm}
					</button>
				);
			})}
		</span>
	);
}
