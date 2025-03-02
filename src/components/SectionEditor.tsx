
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { NarrativeSection } from '@/types/narrative';

interface SectionEditorProps {
  section: NarrativeSection;
  onUpdateContent: (id: string, content: string) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onComplete: () => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  onUpdateContent,
  onNavigate,
  isFirst,
  isLast,
  onBack,
  onComplete
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
        <p className="text-gray-500">{section.description}</p>
      </CardHeader>
      <CardContent>
        <Textarea 
          rows={10}
          value={section.content}
          onChange={(e) => onUpdateContent(section.id, e.target.value)}
          placeholder={`Enter content for ${section.title}...`}
          className="min-h-[250px] mb-4"
        />
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            onClick={() => {
              if (isFirst) {
                onBack();
              } else {
                onNavigate('prev');
              }
            }}
          >
            {isFirst ? 'Back to Files' : 'Previous Section'}
          </Button>
          
          <Button onClick={() => {
            if (isLast) {
              onComplete();
            } else {
              onNavigate('next');
            }
          }}>
            {isLast ? 'Generate Slides' : 'Next Section'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionEditor;
