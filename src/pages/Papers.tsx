import { Appbar } from "../components/AppBar";
import { PaperCard } from "../components/PaperCard";
import { PaperSkeleton } from "../components/paperSkeleton";
import { usePapers } from "../hooks";

export const Papers = () => {
    const { loading, papers } = usePapers();

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div>
                        <PaperSkeleton />
                        <PaperSkeleton />
                        <PaperSkeleton />
                        <PaperSkeleton />
                        <PaperSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    {Array.isArray(papers) && papers.length > 0 ? (
                        papers.map((paper) => (
                            <PaperCard
                                key={paper.id}
                                id={paper.id}
                                authorName={paper.author.name || "Anonymous"}
                                title={paper.title}
                                content={paper.content}
                                publishedDate={"2nd Feb 2024"}
                            />
                        ))
                    ) : (
                        <div>No papers available</div>
                    )}
                </div>
            </div>
        </div>
    );
};
