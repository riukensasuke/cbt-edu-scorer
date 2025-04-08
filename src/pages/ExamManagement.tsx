import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useExamManagement } from "@/hooks/useExamManagement";
import { useExamData } from "@/hooks/useExamData";
import ExamFilters from "@/components/exam/ExamFilters";
import ExamList from "@/components/exam/ExamList";
import NewExamDialog from "@/components/exam/NewExamDialog";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExamManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { activeTab, searchQuery, filteredExams, handleTabChange, handleSearch, deleteExam } = useExamManagement();
  const { getExam, createExam, examsList } = useExamData();
  const [isNewExamDialogOpen, setIsNewExamDialogOpen] = useState(false);

  // Handle view exam
  const handleViewExam = (examId: string) => {
    if (!examId) return;
    
    // Use try-catch to handle potential errors
    try {
      console.log("Viewing exam with ID:", examId);
      console.log("Available exams:", examsList);
      
      // Check if exam exists before navigating
      const exam = getExam(examId);
      if (exam) {
        console.log("Found exam:", exam);
        navigate(`/exams/${examId}`);
      } else {
        console.error("Exam not found:", examId);
        toast({
          title: "Error",
          description: "Ujian tidak ditemukan. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error viewing exam:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat membuka ujian",
        variant: "destructive",
      });
    }
  };

  // Handle edit exam
  const handleEditExam = (examId: string) => {
    if (!examId) return;
    
    try {
      console.log("Editing exam with ID:", examId);
      // Check if exam exists before navigating
      const exam = getExam(examId);
      if (exam) {
        console.log("Found exam for editing:", exam);
        navigate(`/exams/edit/${examId}`);
      } else {
        console.error("Exam not found for editing:", examId);
        toast({
          title: "Error",
          description: "Ujian tidak ditemukan untuk diedit",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error editing exam:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengedit ujian",
        variant: "destructive",
      });
    }
  };

  // Handle duplicate exam
  const handleDuplicateExam = (examId: string) => {
    if (!examId) return;
    
    // Check if exam exists before duplicating
    const exam = getExam(examId);
    if (exam) {
      // Create a duplicate with a new ID
      const duplicatedExam = {
        ...exam,
        id: `exam-${Date.now()}`,
        title: `${exam.title} (Salinan)`,
        status: "draft",
      };
      
      // Add the duplicated exam
      createExam(duplicatedExam);
      
      toast({
        title: "Ujian berhasil diduplikasi",
        description: `Salinan dari "${exam.title}" telah dibuat`,
      });
    } else {
      toast({
        title: "Error",
        description: "Ujian tidak ditemukan untuk diduplikasi",
        variant: "destructive",
      });
    }
  };

  // Handle view questions for an exam
  const handleViewQuestions = (examId: string) => {
    if (!examId) return;
    
    try {
      console.log("Viewing questions for exam ID:", examId);
      // Check if exam exists before navigating
      const exam = getExam(examId);
      if (exam) {
        console.log("Found exam for questions:", exam);
        toast({
          title: "Lihat Soal",
          description: `Melihat soal untuk ujian "${exam.title}"`,
        });
        navigate(`/questions?examId=${examId}`);
      } else {
        console.error("Exam not found for viewing questions:", examId);
        toast({
          title: "Error",
          description: "Ujian tidak ditemukan untuk melihat soal",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error viewing questions:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat melihat soal ujian",
        variant: "destructive",
      });
    }
  };

  // Handle add new exam
  const handleExamCreated = (examData: any) => {
    createExam(examData);
    toast({
      title: "Berhasil",
      description: "Ujian baru telah dibuat dan disimpan",
    });
  };

  return (
    <DashboardLayout title="Manajemen Ujian">
      <div className="space-y-6">
        <Card className="bg-white shadow-md border border-gray-100">
          <CardHeader className="bg-slate-50 border-b pb-3">
            <CardTitle className="text-xl font-semibold text-slate-800">Daftar Semua Ujian</CardTitle>
            <CardDescription>
              Kelola semua ujian, buat ujian baru, atau edit ujian yang sudah ada
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-64">
                <ExamFilters 
                  searchQuery={searchQuery} 
                  onSearchChange={handleSearch} 
                />
              </div>
              <Button 
                id="create-exam-btn"
                onClick={() => setIsNewExamDialogOpen(true)} 
                size="default" 
                className="bg-green-600 hover:bg-green-700 w-full sm:w-auto transition-colors duration-200"
              >
                <Plus className="mr-2 h-4 w-4" />
                Buat Ujian Baru
              </Button>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="all" className="text-sm">Semua</TabsTrigger>
                <TabsTrigger value="active" className="text-sm">Aktif</TabsTrigger>
                <TabsTrigger value="scheduled" className="text-sm">Terjadwal</TabsTrigger>
                <TabsTrigger value="draft" className="text-sm">Draft</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                <ExamList 
                  exams={filteredExams}
                  onDelete={(id) => {
                    deleteExam(id);
                    toast({
                      title: "Ujian dihapus",
                      description: "Ujian telah berhasil dihapus dari sistem",
                    });
                  }}
                  onView={handleViewExam}
                  onEdit={handleEditExam}
                  onDuplicate={handleDuplicateExam}
                  onViewQuestions={handleViewQuestions}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Petunjuk Penggunaan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">1</span>
                  <span>Klik tombol "Buat Ujian Baru" untuk membuat ujian baru</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">2</span>
                  <span>Gunakan filter dan pencarian untuk menemukan ujian tertentu</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">3</span>
                  <span>Klik "Lihat Soal" untuk mengelola soal-soal dalam ujian</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 shrink-0 mt-0.5">4</span>
                  <span>Status "Aktif" berarti ujian sedang berlangsung, "Terjadwal" berarti ujian akan datang, dan "Draft" berarti ujian masih dalam persiapan</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Statistik Ujian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{filteredExams.filter(e => e.status === "active").length}</p>
                  <p className="text-xs text-slate-600">Ujian Aktif</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-amber-600">{filteredExams.filter(e => e.status === "scheduled").length}</p>
                  <p className="text-xs text-slate-600">Terjadwal</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-slate-600">{filteredExams.filter(e => e.status === "draft").length}</p>
                  <p className="text-xs text-slate-600">Draft</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-slate-500">
                  Total {filteredExams.length} ujian tersedia dalam sistem. Kelola ujian dengan mengklik tombol aksi di setiap ujian.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <NewExamDialog 
        open={isNewExamDialogOpen} 
        onOpenChange={setIsNewExamDialogOpen}
        onExamCreated={handleExamCreated}
      />
    </DashboardLayout>
  );
};

export default ExamManagement;
