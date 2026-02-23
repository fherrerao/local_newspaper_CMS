'use client';

import React, { useState } from 'react';
import ToggleSwitch from '../components/atoms/ToggleSwitch';
import { Article } from '@/types/article';
import Button from '@/components/atoms/Buttons';
import { initialArticles } from '@/data/initialArticle';
import Sidebar from '@/components/organism/Sidebar';

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
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mx-auto bg-white p-6 shadow rounded">
                <div className="flex gap-4 mb-6 items-center">
                    <h1 className="text-2xl font-bold mr-auto text-black">Articles</h1>
                    <input
                        type="text"
                        placeholder="Search headline..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="border p-2 rounded text-black"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2 rounded text-black"
                    >
                        <option value="all">All</option>
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                    </select>
                </div>

                <table className="w-full border-collapse text-black">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="p-3">Headline</th>
                            <th className="p-3">Author</th>
                            <th className="p-3">Date</th>
                            <th className="p-3 text-center">Published</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArticles.map((article) => (
                            <tr
                                key={article.id}
                                onClick={() => { }}
                                className="border-b hover:bg-gray-100 cursor-pointer"
                            >
                                <td className="p-3">{article.headline}</td>
                                <td className="p-3">{article.author}</td>
                                <td className="p-3">{article.publishDate}</td>
                                <td className="p-3 flex justify-center">
                                    <ToggleSwitch
                                        isOn={article.published}
                                        onToggle={(e: any) => {
                                            e.stopPropagation();
                                            handleTogglePublish(article.id);
                                        }}
                                    />
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