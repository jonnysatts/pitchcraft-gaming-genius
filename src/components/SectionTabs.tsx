
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { NarrativeSection } from '@/types/narrative';

interface SectionTabsProps {
  sections: NarrativeSection[];
}

const SectionTabs: React.FC<SectionTabsProps> = ({ sections }) => {
  return (
    <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
      {sections.map((section, index) => (
        <TabsTrigger 
          key={section.id} 
          value={section.id}
          className={cn(
            "flex items-center gap-2",
            section.isCompleted ? "text-games-blue" : ""
          )}
        >
          <span 
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
              section.isCompleted 
                ? "bg-games-blue/10 text-games-blue" 
                : "bg-games-slate text-games-navy/70"
            )}
          >
            {section.isCompleted ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              index + 1
            )}
          </span>
          <span className="hidden md:inline">{section.title.split(' ')[0]}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default SectionTabs;
