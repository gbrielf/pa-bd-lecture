'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const MenuBar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-2 bg-[#112F41] border-b border-white shadow-sm">
      <div className="flex items-center space-x-4">
        <img src="/images/kanban-plan.png" alt="Kanban Plan" className="h-14 w-14" />
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/kanban">
          <Button variant="outline" className="bg-white text-gray-600 hover:text-gray-800 border-transparent hover:border-gray-300">
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