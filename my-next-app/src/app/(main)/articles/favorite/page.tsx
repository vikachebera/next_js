import FavoriteArticle from "@/components/Articles/FavoriteArticle";
export default function FavoriteArticlePage() {
    const idNum = [1, 3, 5]; // ID статей

    return (
        <div>
            <h1>Favorite Articles</h1>
            {idNum.map((id) => (
                <FavoriteArticle key={id} id={id} />
            ))}
        </div>
    );
}