
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Upload, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveAs } from "file-saver";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [isAddDataOpen, setIsAddDataOpen] = useState(false);
  const [isEditDataOpen, setIsEditDataOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<typeof learningData[0] | null>(null);
  const [newData, setNewData] = useState({
    teacherName: "",
    subject: "",
    level: "",
    class: "",
    subjectTeacher: ""
  });
  
  const filteredData = learningData.filter(item => 
    item.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    // Prepare the data for export
    const dataToExport = filteredData.map((item, index) => ({
      'No': index + 1,
      'Nama Guru': item.teacherName,
      'Mata Pelajaran': item.subject,
      'Tingkat': item.level,
      'Kelas': item.class,
      'Guru Mapel': item.subjectTeacher
    }));
    
    // Convert to JSON string
    const jsonString = JSON.stringify(dataToExport, null, 2);
    
    // Create a blob and download
    const blob = new Blob([jsonString], { type: 'application/json' });
    saveAs(blob, 'data_pembelajaran.json');
    
    toast({
      title: "Mengekspor data",
      description: "Data pembelajaran berhasil diekspor",
    });
  };

  const handleImport = () => {
    // Create a file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.xlsx,.xls,.csv';
    
    // Handle file selection
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "Mengimpor data",
          description: `File ${file.name} berhasil diimpor`,
        });
      }
    };
    
    // Trigger file dialog
    input.click();
  };

  const handleAdd = () => {
    setIsAddDataOpen(true);
  };
  
  const handleEdit = (item: typeof learningData[0]) => {
    setSelectedData(item);
    setNewData({
      teacherName: item.teacherName,
      subject: item.subject,
      level: item.level,
      class: item.class,
      subjectTeacher: item.subjectTeacher
    });
    setIsEditDataOpen(true);
  };
  
  const handleDelete = (id: string) => {
    toast({
      title: "Hapus data",
      description: `Data dengan ID ${id} telah dihapus`,
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveNewData = () => {
    toast({
      title: "Data berhasil ditambahkan",
      description: `Data pembelajaran baru telah disimpan`,
    });
    setIsAddDataOpen(false);
  };
  
  const handleSaveEditData = () => {
    toast({
      title: "Data berhasil diperbarui",
      description: `Data pembelajaran telah diperbarui`,
    });
    setIsEditDataOpen(false);
    setSelectedData(null);
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
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4 mr-1" /> Hapus
                          </Button>
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
      
      {/* Add Data Dialog */}
      <Dialog open={isAddDataOpen} onOpenChange={setIsAddDataOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Data Pembelajaran</DialogTitle>
            <DialogDescription>
              Masukkan informasi data pembelajaran baru
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="teacherName" className="text-right text-sm font-medium">
                Nama Guru
              </label>
              <Input
                id="teacherName"
                name="teacherName"
                value={newData.teacherName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subject" className="text-right text-sm font-medium">
                Mata Pelajaran
              </label>
              <Input
                id="subject"
                name="subject"
                value={newData.subject}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="level" className="text-right text-sm font-medium">
                Tingkat
              </label>
              <Select
                value={newData.level}
                onValueChange={(value) => handleSelectChange("level", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih tingkat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="class" className="text-right text-sm font-medium">
                Kelas
              </label>
              <Input
                id="class"
                name="class"
                value={newData.class}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subjectTeacher" className="text-right text-sm font-medium">
                Guru Mapel
              </label>
              <Input
                id="subjectTeacher"
                name="subjectTeacher"
                value={newData.subjectTeacher}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDataOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveNewData}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Data Dialog */}
      <Dialog open={isEditDataOpen} onOpenChange={setIsEditDataOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Data Pembelajaran</DialogTitle>
            <DialogDescription>
              Perbarui informasi data pembelajaran
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="editTeacherName" className="text-right text-sm font-medium">
                Nama Guru
              </label>
              <Input
                id="editTeacherName"
                name="teacherName"
                value={newData.teacherName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="editSubject" className="text-right text-sm font-medium">
                Mata Pelajaran
              </label>
              <Input
                id="editSubject"
                name="subject"
                value={newData.subject}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="editLevel" className="text-right text-sm font-medium">
                Tingkat
              </label>
              <Select
                value={newData.level}
                onValueChange={(value) => handleSelectChange("level", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih tingkat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="editClass" className="text-right text-sm font-medium">
                Kelas
              </label>
              <Input
                id="editClass"
                name="class"
                value={newData.class}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="editSubjectTeacher" className="text-right text-sm font-medium">
                Guru Mapel
              </label>
              <Input
                id="editSubjectTeacher"
                name="subjectTeacher"
                value={newData.subjectTeacher}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDataOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveEditData}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default LearningData;
