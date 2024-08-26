import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="rounded-md p-4">
            <Auth type={"signup"} />
        </div>
        <div className="hidden md:block">
            <Quote />
        </div>
        
    </div>
}