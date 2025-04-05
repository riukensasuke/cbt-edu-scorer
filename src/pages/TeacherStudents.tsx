
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, UserPlus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { downloadStudentData, generateSampleStudentData, StudentData } from "@/utils/studentDataDownload";

const TeacherStudents = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("6A");
  
  // Sample student data
  const classGroups = ["6A", "6B", "5A", "5B"];
  
  // Generate sample data for all classes
  const studentsByClass = {
    "6A": generateSampleStudentData(15, "6A"),
    "6B": generateSampleStudentData(14, "6B"),
    "5A": generateSampleStudentData(16, "5A"),
    "5B": generateSampleStudentData(13, "5B"),
  };
  
  // Filter students based on search query and active tab
  const filteredStudents = studentsByClass[activeTab as keyof typeof studentsByClass].filter(
    (student) => student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleDownloadData = () => {
    // Download data for the active class
    const success = downloadStudentData(studentsByClass[activeTab as keyof typeof studentsByClass], activeTab);
    
    if (success) {
      toast({
        title: "Data berhasil diunduh",
        description: `Data siswa kelas ${activeTab} telah diunduh`,
      });
    } else {
      toast({
        title: "Gagal mengunduh data",
        description: "Terjadi kesalahan saat mengunduh data siswa",
        variant: "destructive"
      });
    }
  };
  
  const handleAddStudent = () => {
    toast({
      title: "Tambah Siswa",
      description: "Fitur tambah siswa akan segera tersedia",
    });
  };
  
  const handleExportReport = () => {
    toast({
      title: "Ekspor Laporan",
      description: "Fitur ekspor laporan akan segera tersedia",
    });
  };
  
  return (
    <DashboardLayout title="Data Siswa">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari siswa..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button onClick={handleDownloadData} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Unduh Data
            </Button>
            <Button onClick={handleAddStudent} variant="outline" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Tambah Siswa
            </Button>
            <Button onClick={handleExportReport} variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Ekspor Laporan
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="6A" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-4">
            {classGroups.map((classGroup) => (
              <TabsTrigger key={classGroup} value={classGroup}>
                Kelas {classGroup}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Siswa Kelas {activeTab}</CardTitle>
                <CardDescription>
                  Total siswa: {filteredStudents.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>NISN</TableHead>
                      <TableHead>Jenis Kelamin</TableHead>
                      <TableHead>Nama Orang Tua</TableHead>
                      <TableHead>Telepon</TableHead>
                      <TableHead>Alamat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.nisn}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell>{student.parentName}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell className="max-w-xs truncate">{student.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredStudents.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Tidak ada siswa ditemukan</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherStudents;
