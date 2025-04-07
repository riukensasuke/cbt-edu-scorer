
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
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExamManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { activeTab, searchQuery, filteredExams, handleTabChange, handleSearch, deleteExam } = useExamManagement();
  const { getExam, createExam } = useExamData();
  const [isNewExamDialogOpen, setIsNewExamDialogOpen] = useState(false);

  // Handle view exam
  const handleViewExam = (examId: string) => {
    if (!examId) return;
    
    // Check if exam exists before navigating
    const exam = getExam(examId);
    if (exam) {
      console.log("Viewing exam with ID:", examId);
      navigate(`/exams/${examId}`);
    } else {
      toast({
        title: "Error",
        description: "Ujian tidak ditemukan",
        variant: "destructive",
      });
    }
  };

  // Handle edit exam
  const handleEditExam = (examId: string) => {
    if (!examId) return;
    
    // Check if exam exists before navigating
    const exam = getExam(examId);
    if (exam) {
      console.log("Editing exam with ID:", examId);
      navigate(`/exams/edit/${examId}`);
    } else {
      toast({
        title: "Error",
        description: "Ujian tidak ditemukan",
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
        description: "Ujian tidak ditemukan",
        variant: "destructive",
      });
    }
  };

  // Handle view questions for an exam
  const handleViewQuestions = (examId: string) => {
    if (!examId) return;
    
    // Check if exam exists before navigating
    const exam = getExam(examId);
    if (exam) {
      toast({
        title: "Lihat Soal",
        description: `Melihat soal untuk ujian "${exam.title}"`,
      });
      navigate(`/questions?examId=${examId}`);
    } else {
      toast({
        title: "Error",
        description: "Ujian tidak ditemukan",
        variant: "destructive",
      });
    }
  };

  // Handle add new exam
  const handleExamCreated = (examData: any) => {
    createExam(examData);
  };

  return (
    <DashboardLayout title="Manajemen Ujian">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <ExamFilters 
              searchQuery={searchQuery} 
              onSearchChange={handleSearch} 
            />
          </div>
          <NewExamDialog 
            open={isNewExamDialogOpen} 
            onOpenChange={setIsNewExamDialogOpen}
            onExamCreated={handleExamCreated}
          />
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="scheduled">Terjadwal</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle>Daftar Ujian</CardTitle>
                    <CardDescription>
                      Kelola semua ujian yang telah dibuat
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setIsNewExamDialogOpen(true)} 
                    size="default" 
                    className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Buat Ujian Baru
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ExamList 
                  exams={filteredExams}
                  onDelete={deleteExam}
                  onView={handleViewExam}
                  onEdit={handleEditExam}
                  onDuplicate={handleDuplicateExam}
                  onViewQuestions={handleViewQuestions}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ExamManagement;
