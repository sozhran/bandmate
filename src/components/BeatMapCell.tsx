import { GridRow, Meter } from "@/data/interfaces";

interface BeatMapCellProps {
	rowData: GridRow;
	rowIndex: number;
	cellIndex: number;
	meter: Meter;
	toggleNote: (i: number, rowIndex: number) => void;
}

export default function BeatMapCell({ rowData, rowIndex, cellIndex, meter, toggleNote }: BeatMapCellProps) {
	return (
		<button
			key={cellIndex}
			className={
				(rowData.rowSteps[cellIndex] !== null ? "note active-" + `${rowData.rowSteps[cellIndex]}` : "note inactive") + " " + `${meter}`
			}
			onClick={() => toggleNote(cellIndex, rowIndex)}
		>
			<span className="opacity-50">{rowData.rowSteps[cellIndex] ? rowData.rowSteps[cellIndex] : ""}</span>
		</button>
	);
}
