
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from "@/components/DashboardLayout";
import QuestionForm from "@/components/question/QuestionForm";
import QuestionBankHeader from '@/components/question/QuestionBankHeader';
import QuestionBankTabs from '@/components/question/QuestionBankTabs';
import { useQuestionBank } from '@/hooks/useQuestionBank';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { useExamData } from '@/hooks/useExamData';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const QuestionBank = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getExam } = useExamData();
  const queryParams = new URLSearchParams(location.search);
  const examId = queryParams.get('examId');
  
  const {
    activeTab,
    searchQuery,
    filteredQuestions,
    isAddingQuestion,
    isEditing,
    isViewOnly,
    selectedQuestion,
    isLoading,
    handleAddQuestion,
    handleEditQuestion,
    handleViewQuestion,
    handleDuplicateQuestion,
    handleSaveQuestion,
    handleDeleteQuestion,
    handleSearch,
    handleTabChange,
    handleCancel,
  } = useQuestionBank();

  // If we have an examId in the URL, fetch that exam's details
  const currentExam = examId ? getExam(examId) : null;

  useEffect(() => {
    if (examId && currentExam) {
      toast({
        title: "Soal Ujian",
        description: `Menampilkan soal untuk ujian "${currentExam.title}"`,
      });
      
      // Here you would normally filter questions based on the examId
      // For now, we're using the mock data
    }
  }, [examId, currentExam]);

  const handleBackToExams = () => {
    navigate('/exams');
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Bank Soal">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Memuat data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={currentExam ? `Soal Ujian: ${currentExam.title}` : "Bank Soal"}>
      <div className="space-y-6">
        {currentExam && (
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" onClick={handleBackToExams} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Daftar Ujian
            </Button>
            <div>
              <h2 className="text-xl font-semibold">{currentExam.title}</h2>
              <p className="text-sm text-muted-foreground">
                {currentExam.subject} • {currentExam.grade} • {currentExam.questions} soal
              </p>
            </div>
          </div>
        )}

        {isAddingQuestion ? (
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Soal" : "Tambah Soal Baru"}</CardTitle>
              <CardDescription>
                {isEditing 
                  ? "Modifikasi soal yang sudah ada" 
                  : "Tambahkan soal baru ke bank soal"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuestionForm 
                initialValues={selectedQuestion} 
                onSubmit={handleSaveQuestion} 
                onCancel={handleCancel}
                isEditing={isEditing}
                isViewOnly={isViewOnly}
              />
            </CardContent>
          </Card>
        ) : (
          <>
            <QuestionBankHeader 
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              onAddQuestion={handleAddQuestion}
              examId={examId}
            />

            <QuestionBankTabs 
              activeTab={activeTab}
              onTabChange={handleTabChange}
              filteredQuestions={filteredQuestions}
              onViewQuestion={handleViewQuestion}
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onDuplicateQuestion={handleDuplicateQuestion}
              examId={examId}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default QuestionBank;
