import { Grid } from "@/app/page";

// export interface PatternProps {
//     key: number;
//     id: number;
// }

// export interface SavePatternProps {
//     id: number;
//     numberOfSteps: number;
//     meter: "triple" | "quadruple";
//     bpm: number;
//     grid: Grid | null;
// }

// Storage.prototype.setObj = function (key: string, obj: Object) {
//     return this.setItem(key, JSON.stringify(obj));
// };

// Storage.prototype.getObj = function (key: string | null) {
//     if (key) return JSON.parse(this.getItem(key));
// };

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
