'use client';
import path from 'path';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { menuItems } from '@/data/menuItems';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Articles');
    const pathname = usePathname();
   

    return (
        <aside className="w-64 bg-[#424242] text-white min-h-screen flex flex-col">
            <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold tracking-wider">Senirop</h2>
            </div>

            <nav className="flex-1 p-4">
                <ul className="flex flex-col gap-2">
                    {menuItems.map(item => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.name} href={item.path}>
                                <li
                                    className={`p-3 hover:bg-gray-800 rounded-md cursor-pointer transition-colors ${isActive ? 'text-white font-bold' : 'text-gray-300'}`}
                                >
                                    {item.name}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-700 bg-[#15012E] cursor-pointer text-center">
                <span className="text-sm font-medium">Logout</span>
            </div>
        </aside>
    );
}

export default Sidebar;