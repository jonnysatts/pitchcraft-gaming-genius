
import { Slide } from '@/types/narrative';

export interface GoogleSlidesTemplate {
  id: string;
  name: string;
  description: string;
  layoutId: string;
  elementsTransformation: (content: any) => Record<string, any>;
}

export const templateMapping: Record<string, GoogleSlidesTemplate> = {
  'Title': {
    id: 'title',
    name: 'Title Slide',
    description: 'Opening slide with title and subtitle',
    layoutId: 'TITLE',
    elementsTransformation: (content) => ({
      title: { text: content.title },
      subtitle: { text: content.content }
    })
  },
  'Content': {
    id: 'content',
    name: 'Content Slide',
    description: 'Standard content slide with title and bullet points',
    layoutId: 'TITLE_AND_BODY',
    elementsTransformation: (content) => ({
      title: { text: content.title },
      body: { text: formatBulletPoints(content.content) }
    })
  },
  'Credentials': {
    id: 'credentials',
    name: 'Games Age Credentials',
    description: 'Shows Games Age statistics and capabilities',
    layoutId: 'TITLE_AND_TWO_COLUMNS',
    elementsTransformation: (content) => ({
      title: { text: content.title },
      leftColumn: { text: 'Gaming Audience\n- 1M+ annual reach\n- 77% of online Australians\n- Gen Z and Millennial focus' },
      rightColumn: { text: 'Core Capabilities\n- Venue activations\n- Game integrations\n- Influencer network\n- Tournament hosting' }
    })
  },
  'Statistics': {
    id: 'statistics',
    name: 'Gaming Statistics',
    description: 'Key gaming statistics with visual elements',
    layoutId: 'BIG_NUMBER',
    elementsTransformation: (content) => ({
      title: { text: content.title },
      bigNumber: { text: '77%' },
      body: { text: content.content }
    })
  },
  'Action': {
    id: 'action',
    name: 'Next Steps',
    description: 'Call to action and next steps',
    layoutId: 'TITLE_AND_BODY',
    elementsTransformation: (content) => ({
      title: { text: content.title },
      body: { text: formatBulletPoints(content.content) }
    })
  }
};

// Helper function to format bullet points
const formatBulletPoints = (text: string): string => {
  // Convert plain text to Google Slides bullet format
  return text.split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => line.startsWith('-') ? line : `• ${line}`)
    .join('\n');
};

export const exportToGoogleSlides = async (slides: Slide[], title: string): Promise<string> => {
  try {
    // This would be a call to your backend API that handles Google Slides API
    const response = await fetch('/api/google-slides/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        slides: slides.map(slide => ({
          ...slide,
          layoutId: templateMapping[slide.type]?.layoutId || 'TITLE_AND_BODY',
          elements: templateMapping[slide.type]?.elementsTransformation({
            title: slide.title,
            content: slide.content
          })
        }))
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to export to Google Slides');
    }
    
    const data = await response.json();
    return data.presentationUrl;
  } catch (error) {
    console.error('Error exporting to Google Slides:', error);
    throw error;
  }
};
