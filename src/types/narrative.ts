
export interface NarrativeSection {
  id: string;
  title: string;
  description: string;
  content: string;
  isCompleted: boolean;
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
