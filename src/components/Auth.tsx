import { SignupInput } from "@devesharya/medium-common";
import axios from "axios";
import { ChangeEvent, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./config";
import _ from "lodash";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });

    const debouncedSetInputs = useCallback(
        _.debounce((newInputs: Partial<SignupInput>) => {
            setPostInputs((prevInputs: any) => ({
                ...prevInputs,
                ...newInputs,
            }));
        }, 500), // 500ms debounce time
        []
    );

    const handleInputChange = (field: keyof SignupInput) => (e: ChangeEvent<HTMLInputElement>) => {
        debouncedSetInputs({ [field]: e.target.value });
    };

    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs
            );
            const jwt = response.data;
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
                    <div className="pt-5">
                        {type === "signup" ? (
                            <LabeledInput label="Name" placeholder="your name" onChange={handleInputChange("name")} />
                        ) : null}
                    </div>
                    <div className="pt-5">
                        <LabeledInput label="Email" placeholder="your email" onChange={handleInputChange("email")} />
                    </div>
                    <div className="pt-5">
                        <Labeledpassword label="Password" placeholder="********" onChange={handleInputChange("password")} />
                        <button
                            onClick={sendRequest}
                            type="button"
                            className="mt-8 w-full text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
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
