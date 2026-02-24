'use client';

import React, { useEffect, useState } from 'react';
import { Article } from '@/types/article';
import { initialArticles } from '@/data/initialArticle';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import Header from '@/components/organism/Header';
import SearchInput from '@/components/atoms/SearchInput';
import AsidePanel from '@/components/organism/AsidePanel';
import Button from '@/components/atoms/Buttons';
import ActionMenu from '@/components/molecules/ActionMenu';
import TablePagination from '@/components/molecules/TablePagination';

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
            <div className="flex flex-col md:flex-row items-center bg-white border-b border-gray-200 w-full">
                <div className="w-full md:basis-1/4 py-4 px-6 md:px-8 flex justify-start items-center">
                    <Header />
                </div>
                <div className="w-full md:basis-3/4 py-4 px-6 md:px-8 flex items-center border-t md:border-t-0 border-gray-100">
                    <SearchInput
                        value={searchText}
                        onChange={(e: any) => setSearchText(e.target.value)}
                        placeholder="Search"
                    />
                </div>
            </div>

            <div className="flex-1 w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-5 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Articles</h1>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-300 p-2.5 rounded-md text-gray-700 bg-white w-full sm:w-48 focus:outline-none focus:border-blue-400"
                        >
                            <option value="all">All</option>
                            <option value="published">Published</option>
                            <option value="unpublished">Unpublished</option>
                        </select>

                        <div className="w-full sm:w-auto">
                            <Button onClick={openNewArticle}>+ ADD ARTICLE</Button>
                        </div>
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