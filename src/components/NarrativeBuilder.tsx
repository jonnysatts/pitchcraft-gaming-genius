
import React, { useState } from 'react';
import Button from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { AnalysisResult, NarrativeSection } from '@/types/narrative';
import SectionEditor from './SectionEditor';
import SectionTabs from './SectionTabs';
import ProgressIndicator from './ProgressIndicator';
import { getInitialSections } from '@/utils/contentGenerators';

interface NarrativeBuilderProps {
  onComplete: (sections: NarrativeSection[]) => void;
  onBack: () => void;
  analysis?: AnalysisResult | null;
}

const NarrativeBuilder = ({ analysis = null, onComplete, onBack }: NarrativeBuilderProps) => {
  const { toast } = useToast();
  
  // Initialize sections with content from the analysis
  const [sections, setSections] = useState<NarrativeSection[]>(getInitialSections(analysis));
  const [activeTab, setActiveTab] = useState('gaming-revolution');

  // Update section content
  const updateSectionContent = (id: string, content: string) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, content, isCompleted: content.trim().length > 0 } : section
    ));
  };

  // Navigate between tabs
  const handleNavigate = (direction: 'prev' | 'next') => {
    const currentIndex = sections.findIndex(s => s.id === activeTab);
    if (direction === 'prev' && currentIndex > 0) {
      setActiveTab(sections[currentIndex - 1].id);
    } else if (direction === 'next' && currentIndex < sections.length - 1) {
      setActiveTab(sections[currentIndex + 1].id);
    }
  };

  // Handle completion
  const handleComplete = () => {
    // Check if all sections have content
    const allComplete = sections.every(section => section.isCompleted);
    
    if (!allComplete) {
      toast({
        title: "Incomplete narrative",
        description: "Please complete all sections before proceeding",
        variant: "destructive"
      });
      return;
    }
    
    onComplete(sections);
  };

  // Find the current section's position
  const currentIndex = sections.findIndex(s => s.id === activeTab);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sections.length - 1;

  return (
    <div className="min-h-screen pt-20 pb-10 flex flex-col animate-enter">
      <div className="max-w-5xl w-full mx-auto px-8 flex-1 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-medium text-games-navy">
              Strategic Narrative
            </h1>
            <ProgressIndicator sections={sections} />
          </div>
          <p className="text-lg text-games-navy/70 mt-2">
            Develop the strategic narrative for your gaming pitch deck.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <SectionTabs sections={sections} />
          
          <div className="flex-1 flex flex-col">
            {sections.map(section => (
              <TabsContent key={section.id} value={section.id} className="flex-1 flex flex-col">
                <SectionEditor
                  section={section}
                  onUpdateContent={updateSectionContent}
                  onNavigate={handleNavigate}
                  isFirst={section.id === sections[0].id}
                  isLast={section.id === sections[sections.length - 1].id}
                  onBack={onBack}
                  onComplete={handleComplete}
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
        
        <div className="flex justify-end mt-8">
          <Button variant="outline" onClick={onBack} className="mr-4">
            Back to Files
          </Button>
          <Button onClick={handleComplete}>
            Generate Slides
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NarrativeBuilder;
