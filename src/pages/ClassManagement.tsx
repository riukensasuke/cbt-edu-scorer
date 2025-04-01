
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Upload,
  Edit,
  Trash2,
  Search,
  Plus,
  Users,
  FileSpreadsheet,
  UserPlus
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { exportToExcel, readExcelFile } from "@/utils/excelUtils";

const mockClasses = [
  {
    id: "1",
    name: "1A",
    teacher: "Ibu Siti",
    studentCount: 25,
    year: "2023/2024"
  },
  {
    id: "2",
    name: "1B",
    teacher: "Ibu Rini",
    studentCount: 24,
    year: "2023/2024"
  },
  {
    id: "3",
    name: "2A",
    teacher: "Bapak Ahmad",
    studentCount: 26,
    year: "2023/2024"
  },
  {
    id: "4",
    name: "2B", 
    teacher: "Ibu Siti",
    studentCount: 25,
    year: "2023/2024"
  },
  {
    id: "5",
    name: "3A",
    teacher: "Ibu Rini",
    studentCount: 27,
    year: "2023/2024"
  },
  {
    id: "6",
    name: "3B",
    teacher: "Bapak Ahmad",
    studentCount: 26,
    year: "2023/2024"
  },
  {
    id: "7",
    name: "4A",
    teacher: "Ibu Siti",
    studentCount: 28,
    year: "2023/2024"
  },
  {
    id: "8",
    name: "4B",
    teacher: "Bapak Ahmad",
    studentCount: 27,
    year: "2023/2024"
  },
  {
    id: "9",
    name: "5A",
    teacher: "Ibu Rini",
    studentCount: 25,
    year: "2023/2024"
  },
  {
    id: "10",
    name: "5B",
    teacher: "Bapak Ahmad",
    studentCount: 24,
    year: "2023/2024"
  },
  {
    id: "11",
    name: "6A",
    teacher: "Ibu Siti",
    studentCount: 28,
    year: "2023/2024"
  },
  {
    id: "12",
    name: "6B",
    teacher: "Ibu Rini",
    studentCount: 27,
    year: "2023/2024"
  }
];

const mockStudents = [
  {
    id: "1",
    name: "Muhammad Andi",
    nisn: "0098765432",
    gender: "Laki-laki"
  },
  {
    id: "2",
    name: "Siti Aminah",
    nisn: "0087654321",
    gender: "Perempuan"
  },
  {
    id: "3",
    name: "Budi Santoso",
    nisn: "0076543210",
    gender: "Laki-laki"
  },
  {
    id: "4",
    name: "Dewi Lestari",
    nisn: "0065432109",
    gender: "Perempuan"
  },
  {
    id: "5",
    name: "Agus Hermawan",
    nisn: "0054321098",
    gender: "Laki-laki"
  }
];

const ClassManagement = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [studentsForClass, setStudentsForClass] = useState<typeof mockStudents>([]);
  const { toast } = useToast();
  
  const filteredClasses = mockClasses.filter(cls => 
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const viewStudents = (classId: string) => {
    setSelectedClass(classId);
    setStudentsForClass(mockStudents);
  };
  
  const exportToExcelHandler = (classId: string) => {
    const classToExport = mockClasses.find(c => c.id === classId);
    
    if (!classToExport) return;
    
    const dataToExport = mockStudents.map(student => ({
      'Nama': student.name,
      'NISN': student.nisn,
      'Jenis Kelamin': student.gender,
      'Kelas': classToExport.name
    }));
    
    exportToExcel(dataToExport, `Data_Siswa_${classToExport.name}`);
    
    toast({
      title: "Data berhasil diekspor",
      description: `Data siswa kelas ${classToExport.name} telah diekspor ke Excel`
    });
  };
  
  const importStudents = (classId: string) => {
    const classToImport = mockClasses.find(c => c.id === classId);
    
    if (!classToImport) return;
    
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    
    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const importedStudents = await readExcelFile(file);
          
          toast({
            title: "Data berhasil diimpor",
            description: `${importedStudents.length} data siswa telah diimpor ke kelas ${classToImport.name}`
          });
        } catch (error) {
          toast({
            title: "Gagal mengimpor data",
            description: "Format file tidak valid",
            variant: "destructive"
          });
        }
      }
    };
    
    input.click();
  };

  return (
    <DashboardLayout title="Manajemen Kelas">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari kelas..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Tambah Kelas
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Kelas Baru</DialogTitle>
                  <DialogDescription>
                    Masukkan informasi kelas baru.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="className" className="text-sm font-medium">Nama Kelas</label>
                    <Input id="className" placeholder="Contoh: 6A" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="teacher" className="text-sm font-medium">Guru Kelas</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih guru" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher-1">Ibu Siti</SelectItem>
                        <SelectItem value="teacher-2">Bapak Ahmad</SelectItem>
                        <SelectItem value="teacher-3">Ibu Rini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="academicYear" className="text-sm font-medium">Tahun Ajaran</label>
                    <Select defaultValue="2023/2024">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tahun ajaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023/2024">2023/2024</SelectItem>
                        <SelectItem value="2024/2025">2024/2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Batal</Button>
                  </DialogClose>
                  <Button type="submit">Simpan Kelas</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((cls) => (
            <Card key={cls.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Kelas {cls.name}</CardTitle>
                  <Badge className="ml-2">{cls.year}</Badge>
                </div>
                <CardDescription>
                  Guru Kelas: {cls.teacher}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                    <span>{cls.studentCount} Siswa</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => viewStudents(cls.id)}
                  >
                    <Users className="h-4 w-4 mr-1" /> Lihat Siswa
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => exportToExcelHandler(cls.id)}
                  >
                    <Download className="h-4 w-4 mr-1" /> Export
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => importStudents(cls.id)}
                  >
                    <Upload className="h-4 w-4 mr-1" /> Import
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {selectedClass && (
          <Dialog open={!!selectedClass} onOpenChange={(open) => !open && setSelectedClass(null)}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>
                  Siswa Kelas {mockClasses.find(c => c.id === selectedClass)?.name}
                </DialogTitle>
                <DialogDescription>
                  Daftar siswa dalam kelas ini
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Input 
                    type="search" 
                    placeholder="Cari siswa..." 
                    className="w-64" 
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-1" /> Tambah
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => exportToExcelHandler(selectedClass)}
                  >
                    <Download className="h-4 w-4 mr-1" /> Export
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => importStudents(selectedClass)}
                  >
                    <Upload className="h-4 w-4 mr-1" /> Import
                  </Button>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead>NISN</TableHead>
                      <TableHead>Jenis Kelamin</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsForClass.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.nisn}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Tutup</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClassManagement;
