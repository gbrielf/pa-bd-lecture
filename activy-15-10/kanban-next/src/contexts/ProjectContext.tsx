'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Projeto } from '@/types/projeto.interface';

interface ProjectContextType {
  selectedProjeto: Projeto | null;
  setSelectedProjeto: (projeto: Projeto | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null);

  return (
    <ProjectContext.Provider value={{ selectedProjeto, setSelectedProjeto }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};