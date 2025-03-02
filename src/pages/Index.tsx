
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Welcome from '@/components/Welcome';
import FileUpload from '@/components/FileUpload';
import NarrativeBuilder from '@/components/NarrativeBuilder';
import SlidePreview from '@/components/SlidePreview';

// Step enum to track user progress
enum Step {
  WELCOME,
  FILE_UPLOAD,
  NARRATIVE,
  PREVIEW
}

// Client data interface
interface ClientData {
  clientName: string;
  industry: string;
  template: string;
}

// Narrative section interface
interface NarrativeSection {
  id: string;
  title: string;
  description: string;
  content: string;
  isCompleted: boolean;
}

// Slide interface
interface Slide {
  id: string;
  title: string;
  type: string;
  content: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [narrativeSections, setNarrativeSections] = useState<NarrativeSection[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  
  // Handle welcome form submission
  const handleWelcomeSubmit = (data: ClientData) => {
    setClientData(data);
    setCurrentStep(Step.FILE_UPLOAD);
    toast({
      title: "Project created",
      description: `Started a new pitch for ${data.clientName}`,
    });
  };
  
  // Handle file upload and analysis
  const handleAnalyze = (files: File[], url: string) => {
    // In a real implementation, this would send the files/URL to an API
    // For now, we'll simulate processing and move to the next step
    toast({
      title: "Analysis complete",
      description: "Materials have been processed successfully",
    });
    setCurrentStep(Step.NARRATIVE);
  };
  
  // Skip the file upload step
  const handleSkipFileUpload = () => {
    setCurrentStep(Step.NARRATIVE);
  };
  
  // Handle narrative completion
  const handleNarrativeComplete = (sections: NarrativeSection[]) => {
    setNarrativeSections(sections);
    
    // Generate slides based on narrative sections
    const generatedSlides = generateSlidesFromNarrative(sections);
    setSlides(generatedSlides);
    
    setCurrentStep(Step.PREVIEW);
    toast({
      title: "Slides created",
      description: `Generated ${generatedSlides.length} slides for your presentation`,
    });
  };
  
  // Generate slides from narrative sections
  const generateSlidesFromNarrative = (sections: NarrativeSection[]): Slide[] => {
    // Title slide
    const titleSlide: Slide = {
      id: 'title',
      title: clientData?.clientName || 'Client Presentation',
      type: 'Title',
      content: 'Gaming Strategic Partnership',
    };
    
    // Transform narrative sections into slides
    const contentSlides: Slide[] = sections.map(section => ({
      id: section.id,
      title: section.title,
      type: 'Content',
      content: section.content,
    }));
    
    // Add some extra slides
    const extraSlides: Slide[] = [
      {
        id: 'credentials',
        title: 'Games Age Credentials',
        type: 'Credentials',
        content: "Australia's premier gaming venue network reaching 1M+ Australians annually",
      },
      {
        id: 'stats',
        title: 'Gaming by the Numbers',
        type: 'Statistics',
        content: "Gaming reaches 77% of Australia's online population",
      },
      {
        id: 'next-steps',
        title: 'Next Steps',
        type: 'Action',
        content: 'Timeline and implementation roadmap',
      },
    ];
    
    return [titleSlide, ...contentSlides, ...extraSlides];
  };
  
  // Handle export to Google Slides
  const handleExport = () => {
    // In a real implementation, this would connect to the Google Slides API
    // For now, we'll simulate the export with a toast
    toast({
      title: "Export successful",
      description: "Your presentation has been exported to Google Slides",
    });
  };
  
  // Go back to previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case Step.WELCOME:
        return <Welcome onStart={handleWelcomeSubmit} />;
      case Step.FILE_UPLOAD:
        return <FileUpload onAnalyze={handleAnalyze} onSkip={handleSkipFileUpload} />;
      case Step.NARRATIVE:
        return <NarrativeBuilder onComplete={handleNarrativeComplete} onBack={handleBack} />;
      case Step.PREVIEW:
        return <SlidePreview slides={slides} onExport={handleExport} onBack={handleBack} />;
      default:
        return <Welcome onStart={handleWelcomeSubmit} />;
    }
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {renderStep()}
      </main>
    </div>
  );
};

export default Index;
