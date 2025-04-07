
import React, { useEffect, useState } from 'react';
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
import { ArrowLeft, ExternalLink, FileQuestion, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const QuestionBank = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getExam } = useExamData();
  const queryParams = new URLSearchParams(location.search);
  const examId = queryParams.get('examId');
  
  // State to track if the page has been loaded 
  const [pageLoaded, setPageLoaded] = useState(false);
  
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
    }
    
    // Mark page as loaded after the initial render
    setPageLoaded(true);
  }, [examId, currentExam, toast]);

  const handleBackToExams = () => {
    navigate('/exams');
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Bank Soal">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Memuat data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={currentExam ? `Soal Ujian: ${currentExam.title}` : "Bank Soal"}>
      <div className="space-y-6">
        {currentExam && (
          <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
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
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => navigate(`/exams/${examId}`)}
                className="shrink-0"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Lihat Detail Ujian
              </Button>
            </div>
          </div>
        )}

        {!pageLoaded ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-lg">Memuat data...</p>
            </div>
          </div>
        ) : isAddingQuestion ? (
          <Card className="border-t-4 border-t-primary shadow-md">
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Soal" : isViewOnly ? "Detail Soal" : "Tambah Soal Baru"}</CardTitle>
              <CardDescription>
                {isEditing 
                  ? "Modifikasi soal yang sudah ada" 
                  : isViewOnly 
                    ? "Lihat detail soal yang sudah ada"
                    : "Tambahkan soal baru ke bank soal"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedQuestion && (
                <Alert className="mb-6" variant={isViewOnly ? "default" : "info"}>
                  <FileQuestion className="h-4 w-4" />
                  <AlertTitle>{isViewOnly ? "Mode Lihat Soal" : "Mode Edit Soal"}</AlertTitle>
                  <AlertDescription>
                    {isViewOnly 
                      ? "Anda sedang melihat detail soal. Soal ini bisa diedit dengan mengklik tombol Edit."
                      : "Pastikan semua informasi soal terisi dengan benar sebelum menyimpan."}
                  </AlertDescription>
                </Alert>
              )}
              
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
              onSearchChange={(value) => handleSearch(value)}
              onAddQuestion={handleAddQuestion}
              examId={examId}
            />

            <QuestionBankTabs 
              activeTab={activeTab}
              onTabChange={handleTabChange}
              filteredQuestions={filteredQuestions}
              onViewQuestion={(question) => {
                console.log("Viewing question:", question);
                handleViewQuestion(question);
              }}
              onEditQuestion={(question) => {
                console.log("Editing question:", question);
                handleEditQuestion(question);
              }}
              onDeleteQuestion={(id) => {
                console.log("Deleting question:", id);
                handleDeleteQuestion(id);
              }}
              onDuplicateQuestion={handleDuplicateQuestion}
              examId={examId}
            />
          </>
        )}
        
        {!isAddingQuestion && filteredQuestions.length === 0 && (
          <Card className="mt-6 border border-dashed">
            <CardContent className="pt-6 pb-6 text-center">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Tidak ada soal ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Tidak ada soal yang sesuai dengan pencarian Anda." : "Belum ada soal tersedia dalam bank soal."}
              </p>
              <Button onClick={handleAddQuestion} className="mx-auto">
                Tambah Soal Baru
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default QuestionBank;
