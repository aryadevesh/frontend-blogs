import { Appbar } from "../components/AppBar"
import { PaperCard } from "../components/PaperCard"

export const Papers = () => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="max-w-xl">
                <PaperCard 
                    authorName = {"Devesh"}
                    title = {"DBMS"}
                    content = {"Hey this is the question paper of Database Management System: factulty advisor: Praneetha Shree"}
                    publishedDate = {"11/12/13"}
                    id =  {1}
                />
            </div>
        </div>
    </div>
}