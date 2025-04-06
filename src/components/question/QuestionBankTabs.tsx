
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QuestionType } from './QuestionListItem';

interface QuestionBankTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  filteredQuestions: QuestionType[];
  onViewQuestion: (question: QuestionType) => void;
  onEditQuestion: (question: QuestionType) => void;
  onDeleteQuestion: (id: string) => void;
  onDuplicateQuestion: (question: QuestionType) => void;
}

const QuestionBankTabs: React.FC<QuestionBankTabsProps> = ({
  activeTab,
  onTabChange,
  filteredQuestions,
  onViewQuestion,
  onEditQuestion,
  onDeleteQuestion,
  onDuplicateQuestion
}) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="all">Semua</TabsTrigger>
        <TabsTrigger value="multiple_choice">Pilihan Ganda</TabsTrigger>
        <TabsTrigger value="multiple_choice_complex">PG Kompleks</TabsTrigger>
        <TabsTrigger value="true_false">Benar/Salah</TabsTrigger>
        <TabsTrigger value="essay">Essay</TabsTrigger>
        <TabsTrigger value="matching">Menjodohkan</TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Soal</CardTitle>
            <CardDescription>
              Kelola soal ujian yang tersedia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuestionBankList 
              questions={filteredQuestions}
              onViewQuestion={onViewQuestion}
              onEditQuestion={onEditQuestion}
              onDeleteQuestion={onDeleteQuestion}
              onDuplicateQuestion={onDuplicateQuestion}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

// Internal component for the list of questions
const QuestionBankList = ({ 
  questions, 
  onViewQuestion, 
  onEditQuestion, 
  onDeleteQuestion, 
  onDuplicateQuestion 
}: { 
  questions: QuestionType[],
  onViewQuestion: (question: QuestionType) => void,
  onEditQuestion: (question: QuestionType) => void,
  onDeleteQuestion: (id: string) => void,
  onDuplicateQuestion: (question: QuestionType) => void
}) => {
  const QuestionListItem = React.lazy(() => import('./QuestionListItem'));

  if (questions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Tidak ada soal ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <React.Suspense key={question.id} fallback={<div>Loading...</div>}>
          <QuestionListItem 
            question={question} 
            onPreview={onViewQuestion} 
            onEdit={onEditQuestion}
            onDelete={onDeleteQuestion}
            onDuplicate={onDuplicateQuestion}
          />
        </React.Suspense>
      ))}
    </div>
  );
};

export default QuestionBankTabs;
