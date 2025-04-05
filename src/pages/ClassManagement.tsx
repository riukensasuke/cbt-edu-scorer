
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ClassCard from "@/components/class/ClassCard";

// Mock data for classes
const initialClasses = [
  {
    id: "class-1",
    name: "Kelas 6A",
    level: "6",
    students: 25,
    teacher: "Ibu Siti",
    year: "2023/2024",
    isActive: true
  },
  {
    id: "class-2",
    name: "Kelas 6B",
    level: "6",
    students: 24,
    teacher: "Bapak Ahmad",
    year: "2023/2024",
    isActive: true
  },
  {
    id: "class-3",
    name: "Kelas 5A",
    level: "5",
    students: 26,
    teacher: "Ibu Rini",
    year: "2023/2024",
    isActive: true
  },
  {
    id: "class-4",
    name: "Kelas 5B",
    level: "5",
    students: 23,
    teacher: "Bapak Tono",
    year: "2023/2024",
    isActive: true
  },
  {
    id: "class-5",
    name: "Kelas 4A",
    level: "4",
    students: 28,
    teacher: "Ibu Maya",
    year: "2023/2024",
    isActive: true
  },
  {
    id: "class-6",
    name: "Kelas 4B",
    level: "4",
    students: 27,
    teacher: "Bapak Dodi",
    year: "2023/2024",
    isActive: true
  }
];

const ClassManagement = () => {
  const { toast } = useToast();
  const [classes, setClasses] = useState(initialClasses);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newClassTeacher, setNewClassTeacher] = useState("");
  const [newClassLevel, setNewClassLevel] = useState("");
  
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
    
    const newClass = {
      id: `class-${classes.length + 1}`,
      name: newClassName,
      level: newClassLevel,
      students: 0,
      teacher: newClassTeacher,
      year: "2023/2024",
      isActive: true
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
    toast({
      title: "Edit kelas",
      description: `Edit kelas dengan ID: ${id}`
    });
  };
  
  const handleDeleteClass = (id: string) => {
    setClasses(prev => prev.filter(cls => cls.id !== id));
    
    toast({
      title: "Kelas dihapus",
      description: "Kelas berhasil dihapus dari daftar"
    });
  };
  
  const handleManageStudents = (id: string) => {
    toast({
      title: "Kelola siswa",
      description: `Kelola siswa untuk kelas dengan ID: ${id}`
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
                    onEdit={handleEditClass}
                    onDelete={handleDeleteClass}
                    onManageStudents={handleManageStudents}
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
    </DashboardLayout>
  );
};

export default ClassManagement;
