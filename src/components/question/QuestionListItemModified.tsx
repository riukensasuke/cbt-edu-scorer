
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, Edit, Copy, Trash2, BookOpen, Puzzle, 
  Check, X, FileText, MoreVertical 
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    explanation?: string;
  };
  onView: () => void;
  onEdit: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

const getQuestionTypeIcon = (type: string) => {
  switch (type) {
    case "multiple_choice":
      return <BookOpen className="h-4 w-4 mr-1" />;
    case "true_false":
      return <Check className="h-4 w-4 mr-1" />;
    case "essay":
      return <FileText className="h-4 w-4 mr-1" />;
    case "matching":
      return <Puzzle className="h-4 w-4 mr-1" />;
    default:
      return <BookOpen className="h-4 w-4 mr-1" />;
  }
};

const getQuestionTypeText = (type: string) => {
  switch (type) {
    case "multiple_choice":
      return "Pilihan Ganda";
    case "true_false":
      return "Benar/Salah";
    case "essay":
      return "Uraian";
    case "matching":
      return "Menjodohkan";
    case "multiple_choice_complex":
      return "PG Kompleks";
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

const highlightText = (text: string, maxLength: number = 120) => {
  if (!text) return '';
  
  // Truncate the text if it's too long
  let displayText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  
  // If the text is a math equation, show it differently
  if (displayText.includes('\\(') || displayText.includes('\\)') || displayText.includes('$$')) {
    return <span className="text-purple-700 font-mono">{displayText}</span>;
  }
  
  return displayText;
};

const QuestionListItemModified = ({ 
  question, 
  onView, 
  onEdit, 
  onDelete, 
  onDuplicate 
}: QuestionListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-all">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-3">
          <div className="flex-1">
            <h3 className="font-medium text-base mb-1 line-clamp-2" onClick={() => setIsExpanded(!isExpanded)}>
              {highlightText(question.question, isExpanded ? 500 : 120)}
            </h3>
            <div className="flex items-center flex-wrap gap-2 mb-2">
              {getDifficultyBadge(question.difficulty)}
              <Badge variant="secondary" className="flex items-center">
                {getQuestionTypeIcon(question.type)}
                {getQuestionTypeText(question.type)}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {question.subject}
              </Badge>
              <Badge variant="outline">
                {question.grade}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:flex-col md:items-end">
            <div className="flex gap-1 sm:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onView}>
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              {onDelete && onDuplicate && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2" align="end">
                    <div className="grid gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start" 
                        onClick={onDuplicate}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Duplikasi
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="justify-start text-destructive hover:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Soal</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus soal ini? Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground">
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
        
        {question.options && question.options.length > 0 && isExpanded && (
          <div className="mt-3 pt-3 border-t border-dashed">
            <p className="text-sm font-medium mb-2">Pilihan jawaban:</p>
            <ul className="space-y-1 text-sm pl-4">
              {question.options.map((option, index) => (
                <li key={index} className="flex items-start">
                  <span className={`font-medium mr-2 ${option === question.correctAnswer ? 'text-green-600' : ''}`}>
                    {String.fromCharCode(65 + index)}.
                  </span> 
                  <span className={option === question.correctAnswer ? 'font-medium text-green-600' : ''}>
                    {option}
                    {option === question.correctAnswer && ' ✓'}
                  </span>
                </li>
              ))}
            </ul>
            {question.explanation && (
              <div className="mt-3 text-sm">
                <p className="font-medium text-gray-600">Penjelasan:</p>
                <p className="mt-1 text-gray-600">{question.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-4 py-3 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            ID: {question.id}
          </div>
          <div className="flex space-x-2 hidden sm:flex">
            <Button variant="outline" size="sm" onClick={onView} className="text-blue-700 border-blue-200 hover:bg-blue-50">
              <Eye className="h-3.5 w-3.5 mr-1" />
              Lihat Detail
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit} className="text-green-700 border-green-200 hover:bg-green-50">
              <Edit className="h-3.5 w-3.5 mr-1" />
              Edit Soal
            </Button>
            {onDuplicate && (
              <Button variant="outline" size="sm" onClick={onDuplicate} className="text-amber-700 border-amber-200 hover:bg-amber-50">
                <Copy className="h-3.5 w-3.5 mr-1" />
                Duplikasi
              </Button>
            )}
            {onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-700 border-red-200 hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Hapus
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Soal</AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah Anda yakin ingin menghapus soal ini? Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground">
                      Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionListItemModified;
