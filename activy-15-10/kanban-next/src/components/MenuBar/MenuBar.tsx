'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const MenuBar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-800">
          Kanban Board
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/kanban">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
            Quadro
          </Button>
        </Link>
        
        <Link href="/criar-tarefa">
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Nova Tarefa
          </Button>
        </Link>
      </div>
    </nav>
  );
};