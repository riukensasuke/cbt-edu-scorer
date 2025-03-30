
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Filter,
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
  FileText,
  Copy
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for exams
const mockExams = [
  {
    id: "1",
    title: "UTS Matematika Kelas 6",
    subject: "Matematika",
    grade: "Kelas 6",
    status: "active",
    type: "UTS",
    duration: 90,
    questions: 25,
    startDate: "2023-10-15",
    endDate: "2023-10-15",
    createdBy: "Ibu Siti"
  },
  {
    id: "2",
    title: "UTS Bahasa Indonesia Kelas 5",
    subject: "Bahasa Indonesia",
    grade: "Kelas 5",
    status: "active",
    type: "UTS",
    duration: 90,
    questions: 20,
    startDate: "2023-10-16",
    endDate: "2023-10-16",
    createdBy: "Bapak Ahmad"
  },
  {
    id: "3",
    title: "UTS IPA Kelas 4",
    subject: "IPA",
    grade: "Kelas 4",
    status: "draft",
    type: "UTS",
    duration: 90,
    questions: 15,
    startDate: "2023-10-17",
    endDate: "2023-10-17",
    createdBy: "Ibu Rini"
  },
  {
    id: "4",
    title: "UAS Matematika Kelas 6",
    subject: "Matematika",
    grade: "Kelas 6",
    status: "scheduled",
    type: "UAS",
    duration: 120,
    questions: 40,
    startDate: "2023-12-10",
    endDate: "2023-12-10",
    createdBy: "Ibu Siti"
  },
];

const ExamManagement = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExams, setFilteredExams] = useState(mockExams);
  
  // Filter function
  const filterExams = (status: string, search: string) => {
    let filtered = [...mockExams];
    
    // Filter by status if not "all"
    if (status !== "all") {
      filtered = filtered.filter(exam => exam.status === status);
    }
    
    // Filter by search query
    if (search) {
      filtered = filtered.filter(exam => 
        exam.title.toLowerCase().includes(search.toLowerCase()) ||
        exam.subject.toLowerCase().includes(search.toLowerCase()) ||
        exam.grade.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredExams(filtered);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterExams(value, searchQuery);
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterExams(activeTab, query);
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Aktif</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Terjadwal</Badge>;
      case "completed":
        return <Badge className="bg-gray-500">Selesai</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout title="Manajemen Ujian">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari ujian..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Buat Ujian Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Buat Ujian Baru</DialogTitle>
                <DialogDescription>
                  Isi informasi ujian baru. Klik simpan ketika selesai.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Nama Ujian</label>
                  <Input id="title" placeholder="Contoh: UTS Matematika Kelas 6" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Mata Pelajaran</label>
                    <Select>
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
                  
                  <div className="space-y-2">
                    <label htmlFor="grade" className="text-sm font-medium">Kelas</label>
                    <Select>
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
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="type" className="text-sm font-medium">Jenis Ujian</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uts">UTS</SelectItem>
                        <SelectItem value="uas">UAS</SelectItem>
                        <SelectItem value="ulangan">Ulangan Harian</SelectItem>
                        <SelectItem value="latihan">Latihan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="duration" className="text-sm font-medium">Durasi (menit)</label>
                    <Input id="duration" type="number" placeholder="90" min="5" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="startDate" className="text-sm font-medium">Tanggal Mulai</label>
                    <Input id="startDate" type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="endDate" className="text-sm font-medium">Tanggal Selesai</label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="startTime" className="text-sm font-medium">Waktu Mulai</label>
                    <Input id="startTime" type="time" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="endTime" className="text-sm font-medium">Waktu Selesai</label>
                    <Input id="endTime" type="time" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status Ujian</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Terjadwal</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Batal</Button>
                </DialogClose>
                <Button type="submit">
                  Lanjutkan ke Pemilihan Soal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="scheduled">Terjadwal</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Ujian</CardTitle>
                <CardDescription>
                  Kelola semua ujian yang telah dibuat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredExams.length > 0 ? (
                    filteredExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{exam.title}</h3>
                          {getStatusBadge(exam.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{exam.subject} • {exam.grade}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{new Date(exam.startDate).toLocaleDateString('id-ID')}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{exam.duration} menit</span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{exam.questions} soal</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Dibuat oleh: {exam.createdBy}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">Tidak ada ujian ditemukan</p>
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

export default ExamManagement;
