'use client'
import {useState, useEffect} from "react";

type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
};

export default function UserPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user');
                if (!res.ok) throw new Error('Failed to fetch users');
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className="mb-8 p-6 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4">Список користувачів</h1>
                {loading ? (
                    <p className="text-gray-500">Завантаження...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : users.length === 0 ? (
                    <p className="text-gray-500">Користувачі не знайдені</p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-6">
                        {users.map((user) => (
                            <li key={user.id}
                                className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                <p><strong className="font-medium">Ім'я:</strong> {user.name}</p>
                                <p><strong className="font-medium">Email:</strong> {user.email}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}