
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Edit, 
  Trash2,
  Users,
  PlusCircle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Mock data for students by class
const mockStudentsByClass = {
  "4A": [
    {
      id: "student-3",
      name: "Budi Santoso",
      nisn: "0076543210",
      class: "4A",
      status: "active",
    },
    {
      id: "student-4",
      name: "Dewi Putri",
      nisn: "0076543211",
      class: "4A",
      status: "active",
    },
    {
      id: "student-5",
      name: "Eko Prasetyo",
      nisn: "0076543212",
      class: "4A",
      status: "active",
    },
  ],
  "5A": [
    {
      id: "student-2",
      name: "Siti Aminah",
      nisn: "0087654321",
      class: "5A",
      status: "active",
    },
    {
      id: "student-6",
      name: "Fajar Ramadhan",
      nisn: "0087654322",
      class: "5A",
      status: "active",
    },
    {
      id: "student-7",
      name: "Gita Nirmala",
      nisn: "0087654323",
      class: "5A",
      status: "active",
    },
  ],
  "6A": [
    {
      id: "student-1",
      name: "Muhammad Andi",
      nisn: "0098765432",
      class: "6A",
      status: "active",
    },
    {
      id: "student-8",
      name: "Hendra Wijaya",
      nisn: "0098765433",
      class: "6A",
      status: "active",
    },
    {
      id: "student-9",
      name: "Indah Permata",
      nisn: "0098765434",
      class: "6A",
      status: "active",
    },
  ],
};

const TeacherStudents = () => {
  const [activeTab, setActiveTab] = useState("4A");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(mockStudentsByClass["4A"]);
  const { toast } = useToast();
  
  // Filter function
  const filterStudents = (className: string, search: string) => {
    let filtered = [...(mockStudentsByClass[className as keyof typeof mockStudentsByClass] || [])];
    
    // Filter by search query
    if (search) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.nisn.includes(search)
      );
    }
    
    setFilteredStudents(filtered);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterStudents(value, searchQuery);
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterStudents(activeTab, query);
  };
  
  // Export students to Excel
  const exportToExcel = () => {
    // Create workbook with student data
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents.map(student => ({
      Nama: student.name,
      NISN: student.nisn,
      Kelas: student.class,
      Status: student.status === 'active' ? 'Aktif' : 'Tidak Aktif'
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Siswa ${activeTab}`);
    
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Save file
    saveAs(blob, `Data_Siswa_${activeTab}.xlsx`);
    
    toast({
      title: "Data berhasil diexport",
      description: `Data siswa kelas ${activeTab} telah diexport ke Excel`
    });
  };
  
  // Import students from Excel
  const importFromExcel = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          
          const importedStudents = XLSX.utils.sheet_to_json(worksheet);
          
          toast({
            title: "Data berhasil diimport",
            description: `${importedStudents.length} data siswa telah diimport ke kelas ${activeTab}`
          });
          
          // In a real app, this would process and save the imported students
        } catch (error) {
          toast({
            title: "Gagal import data",
            description: "Format file tidak valid",
            variant: "destructive"
          });
        }
      };
      reader.readAsArrayBuffer(file);
    };
    input.click();
  };

  // Handle edit student
  const handleEditStudent = (studentId: string) => {
    const student = filteredStudents.find(s => s.id === studentId);
    
    toast({
      title: "Edit siswa",
      description: `Mengedit data siswa: ${student?.name}`
    });
    
    // In a real app, this would open an edit form with student data
  };
  
  // Handle delete student
  const handleDeleteStudent = (studentId: string) => {
    const student = filteredStudents.find(s => s.id === studentId);
    
    toast({
      title: "Hapus siswa",
      description: `Siswa ${student?.name} telah dihapus dari kelas ${activeTab}`,
      variant: "destructive"
    });
    
    // In a real app, this would delete the student from the database
  };

  return (
    <DashboardLayout title="Data Siswa">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari siswa..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <Button onClick={() => toast({ title: "Fitur dalam pengembangan", description: "Fitur tambah siswa akan segera tersedia" })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Tambah Siswa
            </Button>
            
            <Button variant="secondary" onClick={exportToExcel}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            
            <Button variant="outline" onClick={importFromExcel}>
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="4A" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="4A">Kelas 4A</TabsTrigger>
            <TabsTrigger value="5A">Kelas 5A</TabsTrigger>
            <TabsTrigger value="6A">Kelas 6A</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Siswa {activeTab}</CardTitle>
                <CardDescription>
                  Kelola data siswa di kelas {activeTab}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-green-500" />
                            <h3 className="font-medium">{student.name}</h3>
                          </div>
                          <Badge 
                            className={student.status === "active" ? "bg-green-500" : "bg-gray-500"}
                          >
                            {student.status === "active" ? "Aktif" : "Tidak Aktif"}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-muted-foreground">NISN:</span>{" "}
                            {student.nisn}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Kelas:</span>{" "}
                            {student.class}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditStudent(student.id)}>
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Hapus
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">Tidak ada siswa ditemukan</p>
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

export default TeacherStudents;
