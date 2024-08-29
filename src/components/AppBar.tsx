import { signOut } from "./Auth"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/papers'} className="flex flex-col justify-center cursor-pointer">
                IIITK
        </Link>
        <div className="grid grid-cols-2">
            <div>
                <Link to={`/publish`}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Add Blog</button>
                </Link>
            </div>
            <div className="flex justify-end">
                {signOut()} 
            </div>
        </div>
    </div>
}