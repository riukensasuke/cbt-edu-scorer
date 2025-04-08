
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, UserPlus, RefreshCw } from "lucide-react";
import DapodikSyncButton from '@/components/admin/DapodikSyncButton';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock initial users data
const initialUsers = [
  { id: "u1", name: "Admin Sistem", username: "admin", role: "admin", status: "active" },
  { id: "u2", name: "Siti Rahayu", username: "siti.rahayu", role: "teacher", status: "active" },
  { id: "u3", name: "Bambang Suparman", username: "bambang.suparman", role: "teacher", status: "active" },
  { id: "u4", name: "Rini Sulastri", username: "rini.sulastri", role: "teacher", status: "inactive" },
  { id: "s1", name: "Andi Pratama", username: "andi.pratama", role: "student", status: "active" },
  { id: "s2", name: "Rina Wati", username: "rina.wati", role: "student", status: "active" },
  { id: "s3", name: "Deni Firmansyah", username: "deni.firmansyah", role: "student", status: "inactive" },
];

const UsersManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    role: "student",
    status: "active"
  });
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Admin</span>;
      case "teacher":
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Guru</span>;
      case "student":
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Siswa</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{role}</span>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Aktif</span>
      : <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Nonaktif</span>;
  };

  const handleAddUser = () => {
    setIsAddUserDialogOpen(true);
  };

  const handleEditUser = (user: any) => {
    setCurrentUser(user);
    setIsEditUserDialogOpen(true);
  };

  const handleSaveNewUser = () => {
    const userId = `u${Date.now()}`;
    const user = { id: userId, ...newUser };
    setUsers([...users, user]);
    setIsAddUserDialogOpen(false);
    setNewUser({
      name: "",
      username: "",
      role: "student",
      status: "active"
    });
    toast({
      title: "Pengguna ditambahkan",
      description: `${newUser.name} telah berhasil ditambahkan sebagai ${newUser.role}`,
    });
  };

  const handleUpdateUser = () => {
    if (!currentUser) return;
    
    setUsers(users.map(user => 
      user.id === currentUser.id ? currentUser : user
    ));
    setIsEditUserDialogOpen(false);
    toast({
      title: "Pengguna diperbarui",
      description: `Data pengguna ${currentUser.name} telah diperbarui`,
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "Pengguna dihapus",
      description: "Pengguna telah berhasil dihapus dari sistem",
    });
  };

  const handleDapodikSyncComplete = (newUsers: any[]) => {
    // Add new users to the existing users list
    setUsers(prevUsers => {
      // Filter out duplicates based on ID
      const existingIds = new Set(prevUsers.map(user => user.id));
      const uniqueNewUsers = newUsers.filter(user => !existingIds.has(user.id));
      
      return [...prevUsers, ...uniqueNewUsers];
    });
  };

  return (
    <DashboardLayout title="Manajemen Pengguna">
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari pengguna..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full sm:w-64"
            />
          </div>
          
          <div className="flex space-x-3 w-full sm:w-auto">
            <Button onClick={handleAddUser}>
              <UserPlus className="mr-2 h-4 w-4" />
              Tambah Pengguna
            </Button>
            
            <DapodikSyncButton onSyncComplete={handleDapodikSyncComplete} />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pengguna</CardTitle>
            <CardDescription>
              Kelola semua pengguna dalam sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Nama</th>
                    <th className="text-left py-3 px-4 font-medium">Username</th>
                    <th className="text-left py-3 px-4 font-medium">Role</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-right py-3 px-4 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-muted-foreground">
                        Tidak ada data pengguna
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.username}</td>
                        <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                        <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteUser(user.id)}>
                              Hapus
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Pengguna Baru</DialogTitle>
            <DialogDescription>
              Isi form berikut untuk menambahkan pengguna baru ke sistem.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={newUser.username}
                onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({...newUser, role: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="teacher">Guru</SelectItem>
                  <SelectItem value="student">Siswa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={newUser.status}
                onValueChange={(value) => setNewUser({...newUser, status: value})}
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
            <DialogClose asChild>
              <Button type="button" variant="secondary">Batal</Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveNewUser}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Pengguna</DialogTitle>
            <DialogDescription>
              Edit informasi pengguna berikut ini.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nama
                </Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-username" className="text-right">
                  Username
                </Label>
                <Input
                  id="edit-username"
                  value={currentUser.username}
                  onChange={(e) => setCurrentUser({...currentUser, username: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select
                  value={currentUser.role}
                  onValueChange={(value) => setCurrentUser({...currentUser, role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="teacher">Guru</SelectItem>
                    <SelectItem value="student">Siswa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={currentUser.status}
                  onValueChange={(value) => setCurrentUser({...currentUser, status: value})}
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
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Batal</Button>
            </DialogClose>
            <Button type="button" onClick={handleUpdateUser}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UsersManagement;
