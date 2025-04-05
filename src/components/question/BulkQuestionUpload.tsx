
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileSpreadsheet, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BulkQuestionUpload = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [questionType, setQuestionType] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const clearFile = () => {
    setFile(null);
  };
  
  const handleUpload = () => {
    if (!file) {
      toast({
        title: "File tidak ditemukan",
        description: "Silakan pilih file Excel atau CSV yang akan diunggah",
        variant: "destructive"
      });
      return;
    }
    
    if (!questionType || !subject || !grade) {
      toast({
        title: "Data tidak lengkap",
        description: "Silakan lengkapi semua informasi yang diperlukan",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would process the file and upload the questions
    toast({
      title: "Soal berhasil diunggah",
      description: `${file.name} telah diunggah sebagai soal ${questionType} untuk ${subject} ${grade}`,
    });
    
    setIsOpen(false);
    setFile(null);
    setQuestionType("");
    setSubject("");
    setGrade("");
  };

  const downloadTemplate = () => {
    // In a real app, this would download a template file
    toast({
      title: "Template diunduh",
      description: "Template untuk unggah soal telah diunduh",
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="mr-2 h-4 w-4" />
          Unggah Soal Massal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Unggah Soal Massal</DialogTitle>
          <DialogDescription>
            Unggah soal menggunakan file Excel atau CSV sesuai template.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="questionType">Jenis Soal</Label>
            <Select value={questionType} onValueChange={setQuestionType}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis soal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Pilihan Ganda</SelectItem>
                <SelectItem value="true-false">Benar/Salah</SelectItem>
                <SelectItem value="essay">Uraian</SelectItem>
                <SelectItem value="matching">Menjodohkan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="subject">Mata Pelajaran</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih mata pelajaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matematika">Matematika</SelectItem>
                <SelectItem value="bahasa-indonesia">Bahasa Indonesia</SelectItem>
                <SelectItem value="ipa">IPA</SelectItem>
                <SelectItem value="ips">IPS</SelectItem>
                <SelectItem value="bahasa-inggris">Bahasa Inggris</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="grade">Kelas</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kelas-1">Kelas 1</SelectItem>
                <SelectItem value="kelas-2">Kelas 2</SelectItem>
                <SelectItem value="kelas-3">Kelas 3</SelectItem>
                <SelectItem value="kelas-4">Kelas 4</SelectItem>
                <SelectItem value="kelas-5">Kelas 5</SelectItem>
                <SelectItem value="kelas-6">Kelas 6</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label>File Template</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={downloadTemplate} className="w-full">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label>Unggah File</Label>
            {file ? (
              <div className="flex items-center justify-between border rounded-md p-2">
                <span className="truncate">{file.name}</span>
                <Button variant="ghost" size="icon" onClick={clearFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".xlsx,.csv,.xls"
                  onChange={handleFileChange}
                  className="flex-1"
                />
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Format yang diterima: Excel (.xlsx, .xls) atau CSV (.csv)
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleUpload} className="bg-green-600 hover:bg-green-700">
            Unggah Soal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkQuestionUpload;
