import React, { useState } from 'react';
import Button from './ui/Button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onAnalyze: (files: File[], url: string) => void;
  onSkip: () => void;
}

const FileUpload = ({ onAnalyze, onSkip }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
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
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  
  const handleSubmit = () => {
    onAnalyze(files, url);
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
            className={cn(
              "border-2 border-dashed rounded-xl p-10 transition-all text-center",
              isDragging ? "border-games-blue bg-games-blue/5" : "border-games-silver hover:border-games-blue/50",
              files.length > 0 && "border-games-blue/30 bg-games-blue/5"
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-games-slate rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-games-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
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
              <h3 className="text-lg font-medium text-games-navy">Uploaded Files</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-games-slate rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-games-navy">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-games-navy/70">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
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
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-games-silver focus:border-games-blue focus:outline-none focus:ring-1 focus:ring-games-blue/20 transition-all"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-games-navy/60">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={onSkip}
            >
              Skip This Step
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={files.length === 0 && !url}
              rightIcon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              }
            >
              Analyze Materials
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
