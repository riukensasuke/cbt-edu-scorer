
import React from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Copy, Trash2, File } from "lucide-react";
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
  onDelete: () => void;
  onDuplicate: () => void;
  examContext?: boolean;
}

const QuestionListItem = ({
  question,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  examContext = false,
}: QuestionListItemProps) => {
  const getQuestionTypeBadge = (type: string) => {
    switch (type) {
      case 'multiple_choice':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Pilihan Ganda</Badge>;
      case 'essay':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Essay</Badge>;
      case 'true_false':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Benar/Salah</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Mudah</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Sedang</Badge>;
      case 'hard':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Sulit</Badge>;
      default:
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-5 border-b">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
            <div className="flex flex-wrap gap-2">
              {getQuestionTypeBadge(question.type)}
              {getDifficultyBadge(question.difficulty)}
              {question.subject && (
                <Badge variant="outline" className="bg-gray-50 border-gray-200">
                  {question.subject}
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              ID: {question.id}
            </div>
          </div>
          
          <div className="prose prose-sm max-w-none mb-4">
            <p className="text-base">{truncateText(question.question)}</p>
          </div>
          
          {question.options && question.options.length > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-sm font-medium">Pilihan Jawaban:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {question.options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`text-sm p-2 rounded-md ${option === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}
                  >
                    <span className="font-medium mr-1">{String.fromCharCode(65 + index)}.</span> 
                    {option}
                    {option === question.correctAnswer && <span className="ml-1 text-green-600">(Benar)</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-muted/30 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{question.grade || 'Umum'}</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onView}>
              <Eye className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Lihat</span>
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
            <Button variant="outline" size="sm" onClick={onDuplicate}>
              <Copy className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Duplikasi</span>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Hapus</span>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionListItem;
