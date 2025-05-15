import Link from "next/link";

export default function Header() {
    return (
        <header
            className="header w-full bg-gray-100 dark:bg-dark transition-all duration-500 ease-in-out flex items-center justify-end py-4 px-6">
            <div className="flex space-x-4">
                <Link
                    href="/signup"
                    className="px-4 py-2 rounded-custom transition-colors duration-300 text-white bg-blue-400"
                >
                    Sign up
                </Link>
                <Link
                    href="#"
                    className="px-4 py-2 rounded-custom transition-colors duration-300 text-white bg-blue-400"
                >
                    Sign in
                </Link>
            </div>
        </header>
    );
}
