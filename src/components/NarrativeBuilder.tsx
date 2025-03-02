
import React, { useState } from 'react';
import Button from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
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

// Mock analysis type for now - in a real implementation this would come from the API
interface AnalysisResult {
  business_challenges: {
    challenge: string;
    relevance_to_gaming: string;
    priority: number;
  }[];
  audience_gaps: {
    segment: string;
    current_approach: string;
    gaming_opportunity: string;
  }[];
  competitive_threats: {
    competitor: string;
    gaming_approach: string;
    threat_level: number;
  }[];
  gaming_opportunities: {
    opportunity: string;
    alignment_to_games_age_principles: string;
    potential_impact: number;
  }[];
  strategic_recommendations: {
    quick_wins: {
      recommendation: string;
      timeframe: string;
      expected_outcome: string;
    }[];
    long_term_initiatives: {
      recommendation: string;
      timeframe: string;
      expected_outcome: string;
    }[];
  };
  key_narratives: {
    narrative: string;
    supporting_evidence: string;
    slide_recommendation: string;
  }[];
}

const NarrativeBuilder = ({ onComplete, onBack }: NarrativeBuilderProps) => {
  const { toast } = useToast();
  
  // Mock analysis for demo purposes
  const mockAnalysis: AnalysisResult = {
    business_challenges: [
      { 
        challenge: "Declining engagement with traditional advertising", 
        relevance_to_gaming: "Gaming offers immersive brand experiences", 
        priority: 5 
      },
      { 
        challenge: "Difficulty reaching younger audiences", 
        relevance_to_gaming: "77% of Gen Z identify as gamers", 
        priority: 4 
      }
    ],
    audience_gaps: [
      {
        segment: "18-34 demographic",
        current_approach: "Social media campaigns",
        gaming_opportunity: "In-game activations and influencer partnerships"
      }
    ],
    competitive_threats: [
      {
        competitor: "Main competitor",
        gaming_approach: "Sponsoring esports tournaments",
        threat_level: 4
      }
    ],
    gaming_opportunities: [
      {
        opportunity: "Create branded mini-game experience",
        alignment_to_games_age_principles: "Authentic integration",
        potential_impact: 5
      },
      {
        opportunity: "Partner with relevant gaming influencers",
        alignment_to_games_age_principles: "Community-first thinking",
        potential_impact: 4
      }
    ],
    strategic_recommendations: {
      quick_wins: [
        {
          recommendation: "Launch branded Twitch channel",
          timeframe: "1-2 months",
          expected_outcome: "10K followers in first quarter"
        }
      ],
      long_term_initiatives: [
        {
          recommendation: "Develop gaming loyalty program",
          timeframe: "6-12 months",
          expected_outcome: "25% increase in customer retention"
        }
      ]
    },
    key_narratives: [
      {
        narrative: "Gaming provides an authentic connection channel to your core audience",
        supporting_evidence: "83% of your target demographic play games weekly",
        slide_recommendation: "Use as opening statement"
      }
    ]
  };
  
  // Generate content for each section based on analysis
  function generateGamingRevolutionContent(analysis: AnalysisResult): string {
    return `Gaming has become a dominant cultural force in today's landscape, with over 3 billion people worldwide engaging with games regularly. In the ${analysis.audience_gaps[0]?.segment || 'target'} sector, gaming represents a significant opportunity that continues to grow annually.

Key statistics:
- ${analysis.key_narratives[0]?.supporting_evidence || 'Gaming reaches a significant percentage of your target audience'}
- ${analysis.gaming_opportunities[0]?.opportunity || 'Opportunity for authentic brand integration'}
- ${analysis.strategic_recommendations.quick_wins[0]?.expected_outcome || 'Expected engagement increase'}`;
  }

  function generateCurrentLandscapeContent(analysis: AnalysisResult): string {
    return `Current challenges:
${analysis.business_challenges.map(c => `- ${c.challenge}: ${c.relevance_to_gaming}`).join('\n')}

Competitive position:
${analysis.competitive_threats.map(t => `- ${t.competitor}: ${t.gaming_approach} (Threat level: ${t.threat_level}/5)`).join('\n')}`;
  }

  function generateGamingInsightContent(analysis: AnalysisResult): string {
    return `Key insight: ${analysis.key_narratives[0]?.narrative || 'Gaming provides an authentic connection to your target audience'}

Supporting evidence:
- ${analysis.key_narratives[0]?.supporting_evidence || 'Evidence point 1'}
- ${analysis.audience_gaps[0]?.gaming_opportunity || 'Opportunity insight'}`;
  }

  function generateSolutionPathContent(analysis: AnalysisResult): string {
    return `Strategy pillars:
${analysis.gaming_opportunities.map((o, i) => `${i+1}. ${o.opportunity} (Impact: ${o.potential_impact}/5)`).join('\n')}

Games Age approach:
- Authentic Integration - Adding value to gaming experiences
- Physical-Digital Fusion - Bridging real-world and digital touchpoints
- Community-First Thinking - Building relationships, not just campaigns`;
  }

  function generateTangibleVisionContent(analysis: AnalysisResult): string {
    return `Activation concepts:
${analysis.strategic_recommendations.quick_wins.map(r => `- ${r.recommendation} (${r.timeframe})`).join('\n')}

Long-term initiatives:
${analysis.strategic_recommendations.long_term_initiatives.map(i => `- ${i.recommendation} (${i.timeframe})`).join('\n')}`;
  }

  function generateProofOfConceptContent(analysis: AnalysisResult): string {
    return `Case studies:
- Case study 1: [Client similar to yours] achieved [results] through [approach]
- Case study 2: [Industry example] saw [metrics] improvement

Next steps:
1. Detailed planning session
2. Strategy finalization
3. Launch preparation
4. Execution and measurement`;
  }
  
  // Define the six core narrative sections
  const [sections, setSections] = useState<NarrativeSection[]>([
    {
      id: 'gaming-revolution',
      title: 'Gaming Revolution Context',
      description: 'Industry-specific gaming statistics and trends that position Games Age as an expert guide.',
      content: generateGamingRevolutionContent(mockAnalysis),
      isCompleted: true
    },
    {
      id: 'current-landscape',
      title: 'Client's Current Landscape',
      description: 'Assessment of challenges facing the client and competitive positioning in gaming context.',
      content: generateCurrentLandscapeContent(mockAnalysis),
      isCompleted: true
    },
    {
      id: 'gaming-insight',
      title: 'Gaming Cultural Insight',
      description: 'Key strategic insight connecting client to gaming with supporting data points.',
      content: generateGamingInsightContent(mockAnalysis),
      isCompleted: true
    },
    {
      id: 'solution-path',
      title: 'Strategic Solution Path',
      description: 'Challenge → Solution mapping and Games Age methodology explanation.',
      content: generateSolutionPathContent(mockAnalysis),
      isCompleted: true
    },
    {
      id: 'tangible-vision',
      title: 'Tangible Vision',
      description: 'Concrete activation concepts, visual mockups, and implementation timeline.',
      content: generateTangibleVisionContent(mockAnalysis),
      isCompleted: true
    },
    {
      id: 'proof-of-concept',
      title: 'Proof of Concept',
      description: 'Relevant case studies, measurable outcomes, and next steps.',
      content: generateProofOfConceptContent(mockAnalysis),
      isCompleted: true
    }
  ]);

  const [activeTab, setActiveTab] = useState('gaming-revolution');

  // Update section content
  const updateSectionContent = (id: string, content: string) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, content, isCompleted: content.trim().length > 0 } : section
    ));
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
  
  const completedSections = sections.filter(s => s.isCompleted).length;
  const progress = (completedSections / sections.length) * 100;

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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
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
          
          <div className="flex-1 flex flex-col">
            {sections.map(section => (
              <TabsContent key={section.id} value={section.id} className="flex-1 flex flex-col">
                <Card className="flex-1 flex flex-col">
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <p className="text-gray-500">{section.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <Textarea 
                      rows={10}
                      value={section.content}
                      onChange={(e) => updateSectionContent(section.id, e.target.value)}
                      placeholder={`Enter content for ${section.title}...`}
                      className="flex-1 min-h-[250px] mb-4"
                    />
                    <div className="flex justify-between mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          const currentIndex = sections.findIndex(s => s.id === activeTab);
                          if (currentIndex > 0) {
                            setActiveTab(sections[currentIndex - 1].id);
                          } else {
                            onBack();
                          }
                        }}
                      >
                        {activeTab === sections[0].id ? 'Back to Files' : 'Previous Section'}
                      </Button>
                      
                      <Button 
                        onClick={() => {
                          const currentIndex = sections.findIndex(s => s.id === activeTab);
                          if (currentIndex < sections.length - 1) {
                            setActiveTab(sections[currentIndex + 1].id);
                          } else {
                            handleComplete();
                          }
                        }}
                      >
                        {activeTab === sections[sections.length - 1].id ? 'Generate Slides' : 'Next Section'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
