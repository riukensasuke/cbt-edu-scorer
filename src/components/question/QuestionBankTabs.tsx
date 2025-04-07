
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import QuestionListItemModified from './QuestionListItemModified';
import { QuestionType } from '@/hooks/useQuestionBank';
import { FileQuestion, List, CheckSquare, AlertTriangle } from 'lucide-react';

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
  // Helper function to count questions by type
  const countQuestionsByType = (type: string) => {
    if (type === 'all') return filteredQuestions.length;
    return filteredQuestions.filter(q => q.type === type).length;
  };

  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-4 mb-4">
        <TabsTrigger value="all" className="relative">
          <List className="h-4 w-4 mr-1.5" />
          <span>Semua</span>
          <span className="ml-1.5 bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded-full absolute -top-1.5 -right-1.5">
            {countQuestionsByType('all')}
          </span>
        </TabsTrigger>
        <TabsTrigger value="multiple_choice" className="relative">
          <CheckSquare className="h-4 w-4 mr-1.5" />
          <span>Pilihan Ganda</span>
          <span className="ml-1.5 bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded-full absolute -top-1.5 -right-1.5">
            {countQuestionsByType('multiple_choice')}
          </span>
        </TabsTrigger>
        <TabsTrigger value="essay" className="relative">
          <FileQuestion className="h-4 w-4 mr-1.5" />
          <span>Essay</span>
          <span className="ml-1.5 bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded-full absolute -top-1.5 -right-1.5">
            {countQuestionsByType('essay')}
          </span>
        </TabsTrigger>
        <TabsTrigger value="true_false" className="relative">
          <AlertTriangle className="h-4 w-4 mr-1.5" />
          <span>Benar/Salah</span>
          <span className="ml-1.5 bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded-full absolute -top-1.5 -right-1.5">
            {countQuestionsByType('true_false')}
          </span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value={activeTab} className="mt-2">
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="pb-3 border-b bg-slate-50">
            <CardTitle className="text-xl font-semibold">Daftar Soal</CardTitle>
            <CardDescription>
              {examId 
                ? "Kelola soal untuk ujian ini" 
                : "Kelola seluruh soal dalam bank soal"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-10">
                <FileQuestion className="h-10 w-10 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Tidak ada soal ditemukan</p>
                <p className="text-gray-400 text-sm mt-1">
                  {activeTab !== 'all' 
                    ? `Tidak ada soal tipe ${activeTab === 'multiple_choice' ? 'pilihan ganda' : activeTab === 'essay' ? 'essay' : 'benar/salah'} yang tersedia.` 
                    : 'Tambahkan soal baru untuk memulai.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <QuestionListItemModified
                    key={question.id}
                    question={question}
                    onView={() => onViewQuestion(question)}
                    onEdit={() => onEditQuestion(question)}
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
