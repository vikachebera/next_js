"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Container } from "@mui/material";

interface Article {
    id: number;
    title: string;
    body: string;
}

const FavoriteArticle = ({ id }: { id: number }) => {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setArticle(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching article:", err);
                setLoading(false);
            });
    }, [id]);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">{article?.title}</Typography>
                        <Typography variant="body1">{article?.body}</Typography>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default FavoriteArticle;
