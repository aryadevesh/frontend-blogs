import { SignupInput } from "@devesharya/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./config";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });

    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs
            );
            const jwt = response.data;
            console.log(jwt);
            localStorage.setItem("token", jwt);
            navigate("/papers");
        } catch (e) {
            alert(`Error while ${type === "signup" ? "signing up" : "signing in, Incorrect password"}`);
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="box-border border-2 border-yellow-500 rounded-lg p-8 flex justify-center">
                <div>
                    <div className="text-3xl font-extrabold">
                        {type === "signup" ? "Create an account" : "Login to your account"}
                    </div>
                    <div className="text-slate-400">
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signup" ? "Sign in" : "Sign up"}
                        </Link>
                    </div>
                    <div className="pt-8">
                    {type === "signup" ? <LabeledInput label="Name" placeholder="Devesh" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LabeledInput label="email" placeholder="xyz@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <Labeledpassword label="Password" placeholder="123456" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
                </div>
            </div>
        </div>
    );
};

interface LabeledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabeledInput({ label, placeholder, onChange }: LabeledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{label}</label>
            <input
                onChange={onChange}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

function Labeledpassword({ label, placeholder, onChange }: LabeledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{label}</label>
            <input
                onChange={onChange}
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

export const signOut = () => {
    const navigate = useNavigate();

    function handleSignOut() {
        // Remove the JWT token from localStorage
        localStorage.removeItem("token");

        // Redirect to the sign-in page
        navigate("/signin");
    }

    return (
        <button onClick={handleSignOut} className="mr-4 text-black bg-yellow-400 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
            Sign Out
        </button>
    );
};
