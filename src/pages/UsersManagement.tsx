import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { exportToExcel, importExcelFile, readExcelFile } from "@/utils/excelUtils";
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
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    identificationNumber: "",
    role: "student",
    class: "",
    subject: "",
    status: "active"
  });
  const [editUser, setEditUser] = useState({
    id: "",
    name: "",
    username: "",
    identificationNumber: "",
    role: "student",
    class: "",
    subject: "",
    status: "active",
    username: ""
  });
  const { toast } = useToast();
  
  const filterUsers = (role: string, search: string) => {
    let filtered = [...mockUsers];
    
    if (role !== "all") {
      filtered = filtered.filter(user => user.role === role);
    }
    
    if (search) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        (user.identificationNumber && user.identificationNumber.includes(search))
      );
    }
    
    setFilteredUsers(filtered);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterUsers(value, searchQuery);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterUsers(activeTab, query);
  };

  const handleUserFormChange = (field: string, value: string) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
  };

  const saveUser = () => {
    if (!newUser.name || !newUser.identificationNumber) {
      toast({
        title: "Form tidak lengkap",
        description: "Silakan lengkapi informasi pengguna",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pengguna berhasil ditambahkan",
      description: `${newUser.name} telah ditambahkan sebagai ${newUser.role === 'student' ? 'siswa' : newUser.role === 'teacher' ? 'guru' : 'admin'}`
    });

    setIsAddUserDialogOpen(false);
    
    setNewUser({
      name: "",
      identificationNumber: "",
      role: "student",
      class: "",
      subject: "",
      status: "active"
    });
  };

  const handleEditUser = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    
    if (user) {
      setEditUser({
        id: user.id,
        name: user.name,
        username: user.username,
        identificationNumber: user.identificationNumber || "",
        role: user.role,
        class: user.class || "",
        subject: user.subject || "",
        status: user.status
      });
      
      setIsEditUserDialogOpen(true);
    }
  };

  const handleEditUserFormChange = (field: string, value: string) => {
    setEditUser(prev => ({ ...prev, [field]: value }));
  };

  const saveEditedUser = () => {
    if (!editUser.name) {
      toast({
        title: "Form tidak lengkap",
        description: "Silakan lengkapi nama pengguna",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pengguna berhasil diperbarui",
      description: `Data ${editUser.name} telah diperbarui`
    });

    setIsEditUserDialogOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    const user = mockUsers.find(user => user.id === userId);
    
    toast({
      title: "Hapus pengguna",
      description: `Pengguna ${user?.name} telah dihapus`,
      variant: "destructive"
    });
  };

  const handleExportToExcel = () => {
    const dataToExport = filteredUsers.map(user => ({
      Nama: user.name,
      'Nomor Identitas': user.identificationNumber || '',
      Peran: user.role === 'student' ? 'Siswa' : user.role === 'teacher' ? 'Guru' : 'Admin',
      Kelas: user.role === 'student' && user.class ? user.class : '',
      'Mata Pelajaran': user.role === 'teacher' && user.subject ? user.subject : '',
      Status: user.status === 'active' ? 'Aktif' : 'Tidak Aktif'
    }));
    
    exportToExcel(dataToExport, "Data_Pengguna", "Pengguna");
    
    toast({
      title: "Data berhasil diexport",
      description: "Data pengguna telah diexport ke Excel"
    });
  };

  const handleImportFromExcel = () => {
    importExcelFile(async (file) => {
      try {
        const importedUsers = await readExcelFile(file);
        
        toast({
          title: "Data berhasil diimport",
          description: `${importedUsers.length} data pengguna telah diimport`
        });
      } catch (error) {
        toast({
          title: "Gagal import data",
          description: "Format file tidak valid",
          variant: "destructive"
        });
      }
    });
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
            
            <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Edit Pengguna</DialogTitle>
                  <DialogDescription>
                    Edit informasi pengguna. Klik simpan ketika selesai.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Jenis Pengguna</label>
                    <Select 
                      value={editUser.role}
                      onValueChange={(value) => handleEditUserFormChange("role", value)}
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
                    <label htmlFor="edit-name" className="text-sm font-medium">Nama Lengkap</label>
                    <Input 
                      id="edit-name" 
                      placeholder="Masukkan nama lengkap"
                      value={editUser.name}
                      onChange={(e) => handleEditUserFormChange("name", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="edit-username" className="text-sm font-medium">Username</label>
                    <Input 
                      id="edit-username" 
                      placeholder="Username"
                      value={editUser.username}
                      onChange={(e) => handleEditUserFormChange("username", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="edit-id" className="text-sm font-medium">Nomor Identitas</label>
                    <Input 
                      id="edit-id" 
                      placeholder="NISN/NIP/NUPTK"
                      value={editUser.identificationNumber}
                      onChange={(e) => handleEditUserFormChange("identificationNumber", e.target.value)}
                    />
                  </div>
                  
                  {editUser.role === "student" && (
                    <div className="space-y-2">
                      <label htmlFor="edit-class" className="text-sm font-medium">Kelas (untuk Siswa)</label>
                      <Select 
                        value={editUser.class} 
                        onValueChange={(value) => handleEditUserFormChange("class", value)}
                      >
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
                  
                  {editUser.role === "teacher" && (
                    <div className="space-y-2">
                      <label htmlFor="edit-subject" className="text-sm font-medium">Mata Pelajaran (untuk Guru)</label>
                      <Select 
                        value={editUser.subject} 
                        onValueChange={(value) => handleEditUserFormChange("subject", value)}
                      >
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
                  
                  <div className="space-y-2">
                    <label htmlFor="edit-status" className="text-sm font-medium">Status</label>
                    <Select 
                      value={editUser.status} 
                      onValueChange={(value) => handleEditUserFormChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="inactive">Tidak Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="button" onClick={saveEditedUser}>
                    Simpan Perubahan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="secondary" onClick={handleExportToExcel}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            
            <Button variant="outline" onClick={handleImportFromExcel}>
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
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditUser(user.id)}
                          >
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
