
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddStudentDialog from "@/components/student/AddStudentDialog";

// Mock student data
const initialStudents = [
  {
    id: "student-1",
    name: "Ahmad Fadillah",
    nisn: "0056781234",
    gender: "male",
    classId: "class-1",
    className: "Kelas 6A",
    address: "Jl. Merdeka No. 123",
    parentName: "Budi Santoso",
    phoneNumber: "081234567890"
  },
  {
    id: "student-2",
    name: "Siti Nuraini",
    nisn: "0056782345",
    gender: "female",
    classId: "class-1",
    className: "Kelas 6A",
    address: "Jl. Pahlawan No. 45",
    parentName: "Ahmad Hidayat",
    phoneNumber: "081234567891"
  },
  {
    id: "student-3",
    name: "Budi Pratama",
    nisn: "0056783456",
    gender: "male",
    classId: "class-1",
    className: "Kelas 6A",
    address: "Jl. Sudirman No. 78",
    parentName: "Dodi Santoso",
    phoneNumber: "081234567892"
  },
  {
    id: "student-4",
    name: "Dina Maharani",
    nisn: "0056784567",
    gender: "female",
    classId: "class-1",
    className: "Kelas 6A",
    address: "Jl. Gatot Subroto No. 12",
    parentName: "Eko Prasetyo",
    phoneNumber: "081234567893"
  }
];

const TeacherStudents = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter students based on search
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.nisn.includes(searchQuery) ||
    student.className.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleAddStudent = (newStudent: any) => {
    setStudents(prev => [...prev, newStudent]);
  };
  
  const handleDownloadData = () => {
    toast({
      title: "Data siswa diunduh",
      description: "Data siswa telah berhasil diunduh dalam format Excel"
    });
  };

  return (
    <DashboardLayout title="Data Siswa">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari siswa..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleDownloadData}>
              <Download className="mr-2 h-4 w-4" />
              Unduh Data
            </Button>
            <AddStudentDialog onAddStudent={handleAddStudent} />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Daftar Siswa</CardTitle>
            <CardDescription>
              Menampilkan data siswa yang berada di kelas yang diajar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>NISN</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Jenis Kelamin</TableHead>
                  <TableHead>Nama Wali</TableHead>
                  <TableHead>Telepon</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.nisn}</TableCell>
                      <TableCell>{student.className}</TableCell>
                      <TableCell>
                        {student.gender === 'male' ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Laki-laki</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">Perempuan</Badge>
                        )}
                      </TableCell>
                      <TableCell>{student.parentName}</TableCell>
                      <TableCell>{student.phoneNumber}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Tidak ada siswa ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherStudents;
