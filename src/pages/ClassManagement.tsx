
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, User, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ClassCard from "@/components/class/ClassCard";

// Mock data for classes with colors
const initialClasses = [
  {
    id: "class-1",
    name: "Kelas 6A",
    level: "6",
    students: 25,
    teacher: "Ibu Siti",
    year: "2023/2024",
    isActive: true,
    color: "bg-blue-100 border-blue-300"
  },
  {
    id: "class-2",
    name: "Kelas 6B",
    level: "6",
    students: 24,
    teacher: "Bapak Ahmad",
    year: "2023/2024",
    isActive: true,
    color: "bg-green-100 border-green-300"
  },
  {
    id: "class-3",
    name: "Kelas 5A",
    level: "5",
    students: 26,
    teacher: "Ibu Rini",
    year: "2023/2024",
    isActive: true,
    color: "bg-purple-100 border-purple-300"
  },
  {
    id: "class-4",
    name: "Kelas 5B",
    level: "5",
    students: 23,
    teacher: "Bapak Tono",
    year: "2023/2024",
    isActive: true,
    color: "bg-amber-100 border-amber-300"
  },
  {
    id: "class-5",
    name: "Kelas 4A",
    level: "4",
    students: 28,
    teacher: "Ibu Maya",
    year: "2023/2024",
    isActive: true,
    color: "bg-pink-100 border-pink-300"
  },
  {
    id: "class-6",
    name: "Kelas 4B",
    level: "4",
    students: 27,
    teacher: "Bapak Dodi",
    year: "2023/2024",
    isActive: true,
    color: "bg-cyan-100 border-cyan-300"
  }
];

// Mock student data
const mockStudents = [
  { id: "1", name: "Ahmad Rizki", nisn: "0123456789", gender: "L" },
  { id: "2", name: "Budi Santoso", nisn: "0123456790", gender: "L" },
  { id: "3", name: "Cindy Aulia", nisn: "0123456791", gender: "P" },
  { id: "4", name: "Dina Fitriani", nisn: "0123456792", gender: "P" },
  { id: "5", name: "Eko Prasetyo", nisn: "0123456793", gender: "L" },
  { id: "6", name: "Fani Wijaya", nisn: "0123456794", gender: "P" },
];

const ClassManagement = () => {
  const { toast } = useToast();
  const [classes, setClasses] = useState(initialClasses);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newClassTeacher, setNewClassTeacher] = useState("");
  const [newClassLevel, setNewClassLevel] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEditClass, setCurrentEditClass] = useState<any>(null);
  const [isManageStudentsDialogOpen, setIsManageStudentsDialogOpen] = useState(false);
  const [currentManageClass, setCurrentManageClass] = useState<any>(null);
  const [classStudents, setClassStudents] = useState(mockStudents);
  
  // Filter classes based on search
  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleAddClass = () => {
    if (!newClassName || !newClassTeacher || !newClassLevel) {
      toast({
        title: "Data tidak lengkap",
        description: "Silakan lengkapi semua informasi kelas",
        variant: "destructive"
      });
      return;
    }
    
    // Array of possible colors
    const colors = [
      "bg-blue-100 border-blue-300",
      "bg-green-100 border-green-300",
      "bg-purple-100 border-purple-300",
      "bg-amber-100 border-amber-300",
      "bg-pink-100 border-pink-300",
      "bg-cyan-100 border-cyan-300",
      "bg-indigo-100 border-indigo-300",
      "bg-red-100 border-red-300"
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newClass = {
      id: `class-${classes.length + 1}`,
      name: newClassName,
      level: newClassLevel,
      students: 0,
      teacher: newClassTeacher,
      year: "2023/2024",
      isActive: true,
      color: randomColor
    };
    
    setClasses(prev => [...prev, newClass]);
    
    toast({
      title: "Kelas berhasil ditambahkan",
      description: `${newClassName} telah ditambahkan ke daftar kelas`
    });
    
    setIsDialogOpen(false);
    setNewClassName("");
    setNewClassTeacher("");
    setNewClassLevel("");
  };
  
  const handleEditClass = (id: string) => {
    const classToEdit = classes.find(c => c.id === id);
    if (classToEdit) {
      setCurrentEditClass(classToEdit);
      setIsEditDialogOpen(true);
    }
  };
  
  const handleSaveEdit = () => {
    if (currentEditClass) {
      setClasses(prev => prev.map(cls => 
        cls.id === currentEditClass.id ? currentEditClass : cls
      ));
      
      toast({
        title: "Kelas berhasil diperbarui",
        description: `${currentEditClass.name} telah diperbarui`
      });
      
      setIsEditDialogOpen(false);
      setCurrentEditClass(null);
    }
  };
  
  const handleDeleteClass = (id: string) => {
    setClasses(prev => prev.filter(cls => cls.id !== id));
    
    toast({
      title: "Kelas dihapus",
      description: "Kelas berhasil dihapus dari daftar"
    });
  };
  
  const handleManageStudents = (id: string) => {
    const classToManage = classes.find(c => c.id === id);
    if (classToManage) {
      setCurrentManageClass(classToManage);
      setIsManageStudentsDialogOpen(true);
    }
  };
  
  const handleAddStudent = () => {
    toast({
      title: "Siswa ditambahkan",
      description: "Siswa baru telah ditambahkan ke kelas"
    });
  };

  const handleRemoveStudent = (studentId: string) => {
    setClassStudents(prev => prev.filter(student => student.id !== studentId));
    
    toast({
      title: "Siswa dihapus",
      description: "Siswa telah dihapus dari kelas"
    });
  };

  return (
    <DashboardLayout title="Manajemen Kelas">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari kelas..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kelas Baru
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Daftar Kelas</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredClasses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClasses.map((cls, index) => (
                  <ClassCard
                    key={cls.id}
                    classData={cls}
                    colorIndex={index}
                    onEdit={() => handleEditClass(cls.id)}
                    onDelete={() => handleDeleteClass(cls.id)}
                    onManageStudents={() => handleManageStudents(cls.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Tidak ada kelas ditemukan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Dialog for adding a new class */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kelas Baru</DialogTitle>
            <DialogDescription>
              Masukkan informasi untuk menambahkan kelas baru
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="className" className="text-right">
                Nama Kelas
              </Label>
              <Input
                id="className"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="col-span-3"
                placeholder="Contoh: Kelas 6C"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="classLevel" className="text-right">
                Tingkat
              </Label>
              <Input
                id="classLevel"
                value={newClassLevel}
                onChange={(e) => setNewClassLevel(e.target.value)}
                className="col-span-3"
                placeholder="Contoh: 6"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="classTeacher" className="text-right">
                Wali Kelas
              </Label>
              <Input
                id="classTeacher"
                value={newClassTeacher}
                onChange={(e) => setNewClassTeacher(e.target.value)}
                className="col-span-3"
                placeholder="Contoh: Ibu Maya"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleAddClass}>
              Tambah Kelas
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for editing a class */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Kelas</DialogTitle>
            <DialogDescription>
              Ubah informasi kelas
            </DialogDescription>
          </DialogHeader>
          
          {currentEditClass && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editClassName" className="text-right">
                  Nama Kelas
                </Label>
                <Input
                  id="editClassName"
                  value={currentEditClass.name}
                  onChange={(e) => setCurrentEditClass({...currentEditClass, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editClassLevel" className="text-right">
                  Tingkat
                </Label>
                <Input
                  id="editClassLevel"
                  value={currentEditClass.level}
                  onChange={(e) => setCurrentEditClass({...currentEditClass, level: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editClassTeacher" className="text-right">
                  Wali Kelas
                </Label>
                <Input
                  id="editClassTeacher"
                  value={currentEditClass.teacher}
                  onChange={(e) => setCurrentEditClass({...currentEditClass, teacher: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editClassStudents" className="text-right">
                  Jumlah Siswa
                </Label>
                <Input
                  id="editClassStudents"
                  type="number"
                  value={currentEditClass.students}
                  onChange={(e) => setCurrentEditClass({...currentEditClass, students: parseInt(e.target.value) || 0})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveEdit}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for managing students */}
      <Dialog open={isManageStudentsDialogOpen} onOpenChange={setIsManageStudentsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Kelola Siswa {currentManageClass?.name}</DialogTitle>
            <DialogDescription>
              Tambah, edit, atau hapus siswa dari kelas ini
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari siswa..."
                  className="pl-8"
                />
              </div>
              <Button onClick={handleAddStudent}>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Siswa
              </Button>
            </div>
            
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">No</th>
                    <th className="py-3 px-4 text-left font-medium">Nama</th>
                    <th className="py-3 px-4 text-left font-medium">NISN</th>
                    <th className="py-3 px-4 text-left font-medium">JK</th>
                    <th className="py-3 px-4 text-left font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {classStudents.map((student, index) => (
                    <tr key={student.id} className="border-b">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{student.name}</td>
                      <td className="py-3 px-4">{student.nisn}</td>
                      <td className="py-3 px-4">{student.gender}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRemoveStudent(student.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsManageStudentsDialogOpen(false)}>
              Selesai
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ClassManagement;
