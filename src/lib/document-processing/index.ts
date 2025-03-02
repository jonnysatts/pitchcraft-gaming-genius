
import { extractPdfText } from './extractors/pdf';
import { extractWordText } from './extractors/word';
import { extractPowerPointText } from './extractors/powerpoint';
import { extractExcelData } from './extractors/excel';
import { performOcr } from './extractors/ocr';

export type DocumentProcessorResult = {
  text: string;
  metadata: Record<string, any>;
  type: 'structured_document' | 'presentation' | 'data_tables' | 'image_ocr';
};

export const documentProcessors: Record<string, (file: File) => Promise<DocumentProcessorResult>> = {
  'application/pdf': extractPdfText,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': extractWordText,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': extractPowerPointText,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': extractExcelData,
  'image/jpeg': performOcr,
  'image/png': performOcr
};

export const processDocument = async (file: File): Promise<DocumentProcessorResult> => {
  const processor = documentProcessors[file.type];
  if (!processor) {
    throw new Error(`Unsupported file type: ${file.type}`);
  }
  
  return await processor(file);
};

export const prioritizeDocuments = (documents: File[]): File[] => {
  return documents.sort((a, b) => {
    // Implement the prioritization logic from spec:
    // 1. Documents with "strategy," "brief," or "overview" in filename: Priority 1
    // 2. Presentation files (.ppt, .pptx): Priority 2
    // 3. Word documents (.doc, .docx): Priority 3
    // 4. Spreadsheets with data (.xls, .xlsx): Priority 4
    // 5. PDFs: Priority 5
    // 6. Images: Priority 6
    
    const getPriority = (file: File): number => {
      const filename = file.name.toLowerCase();
      
      if (filename.includes('strategy') || filename.includes('brief') || filename.includes('overview')) {
        return 1;
      }
      
      if (filename.endsWith('.ppt') || filename.endsWith('.pptx')) {
        return 2;
      }
      
      if (filename.endsWith('.doc') || filename.endsWith('.docx')) {
        return 3;
      }
      
      if (filename.endsWith('.xls') || filename.endsWith('.xlsx')) {
        return 4;
      }
      
      if (filename.endsWith('.pdf')) {
        return 5;
      }
      
      if (filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.png')) {
        return 6;
      }
      
      return 7; // Other files
    };
    
    return getPriority(a) - getPriority(b);
  });
};
