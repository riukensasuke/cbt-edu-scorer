
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuestionType {
  id: string;
  type: string;
  subject: string;
  grade: string;
  difficulty: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  createdBy: string;
  createdAt: string;
  isImage?: boolean;
}

interface QuestionListItemProps {
  question: QuestionType;
  onEdit: (question: QuestionType) => void;
  onPreview: (question: QuestionType) => void;
  onDelete: (id: string) => void;
}

const QuestionListItem: React.FC<QuestionListItemProps> = ({ 
  question, 
  onEdit,
  onPreview,
  onDelete
}) => {
  const { toast } = useToast();

  const handleCopy = () => {
    toast({
      title: "Soal Diduplikasi",
      description: "Soal berhasil diduplikasi",
    });
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy": 
        return <Badge variant="secondary">Mudah</Badge>;
      case "medium": 
        return <Badge variant="default">Sedang</Badge>;
      case "hard": 
        return <Badge variant="destructive">Sulit</Badge>;
      default: 
        return <Badge variant="outline">Lainnya</Badge>;
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {question.type === "multiple_choice" ? "Pilihan Ganda" : 
             question.type === "true_false" ? "Benar/Salah" : 
             question.type === "multiple_choice_complex" ? "PG Kompleks" : "Essay"}
          </Badge>
          {question.isImage && <Badge variant="outline">Bergambar</Badge>}
        </div>
        {getDifficultyBadge(question.difficulty)}
      </div>

      <div className="mb-3">
        <p className="font-medium text-sm line-clamp-2">{question.question}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground mb-3">
        <div>Mata Pelajaran: {question.subject}</div>
        <div>Kelas: {question.grade}</div>
        <div>Pembuat: {question.createdBy}</div>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => onPreview(question)} title="Lihat">
          <Eye className="h-4 w-4 mr-1" />
          <span>Lihat</span>
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(question)} title="Edit">
          <Edit className="h-4 w-4 mr-1" />
          <span>Edit</span>
        </Button>
        <Button variant="outline" size="sm" onClick={handleCopy} title="Duplikasi">
          <Copy className="h-4 w-4 mr-1" />
          <span>Duplikasi</span>
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDelete(question.id)} className="text-destructive hover:text-destructive" title="Hapus">
          <Trash2 className="h-4 w-4 mr-1" />
          <span>Hapus</span>
        </Button>
      </div>
    </div>
  );
};

export default QuestionListItem;
