import { Grid } from "@/app/page";

interface PatternProps {
    key: number;
    id: number;
}

interface SavePatternProps {
    id: string;
    numberOfSteps: string;
    meter: "triple" | "quadruple";
    bpm: string;
    grid: Grid;
}

// const handleSavePattern = ({ id, numberOfSteps, meter, bpm, grid }: SavePatternProps) => {
//     if (!grid) return;

//     const patternKey: string = "Pattern" + id.toString();
//     const patternValue: Object[] = [
//         { id: id.toString() },
//         { numberOfSteps: numberOfSteps.toString() },
//         { meter: meter.toString() },
//         { bpm: bpm.toString() },
//         { grid: grid.toString() },
//     ];
//     localStorage.setItem(patternKey, JSON.stringify(patternValue));
// };

// export const handleLoadPattern = (id: number) => {
//     const patternKey: string = "Pattern" + id.toString();
//     const item = localStorage.getItem(patternKey);
//     if (item) {
//         const x = JSON.parse(item);
//         return x;
//     }
// };

// export const PatternButton = ({ id, key }: PatternProps) => {
//     return (
//         <div>
//             <p>
//                 <button key={key} className="button savepattern" onClick={() => handleSavePattern(id)}>
//                     Save <b>({id})</b>
//                 </button>
//             </p>
//             <p>
//                 <button key={key} className="button savepattern" onClick={() => handleLoadPattern(id)}>
//                     Load <b>({id})</b>
//                 </button>
//             </p>
//         </div>
//     );
// };
