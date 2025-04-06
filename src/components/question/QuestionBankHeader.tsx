
import React from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BulkQuestionUpload from './BulkQuestionUpload';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuestionBankHeaderProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddQuestion: () => void;
}

const QuestionBankHeader: React.FC<QuestionBankHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onAddQuestion
}) => {
  const { toast } = useToast();

  const handleAddQuestion = () => {
    console.log("Add question button clicked in QuestionBankHeader");
    onAddQuestion();
    
    toast({
      title: "Tambah Soal Baru",
      description: "Form tambah soal baru telah dibuka",
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="relative w-full md:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari soal..."
          className="pl-8"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <BulkQuestionUpload />
        <Button onClick={handleAddQuestion} className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Soal Baru
        </Button>
      </div>
    </div>
  );
};

export default QuestionBankHeader;
