
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import QuestionListItem from './QuestionListItem';
import { QuestionType } from '@/hooks/useQuestionBank';

interface QuestionBankTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  filteredQuestions: QuestionType[];
  onViewQuestion: (question: QuestionType) => void;
  onEditQuestion: (question: QuestionType) => void;
  onDeleteQuestion: (questionId: string) => void;
  onDuplicateQuestion: (question: QuestionType) => void;
  examId?: string | null;
}

const QuestionBankTabs = ({
  activeTab,
  onTabChange,
  filteredQuestions,
  onViewQuestion,
  onEditQuestion,
  onDeleteQuestion,
  onDuplicateQuestion,
  examId
}: QuestionBankTabsProps) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">Semua</TabsTrigger>
        <TabsTrigger value="multiple_choice">Pilihan Ganda</TabsTrigger>
        <TabsTrigger value="essay">Essay</TabsTrigger>
        <TabsTrigger value="true_false">Benar/Salah</TabsTrigger>
      </TabsList>
      
      <TabsContent value={activeTab} className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Soal</CardTitle>
            <CardDescription>
              {examId 
                ? "Kelola soal untuk ujian ini" 
                : "Kelola seluruh soal dalam bank soal"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada soal ditemukan</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <QuestionListItem
                    key={question.id}
                    question={question}
                    onView={() => onViewQuestion(question)}
                    onEdit={() => onEditQuestion(question)}
                    onDelete={() => onDeleteQuestion(question.id)}
                    onDuplicate={() => onDuplicateQuestion(question)}
                    examContext={!!examId}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default QuestionBankTabs;
