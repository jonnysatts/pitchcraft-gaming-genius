import React, { useState } from 'react';
import Button from './ui/Button';
import { cn } from '@/lib/utils';

interface NarrativeSection {
  id: string;
  title: string;
  description: string;
  content: string;
  isCompleted: boolean;
}

interface NarrativeBuilderProps {
  onComplete: (sections: NarrativeSection[]) => void;
  onBack: () => void;
}

const NarrativeBuilder = ({ onComplete, onBack }: NarrativeBuilderProps) => {
  const initialSections: NarrativeSection[] = [
    {
      id: 'revolution',
      title: 'Gaming Revolution Context',
      description: 'Establish why gaming is relevant to the client\'s business and audience.',
      content: '',
      isCompleted: false,
    },
    {
      id: 'landscape',
      title: 'Client\'s Current Landscape',
      description: 'Analyze current market position, challenges, and opportunities.',
      content: '',
      isCompleted: false,
    },
    {
      id: 'insight',
      title: 'Gaming Cultural Insight',
      description: 'Share a specific cultural insight about gaming relevant to the client.',
      content: '',
      isCompleted: false,
    },
    {
      id: 'solution',
      title: 'Strategic Solution Path',
      description: 'Outline how gaming can solve business challenges.',
      content: '',
      isCompleted: false,
    },
    {
      id: 'vision',
      title: 'Tangible Vision',
      description: 'Paint a picture of what success looks like.',
      content: '',
      isCompleted: false,
    },
    {
      id: 'proof',
      title: 'Proof of Concept',
      description: 'Share examples or case studies that prove your approach works.',
      content: '',
      isCompleted: false,
    },
  ];
  
  const [sections, setSections] = useState<NarrativeSection[]>(initialSections);
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  
  const handleContentChange = (id: string, content: string) => {
    setSections(sections.map(section => 
      section.id === id ? { 
        ...section, 
        content, 
        isCompleted: content.trim().length > 0 
      } : section
    ));
  };
  
  const currentSectionIndex = sections.findIndex(s => s.id === activeSection);
  const currentSection = sections[currentSectionIndex];
  
  const navigateToSection = (id: string) => {
    setActiveSection(id);
  };
  
  const navigateToNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setActiveSection(sections[currentSectionIndex + 1].id);
    }
  };
  
  const navigateToPrevious = () => {
    if (currentSectionIndex > 0) {
      setActiveSection(sections[currentSectionIndex - 1].id);
    }
  };
  
  const completedSections = sections.filter(s => s.isCompleted).length;
  const progress = (completedSections / sections.length) * 100;
  
  const handleSubmit = () => {
    onComplete(sections);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-10 flex flex-col animate-enter">
      <div className="max-w-5xl w-full mx-auto px-8 flex-1 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-medium text-games-navy">
              Strategic Narrative
            </h1>
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
          </div>
          <p className="text-lg text-games-navy/70 mt-2">
            Develop the strategic narrative for your gaming pitch deck.
          </p>
        </div>
        
        <div className="flex gap-8 flex-1">
          <div className="w-64 shrink-0">
            <div className="glass-panel rounded-xl p-4 sticky top-28">
              <h3 className="font-medium text-games-navy mb-4">Narrative Sections</h3>
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => navigateToSection(section.id)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center",
                      activeSection === section.id 
                        ? "bg-games-blue text-white" 
                        : "hover:bg-games-slate text-games-navy"
                    )}
                  >
                    <div 
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 shrink-0",
                        activeSection === section.id 
                          ? "bg-white text-games-blue" 
                          : section.isCompleted 
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
                    </div>
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="glass-panel rounded-xl p-6 h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-medium text-games-navy">
                  {currentSection.title}
                </h2>
                <p className="text-games-navy/70 mt-1">
                  {currentSection.description}
                </p>
              </div>
              
              <div className="flex-1">
                <textarea
                  value={currentSection.content}
                  onChange={(e) => handleContentChange(currentSection.id, e.target.value)}
                  placeholder="Enter your content here..."
                  className="w-full h-full min-h-[300px] p-4 rounded-lg border border-games-silver focus:border-games-blue focus:outline-none focus:ring-1 focus:ring-games-blue/20 transition-all resize-none"
                ></textarea>
              </div>
              
              <div className="flex justify-between mt-6">
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={navigateToPrevious}
                    disabled={currentSectionIndex === 0}
                    leftIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                      </svg>
                    }
                  >
                    Previous
                  </Button>
                  
                  <Button
                    onClick={navigateToNext}
                    disabled={currentSectionIndex === sections.length - 1}
                    rightIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    }
                  >
                    Next
                  </Button>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={onBack}
                  >
                    Back
                  </Button>
                  
                  <Button
                    onClick={handleSubmit}
                    disabled={completedSections < sections.length}
                  >
                    Create Slides
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NarrativeBuilder;
