import handleSavePattern from "@/app/page";
import handleLoadPattern from "@/app/page";

export interface PatternProps {
    id: number;
}
const PatternButton = ({ id }: PatternProps) => {
    return (
        <div>
            <p>
                <button className="button savepattern" onClick={() => handleSavePattern}>
                    Save <b>({id})</b>
                </button>
            </p>
            <p>
                <button className="button savepattern" onClick={() => handleLoadPattern}>
                    Load <b>({id})</b>
                </button>
            </p>
        </div>
    );
};

export default PatternButton;
