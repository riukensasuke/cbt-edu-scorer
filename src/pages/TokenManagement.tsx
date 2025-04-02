
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, RefreshCw, Copy, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

// Mock data for tokens
const mockTokens = [
  {
    id: "1",
    token: "ABC123",
    examName: "UTS Matematika Kelas 6",
    class: "6A",
    validUntil: "2023-10-15 10:00",
    status: "aktif"
  },
  {
    id: "2",
    token: "DEF456",
    examName: "Ulangan Harian Bahasa Indonesia",
    class: "5B",
    validUntil: "2023-10-18 09:30",
    status: "aktif"
  },
  {
    id: "3",
    token: "GHI789",
    examName: "UAS IPA Semester Ganjil",
    class: "4A",
    validUntil: "2023-10-20 08:00",
    status: "nonaktif"
  },
];

// Mock data for exams
const exams = [
  { id: "1", name: "UTS Matematika Kelas 6" },
  { id: "2", name: "Ulangan Harian Bahasa Indonesia" },
  { id: "3", name: "UAS IPA Semester Ganjil" },
  { id: "4", name: "Ulangan Mingguan IPS" },
];

// Mock data for classes
const classes = [
  { id: "1", name: "6A" },
  { id: "2", name: "5B" },
  { id: "3", name: "4A" },
  { id: "4", name: "3B" },
];

const TokenManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newToken, setNewToken] = useState({
    examId: "",
    classId: "",
    duration: "30", // minutes
  });

  // Filter tokens based on search query
  const filteredTokens = mockTokens.filter(token => 
    token.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateToken = () => {
    // Validation
    if (!newToken.examId || !newToken.classId) {
      toast({
        title: "Validasi Error",
        description: "Mohon pilih ujian dan kelas",
        variant: "destructive",
      });
      return;
    }

    // Generate random token
    const randomToken = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedToken(randomToken);

    toast({
      title: "Token berhasil dibuat",
      description: `Token ujian: ${randomToken}`,
    });
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedToken);
    toast({
      title: "Token disalin",
      description: "Token berhasil disalin ke clipboard",
    });
  };

  const handleSaveToken = () => {
    if (!generatedToken) {
      toast({
        title: "Validasi Error",
        description: "Silakan generate token terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Token disimpan",
      description: "Token ujian telah berhasil disimpan",
    });

    setIsDialogOpen(false);
    setGeneratedToken("");
    setNewToken({
      examId: "",
      classId: "",
      duration: "30",
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setNewToken(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <DashboardLayout title="Manajemen Token Ujian">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Token Ujian</CardTitle>
            <CardDescription>
              Kelola token untuk menjaga keamanan ujian dan mencegah kecurangan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-1/2">
                <p className="text-sm text-muted-foreground mb-4">
                  Token ujian adalah kode yang diberikan kepada siswa sebelum mengikuti ujian. 
                  Kode ini bersifat unik dan hanya berlaku selama durasi yang ditentukan.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Token berlaku untuk satu kelas dan satu ujian</li>
                  <li>Token memiliki masa aktif yang dapat diatur</li>
                  <li>Token dapat dinonaktifkan kapan saja</li>
                  <li>Siswa harus memasukkan token untuk mengakses ujian</li>
                </ul>
              </div>
              <div className="w-full md:w-1/2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full">
                      <Key className="mr-2 h-4 w-4" /> Buat Token Baru
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Buat Token Ujian</DialogTitle>
                      <DialogDescription>
                        Buat token baru untuk ujian tertentu
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="exam" className="text-sm font-medium">Ujian</label>
                        <Select
                          value={newToken.examId}
                          onValueChange={(value) => handleInputChange("examId", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Ujian" />
                          </SelectTrigger>
                          <SelectContent>
                            {exams.map(exam => (
                              <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="class" className="text-sm font-medium">Kelas</label>
                        <Select
                          value={newToken.classId}
                          onValueChange={(value) => handleInputChange("classId", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kelas" />
                          </SelectTrigger>
                          <SelectContent>
                            {classes.map(cls => (
                              <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="duration" className="text-sm font-medium">Durasi (menit)</label>
                        <Input
                          id="duration"
                          type="number"
                          value={newToken.duration}
                          onChange={(e) => handleInputChange("duration", e.target.value)}
                          min="5"
                        />
                      </div>
                      {generatedToken && (
                        <div className="space-y-2 pt-2">
                          <label className="text-sm font-medium">Token yang Dibuat</label>
                          <div className="flex items-center">
                            <div className="bg-muted p-2 rounded-md flex-1 font-mono text-lg text-center">
                              {generatedToken}
                            </div>
                            <Button variant="ghost" size="icon" className="ml-2" onClick={handleCopyToken}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => handleGenerateToken()}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Generate Token
                      </Button>
                      <Button onClick={handleSaveToken}>
                        Simpan Token
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Daftar Token</h2>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari token..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-md shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Ujian</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Berlaku Hingga</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTokens.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono">{item.token}</TableCell>
                    <TableCell>{item.examName}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.validUntil}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={item.status === 'aktif' ? 'text-red-500' : 'text-green-500'}
                        >
                          {item.status === 'aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTokens.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      Tidak ada token ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TokenManagement;
