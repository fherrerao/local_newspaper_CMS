'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/data/menuItems';

const Sidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#424242] text-white rounded-md shadow-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (

                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (

                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#424242] text-white min-h-screen flex flex-col transform transition-transform duration-300 ease-in-out 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="p-6 border-b border-gray-700 flex justify-center items-center h-20">
                    <Image
                        src="/assets/logo.png"
                        alt="Senirop Logo"
                        width={300}
                        height={200}
                        priority
                    />
                </div>

                <nav className="flex-1 p-4">
                    <ul className="flex flex-col gap-2">
                        {menuItems.map(item => {
                            const isActive = pathname === item.path;
                            return (

                                <Link key={item.name} href={item.path} onClick={() => setIsOpen(false)}>
                                    <li
                                        className={`p-3 hover:bg-gray-800 rounded-md cursor-pointer transition-colors ${isActive ? 'text-white font-bold bg-gray-700' : 'text-gray-300'}`}
                                    >
                                        {item.name}
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-700 bg-[#15012E] cursor-pointer text-center hover:bg-opacity-80 transition-colors">
                    <span className="text-sm font-medium">Logout</span>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;