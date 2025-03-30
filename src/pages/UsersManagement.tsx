
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload, 
  Edit, 
  Trash2, 
  UserPlus,
  FileSpreadsheet,
  Users,
  User,
  BookOpen
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

// Mock data for users
const mockUsers = [
  // Admins
  {
    id: "admin-1",
    name: "Admin User",
    username: "admin",
    role: "admin",
    status: "active",
  },
  // Teachers
  {
    id: "teacher-1",
    name: "Ibu Siti",
    username: "Ibu Siti",
    identificationNumber: "198501152010012005", // NIP for PNS
    role: "teacher",
    subject: "Matematika",
    status: "active",
  },
  {
    id: "teacher-2",
    name: "Bapak Ahmad",
    username: "Bapak Ahmad",
    identificationNumber: "1234567890123456", // NUPTK for non-ASN
    role: "teacher",
    subject: "Bahasa Indonesia",
    status: "active",
  },
  {
    id: "teacher-3",
    name: "Ibu Rini",
    username: "Ibu Rini",
    identificationNumber: "198706142011012003", // NIP for PNS
    role: "teacher",
    subject: "IPA",
    status: "active",
  },
  // Students
  {
    id: "student-1",
    name: "Muhammad Andi",
    username: "Muhammad Andi",
    identificationNumber: "0098765432", // NISN
    role: "student",
    class: "6A",
    status: "active",
  },
  {
    id: "student-2",
    name: "Siti Aminah",
    username: "Siti Aminah",
    identificationNumber: "0087654321", // NISN
    role: "student",
    class: "5A",
    status: "active",
  },
  {
    id: "student-3",
    name: "Budi Santoso",
    username: "Budi Santoso", 
    identificationNumber: "0076543210", // NISN
    role: "student",
    class: "4A",
    status: "active",
  },
];

const UsersManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  
  // Filter function
  const filterUsers = (role: string, search: string) => {
    let filtered = [...mockUsers];
    
    // Filter by role if not "all"
    if (role !== "all") {
      filtered = filtered.filter(user => user.role === role);
    }
    
    // Filter by search query
    if (search) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        (user.identificationNumber && user.identificationNumber.includes(search))
      );
    }
    
    setFilteredUsers(filtered);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterUsers(value, searchQuery);
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterUsers(activeTab, query);
  };
  
  // Export users to Excel
  const exportToExcel = () => {
    alert("Exporting users to Excel...");
  };
  
  // Import users from Excel
  const importFromExcel = () => {
    alert("Importing users from Excel...");
  };

  return (
    <DashboardLayout title="Manajemen Pengguna">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari pengguna..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Tambah Pengguna
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                  <DialogDescription>
                    Masukkan informasi pengguna baru. Klik simpan ketika selesai.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Jenis Pengguna</label>
                    <Select defaultValue="student">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis pengguna" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="teacher">Guru</SelectItem>
                        <SelectItem value="student">Siswa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nama Lengkap</label>
                    <Input id="name" placeholder="Masukkan nama lengkap" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="id" className="text-sm font-medium">Nomor Identitas</label>
                    <Input id="id" placeholder="NISN/NIP/NUPTK" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="class" className="text-sm font-medium">Kelas (untuk Siswa)</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
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
                    <label htmlFor="subject" className="text-sm font-medium">Mata Pelajaran (untuk Guru)</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih mata pelajaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matematika">Matematika</SelectItem>
                        <SelectItem value="bahasa-indonesia">Bahasa Indonesia</SelectItem>
                        <SelectItem value="ipa">IPA</SelectItem>
                        <SelectItem value="ips">IPS</SelectItem>
                        <SelectItem value="pkn">PKN</SelectItem>
                        <SelectItem value="agama">Pendidikan Agama</SelectItem>
                        <SelectItem value="pjok">PJOK</SelectItem>
                        <SelectItem value="seni">Seni Budaya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Batal</Button>
                  </DialogClose>
                  <Button type="submit">
                    Simpan Pengguna
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="secondary" onClick={exportToExcel}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            
            <Button variant="outline" onClick={importFromExcel}>
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="teacher">Guru</TabsTrigger>
            <TabsTrigger value="student">Siswa</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Pengguna</CardTitle>
                <CardDescription>
                  Kelola semua pengguna aplikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {user.role === "admin" ? (
                              <User className="h-5 w-5 text-purple-500" />
                            ) : user.role === "teacher" ? (
                              <BookOpen className="h-5 w-5 text-blue-500" />
                            ) : (
                              <Users className="h-5 w-5 text-green-500" />
                            )}
                            <h3 className="font-medium">{user.name}</h3>
                          </div>
                          <Badge 
                            className={user.status === "active" ? "bg-green-500" : "bg-gray-500"}
                          >
                            {user.status === "active" ? "Aktif" : "Tidak Aktif"}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-muted-foreground">Username:</span>{" "}
                            {user.username}
                          </div>
                          
                          {user.identificationNumber && (
                            <div>
                              <span className="text-muted-foreground">
                                {user.role === "student" ? "NISN:" : "NIP/NUPTK:"}
                              </span>{" "}
                              {user.identificationNumber}
                            </div>
                          )}
                          
                          {user.role === "teacher" && user.subject && (
                            <div>
                              <span className="text-muted-foreground">Mata Pelajaran:</span>{" "}
                              {user.subject}
                            </div>
                          )}
                          
                          {user.role === "student" && user.class && (
                            <div>
                              <span className="text-muted-foreground">Kelas:</span>{" "}
                              {user.class}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4 mr-1" /> Hapus
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">Tidak ada pengguna ditemukan</p>
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

export default UsersManagement;
