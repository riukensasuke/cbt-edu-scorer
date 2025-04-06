
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, SlidersHorizontal } from "lucide-react";
import { generateSampleStudentData, StudentData } from "@/utils/studentDataDownload";
import StudentActions from "@/components/student/StudentActions";

const TeacherStudents = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [selectedClass, setSelectedClass] = useState("6A");

  // Generate mock student data
  const students = generateSampleStudentData(30, "6A");
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>(students);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Filter students based on search query and selected class
    filterStudents(query, filterClass);
  };

  const handleClassChange = (classValue: string) => {
    setFilterClass(classValue);
    setSelectedClass(classValue === "all" ? "All" : classValue);
    
    // Filter students based on search query and selected class
    filterStudents(searchQuery, classValue);
  };

  const filterStudents = (query: string, classFilter: string) => {
    let filtered = students;
    
    // Filter by class if not "all"
    if (classFilter !== "all") {
      filtered = filtered.filter(student => student.class === classFilter);
    }
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(query.toLowerCase()) || 
        student.nisn.includes(query)
      );
    }
    
    setFilteredStudents(filtered);
  };

  return (
    <DashboardLayout title="Data Siswa">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari siswa..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Select
              value={filterClass}
              onValueChange={handleClassChange}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                <SelectItem value="6A">Kelas 6A</SelectItem>
                <SelectItem value="6B">Kelas 6B</SelectItem>
                <SelectItem value="5A">Kelas 5A</SelectItem>
                <SelectItem value="5B">Kelas 5B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <StudentActions className={selectedClass} />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Daftar Siswa {filterClass !== "all" ? `Kelas ${filterClass}` : ""}</CardTitle>
            <CardDescription>
              Kelola data siswa dan akses ujian
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Nama</th>
                    <th className="py-3 px-4 text-left font-medium">NISN</th>
                    <th className="py-3 px-4 text-left font-medium">Kelas</th>
                    <th className="py-3 px-4 text-left font-medium">Jenis Kelamin</th>
                    <th className="py-3 px-4 text-left font-medium">Nama Orang Tua</th>
                    <th className="py-3 px-4 text-left font-medium">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr key={student.id} className={`${index % 2 === 0 ? 'bg-muted/30' : 'bg-white'} hover:bg-muted/50`}>
                        <td className="py-3 px-4 border-t">{student.name}</td>
                        <td className="py-3 px-4 border-t">{student.nisn}</td>
                        <td className="py-3 px-4 border-t">{student.class}</td>
                        <td className="py-3 px-4 border-t">{student.gender}</td>
                        <td className="py-3 px-4 border-t">{student.parentName}</td>
                        <td className="py-3 px-4 border-t">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Hapus
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-muted-foreground">
                        Tidak ada data siswa yang ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherStudents;
