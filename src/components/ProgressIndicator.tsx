
import React from 'react';
import { NarrativeSection } from '@/types/narrative';

interface ProgressIndicatorProps {
  sections: NarrativeSection[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ sections }) => {
  const completedSections = sections.filter(s => s.isCompleted).length;
  const progress = (completedSections / sections.length) * 100;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-games-navy">
        {completedSections}/{sections.length} Sections
      </span>
      <div className="w-40 h-2 bg-games-slate rounded-full overflow-hidden">
        <div 
          className="h-full bg-games-blue transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
