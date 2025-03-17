"use client";

import {Suspense, useEffect, useState} from "react";
import Loading from "@/app/(main)/loading";
import Link from 'next/link';

interface Article {
    id: number;
    title: string;
    body: string;
    userId: number;
}

function ArticlesList() {
    const [data, setData] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch articles");
                return res.json();
            })
            .then((data: Article[]) => {
                setData(data);
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <Loading/>;
    if (error) return <div className="p-4 bg-red-100 rounded">Error: {error}</div>;

    return (
        <ul className="space-y-2">
            {data.map((article) => (
                <li key={article.id} className="p-3 border rounded hover:bg-gray-50">
                    <Link href={`/articles/${article.id}`} className="block">
                        <h2 className="font-medium">{article.title}</h2>
                        <p className="text-sm text-gray-600 mt-1">{article.body.substring(0, 100)}...</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default function ArticlePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Articles</h1>
            <div className="mb-6">
                <Link href="/articles/favorite" className="text-blue-500 hover:underline">
                    View favorite articles
                </Link>
            </div>
            <Suspense fallback={<Loading/>}>
                <ArticlesList/>
            </Suspense>
        </div>
    );
}