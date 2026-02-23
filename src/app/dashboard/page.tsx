'use client';

import React, { useState } from 'react';
import { Article } from '@/types/article';
import { initialArticles } from '@/data/initialArticle';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import Header from '@/components/organism/Header';
import SearchInput from '@/components/atoms/SearchInput';

const Home = () => {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredArticles = articles.filter((article) => {
        const matchText = article.headline.toLowerCase().includes(searchText.toLowerCase());
        const matchFilter = filter === 'all'
            ? true
            : filter === 'published' ? article.published : !article.published;
        return matchText && matchFilter;
    });

    const handleTogglePublish = (id: string) => {
        const newArticles = articles.map(art => {
            if (art.id === id) {
                return { ...art, published: !art.published };
            }
            return art;
        });
        setArticles(newArticles);
    };

    return (
        <div>
            <div className="flex items-center justify-center bg-white border-b border-gray-200 py-3">
                <div className="basis-1/4">
                    <Header />
                </div>
                <div className="basis-3/4">
                    <SearchInput value={searchText} onChange={(e: any) => setSearchText(e.target.value)} placeholder="Search..." />
                </div>
            </div>
            <div className="mx-auto bg-gray-100 py-3 px-6 shadow rounded">
                <h1 className="text-2xl font-bold mr-auto text-black">Articles</h1>
                <div className="flex gap-4 py-4 items-center">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2 rounded text-black border-gray-300"
                    >
                        <option value="all">All</option>
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                    </select>
                </div>

                <table className="w-full border-collapse text-black">
                    <thead>
                        <tr className="border bg-white text-left border-gray-400">
                            <th className="p-5">Article Headline</th>
                            <th className="p-5">Author</th>
                            <th className="p-5">Publish Date</th>
                            <th className="p-5 text-center">Published</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArticles.map((article) => (
                            <tr
                                key={article.id}
                                onClick={() => { }}
                                className="border hover:bg-gray-100 cursor-pointer border-gray-400"
                            >
                                <td className="p-5">{article.headline}</td>
                                <td className="p-5">{article.author}</td>
                                <td className="p-5">{article.publishDate}</td>
                                <td className="p-5">
                                    <div className="flex justify-center">
                                        <ToggleSwitch
                                            isOn={article.published}
                                            onToggle={(e: any) => {
                                                e.stopPropagation();
                                                handleTogglePublish(article.id);
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;