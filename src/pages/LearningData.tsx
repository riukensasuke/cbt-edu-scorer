
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Download, Upload } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Sample data for learning assignments
const mockLearningData = [
  {
    id: "1",
    teacherName: "Bapak Ahmad",
    subject: "Matematika",
    grade: "6",
    className: "6A",
    subjectTeacher: "Ya"
  },
  {
    id: "2",
    teacherName: "Ibu Siti",
    subject: "Bahasa Indonesia",
    grade: "5",
    className: "5B",
    subjectTeacher: "Ya"
  },
  {
    id: "3",
    teacherName: "Bapak Tono",
    subject: "IPA",
    grade: "4",
    className: "4A",
    subjectTeacher: "Tidak"
  },
  {
    id: "4",
    teacherName: "Ibu Rini",
    subject: "IPS",
    grade: "3",
    className: "3B",
    subjectTeacher: "Ya"
  },
  {
    id: "5",
    teacherName: "Bapak Budi",
    subject: "Matematika",
    grade: "2",
    className: "2A",
    subjectTeacher: "Ya"
  },
];

const LearningData = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newLearningData, setNewLearningData] = useState({
    teacherName: "",
    subject: "",
    grade: "",
    className: "",
    subjectTeacher: "Ya"
  });

  // Filter data based on search query
  const filteredData = mockLearningData.filter(item => 
    item.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (name: string, value: string) => {
    setNewLearningData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddLearning = () => {
    // Validation
    if (!newLearningData.teacherName || !newLearningData.subject || !newLearningData.grade || !newLearningData.className) {
      toast({
        title: "Validasi Error",
        description: "Mohon isi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Data pembelajaran ditambahkan",
      description: "Data berhasil disimpan",
    });

    setIsAddDialogOpen(false);
    setNewLearningData({
      teacherName: "",
      subject: "",
      grade: "",
      className: "",
      subjectTeacher: "Ya"
    });
  };

  const handleExport = () => {
    toast({
      title: "Export berhasil",
      description: "Data pembelajaran telah diekspor",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import berhasil",
      description: "Data pembelajaran telah diimpor",
    });
  };

  return (
    <DashboardLayout title="Data Pembelajaran">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari data pembelajaran..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button variant="outline" onClick={handleImport}>
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Tambah Data
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Data Pembelajaran</DialogTitle>
                  <DialogDescription>
                    Tambahkan data pembelajaran baru.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="teacherName" className="text-sm font-medium">Guru</label>
                    <Select
                      value={newLearningData.teacherName}
                      onValueChange={(value) => handleInputChange("teacherName", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Guru" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bapak Ahmad">Bapak Ahmad</SelectItem>
                        <SelectItem value="Ibu Siti">Ibu Siti</SelectItem>
                        <SelectItem value="Bapak Tono">Bapak Tono</SelectItem>
                        <SelectItem value="Ibu Rini">Ibu Rini</SelectItem>
                        <SelectItem value="Bapak Budi">Bapak Budi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Mata Pelajaran</label>
                    <Select
                      value={newLearningData.subject}
                      onValueChange={(value) => handleInputChange("subject", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Mata Pelajaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Matematika">Matematika</SelectItem>
                        <SelectItem value="Bahasa Indonesia">Bahasa Indonesia</SelectItem>
                        <SelectItem value="IPA">IPA</SelectItem>
                        <SelectItem value="IPS">IPS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="grade" className="text-sm font-medium">Tingkat</label>
                    <Select
                      value={newLearningData.grade}
                      onValueChange={(value) => handleInputChange("grade", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Tingkat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Kelas 1</SelectItem>
                        <SelectItem value="2">Kelas 2</SelectItem>
                        <SelectItem value="3">Kelas 3</SelectItem>
                        <SelectItem value="4">Kelas 4</SelectItem>
                        <SelectItem value="5">Kelas 5</SelectItem>
                        <SelectItem value="6">Kelas 6</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="className" className="text-sm font-medium">Kelas</label>
                    <Select
                      value={newLearningData.className}
                      onValueChange={(value) => handleInputChange("className", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1A">1A</SelectItem>
                        <SelectItem value="1B">1B</SelectItem>
                        <SelectItem value="2A">2A</SelectItem>
                        <SelectItem value="2B">2B</SelectItem>
                        <SelectItem value="3A">3A</SelectItem>
                        <SelectItem value="3B">3B</SelectItem>
                        <SelectItem value="4A">4A</SelectItem>
                        <SelectItem value="4B">4B</SelectItem>
                        <SelectItem value="5A">5A</SelectItem>
                        <SelectItem value="5B">5B</SelectItem>
                        <SelectItem value="6A">6A</SelectItem>
                        <SelectItem value="6B">6B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subjectTeacher" className="text-sm font-medium">Guru Mapel</label>
                    <Select
                      value={newLearningData.subjectTeacher}
                      onValueChange={(value) => handleInputChange("subjectTeacher", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ya">Ya</SelectItem>
                        <SelectItem value="Tidak">Tidak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
                  <Button onClick={handleAddLearning}>Simpan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">No</TableHead>
                <TableHead>Nama Guru</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Tingkat</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Guru Mapel</TableHead>
                <TableHead className="w-24">Opsi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.teacherName}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.grade}</TableCell>
                  <TableCell>{item.className}</TableCell>
                  <TableCell>{item.subjectTeacher}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Tidak ada data pembelajaran ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearningData;
