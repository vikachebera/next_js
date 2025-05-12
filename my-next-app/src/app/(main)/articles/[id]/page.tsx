import { notFound } from "next/navigation";
import { Comment } from "./comment";
import { Article } from "@/app/(main)/articles/[id]/article";

export async function generateStaticParams() {
    return Array.from({ length: 10 }, (_, i) => ({
        id: (i + 1).toString(),
    }));
}

export default async function ArticlePage({
                                              params,
                                          }: {
    params: { id: string };
}) {
    if (!params?.id) {
        return notFound();
    }

    const articleId = Number(params.id);
    if (isNaN(articleId)) {
        return notFound();
    }

    const [article, comments] = await Promise.all([
        getArticle(articleId),
        getComments(articleId),
    ]);

    if (!article) return notFound();

    return (
        <div className="article-container">
            <h1>{article.title}</h1>
            <p>{article.body}</p>

            <h2>Comments</h2>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id} style={{ marginBottom: "10px" }}>
                            <strong>{comment.name}</strong> ({comment.email}):<br />
                            {comment.body}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments found.</p>
            )}
        </div>
    );
}

async function getArticle(id: number): Promise<Article | null> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) return null;
    return res.json();
}

async function getComments(id: number): Promise<Comment[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    return res.json();
}