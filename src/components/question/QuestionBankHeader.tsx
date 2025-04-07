
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, SearchIcon, FileUp } from "lucide-react";
import BulkQuestionUpload from "./BulkQuestionUpload";

interface QuestionBankHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddQuestion: () => void;
  examId?: string | null;
}

const QuestionBankHeader = ({ 
  searchQuery, 
  onSearchChange, 
  onAddQuestion,
  examId 
}: QuestionBankHeaderProps) => {
  // Handle the input change to match the expected function signature
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full sm:w-64">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cari soal..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-8 w-full sm:w-64"
        />
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button 
          onClick={onAddQuestion}
          className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Soal {examId ? 'ke Ujian' : 'Baru'}
        </Button>
        
        {!examId && (
          <BulkQuestionUpload>
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none"
            >
              <FileUp className="mr-2 h-4 w-4" />
              Upload Soal
            </Button>
          </BulkQuestionUpload>
        )}
      </div>
    </div>
  );
};

export default QuestionBankHeader;
