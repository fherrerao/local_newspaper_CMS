'use client';
import { useEffect, useState } from "react";

interface Article {
    id: string;
    headline: string;
    author: string;
    publishDate: string;
    image: string;
    body: string;
    published: boolean;
}

const LiveSitePage = () => {
    const [storedArticle, setStoredArticle] = useState<Article | null>(null);

    useEffect(() => {
        const storedArticle = localStorage.getItem('selectedArticle');
        if (storedArticle) {
            const parsedArticle = JSON.parse(storedArticle);
            console.log('Parsed Article:', parsedArticle);
            setStoredArticle(parsedArticle);
        }
    }, []);

    return (
        <div className="p-4">
            <p className="text-2xl font-bold mb-4 text-gray-800">{storedArticle?.publishDate}</p>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{storedArticle?.headline}</h1>
            <p className="text-lg text-gray-600 mb-4">{storedArticle?.body}</p>
        </div>
    );
};

export default LiveSitePage;