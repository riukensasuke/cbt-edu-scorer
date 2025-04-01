
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    identificationNumber: "",
    role: "student",
    class: "",
    subject: "",
    status: "active"
  });
  const { toast } = useToast();
  
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

  // Handle new user form change
  const handleUserFormChange = (field: string, value: string) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
  };

  // Save new user
  const saveUser = () => {
    // Validate form
    if (!newUser.name || !newUser.identificationNumber) {
      toast({
        title: "Form tidak lengkap",
        description: "Silakan lengkapi informasi pengguna",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would save to a database
    toast({
      title: "Pengguna berhasil ditambahkan",
      description: `${newUser.name} telah ditambahkan sebagai ${newUser.role === 'student' ? 'siswa' : newUser.role === 'teacher' ? 'guru' : 'admin'}`
    });

    // Close dialog
    setIsAddUserDialogOpen(false);
    
    // Reset form
    setNewUser({
      name: "",
      identificationNumber: "",
      role: "student",
      class: "",
      subject: "",
      status: "active"
    });
  };
  
  // Handle edit user
  const handleEditUser = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    
    toast({
      title: "Edit pengguna",
      description: `Mengedit data pengguna: ${user?.name}`
    });
    
    // In a real app, this would open an edit form with user data
  };
  
  // Handle delete user
  const handleDeleteUser = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    
    toast({
      title: "Hapus pengguna",
      description: `Pengguna ${user?.name} telah dihapus`,
      variant: "destructive"
    });
    
    // In a real app, this would delete the user from the database
  };
  
  // Export users to Excel
  const exportToExcel = () => {
    // Create workbook with users data
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers.map(user => ({
      Nama: user.name,
      'Nomor Identitas': user.identificationNumber || '',
      Peran: user.role === 'student' ? 'Siswa' : user.role === 'teacher' ? 'Guru' : 'Admin',
      Kelas: user.role === 'student' && user.class ? user.class : '',
      'Mata Pelajaran': user.role === 'teacher' && user.subject ? user.subject : '',
      Status: user.status === 'active' ? 'Aktif' : 'Tidak Aktif'
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pengguna");
    
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Save file
    saveAs(blob, "Data_Pengguna.xlsx");
    
    toast({
      title: "Data berhasil diexport",
      description: "Data pengguna telah diexport ke Excel"
    });
  };
  
  // Import users from Excel
  const importFromExcel = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          
          const importedUsers = XLSX.utils.sheet_to_json(worksheet);
          
          toast({
            title: "Data berhasil diimport",
            description: `${importedUsers.length} data pengguna telah diimport`
          });
          
          // In a real app, this would process and save the imported users
        } catch (error) {
          toast({
            title: "Gagal import data",
            description: "Format file tidak valid",
            variant: "destructive"
          });
        }
      };
      reader.readAsArrayBuffer(file);
    };
    input.click();
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
            <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
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
                    <Select 
                      defaultValue="student"
                      onValueChange={(value) => handleUserFormChange("role", value)}
                    >
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
                    <Input 
                      id="name" 
                      placeholder="Masukkan nama lengkap"
                      value={newUser.name}
                      onChange={(e) => handleUserFormChange("name", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="id" className="text-sm font-medium">Nomor Identitas</label>
                    <Input 
                      id="id" 
                      placeholder="NISN/NIP/NUPTK"
                      value={newUser.identificationNumber}
                      onChange={(e) => handleUserFormChange("identificationNumber", e.target.value)}
                    />
                  </div>
                  
                  {newUser.role === "student" && (
                    <div className="space-y-2">
                      <label htmlFor="class" className="text-sm font-medium">Kelas (untuk Siswa)</label>
                      <Select onValueChange={(value) => handleUserFormChange("class", value)}>
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
                  )}
                  
                  {newUser.role === "teacher" && (
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Mata Pelajaran (untuk Guru)</label>
                      <Select onValueChange={(value) => handleUserFormChange("subject", value)}>
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
                  )}
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="button" onClick={saveUser}>
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
                          <Button variant="outline" size="sm" onClick={() => handleEditUser(user.id)}>
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteUser(user.id)}
                          >
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
