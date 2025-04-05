
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Copy, Trash2, CheckCircle, HelpCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export interface QuestionType {
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
        return <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">Mudah</Badge>;
      case "medium": 
        return <Badge variant="default" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">Sedang</Badge>;
      case "hard": 
        return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">Sulit</Badge>;
      default: 
        return <Badge variant="outline">Lainnya</Badge>;
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "multiple_choice":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "true_false":
        return <AlertCircle className="h-4 w-4 text-green-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-purple-500" />;
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "multiple_choice":
        return "Pilihan Ganda";
      case "true_false":
        return "Benar/Salah";
      case "multiple_choice_complex":
        return "PG Kompleks";
      default:
        return "Essay";
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {getQuestionTypeIcon(question.type)}
            <Badge variant="outline" className="ml-2">
              {getQuestionTypeLabel(question.type)}
            </Badge>
          </div>
          {question.isImage && <Badge variant="outline" className="bg-blue-50 text-blue-700">Bergambar</Badge>}
        </div>
        {getDifficultyBadge(question.difficulty)}
      </div>

      <div className="mb-3 bg-slate-50 p-3 rounded-md shadow-inner">
        <p className="font-medium text-base">{question.question}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground mb-4">
        <div className="flex items-center">
          <span className="font-medium text-gray-600 mr-1">Mata Pelajaran:</span> {question.subject}
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-600 mr-1">Kelas:</span> {question.grade}
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-600 mr-1">Pembuat:</span> {question.createdBy}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => onPreview(question)} className="bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800" title="Lihat">
          <Eye className="h-4 w-4 mr-1" />
          <span>Lihat Detail</span>
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(question)} className="bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800" title="Edit">
          <Edit className="h-4 w-4 mr-1" />
          <span>Edit Soal</span>
        </Button>
        <Button variant="outline" size="sm" onClick={handleCopy} className="bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800" title="Duplikasi">
          <Copy className="h-4 w-4 mr-1" />
          <span>Duplikasi</span>
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDelete(question.id)} className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800" title="Hapus">
          <Trash2 className="h-4 w-4 mr-1" />
          <span>Hapus</span>
        </Button>
      </div>
    </Card>
  );
};

export default QuestionListItem;
