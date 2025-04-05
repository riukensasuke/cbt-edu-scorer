
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddStudentDialogProps {
  onAddStudent: (student: any) => void;
}

const AddStudentDialog = ({ onAddStudent }: AddStudentDialogProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [nisn, setNisn] = useState("");
  const [gender, setGender] = useState("");
  const [classId, setClassId] = useState("");
  const [address, setAddress] = useState("");
  const [parentName, setParentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const classes = [
    { id: "class-1", name: "Kelas 6A" },
    { id: "class-2", name: "Kelas 6B" },
    { id: "class-3", name: "Kelas 5A" },
    { id: "class-4", name: "Kelas 5B" }
  ];
  
  const handleSubmit = () => {
    if (!name || !nisn || !gender || !classId) {
      toast({
        title: "Data tidak lengkap",
        description: "Silakan lengkapi data siswa yang diperlukan",
        variant: "destructive"
      });
      return;
    }
    
    const newStudent = {
      id: `student-${Date.now()}`,
      name,
      nisn,
      gender,
      classId,
      className: classes.find(c => c.id === classId)?.name || "",
      address,
      parentName,
      phoneNumber
    };
    
    onAddStudent(newStudent);
    
    toast({
      title: "Siswa berhasil ditambahkan",
      description: `${name} telah ditambahkan ke database`
    });
    
    // Reset form
    setName("");
    setNisn("");
    setGender("");
    setClassId("");
    setAddress("");
    setParentName("");
    setPhoneNumber("");
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Siswa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Siswa Baru</DialogTitle>
          <DialogDescription>
            Masukkan data untuk menambahkan siswa baru ke database
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nama
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nisn" className="text-right">
              NISN
            </Label>
            <Input
              id="nisn"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Jenis Kelamin
            </Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih jenis kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Laki-laki</SelectItem>
                <SelectItem value="female">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="class" className="text-right">
              Kelas
            </Label>
            <Select value={classId} onValueChange={setClassId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Alamat
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="parentName" className="text-right">
              Nama Wali
            </Label>
            <Input
              id="parentName"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              No. Telepon
            </Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>
            Tambah Siswa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentDialog;
