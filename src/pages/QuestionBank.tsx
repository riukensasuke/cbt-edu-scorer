
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
import { 
  ArrowLeft, 
  ExternalLink, 
  FileQuestion, 
  HelpCircle,
  Upload,
  FileUp,
  Download
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { downloadQuestionTemplate } from '@/utils/ExcelTemplateDownload';

const QuestionBank = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getExam } = useExamData();
  const queryParams = new URLSearchParams(location.search);
  const examId = queryParams.get('examId');
  
  // State to track if the page has been loaded 
  const [pageLoaded, setPageLoaded] = useState(false);
  // State for the upload dialog
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
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
    handleUploadQuestions
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

  const handleUploadClick = () => {
    setIsUploadDialogOpen(true);
  };

  const handleDownloadTemplate = () => {
    // Use our template download function
    const result = downloadQuestionTemplate();
    
    if (result) {
      toast({
        title: "Template Diunduh",
        description: "Template untuk upload soal telah diunduh"
      });
    } else {
      toast({
        title: "Kesalahan",
        description: "Terjadi kesalahan saat mengunduh template",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      toast({
        title: "File Diterima",
        description: `File "${file.name}" dipilih`,
      });
    }
  };

  const handleProcessUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Peringatan",
        description: "Silakan pilih file terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "File Diproses",
      description: `File "${selectedFile.name}" sedang diproses`,
    });
    
    // Simulate processing
    setTimeout(() => {
      // Create mock questions from upload
      const mockUploadedQuestions = [
        {
          id: `q${Date.now()}-1`,
          question: "Soal dari file: Berapakah hasil dari 10 x 5?",
          type: "multiple_choice",
          difficulty: "easy",
          subject: "Matematika",
          grade: "Kelas 4",
          options: ["40", "50", "60", "70"],
          correctAnswer: "50",
          createdBy: "Admin",
          createdAt: new Date().toISOString().split('T')[0],
        },
        {
          id: `q${Date.now()}-2`,
          question: "Soal dari file: Apa nama ibukota Indonesia?",
          type: "multiple_choice",
          difficulty: "easy",
          subject: "IPS",
          grade: "Kelas 3",
          options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
          correctAnswer: "Jakarta",
          createdBy: "Admin",
          createdAt: new Date().toISOString().split('T')[0],
        }
      ];
      
      // Add the uploaded questions to the bank
      handleUploadQuestions(mockUploadedQuestions);
      
      // Close the dialog
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
      
      toast({
        title: "Upload Berhasil",
        description: `${mockUploadedQuestions.length} soal berhasil ditambahkan ke bank soal`
      });
    }, 1500);
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
                <Alert className="mb-6" variant="default">
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
              onUploadClick={handleUploadClick}
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

      {/* Dialog for uploading questions */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Soal</DialogTitle>
            <DialogDescription>
              Upload file Excel berisi soal-soal untuk ditambahkan ke bank soal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Unggah file soal</p>
              <p className="text-xs text-muted-foreground mb-4">Format Excel (.xlsx, .xls)</p>
              <input
                type="file"
                id="question-upload"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
              />
              <label htmlFor="question-upload">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>Pilih File</span>
                </Button>
              </label>
              {selectedFile && (
                <div className="mt-4 text-sm">
                  <span className="font-medium">File terpilih:</span> {selectedFile.name}
                </div>
              )}
            </div>
            
            <div className="bg-muted/50 p-3 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileUp className="h-5 w-5 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-sm font-medium">Unduh Template</p>
                    <p className="text-xs text-muted-foreground">Format standar untuk upload soal</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleDownloadTemplate}
                  className="text-primary"
                  id="download-template-btn"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Unduh
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Batal
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleProcessUpload}
              disabled={!selectedFile}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default QuestionBank;
