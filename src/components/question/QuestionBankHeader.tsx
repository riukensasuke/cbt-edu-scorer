
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Filter, 
  Upload
} from "lucide-react";

interface QuestionBankHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddQuestion: () => void;
  onUploadClick?: () => void;
  examId?: string | null;
}

const QuestionBankHeader = ({ 
  searchQuery, 
  onSearchChange, 
  onAddQuestion,
  onUploadClick,
  examId 
}: QuestionBankHeaderProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">
            {examId ? "Soal Ujian" : "Bank Soal"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {examId 
              ? "Kelola soal untuk ujian ini. Tambahkan soal baru atau pilih dari bank soal." 
              : "Kelola semua soal dalam bank soal. Tambahkan, edit, atau hapus soal."}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:items-start">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari soal..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            {onUploadClick && (
              <Button 
                variant="outline" 
                onClick={onUploadClick}
                className="whitespace-nowrap"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Soal
              </Button>
            )}
            
            <Button 
              onClick={onAddQuestion}
              className="whitespace-nowrap bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Soal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankHeader;
