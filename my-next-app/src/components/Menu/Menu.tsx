"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/articles/favorite", label: "Favorite Articles" },
    { href: "/articles/create", label: "Create Article" },
    { href: "/profile/settings", label: "Profile Settings" },
    { href: "/profile/security", label: "Profile Security" },
];


 const Menu=()=>{
    const pathname = usePathname();
    return (
        <nav className="flex flex-col w-1/5 h-dvh gap-custom-2 p-custom-2 bg-gray-100 dark:bg-dark transition-all duration-500 ease-in-out">
            {menuItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`px-custom-1 py-2 rounded-custom transition-colors duration-300  ${
                        pathname === item.href ? " bg-blue-400 text-white" : "bg-gray-300"
                    }`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}
export default Menu;
