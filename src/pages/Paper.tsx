
import { Appbar } from "../components/AppBar";
import { FullPaper } from "../components/fullPaper";
import { Spinner } from "../components/spinner";
import { usePaper } from "../hooks";
import {useParams} from "react-router-dom";

// atomFamilies/selectorFamilies
export const Paper = () => {
    const { id } = useParams();
    const {loading, paper} = usePaper({
        id: id || ""
    });

    if (loading || !paper) {
        return <div>
            <Appbar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return <div>
        <FullPaper paper={paper} />
    </div>
}