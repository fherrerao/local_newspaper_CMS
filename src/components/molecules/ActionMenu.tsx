'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ActionMenu({ onView, onEdit, onDelete }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  
  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    setIsOpen(false);
    action();
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>      
      <button 
        onClick={handleToggle} 
        className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <ul className="py-1">
            <li 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 flex items-center gap-2" 
              onClick={(e) => handleAction(e, onView)}
            >
              View
            </li>
            <li 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 flex items-center gap-2" 
              onClick={(e) => handleAction(e, onEdit)}
            >
              Edit
            </li>
            <li 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-red-600 flex items-center gap-2" 
              onClick={(e) => handleAction(e, onDelete)}
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}