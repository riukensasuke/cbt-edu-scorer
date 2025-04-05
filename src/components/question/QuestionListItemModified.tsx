
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, BookOpen, Puzzle } from "lucide-react";

interface QuestionListItemProps {
  question: {
    id: string;
    question: string;
    type: string;
    difficulty: string;
    subject: string;
    grade: string;
    options?: string[];
    correctAnswer?: string;
  };
  onView: () => void;
  onEdit: () => void;
}

const getQuestionTypeIcon = (type: string) => {
  switch (type) {
    case "multiple-choice":
      return <BookOpen className="h-4 w-4 mr-1" />;
    case "true-false":
      return <BookOpen className="h-4 w-4 mr-1" />;
    case "essay":
      return <BookOpen className="h-4 w-4 mr-1" />;
    case "matching":
      return <Puzzle className="h-4 w-4 mr-1" />;
    default:
      return <BookOpen className="h-4 w-4 mr-1" />;
  }
};

const getQuestionTypeText = (type: string) => {
  switch (type) {
    case "multiple-choice":
      return "Pilihan Ganda";
    case "true-false":
      return "Benar/Salah";
    case "essay":
      return "Uraian";
    case "matching":
      return "Menjodohkan";
    default:
      return type;
  }
};

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Mudah</Badge>;
    case "medium":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Sedang</Badge>;
    case "hard":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Sulit</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const QuestionListItemModified = ({ question, onView, onEdit }: QuestionListItemProps) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/20 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
        <h3 className="font-medium text-base">{question.question}</h3>
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          {getDifficultyBadge(question.difficulty)}
          <Badge variant="secondary" className="flex items-center">
            {getQuestionTypeIcon(question.type)}
            {getQuestionTypeText(question.type)}
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
          <div>{question.subject}</div>
          <div>{question.grade}</div>
          {question.options && (
            <div>{question.options.length} opsi</div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onView}>
            <Eye className="h-4 w-4 mr-1" />
            Lihat Detail
          </Button>
          <Button variant="outline" size="sm" onClick={onEdit} className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800">
            <Edit className="h-4 w-4 mr-1" />
            Edit Soal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionListItemModified;
