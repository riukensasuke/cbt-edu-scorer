
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Save, 
  Calendar, 
  Clock, 
  School, 
  Settings as SettingsIcon,
  User, 
  Shield, 
  Database,
  Bell
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [academicYear, setAcademicYear] = useState("2023/2024");
  const [semester, setSemester] = useState("2");
  const [schoolName, setSchoolName] = useState("SD Negeri 1 Contoh");
  const [schoolAddress, setSchoolAddress] = useState("Jl. Pendidikan No. 123, Kecamatan Contoh, Kabupaten Contoh");
  const [principalName, setPrincipalName] = useState("Drs. Budi Santoso, M.Pd.");
  
  const [autoLogout, setAutoLogout] = useState(true);
  const [preventTabSwitch, setPreventTabSwitch] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  
  const handleSaveGeneralSettings = () => {
    toast.success("Pengaturan umum berhasil disimpan");
  };
  
  const handleSaveExamSettings = () => {
    toast.success("Pengaturan ujian berhasil disimpan");
  };
  
  const handleSaveSecuritySettings = () => {
    toast.success("Pengaturan keamanan berhasil disimpan");
  };

  return (
    <DashboardLayout title="Pengaturan">
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" /> Umum
          </TabsTrigger>
          <TabsTrigger value="exam" className="flex items-center gap-2">
            <School className="h-4 w-4" /> Ujian
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Keamanan
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Sekolah</CardTitle>
              <CardDescription>
                Pengaturan dasar informasi sekolah
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schoolName">Nama Sekolah</Label>
                <Input 
                  id="schoolName" 
                  value={schoolName} 
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schoolAddress">Alamat Sekolah</Label>
                <Textarea 
                  id="schoolAddress" 
                  value={schoolAddress} 
                  onChange={(e) => setSchoolAddress(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="principalName">Nama Kepala Sekolah</Label>
                <Input 
                  id="principalName" 
                  value={principalName} 
                  onChange={(e) => setPrincipalName(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneralSettings}>
                <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tahun Ajaran</CardTitle>
              <CardDescription>
                Pengaturan tahun ajaran aktif
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Tahun Ajaran</Label>
                  <Select 
                    value={academicYear} 
                    onValueChange={setAcademicYear}
                  >
                    <SelectTrigger id="academicYear">
                      <SelectValue placeholder="Pilih tahun ajaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2022/2023">2022/2023</SelectItem>
                      <SelectItem value="2023/2024">2023/2024</SelectItem>
                      <SelectItem value="2024/2025">2024/2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select 
                    value={semester} 
                    onValueChange={setSemester}
                  >
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Pilih semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Semester 1 (Ganjil)</SelectItem>
                      <SelectItem value="2">Semester 2 (Genap)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-md">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">Tahun Ajaran Aktif</h4>
                  <p className="text-sm text-muted-foreground">
                    {academicYear} - {semester === "1" ? "Semester Ganjil" : "Semester Genap"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneralSettings}>
                <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="exam" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Ujian</CardTitle>
              <CardDescription>
                Konfigurasi perilaku ujian dalam aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultDuration">Durasi Default Ujian (menit)</Label>
                    <Input 
                      id="defaultDuration" 
                      type="number" 
                      defaultValue="90" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="warningTime">Peringatan Waktu Habis (menit)</Label>
                    <Input 
                      id="warningTime" 
                      type="number" 
                      defaultValue="10" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultQuestionCount">Jumlah Default Soal</Label>
                    <Input 
                      id="defaultQuestionCount" 
                      type="number" 
                      defaultValue="25" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passingScore">Nilai Kelulusan Default</Label>
                    <Input 
                      id="passingScore" 
                      type="number" 
                      defaultValue="70" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="randomizeQuestions">Acak Urutan Soal</Label>
                    <Switch id="randomizeQuestions" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mengacak urutan soal untuk setiap siswa
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="randomizeOptions">Acak Pilihan Jawaban</Label>
                    <Switch id="randomizeOptions" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mengacak urutan pilihan jawaban untuk soal pilihan ganda
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showResults">Tampilkan Hasil Setelah Selesai</Label>
                    <Switch id="showResults" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Menampilkan hasil ujian segera setelah siswa menyelesaikan ujian
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveExamSettings}>
                <Save className="mr-2 h-4 w-4" /> Simpan Pengaturan Ujian
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Keamanan</CardTitle>
              <CardDescription>
                Konfigurasi keamanan aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoLogout">Logout Otomatis</Label>
                    <Switch 
                      id="autoLogout" 
                      checked={autoLogout}
                      onCheckedChange={setAutoLogout}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Logout otomatis setelah tidak aktif selama 30 menit
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Durasi Sesi (menit)</Label>
                  <Input 
                    id="sessionTimeout" 
                    type="number" 
                    defaultValue="30" 
                    disabled={!autoLogout}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="preventTabSwitch">Cegah Pindah Tab</Label>
                    <Switch 
                      id="preventTabSwitch" 
                      checked={preventTabSwitch}
                      onCheckedChange={setPreventTabSwitch}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mencegah siswa berpindah tab selama ujian
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Notifikasi</Label>
                    <Switch 
                      id="notifications" 
                      checked={enableNotifications}
                      onCheckedChange={setEnableNotifications}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan notifikasi untuk aktivitas penting
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordComplexity">Kompleksitas Password</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="passwordComplexity">
                      <SelectValue placeholder="Pilih kompleksitas password" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Rendah (minimal 6 karakter)</SelectItem>
                      <SelectItem value="medium">Sedang (minimal 8 karakter dengan angka)</SelectItem>
                      <SelectItem value="high">Tinggi (minimal 10 karakter dengan angka dan simbol)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSecuritySettings}>
                <Save className="mr-2 h-4 w-4" /> Simpan Pengaturan Keamanan
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Backup Database</CardTitle>
              <CardDescription>
                Cadangkan dan pulihkan data aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-md">
                <Database className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">Backup Terakhir</h4>
                  <p className="text-sm text-muted-foreground">
                    12 Oktober 2023, 08:30
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button variant="outline">
                  Backup Data
                </Button>
                <Button variant="outline">
                  Restore Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
