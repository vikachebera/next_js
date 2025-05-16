import { notFound } from "next/navigation";

type Article = {
    id: number;
    userId: number;
    title: string;
    body: string;
};

type Comment = {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
};

type Params = {
    params: {
        id: string;
    };
};

export const revalidate = 3600;

async function getArticle(id: number): Promise<Article | null> {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch article:', error);
        return null;
    }
}

async function getComments(id: number): Promise<Comment[]> {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        if (!res.ok) return [];
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        return [];
    }
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
    return Array.from({ length: 10 }, (_, i) => ({
        id: (i + 1).toString(),
    }));
}

export default async function ArticlePage({ params }: Params) {
    const articleId = Number(params.id);
    if (isNaN(articleId)) return notFound();

    const [article, comments] = await Promise.all([
        getArticle(articleId),
        getComments(articleId)
    ]);

    if (!article) return notFound();

    return (
        <div className="article-container max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-700 mb-8">{article.body}</p>

            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            {comments.length > 0 ? (
                <ul className="space-y-4">
                    {comments.map((comment) => (
                        <li key={comment.id} className="border-b pb-4">
                            <strong className="block">{comment.name}</strong>
                            <span className="text-sm text-gray-500">{comment.email}</span>
                            <p className="mt-2">{comment.body}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No comments found.</p>
            )}
        </div>
    );
}