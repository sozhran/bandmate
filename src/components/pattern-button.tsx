import handleSavePattern from "@/app/page";
import handleLoadPattern from "@/app/page";

export interface PatternProps {
    id: number;
}
const PatternButton = ({ id }: PatternProps) => {
    return (
        <p>
            <button className="button savepattern" onClick={() => handleSavePattern}>
                Save <b>({id})</b>
            </button>
            <button className="button savepattern" onClick={() => handleLoadPattern}>
                Load <b>({id})</b>
            </button>
        </p>
    );
};

export default PatternButton;
