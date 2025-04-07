
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, SearchIcon, FileUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-none"
              >
                <FileUp className="mr-2 h-4 w-4" />
                Upload Soal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Soal</DialogTitle>
                <DialogDescription>
                  Upload soal dalam format Excel untuk menambahkan banyak soal sekaligus.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileUp className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Klik atau seret file ke sini</p>
                  <p className="text-xs text-gray-400">Format yang didukung: .xlsx, .xls</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Pilih File
                  </Button>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Pastikan file Excel Anda mengikuti format yang benar.</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                    Unduh Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default QuestionBankHeader;
