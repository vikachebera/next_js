'use client'
import { useEffect, useState } from "react";

export default function SettingsPage() {
    const [email, setEmail] = useState('');

    const login = process.env.USER_LOGIN;
    const password = process.env.USER_PASSWORD;

    console.log("Login (server):", login);
    console.log("Password (server):", password);

    useEffect(() => {
        setEmail(process.env.NEXT_PUBLIC_USER_EMAIL || '');
        console.log("Email (browser):", process.env.NEXT_PUBLIC_USER_EMAIL);
    }, []);


    return (
        <div>
            <h1>Profile Settings</h1>
            <p>User email: {email}</p>
            <p>Manage your profile settings here.</p>
        </div>
    );
}
