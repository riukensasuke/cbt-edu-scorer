
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useExamManagement } from "@/hooks/useExamManagement";
import { useExamData } from "@/hooks/useExamData";
import ExamFilters from "@/components/exam/ExamFilters";
import ExamListItem from "@/components/exam/ExamListItem";
import NewExamDialog from "@/components/exam/NewExamDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExamManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { activeTab, searchQuery, filteredExams, handleTabChange, handleSearch, deleteExam } = useExamManagement();
  const [isNewExamDialogOpen, setIsNewExamDialogOpen] = useState(false);

  // Handle view exam
  const handleViewExam = (examId: string) => {
    console.log("Viewing exam with ID:", examId);
    navigate(`/exams/${examId}`);
  };

  // Handle edit exam
  const handleEditExam = (examId: string) => {
    console.log("Editing exam with ID:", examId);
    navigate(`/exams/edit/${examId}`);
  };

  return (
    <DashboardLayout title="Manajemen Ujian">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full sm:w-64">
            <ExamFilters 
              searchQuery={searchQuery} 
              onSearchChange={handleSearch} 
            />
          </div>
          <Button onClick={() => setIsNewExamDialogOpen(true)} size="default" className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Buat Ujian Baru
          </Button>
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
                <CardTitle>Daftar Ujian</CardTitle>
                <CardDescription>
                  Kelola semua ujian yang telah dibuat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredExams.length > 0 ? (
                    filteredExams.map((exam) => (
                      <ExamListItem 
                        key={exam.id} 
                        exam={exam} 
                        onDelete={deleteExam}
                        onView={handleViewExam}
                        onEdit={handleEditExam} 
                      />
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">Tidak ada ujian ditemukan</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <NewExamDialog 
        open={isNewExamDialogOpen} 
        onOpenChange={setIsNewExamDialogOpen} 
      />
    </DashboardLayout>
  );
};

export default ExamManagement;
