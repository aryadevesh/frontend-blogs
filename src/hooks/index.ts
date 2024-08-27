import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../components/config";


export interface Paper {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const usePaper = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [paper, setPaper] = useState<Paper>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/paper/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setPaper(response.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        paper
    }

}
export const usePapers = () => {
    const [loading, setLoading] = useState(true);
    const [papers, setPapers] = useState<Paper[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setPapers(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        papers
    }
}