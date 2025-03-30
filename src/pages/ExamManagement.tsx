
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useExamManagement } from "@/hooks/useExamManagement";
import ExamFilters from "@/components/exam/ExamFilters";
import ExamListItem from "@/components/exam/ExamListItem";
import NewExamDialog from "@/components/exam/NewExamDialog";

const ExamManagement = () => {
  const { user } = useAuth();
  const { activeTab, searchQuery, filteredExams, handleTabChange, handleSearch } = useExamManagement();

  return (
    <DashboardLayout title="Manajemen Ujian">
      <div className="space-y-6">
        <Dialog>
          <ExamFilters 
            searchQuery={searchQuery} 
            onSearchChange={handleSearch} 
          />
          <NewExamDialog />
        </Dialog>
        
        <Tabs defaultValue="all" onValueChange={handleTabChange}>
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
                      <ExamListItem key={exam.id} exam={exam} />
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
    </DashboardLayout>
  );
};

export default ExamManagement;
