export async function generateStaticParams(): Promise<{ id: string }[]> {
    return Array.from({ length: 10 }, (_, i) => ({
        id: (i + 1).toString(),
    }));
}