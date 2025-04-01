import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { PlusCircle, Search, FileText, Download, Upload, Pencil, Trash2, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { exportToExcel, importExcelFile, readExcelFile } from "@/utils/excelUtils";

const mockUsers = [
  { 
    id: "1", 
    name: "Budi Santoso", 
    username: "budi.s", 
    role: "student", 
    class: "6A",
    status: "active" 
  },
  { 
    id: "2", 
    name: "Siti Nurhaliza", 
    username: "siti.n", 
    role: "student", 
    class: "6A",
    status: "active" 
  },
  { 
    id: "3", 
    name: "Ahmad Dahlan", 
    username: "ahmad.d", 
    role: "teacher", 
    class: "",
    status: "active" 
  },
  { 
    id: "4", 
    name: "Dewi Kartika", 
    username: "dewi.k", 
    role: "teacher", 
    class: "",
    status: "active" 
  },
  { 
    id: "5", 
    name: "Agus Supriyanto", 
    username: "agus.s", 
    role: "admin", 
    class: "",
    status: "active" 
  },
];

const UsersManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    role: "student",
    class: "",
    status: "active"
  });
  const { toast } = useToast();

  const filterUsers = (role: string, query: string) => {
    let filtered = [...mockUsers];
    
    if (role !== "all") {
      filtered = filtered.filter(user => user.role === role);
    }
    
    if (query) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) || 
        user.username.toLowerCase().includes(query.toLowerCase())
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

  const handleEditUser = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser({...user});
      setIsEditModalOpen(true);
    }
  };

  const handleUserFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Data Pengguna Diperbarui",
      description: `Data pengguna ${currentUser.name} telah berhasil diperbarui.`,
    });
    
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value
    });
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUserId = `user-${Date.now()}`;
    
    const userToAdd = {
      id: newUserId,
      name: newUser.name,
      username: newUser.username,
      role: newUser.role,
      class: newUser.role === "student" ? newUser.class : "",
      status: newUser.status
    };
    
    setFilteredUsers(prev => [userToAdd, ...prev]);
    
    toast({
      title: "Pengguna Ditambahkan",
      description: `Pengguna ${newUser.name} telah berhasil ditambahkan.`,
    });
    
    setNewUser({
      name: "",
      username: "",
      role: "student",
      class: "",
      status: "active"
    });
    setIsAddModalOpen(false);
  };

  const handleNewUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  const handleExportToExcel = () => {
    const dataToExport = filteredUsers.map(user => ({
      'Nama': user.name,
      'Username': user.username,
      'Role': user.role === 'admin' ? 'Administrator' : 
              user.role === 'teacher' ? 'Guru' : 'Siswa',
      'Kelas': user.class || '-',
      'Status': user.status === 'active' ? 'Aktif' : 'Nonaktif'
    }));
    
    exportToExcel(dataToExport, "Data_Pengguna", "Daftar_Pengguna");
    
    toast({
      title: "Data berhasil diekspor",
      description: "Data pengguna telah berhasil diekspor ke Excel"
    });
  };
  
  const handleImportFromExcel = () => {
    importExcelFile(async (file) => {
      try {
        const importedUsers = await readExcelFile(file);
        
        const processedUsers = importedUsers.map((user: any, index: number) => ({
          id: `imported-${Date.now()}-${index}`,
          name: user.Nama || user.nama || "",
          username: user.Username || user.username || `user${Date.now()}${index}`,
          role: (user.Role || user.role || "student").toLowerCase(),
          class: user.Kelas || user.kelas || "",
          status: ((user.Status || user.status || "").toLowerCase().includes('aktif')) ? "active" : "inactive"
        }));
        
        setFilteredUsers(prev => [...processedUsers, ...prev]);
        
        toast({
          title: "Data berhasil diimpor",
          description: `${processedUsers.length} data pengguna telah berhasil diimpor`
        });
      } catch (error) {
        toast({
          title: "Gagal mengimpor data",
          description: "Format file tidak valid atau terjadi kesalahan",
          variant: "destructive"
        });
      }
    });
  };

  const renderRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Admin</span>;
      case "teacher":
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Guru</span>;
      case "student":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Siswa</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{role}</span>;
    }
  };

  return (
    <DashboardLayout title="Manajemen Pengguna">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg font-semibold">Daftar Pengguna</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari pengguna..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Tambah Pengguna
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                  <DialogDescription>
                    Isi formulir di bawah untuk menambahkan pengguna baru.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddUserSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="add-name" className="text-right">
                        Nama
                      </label>
                      <Input
                        id="add-name"
                        name="name"
                        value={newUser.name}
                        onChange={handleNewUserInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="add-username" className="text-right">
                        Username
                      </label>
                      <Input
                        id="add-username"
                        name="username"
                        value={newUser.username}
                        onChange={handleNewUserInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="add-role" className="text-right">
                        Role
                      </label>
                      <Select
                        name="role"
                        value={newUser.role}
                        onValueChange={(value) => handleNewUserInputChange({
                          target: { name: "role", value }
                        } as any)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="teacher">Guru</SelectItem>
                          <SelectItem value="student">Siswa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newUser.role === "student" && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="add-class" className="text-right">
                          Kelas
                        </label>
                        <Select
                          name="class"
                          value={newUser.class}
                          onValueChange={(value) => handleNewUserInputChange({
                            target: { name: "class", value }
                          } as any)}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Pilih kelas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1A">Kelas 1A</SelectItem>
                            <SelectItem value="1B">Kelas 1B</SelectItem>
                            <SelectItem value="2A">Kelas 2A</SelectItem>
                            <SelectItem value="2B">Kelas 2B</SelectItem>
                            <SelectItem value="3A">Kelas 3A</SelectItem>
                            <SelectItem value="3B">Kelas 3B</SelectItem>
                            <SelectItem value="4A">Kelas 4A</SelectItem>
                            <SelectItem value="4B">Kelas 4B</SelectItem>
                            <SelectItem value="5A">Kelas 5A</SelectItem>
                            <SelectItem value="5B">Kelas 5B</SelectItem>
                            <SelectItem value="6A">Kelas 6A</SelectItem>
                            <SelectItem value="6B">Kelas 6B</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="add-status" className="text-right">
                        Status
                      </label>
                      <Select
                        name="status"
                        value={newUser.status}
                        onValueChange={(value) => handleNewUserInputChange({
                          target: { name: "status", value }
                        } as any)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Aktif</SelectItem>
                          <SelectItem value="inactive">Nonaktif</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Tambah Pengguna</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleImportFromExcel}>
              <Upload className="mr-2 h-4 w-4" />
              Impor
            </Button>
            <Button variant="outline" onClick={handleExportToExcel}>
              <Download className="mr-2 h-4 w-4" />
              Ekspor
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">Semua Pengguna</TabsTrigger>
            <TabsTrigger value="admin">Administrator</TabsTrigger>
            <TabsTrigger value="teacher">Guru</TabsTrigger>
            <TabsTrigger value="student">Siswa</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="border rounded-md mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{renderRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.class || "-"}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {user.status === "active" ? "Aktif" : "Nonaktif"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditUser(user.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Pengguna dihapus",
                                description: `Pengguna ${user.name} telah dihapus.`,
                              });
                              setFilteredUsers(prev => prev.filter(u => u.id !== user.id));
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Tidak ada data pengguna yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Data Pengguna</DialogTitle>
              <DialogDescription>
                Ubah informasi pengguna di bawah ini.
              </DialogDescription>
            </DialogHeader>
            {currentUser && (
              <form onSubmit={handleUserFormSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Nama
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={currentUser.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="username" className="text-right">
                      Username
                    </label>
                    <Input
                      id="username"
                      name="username"
                      value={currentUser.username}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="role" className="text-right">
                      Role
                    </label>
                    <Select
                      name="role"
                      defaultValue={currentUser.role}
                      onValueChange={(value) => handleInputChange({
                        target: { name: "role", value }
                      } as any)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="teacher">Guru</SelectItem>
                        <SelectItem value="student">Siswa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {currentUser.role === "student" && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="class" className="text-right">
                        Kelas
                      </label>
                      <Select
                        name="class"
                        defaultValue={currentUser.class}
                        onValueChange={(value) => handleInputChange({
                          target: { name: "class", value }
                        } as any)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1A">Kelas 1A</SelectItem>
                          <SelectItem value="1B">Kelas 1B</SelectItem>
                          <SelectItem value="2A">Kelas 2A</SelectItem>
                          <SelectItem value="2B">Kelas 2B</SelectItem>
                          <SelectItem value="3A">Kelas 3A</SelectItem>
                          <SelectItem value="3B">Kelas 3B</SelectItem>
                          <SelectItem value="4A">Kelas 4A</SelectItem>
                          <SelectItem value="4B">Kelas 4B</SelectItem>
                          <SelectItem value="5A">Kelas 5A</SelectItem>
                          <SelectItem value="5B">Kelas 5B</SelectItem>
                          <SelectItem value="6A">Kelas 6A</SelectItem>
                          <SelectItem value="6B">Kelas 6B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="status" className="text-right">
                      Status
                    </label>
                    <Select
                      name="status"
                      defaultValue={currentUser.status}
                      onValueChange={(value) => handleInputChange({
                        target: { name: "status", value }
                      } as any)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="inactive">Nonaktif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Simpan Perubahan</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default UsersManagement;
