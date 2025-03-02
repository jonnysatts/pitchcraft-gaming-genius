
import React, { useState } from 'react';
import CustomButton from './ui/Button';
import { cn } from '@/lib/utils';

interface Slide {
  id: string;
  title: string;
  type: string;
  content: string;
}

interface SlidePreviewProps {
  slides: Slide[];
  onExport: () => void;
  onBack: () => void;
}

const SlidePreview = ({ slides, onExport, onBack }: SlidePreviewProps) => {
  const [activeSlide, setActiveSlide] = useState<string>(slides[0]?.id || '');
  
  const currentSlide = slides.find(s => s.id === activeSlide);
  const currentSlideIndex = slides.findIndex(s => s.id === activeSlide);
  
  const navigateToSlide = (id: string) => {
    setActiveSlide(id);
  };
  
  const navigateToNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setActiveSlide(slides[currentSlideIndex + 1].id);
    }
  };
  
  const navigateToPrevious = () => {
    if (currentSlideIndex > 0) {
      setActiveSlide(slides[currentSlideIndex - 1].id);
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-10 flex flex-col animate-enter">
      <div className="max-w-6xl w-full mx-auto px-8 flex-1 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-medium text-games-navy">
              Preview & Export
            </h1>
            <div className="flex items-center space-x-3">
              <CustomButton
                variant="outline"
                onClick={onBack}
              >
                Back to Narrative
              </CustomButton>
              
              <CustomButton
                onClick={onExport}
                rightIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                }
              >
                Export to Google Slides
              </CustomButton>
            </div>
          </div>
          <p className="text-lg text-games-navy/70 mt-2">
            Review and customize your presentation before exporting.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          <div className="w-full md:w-64 shrink-0">
            <div className="glass-panel rounded-xl p-4 md:sticky md:top-28">
              <h3 className="font-medium text-games-navy mb-4">Slides</h3>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => navigateToSlide(slide.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-all border",
                      activeSlide === slide.id 
                        ? "border-games-blue bg-games-blue/5 ring-1 ring-games-blue/20" 
                        : "border-games-silver hover:border-games-blue/30 hover:bg-games-blue/5"
                    )}
                  >
                    <div className="flex items-center mb-2">
                      <div 
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium mr-2",
                          activeSlide === slide.id 
                            ? "bg-games-blue text-white" 
                            : "bg-games-slate text-games-navy"
                        )}
                      >
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-games-navy truncate">{slide.title}</span>
                    </div>
                    <div className="aspect-[16/9] bg-white rounded-md border border-games-silver flex items-center justify-center text-xs text-games-navy/70">
                      {slide.type}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="glass-panel rounded-xl p-6 h-full flex flex-col">
              {currentSlide && (
                <>
                  <div className="bg-white rounded-lg border border-games-silver shadow-sm aspect-[16/9] flex items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute top-4 left-4 flex items-center text-xs text-games-navy/50 font-medium">
                      <span className="px-2 py-1 bg-games-slate rounded-full mr-2">Slide {currentSlideIndex + 1}</span>
                      <span>{currentSlide.type}</span>
                    </div>
                    
                    <div className="absolute top-3 right-3 flex space-x-1">
                      <button className="w-6 h-6 rounded-full bg-games-slate text-games-navy/70 flex items-center justify-center hover:bg-games-silver transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button className="w-6 h-6 rounded-full bg-games-slate text-games-navy/70 flex items-center justify-center hover:bg-games-silver transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-center max-w-xl">
                      <h2 className="text-3xl font-medium text-games-navy mb-4">{currentSlide.title}</h2>
                      <p className="text-games-navy/70">{currentSlide.content}</p>
                    </div>
                    
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-games-navy/50 mr-1">Games Age</span>
                        <div className="w-3 h-3 rounded-full bg-games-blue"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex space-x-3">
                      <CustomButton
                        variant="outline"
                        onClick={navigateToPrevious}
                        disabled={currentSlideIndex === 0}
                        leftIcon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                          </svg>
                        }
                      >
                        Previous Slide
                      </CustomButton>
                      
                      <CustomButton
                        onClick={navigateToNext}
                        disabled={currentSlideIndex === slides.length - 1}
                        rightIcon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        }
                      >
                        Next Slide
                      </CustomButton>
                    </div>
                    
                    <div className="text-sm text-games-navy">
                      Slide {currentSlideIndex + 1} of {slides.length}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidePreview;
