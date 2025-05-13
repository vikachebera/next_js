'use client'
import { useState, useEffect } from "react";

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

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password')
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error('Failed to create users');

            const data = await res.json();
            console.log('User created:', data);

            // Optimistic update instead of refetching all users
            setUsers(prev => [...prev, data]);

            form.reset();
        } catch (err) {
            console.error('Creation error:', err);
            setError(err instanceof Error ? err.message : 'Failed to create users');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="mb-8 p-6 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4">Список користувачів</h1>
                {loading ? (
                    <p className="text-gray-500">Завантаження...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : users.length === 0 ? (
                    <p className="text-gray-500">Користувачі не знайдені</p>
                ) : (
                    <ul className="space-y-4">
                        {users.map((user) => (
                            <li key={user.id} className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                <p><strong className="font-medium">Ім'я:</strong> {user.name}</p>
                                <p><strong className="font-medium">Email:</strong> {user.email}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <form onSubmit={createUser} className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Додати нового користувача</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Ім'я <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            minLength={2}
                        />
                    </div>

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

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Пароль <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Обробка...' : 'Створити користувача'}
                    </button>
                </div>
            </form>
        </div>
    );
}