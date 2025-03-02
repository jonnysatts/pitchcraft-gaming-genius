
import { AnalysisResult } from "../types/narrative";

export function generateGamingRevolutionContent(analysis: AnalysisResult): string {
  return `Gaming has become a dominant cultural force in today's landscape, with over 3 billion people worldwide engaging with games regularly. In the ${analysis.audience_gaps[0]?.segment || 'target'} sector, gaming represents a significant opportunity that continues to grow annually.

Key statistics:
- ${analysis.key_narratives[0]?.supporting_evidence || 'Gaming reaches a significant percentage of your target audience'}
- ${analysis.gaming_opportunities[0]?.opportunity || 'Opportunity for authentic brand integration'}
- ${analysis.strategic_recommendations.quick_wins[0]?.expected_outcome || 'Expected engagement increase'}`;
}

export function generateCurrentLandscapeContent(analysis: AnalysisResult): string {
  return `Current challenges:
${analysis.business_challenges.map(c => `- ${c.challenge}: ${c.relevance_to_gaming}`).join('\n')}

Competitive position:
${analysis.competitive_threats.map(t => `- ${t.competitor}: ${t.gaming_approach} (Threat level: ${t.threat_level}/5)`).join('\n')}`;
}

export function generateGamingInsightContent(analysis: AnalysisResult): string {
  return `Key insight: ${analysis.key_narratives[0]?.narrative || 'Gaming provides an authentic connection to your target audience'}

Supporting evidence:
- ${analysis.key_narratives[0]?.supporting_evidence || 'Evidence point 1'}
- ${analysis.audience_gaps[0]?.gaming_opportunity || 'Opportunity insight'}`;
}

export function generateSolutionPathContent(analysis: AnalysisResult): string {
  return `Strategy pillars:
${analysis.gaming_opportunities.map((o, i) => `${i+1}. ${o.opportunity} (Impact: ${o.potential_impact}/5)`).join('\n')}

Games Age approach:
- Authentic Integration - Adding value to gaming experiences
- Physical-Digital Fusion - Bridging real-world and digital touchpoints
- Community-First Thinking - Building relationships, not just campaigns`;
}

export function generateTangibleVisionContent(analysis: AnalysisResult): string {
  return `Activation concepts:
${analysis.strategic_recommendations.quick_wins.map(r => `- ${r.recommendation} (${r.timeframe})`).join('\n')}

Long-term initiatives:
${analysis.strategic_recommendations.long_term_initiatives.map(i => `- ${i.recommendation} (${i.timeframe})`).join('\n')}`;
}

export function generateProofOfConceptContent(analysis: AnalysisResult): string {
  return `Case studies:
- Case study 1: [Client similar to yours] achieved [results] through [approach]
- Case study 2: [Industry example] saw [metrics] improvement

Next steps:
1. Detailed planning session
2. Strategy finalization
3. Launch preparation
4. Execution and measurement`;
}

export function getInitialSections(analysis: AnalysisResult | null): any[] {
  return [
    {
      id: 'gaming-revolution',
      title: 'Gaming Revolution Context',
      description: 'Industry-specific gaming statistics and trends that position Games Age as an expert guide.',
      content: analysis ? generateGamingRevolutionContent(analysis) : '',
      isCompleted: false
    },
    {
      id: 'current-landscape',
      title: 'Client's Current Landscape',
      description: 'Assessment of challenges facing the client and competitive positioning in gaming context.',
      content: analysis ? generateCurrentLandscapeContent(analysis) : '',
      isCompleted: false
    },
    {
      id: 'gaming-insight',
      title: 'Gaming Cultural Insight',
      description: 'Key strategic insight connecting client to gaming with supporting data points.',
      content: analysis ? generateGamingInsightContent(analysis) : '',
      isCompleted: false
    },
    {
      id: 'solution-path',
      title: 'Strategic Solution Path',
      description: 'Challenge → Solution mapping and Games Age methodology explanation.',
      content: analysis ? generateSolutionPathContent(analysis) : '',
      isCompleted: false
    },
    {
      id: 'tangible-vision',
      title: 'Tangible Vision',
      description: 'Concrete activation concepts, visual mockups, and implementation timeline.',
      content: analysis ? generateTangibleVisionContent(analysis) : '',
      isCompleted: false
    },
    {
      id: 'proof-of-concept',
      title: 'Proof of Concept',
      description: 'Relevant case studies, measurable outcomes, and next steps.',
      content: analysis ? generateProofOfConceptContent(analysis) : '',
      isCompleted: false
    }
  ];
}
