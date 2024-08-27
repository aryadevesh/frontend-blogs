
import { Appbar } from "../components/AppBar";
import { PaperCard } from "../components/PaperCard";
import { PaperSkeleton } from "../components/paperSkeleton";
import { usePapers } from "../hooks";

export const Papers = () => {
    const { loading, papers } = usePapers();

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <PaperSkeleton />
                    <PaperSkeleton />
                    <PaperSkeleton />
                    <PaperSkeleton />
                    <PaperSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                {papers.map(papers => <PaperCard
                    id={papers.id}
                    authorName={papers.author.name || "Anonymous"}
                    title={papers.title}
                    content={papers.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}