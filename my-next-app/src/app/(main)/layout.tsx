import { ReactNode } from "react";
import "../globals.css";
import Menu from "../../components/Menu/Menu";


export default function MainLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
        <Menu/>
            <main className="container flex justify-center items-center   w-4/5 p-4">
                {children}
            </main>
        </div>


    )
        ;
}
