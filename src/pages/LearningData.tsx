
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Upload, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for learning data
const learningData = [
  { id: "1", teacherName: "Bapak Ahmad", subject: "Matematika", level: "6", class: "6A", subjectTeacher: "Bapak Ahmad" },
  { id: "2", teacherName: "Ibu Siti", subject: "Bahasa Indonesia", level: "5", class: "5B", subjectTeacher: "Ibu Siti" },
  { id: "3", teacherName: "Bapak Tono", subject: "IPA", level: "4", class: "4A", subjectTeacher: "Bapak Tono" },
  { id: "4", teacherName: "Ibu Rini", subject: "IPS", level: "3", class: "3B", subjectTeacher: "Ibu Rini" },
  { id: "5", teacherName: "Bapak Joko", subject: "Bahasa Inggris", level: "6", class: "6B", subjectTeacher: "Bapak Joko" },
];

const LearningData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const filteredData = learningData.filter(item => 
    item.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    toast({
      title: "Mengekspor data",
      description: "Data pembelajaran berhasil diekspor",
    });
  };

  const handleImport = () => {
    toast({
      title: "Mengimpor data",
      description: "Data pembelajaran berhasil diimpor",
    });
  };

  const handleAdd = () => {
    toast({
      title: "Tambah data",
      description: "Form tambah data pembelajaran dibuka",
    });
  };

  return (
    <DashboardLayout title="Data Pembelajaran">
      <div className="space-y-6">
        <div className="flex justify-between flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari data pembelajaran..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Ekspor
            </Button>
            <Button variant="outline" onClick={handleImport}>
              <Upload className="mr-2 h-4 w-4" />
              Impor
            </Button>
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Data
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Data Pembelajaran</CardTitle>
            <CardDescription>
              Kelola semua data pembelajaran di sekolah
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">No</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Nama Guru</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Mata Pelajaran</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Tingkat</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Kelas</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Guru Mapel</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Opsi</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredData.map((item, index) => (
                    <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{index + 1}</td>
                      <td className="p-4 align-middle">{item.teacherName}</td>
                      <td className="p-4 align-middle">{item.subject}</td>
                      <td className="p-4 align-middle">{item.level}</td>
                      <td className="p-4 align-middle">{item.class}</td>
                      <td className="p-4 align-middle">{item.subjectTeacher}</td>
                      <td className="p-4 align-middle">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">Hapus</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredData.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Tidak ada data ditemukan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LearningData;
