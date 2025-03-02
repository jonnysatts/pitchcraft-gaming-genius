
import React, { useState } from 'react';
import Button from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { processDocument, prioritizeDocuments } from '@/lib/document-processing';
import { analyzeClientMaterials } from '@/services/claude-api';
import { Upload, Link, FileText, X } from 'lucide-react';

interface FileUploadProps {
  clientName?: string;
  industry?: string;
  onAnalyze: (analysis: any) => void;
  onSkip: () => void;
  onBack?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  clientName = '', 
  industry = '', 
  onAnalyze, 
  onSkip, 
  onBack 
}) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const newFiles = Array.from(e.dataTransfer.files);
    if (newFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      
      toast({
        title: "Files added",
        description: `Added ${newFiles.length} file(s)`,
      });
    }
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      
      toast({
        title: "Files added",
        description: `Added ${newFiles.length} file(s)`,
      });
    }
  };
  
  // Remove a file
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Handle URL input
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  
  // Process and analyze files
  const handleAnalyze = async () => {
    if (files.length === 0 && !url) {
      toast({
        title: "No files or URL",
        description: "Please upload files or enter a URL to analyze",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Sort files by priority
      const prioritizedFiles = prioritizeDocuments(files);
      
      // Process each file
      const processedTexts: string[] = [];
      
      for (let i = 0; i < prioritizedFiles.length; i++) {
        const file = prioritizedFiles[i];
        setAnalysisProgress(Math.round((i / prioritizedFiles.length) * 100));
        
        try {
          const result = await processDocument(file);
          processedTexts.push(result.text);
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          toast({
            title: "Processing error",
            description: `Could not process ${file.name}`,
            variant: "destructive"
          });
        }
      }
      
      // If URL is provided, process it too
      if (url) {
        try {
          // In a real implementation, you'd process the URL content
          processedTexts.push(`Content from URL: ${url}`);
        } catch (error) {
          console.error('Error processing URL:', error);
          toast({
            title: "URL processing error",
            description: "Could not process the provided URL",
            variant: "destructive"
          });
        }
      }
      
      // Send to Claude for analysis if we have client info
      let analysis = null;
      if (clientName && industry) {
        analysis = await analyzeClientMaterials({
          clientName,
          industry,
          materials: processedTexts
        });
      }
      
      // Complete
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      
      toast({
        title: "Analysis complete",
        description: "All materials have been processed and analyzed",
      });
      
      onAnalyze(analysis || processedTexts);
    } catch (error) {
      console.error('Error during analysis:', error);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis failed",
        description: "An error occurred during analysis",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-10 flex flex-col items-center justify-center animate-enter">
      <div className="max-w-3xl w-full px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-games-navy mb-6">
            Client Discovery
          </h1>
          <p className="text-xl text-games-navy/70 max-w-2xl mx-auto">
            Upload materials to analyze or provide a website URL for automated insights.
          </p>
        </div>
        
        <div className="glass-panel rounded-2xl p-8 space-y-8">
          <div 
            className={`border-2 border-dashed rounded-xl p-10 transition-all text-center
              ${isDragging ? "border-games-blue bg-games-blue/5" : "border-games-silver hover:border-games-blue/50"}
              ${files.length > 0 ? "border-games-blue/30 bg-games-blue/5" : ""}
            `}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-games-slate rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-games-blue" />
              </div>
              <h3 className="text-lg font-medium text-games-navy">
                Drag & Drop Files
              </h3>
              <p className="text-games-navy/70 text-sm mt-2 mb-4">
                Upload PDFs, PPTs, DOCs, or images
              </p>
              
              <label htmlFor="file-upload">
                <div className="px-4 py-2 bg-games-slate text-games-navy font-medium rounded-lg cursor-pointer hover:bg-games-silver transition-colors">
                  Browse Files
                </div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
              </label>
            </div>
          </div>
          
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-games-navy">Uploaded Files ({files.length})</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-games-slate rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                        <FileText className="w-5 h-5 text-games-navy" />
                      </div>
                      <div className="text-sm truncate max-w-xs">
                        <p className="font-medium text-games-navy truncate">{file.name}</p>
                        <p className="text-games-navy/60 text-xs">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="w-8 h-8 rounded-full hover:bg-games-silver flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-games-navy/70" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-games-navy">Or Enter Website URL</h3>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="https://example.com"
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-games-silver focus:border-games-blue focus:outline-none focus:ring-1 focus:ring-games-blue/20 transition-all"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Link className="w-5 h-5 text-games-navy/60" />
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          {isAnalyzing && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-games-navy">Analyzing materials...</h3>
              <div className="w-full bg-games-slate rounded-full h-2.5">
                <div 
                  className="bg-games-blue h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-games-navy/70">
                This may take a few minutes depending on the size and number of documents.
              </p>
            </div>
          )}
          
          <div className="flex justify-between pt-4">
            {onBack ? (
              <Button
                variant="outline"
                onClick={onBack}
              >
                Back
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={onSkip}
              >
                Skip This Step
              </Button>
            )}
            
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || (files.length === 0 && !url)}
              rightIcon={
                isAnalyzing ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                )
              }
            >
              {isAnalyzing ? "Processing..." : "Analyze Materials"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
