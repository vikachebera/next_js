"use client"
import {signin} from "@/app/actions/auth";
import {useActionState} from 'react'
import {FormState} from "@/app/lib/definitions";
import Link from "next/link";


export default function SignIn() {
    const [state, action, pending] = useActionState<FormState, FormData>(signin, {errors: {}});

    return (
        <div className=" flex  flex-col justify-center items-center max-w-full m-5 p-5">
        <form action={action} className="bg-white mx-auto p-6 rounded-lg shadow  w-3/6">
            <h2 className="text-xl font-semibold mb-4  items-center">Увійти</h2>

            {state?.errors?.name && state.errors.name.map((error: string, i: number) => (
                <p key={i} className="text-red-500 text-sm">{error}</p>
            ))}


            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}


            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Пароль <span className="text-red-500">*</span>
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    minLength={6}
                />
            </div>
            {state?.errors?.password && (
                <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error: string) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button
                disabled={Boolean(pending)}
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 mt-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
            >
                Увійти
            </button>
        </form>
            <Link
                href="/api/auth/signin/google"
                className="mt-6 flex items-center justify-center bg-white border border-gray-300 rounded-full w-1/5 py-2 px-4 shadow hover:shadow-md transition text-sm"
            >
                <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google Logo"
                    width={20}
                    height={20}
                    className="mr-2"
                />
                Sign in with Google
            </Link>
            <Link
                href="/api/auth/signin/github"
                className="mt-6 flex items-center justify-center bg-white border border-gray-300 rounded-full w-1/5 py-2 px-4 shadow hover:shadow-md transition text-sm"
            >
                <img
                    // src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="GitHub Logo"
                    width={20}
                    height={20}
                    className="mr-2"
                />
                Sign in with GitHub
            </Link>        </div>
    )
}
