
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface WelcomeProps {
  onStart: (data: {
    clientName: string;
    industry: string;
    template: string;
  }) => void;
}

const Welcome = ({ onStart }: WelcomeProps) => {
  const [clientName, setClientName] = useState('');
  const [industry, setIndustry] = useState('');
  const [template, setTemplate] = useState('gaming-pitch');
  
  const industries = [
    { id: 'retail', name: 'Retail' },
    { id: 'finance', name: 'Finance' },
    { id: 'technology', name: 'Technology' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'education', name: 'Education' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'food', name: 'Food & Beverage' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'travel', name: 'Travel & Hospitality' },
    { id: 'other', name: 'Other' },
  ];
  
  const templates = [
    { id: 'gaming-pitch', name: 'Gaming Pitch', description: 'Comprehensive pitch for gaming integration' },
    { id: 'quick-overview', name: 'Quick Overview', description: 'Brief introduction to gaming opportunities' },
    { id: 'case-study', name: 'Case Study', description: 'Success story with detailed results' },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({ clientName, industry, template });
  };
  
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center animate-enter">
      <div className="max-w-3xl w-full px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-medium text-games-navy mb-6">
            Create Your <span className="text-games-blue">Gaming</span> Pitch
          </h1>
          <p className="text-xl text-games-navy/70 max-w-2xl mx-auto">
            Craft compelling pitches that help brands authentically enter the gaming space and connect with their audience.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-8 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-medium text-games-navy">Project Details</h2>
            <p className="text-games-navy/70">Tell us about your presentation to get started.</p>
            
            <div className="space-y-6 mt-6">
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-games-navy mb-2">
                  Client Name
                </label>
                <input
                  id="clientName"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter client name"
                  className="w-full h-12 px-4 rounded-lg border border-games-silver focus:border-games-blue focus:outline-none focus:ring-1 focus:ring-games-blue/20 transition-all"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-games-navy mb-2">
                  Industry
                </label>
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-games-silver focus:border-games-blue focus:outline-none focus:ring-1 focus:ring-games-blue/20 transition-all appearance-none bg-right bg-no-repeat"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231A2E44' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E\")", backgroundSize: "1.5rem", paddingRight: "2.5rem" }}
                  required
                >
                  <option value="" disabled selected>Select industry</option>
                  {industries.map((ind) => (
                    <option key={ind.id} value={ind.id}>
                      {ind.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-medium text-games-navy">Template</h2>
            <p className="text-games-navy/70">Select a template as your starting point.</p>
            
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {templates.map((temp) => (
                <div
                  key={temp.id}
                  onClick={() => setTemplate(temp.id)}
                  className={cn(
                    "border rounded-xl p-4 cursor-pointer transition-all",
                    template === temp.id
                      ? "border-games-blue bg-games-blue/5 ring-1 ring-games-blue/20"
                      : "border-games-silver hover:border-games-blue/30 hover:bg-games-blue/5"
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                      template === temp.id
                        ? "border-games-blue bg-games-blue text-white"
                        : "border-games-silver"
                    )}>
                      {template === temp.id && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-games-navy">{temp.name}</h3>
                      <p className="text-sm text-games-navy/70 mt-1">{temp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={!clientName || !industry}
              rightIcon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              }
            >
              Create Project
            </Button>
          </div>
        </form>
        
        <div className="text-center mt-10">
          <div className="text-games-navy/70 flex items-center justify-center space-x-3">
            <p className="text-sm">Some key statistics:</p>
            <div className="flex items-center space-x-2 text-xs">
              <span className="bg-games-slate px-3 py-1 rounded-full">77% Gaming Reach</span>
              <span className="bg-games-slate px-3 py-1 rounded-full">90% Gen Alpha</span>
              <span className="bg-games-slate px-3 py-1 rounded-full">#1 Interest (8-24)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
