
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

// Updated to show just grade levels
const mockClasses = [
  {
    id: "1",
    name: "Kelas 1",
    teacher: "Ibu Siti",
    studentCount: 49,
    year: "2023/2024"
  },
  {
    id: "2",
    name: "Kelas 2",
    teacher: "Ibu Rini",
    studentCount: 50,
    year: "2023/2024"
  },
  {
    id: "3",
    name: "Kelas 3",
    teacher: "Bapak Ahmad",
    studentCount: 53,
    year: "2023/2024"
  },
  {
    id: "4",
    name: "Kelas 4", 
    teacher: "Ibu Siti",
    studentCount: 55,
    year: "2023/2024"
  },
  {
    id: "5",
    name: "Kelas 5",
    teacher: "Bapak Eko",
    studentCount: 52,
    year: "2023/2024"
  },
  {
    id: "6",
    name: "Kelas 6",
    teacher: "Bapak Agus",
    studentCount: 55,
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
  },
  {
    id: "6",
    name: "Ratna Dewi",
    nisn: "0043219876",
    gender: "Perempuan"
  },
  {
    id: "7",
    name: "Eko Prasetyo",
    nisn: "0032198765",
    gender: "Laki-laki"
  },
  {
    id: "8",
    name: "Nurul Hidayah",
    nisn: "0021987654",
    gender: "Perempuan"
  },
  {
    id: "9",
    name: "Dian Permata",
    nisn: "0010987654",
    gender: "Perempuan"
  },
  {
    id: "10",
    name: "Faisal Akbar",
    nisn: "0009876543",
    gender: "Laki-laki"
  }
];

const ClassManagement = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [studentsForClass, setStudentsForClass] = useState<typeof mockStudents>([]);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: "",
    teacher: "",
    year: "2023/2024"
  });
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    nisn: "",
    gender: "Laki-laki"
  });
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<typeof mockStudents[0] | null>(null);
  
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
      description: `Data siswa ${classToExport.name} telah diekspor ke Excel`
    });
  };
  
  const importStudents = (classId: string) => {
    const classToImport = mockClasses.find(c => c.id === classId);
    
    if (!classToImport) return;
    
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
            description: `${importedStudents.length} data siswa telah diimpor ke ${classToImport.name}`
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
  
  const handleAddClass = () => {
    toast({
      title: "Kelas baru ditambahkan",
      description: `${newClass.name} dengan guru ${newClass.teacher} berhasil ditambahkan`
    });
    
    setNewClass({
      name: "",
      teacher: "",
      year: "2023/2024"
    });
    
    setIsAddClassModalOpen(false);
  };
  
  const handleAddStudent = () => {
    toast({
      title: "Siswa baru ditambahkan",
      description: `Siswa ${newStudent.name} berhasil ditambahkan ke kelas`
    });
    
    setNewStudent({
      name: "",
      nisn: "",
      gender: "Laki-laki"
    });
    
    setIsAddStudentModalOpen(false);
  };
  
  const handleEditStudent = () => {
    if (!editingStudent) return;
    
    toast({
      title: "Data siswa diperbarui",
      description: `Data siswa ${editingStudent.name} berhasil diperbarui`
    });
    
    setIsEditStudentModalOpen(false);
    setEditingStudent(null);
  };
  
  const openEditStudentModal = (student: typeof mockStudents[0]) => {
    setEditingStudent({...student});
    setIsEditStudentModalOpen(true);
  };
  
  const handleClassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClass({
      ...newClass,
      [name]: value
    });
  };
  
  const handleClassSelectChange = (name: string, value: string) => {
    setNewClass({
      ...newClass,
      [name]: value
    });
  };
  
  const handleStudentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value
    });
  };
  
  const handleStudentSelectChange = (name: string, value: string) => {
    setNewStudent({
      ...newStudent,
      [name]: value
    });
  };
  
  const handleEditStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingStudent) return;
    
    const { name, value } = e.target;
    setEditingStudent({
      ...editingStudent,
      [name]: value
    });
  };
  
  const handleEditStudentSelectChange = (name: string, value: string) => {
    if (!editingStudent) return;
    
    setEditingStudent({
      ...editingStudent,
      [name]: value
    });
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
            <Dialog open={isAddClassModalOpen} onOpenChange={setIsAddClassModalOpen}>
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
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Contoh: Kelas 1" 
                      value={newClass.name} 
                      onChange={handleClassInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="teacher" className="text-sm font-medium">Guru Kelas</label>
                    <Select 
                      name="teacher" 
                      value={newClass.teacher}
                      onValueChange={(value) => handleClassSelectChange("teacher", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih guru" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ibu Siti">Ibu Siti</SelectItem>
                        <SelectItem value="Bapak Ahmad">Bapak Ahmad</SelectItem>
                        <SelectItem value="Ibu Rini">Ibu Rini</SelectItem>
                        <SelectItem value="Bapak Eko">Bapak Eko</SelectItem>
                        <SelectItem value="Bapak Agus">Bapak Agus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="academicYear" className="text-sm font-medium">Tahun Ajaran</label>
                    <Select 
                      name="year"
                      value={newClass.year}
                      onValueChange={(value) => handleClassSelectChange("year", value)}
                    >
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
                  <Button variant="outline" onClick={() => setIsAddClassModalOpen(false)}>Batal</Button>
                  <Button type="submit" onClick={handleAddClass}>Simpan Kelas</Button>
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
                  <CardTitle className="text-xl">{cls.name}</CardTitle>
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
                  Siswa {mockClasses.find(c => c.id === selectedClass)?.name}
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAddStudentModalOpen(true)}
                  >
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
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => openEditStudentModal(student)}
                            >
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
        
        {/* Add Student Modal */}
        <Dialog open={isAddStudentModalOpen} onOpenChange={setIsAddStudentModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Siswa Baru</DialogTitle>
              <DialogDescription>
                Masukkan informasi siswa baru untuk {mockClasses.find(c => c.id === selectedClass)?.name}.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="studentName" className="text-sm font-medium">Nama Siswa</label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Nama lengkap siswa" 
                  value={newStudent.name} 
                  onChange={handleStudentInputChange} 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="nisn" className="text-sm font-medium">NISN</label>
                <Input 
                  id="nisn" 
                  name="nisn" 
                  placeholder="Nomor Induk Siswa Nasional" 
                  value={newStudent.nisn} 
                  onChange={handleStudentInputChange} 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="gender" className="text-sm font-medium">Jenis Kelamin</label>
                <Select 
                  name="gender"
                  value={newStudent.gender}
                  onValueChange={(value) => handleStudentSelectChange("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddStudentModalOpen(false)}>Batal</Button>
              <Button type="submit" onClick={handleAddStudent}>Simpan Siswa</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Edit Student Modal */}
        <Dialog open={isEditStudentModalOpen} onOpenChange={setIsEditStudentModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Data Siswa</DialogTitle>
              <DialogDescription>
                Perbarui informasi siswa untuk {mockClasses.find(c => c.id === selectedClass)?.name}.
              </DialogDescription>
            </DialogHeader>
            
            {editingStudent && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="studentName" className="text-sm font-medium">Nama Siswa</label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={editingStudent.name} 
                    onChange={handleEditStudentChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="nisn" className="text-sm font-medium">NISN</label>
                  <Input 
                    id="nisn" 
                    name="nisn" 
                    value={editingStudent.nisn} 
                    onChange={handleEditStudentChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="gender" className="text-sm font-medium">Jenis Kelamin</label>
                  <Select 
                    name="gender"
                    value={editingStudent.gender}
                    onValueChange={(value) => handleEditStudentSelectChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditStudentModalOpen(false)}>Batal</Button>
              <Button type="submit" onClick={handleEditStudent}>Simpan Perubahan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ClassManagement;
