
import { DocumentProcessorResult } from '@/lib/document-processing';

export interface AnalysisRequest {
  clientName: string;
  industry: string;
  materials: string[]; // Processed text from documents
}

export interface AnalysisResult {
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

export const analyzeClientMaterials = async (request: AnalysisRequest): Promise<AnalysisResult> => {
  try {
    const response = await fetch('/api/claude/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to analyze materials: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error analyzing materials:', error);
    throw error;
  }
};
