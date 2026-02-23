'use client';

import React, { useEffect, useState } from 'react';
import { Article } from '@/types/article';
import { initialArticles } from '@/data/initialArticle';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import Header from '@/components/organism/Header';
import SearchInput from '@/components/atoms/SearchInput';
import AsidePanel from '@/components/organism/AsidePanel';
import Button from '@/components/atoms/Buttons';
import ActionMenu from '@/components/atoms/ActionMenu';
import TablePagination from '@/components/atoms/TablePagination';

const Home = () => {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('all');

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchText, filter]);

    const filteredArticles = articles.filter((article) => {
        const matchText = article.headline.toLowerCase().includes(searchText.toLowerCase());
        const matchFilter = filter === 'all'
            ? true
            : filter === 'published' ? article.published : !article.published;
        return matchText && matchFilter;
    });

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedArticles = filteredArticles.slice(startIndex, startIndex + rowsPerPage);

    const handleTogglePublish = (id: string) => {
        const newArticles = articles.map(art => {
            if (art.id === id) {
                return { ...art, published: !art.published };
            }
            return art;
        });
        setArticles(newArticles);
    };

    const handleSaveArticle = (newArticleData: Article) => {
        if (selectedArticle && isEditing) {
            const updatedList = articles.map(art => art.id === newArticleData.id ? newArticleData : art);
            setArticles(updatedList);
        } else {
            setArticles([...articles, newArticleData]);
        }
        setIsPanelOpen(false);
    };

    const openNewArticle = () => {
        setSelectedArticle(null);
        setIsEditing(true);
        setIsPanelOpen(true);
    };

    const openViewArticle = (article: Article) => {
        setSelectedArticle(article);
        setIsEditing(false);
        setIsPanelOpen(true);
    };

    const openEditArticle = (article: Article) => {
        setSelectedArticle(article);
        setIsEditing(true);
        setIsPanelOpen(true);
    };

    const handleDeleteArticle = (id: string) => {
        const updatedList = articles.filter(art => art.id !== id);
        setArticles(updatedList);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex flex-col md:flex-row items-center justify-between bg-white border-b border-gray-200 py-3 px-4 md:px-8 gap-4 md:gap-0">
                <div className="w-full md:basis-1/4 flex justify-center md:justify-start">
                    <Header />
                </div>
                <div className="w-full md:basis-3/4 flex justify-center md:justify-end">
                    <div className="w-full max-w-lg">
                        <SearchInput value={searchText} onChange={(e: any) => setSearchText(e.target.value)} placeholder="Search..." />
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                    <h1 className="text-2xl font-bold text-black">Articles</h1>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border p-2 rounded text-black border-gray-300 w-full sm:w-auto"
                        >
                            <option value="all">All</option>
                            <option value="published">Published</option>
                            <option value="unpublished">Unpublished</option>
                        </select>
                        <Button onClick={openNewArticle}>+ ADD ARTICLE</Button>
                    </div>
                </div>

                <div className="bg-white shadow rounded overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-black min-w-[800px]">
                            <thead>
                                <tr className="border-b bg-gray-50 text-left border-gray-300">
                                    <th className="p-5 font-semibold">Article Headline</th>
                                    <th className="p-5 font-semibold">Author</th>
                                    <th className="p-5 font-semibold">Publish Date</th>
                                    <th className="p-5 font-semibold text-center">Published</th>
                                    <th className="p-5"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedArticles.map((article) => (
                                    <tr
                                        key={article.id}
                                        onClick={() => openViewArticle(article)}
                                        className="border-b hover:bg-gray-100 cursor-pointer border-gray-300 bg-white transition-colors"
                                    >
                                        <td className="p-5">{article.headline}</td>
                                        <td className="p-5">{article.author}</td>
                                        <td className="p-5 whitespace-nowrap">{article.publishDate}</td>
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
                                        <td className="p-4 text-right">
                                            <ActionMenu
                                                onView={() => openViewArticle(article)}
                                                onEdit={() => openEditArticle(article)}
                                                onDelete={() => handleDeleteArticle(article.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {paginatedArticles.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            No articles found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <TablePagination
                        totalCount={filteredArticles.length}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        onPageChange={setCurrentPage}
                        onRowsPerPageChange={(newRows) => {
                            setRowsPerPage(newRows);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            <AsidePanel
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                article={selectedArticle}
                isEditing={isEditing}
                onEditClick={() => setIsEditing(true)}
                onSave={handleSaveArticle}
            />
        </div>
    );
}

export default Home;