export default async function ArticlePage({
                                              params,
                                          }: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;

    if (!resolvedParams?.id) {
        return notFound();
    }

    const articleId = Number(resolvedParams.id);
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
