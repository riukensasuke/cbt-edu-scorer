import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, UserCheck, FileText, Book, School, BookOpen, Heart, Info, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  // Mock statistics data
  const stats = {
    totalUsers: 120,
    onlineUsers: 45,
    studentsInTest: 12,
    onlineStudents: 30,
    activeTeachers: 15,
    activeStudents: 98,
    activeClasses: 12,
    activeLearnings: 24,
    activeSubjects: 8,
    activeQuestions: 250,
    activeTests: 5,
    upcomingTests: 3,
    closedTests: 10,
  };

  // Configuration for Dapodik
  const [dapodikConfig, setDapodikConfig] = useState({
    appName: "Edu-Score",
    appIp: "192.168.1.100",
    dapodikIp: "10.0.0.100",
    key: "ABC123XYZ456",
    npsn: "20123456",
  });

  // School info from Dapodik
  const [schoolInfo, setSchoolInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });
  
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [editedConfig, setEditedConfig] = useState({...dapodikConfig});
  const { toast } = useToast();

  // Mock function to fetch data from Dapodik
  const fetchDapodikData = () => {
    // This would be an actual API call in production
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "SDN Contoh 1",
          address: "Jl. Pendidikan No. 123, Jakarta",
          phone: "021-5552525",
          email: "sdn.contoh1@edu.id"
        });
      }, 1000);
    });
  };

  useEffect(() => {
    // When configuration changes, fetch school data
    const getSchoolData = async () => {
      try {
        const data = await fetchDapodikData();
        setSchoolInfo(data as any);
        toast({
          title: "Data berhasil disinkronkan",
          description: "Data sekolah berhasil diambil dari Dapodik"
        });
      } catch (error) {
        toast({
          title: "Gagal mengambil data",
          description: "Terjadi kesalahan saat mengambil data dari Dapodik",
          variant: "destructive"
        });
      }
    };

    // Only fetch if we have NPSN and API key set
    if (dapodikConfig.npsn && dapodikConfig.key) {
      getSchoolData();
    }
  }, [dapodikConfig, toast]);

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedConfig({
      ...editedConfig,
      [name]: value
    });
  };

  const saveConfig = async () => {
    setDapodikConfig(editedConfig);
    setIsEditingConfig(false);
    
    // Fetch updated school info after saving config
    try {
      const data = await fetchDapodikData();
      setSchoolInfo(data as any);
      toast({
        title: "Konfigurasi disimpan",
        description: "Konfigurasi Dapodik berhasil diperbarui dan data sekolah telah disinkronkan"
      });
    } catch (error) {
      toast({
        title: "Konfigurasi disimpan",
        description: "Konfigurasi Dapodik berhasil diperbarui namun gagal mengambil data sekolah",
        variant: "destructive"
      });
    }
  };

  // Card background colors based on type
  const statCardColors = {
    totalUsers: "bg-gradient-to-br from-blue-500 to-blue-600",
    onlineUsers: "bg-gradient-to-br from-green-500 to-green-600",
    studentsInTest: "bg-gradient-to-br from-amber-500 to-amber-600",
    onlineStudents: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    activeTeachers: "bg-gradient-to-br from-purple-500 to-purple-600",
    activeStudents: "bg-gradient-to-br from-pink-500 to-pink-600",
    activeClasses: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    activeLearnings: "bg-gradient-to-br from-fuchsia-500 to-fuchsia-600",
    activeSubjects: "bg-gradient-to-br from-orange-500 to-orange-600",
    activeQuestions: "bg-gradient-to-br from-lime-500 to-lime-600",
    activeTests: "bg-gradient-to-br from-rose-500 to-rose-600",
    upcomingTests: "bg-gradient-to-br from-teal-500 to-teal-600",
    closedTests: "bg-gradient-to-br from-red-500 to-red-600",
  };

  return (
    <DashboardLayout title="Dashboard Admin">
      <div className="space-y-6">
        {/* Welcome and Configuration Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Welcome Card with enhanced friendly background */}
          <Card className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-2 border-blue-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-gradient-primary">Selamat Datang di Edu-Score</CardTitle>
              <CardDescription>
                Sistem Ujian Sekolah Dasar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Kelola ujian, soal, dan pengguna dengan mudah melalui dashboard admin.
              </p>
              {schoolInfo.name && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="font-semibold text-blue-700">{schoolInfo.name}</p>
                  <p className="text-sm text-blue-600">{schoolInfo.address}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dapodik Configuration Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Konfigurasi Dapodik</CardTitle>
                <CardDescription>
                  Pengaturan Web Service Dapodik
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {isEditingConfig ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Nama Aplikasi:</label>
                      <Input 
                        name="appName" 
                        value={editedConfig.appName} 
                        onChange={handleConfigChange} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Alamat IP Aplikasi:</label>
                      <Input 
                        name="appIp" 
                        value={editedConfig.appIp} 
                        onChange={handleConfigChange} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Alamat IP Dapodik:</label>
                      <Input 
                        name="dapodikIp" 
                        value={editedConfig.dapodikIp} 
                        onChange={handleConfigChange} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Key Web Service:</label>
                      <Input 
                        name="key" 
                        value={editedConfig.key} 
                        onChange={handleConfigChange} 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">NPSN Sekolah:</label>
                      <Input 
                        name="npsn" 
                        value={editedConfig.npsn} 
                        onChange={handleConfigChange} 
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm font-medium">Nama Aplikasi:</span>
                      <span className="text-sm">{dapodikConfig.appName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm font-medium">Alamat IP Aplikasi:</span>
                      <span className="text-sm">{dapodikConfig.appIp}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm font-medium">Alamat IP Dapodik:</span>
                      <span className="text-sm">{dapodikConfig.dapodikIp}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm font-medium">Key Web Service:</span>
                      <span className="text-sm">{dapodikConfig.key}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-sm font-medium">NPSN Sekolah:</span>
                      <span className="text-sm">{dapodikConfig.npsn}</span>
                    </div>
                    {schoolInfo.name && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-700 mb-1 font-medium">Status: Tersinkronisasi ✓</p>
                        <p className="text-xs text-green-600">{schoolInfo.name}</p>
                      </div>
                    )}
                  </div>
                )}
                <div className="pt-2">
                  {isEditingConfig ? (
                    <div className="flex gap-2">
                      <Button className="w-1/2" variant="outline" onClick={() => setIsEditingConfig(false)}>
                        Batal
                      </Button>
                      <Button className="w-1/2" onClick={saveConfig}>
                        Simpan & Sinkronkan
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full" onClick={() => setIsEditingConfig(true)}>
                      <Settings className="mr-2 h-4 w-4" /> Edit Konfigurasi
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Statistik Sistem</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card className={`${statCardColors.totalUsers} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                <Users className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-white/80">
                  Total seluruh pengguna sistem
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.onlineUsers} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pengguna Online</CardTitle>
                <UserCheck className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.onlineUsers}</div>
                <p className="text-xs text-white/80">
                  Pengguna yang sedang aktif
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.studentsInTest} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Siswa Sedang Tes</CardTitle>
                <FileText className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.studentsInTest}</div>
                <p className="text-xs text-white/80">
                  Siswa yang sedang mengerjakan ujian
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.onlineStudents} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Siswa Online</CardTitle>
                <Users className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.onlineStudents}</div>
                <p className="text-xs text-white/80">
                  Siswa yang sedang online
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.activeTeachers} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Guru Aktif</CardTitle>
                <Users className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeTeachers}</div>
                <p className="text-xs text-white/80">
                  Guru yang aktif dalam sistem
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.activeStudents} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Siswa Aktif</CardTitle>
                <Users className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeStudents}</div>
                <p className="text-xs text-white/80">
                  Siswa yang aktif dalam sistem
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.activeClasses} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kelas Aktif</CardTitle>
                <School className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeClasses}</div>
                <p className="text-xs text-white/80">
                  Jumlah kelas yang aktif
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.activeLearnings} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pembelajaran Aktif</CardTitle>
                <BookOpen className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeLearnings}</div>
                <p className="text-xs text-white/80">
                  Jumlah pembelajaran yang aktif
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.activeSubjects} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mata Pelajaran Aktif</CardTitle>
                <Book className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeSubjects}</div>
                <p className="text-xs text-white/80">
                  Jumlah mapel yang aktif
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.activeQuestions} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Soal Aktif</CardTitle>
                <FileText className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeQuestions}</div>
                <p className="text-xs text-white/80">
                  Jumlah soal yang tersedia
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.activeTests} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ujian Aktif</CardTitle>
                <FileText className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeTests}</div>
                <p className="text-xs text-white/80">
                  Ujian yang sedang berjalan
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.upcomingTests} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ujian Akan Datang</CardTitle>
                <FileText className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.upcomingTests}</div>
                <p className="text-xs text-white/80">
                  Ujian yang akan datang
                </p>
              </CardContent>
            </Card>

            <Card className={`${statCardColors.closedTests} border-none text-white shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ujian Terlewatkan</CardTitle>
                <FileText className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.closedTests}</div>
                <p className="text-xs text-white/80">
                  Ujian yang telah berakhir
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Developer Information Section */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Developer Info */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" /> Pengembang Aplikasi
              </CardTitle>
              <CardDescription>
                Informasi tentang pengembang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-base font-semibold mb-1">PT Edukasi Teknologi Indonesia</h3>
                <p className="text-sm text-muted-foreground">
                  Jl. Pendidikan No.123<br/>
                  Jakarta Pusat, Indonesia<br/>
                  info@edu-score.id<br/>
                  +62 21 5552525
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Tim Pengembang:</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>Budi Santoso (Project Manager)</li>
                  <li>Siti Aminah (Lead Developer)</li>
                  <li>Joko Widodo (UI/UX Designer)</li>
                  <li>Dewi Lestari (Quality Assurance)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* App Information */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" /> Tentang Aplikasi
              </CardTitle>
              <CardDescription>
                Informasi detail aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold">Versi Aplikasi:</h3>
                <p className="text-sm text-muted-foreground">Edu-Score v2.5.1</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Deskripsi:</h3>
                <p className="text-sm text-muted-foreground">
                  Edu-Score adalah sistem ujian online yang dirancang khusus untuk sekolah dasar di Indonesia.
                  Sistem ini membantu guru untuk membuat, mengelola, dan mengevaluasi ujian dengan mudah dan efisien.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Fitur Utama:</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>Ujian online dengan keamanan token</li>
                  <li>Bank soal terintegrasi</li>
                  <li>Analisis hasil ujian</li>
                  <li>Manajemen kelas dan siswa</li>
                  <li>Integrasi dengan Dapodik</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Info className="mr-2 h-4 w-4" /> Lihat Lisensi
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Informasi Lisensi</DialogTitle>
                    <DialogDescription>
                      Detail lisensi aplikasi Edu-Score
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Edu-Score</h3>
                      <p className="text-sm text-muted-foreground">
                        © 2024 PT Edukasi Teknologi Indonesia
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Lisensi Pengguna</h3>
                      <p className="text-sm text-muted-foreground">
                        Aplikasi ini dilisensikan untuk digunakan oleh institusi pendidikan.
                        Dilarang menyalin, mendistribusikan, atau memodifikasi aplikasi ini
                        tanpa izin tertulis dari PT Edukasi Teknologi Indonesia.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>Tutup</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          
          {/* Donation Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" /> Berkenan Berdonasi
              </CardTitle>
              <CardDescription>
                Dukung pengembangan aplikasi Edu-Score
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Aplikasi ini dikembangkan dengan penuh dedikasi untuk kemajuan pendidikan di Indonesia.
                Dukungan Anda akan membantu kami meningkatkan fitur dan kualitas aplikasi.
              </p>
              <div>
                <h3 className="text-sm font-semibold">Rekening Donasi:</h3>
                <ul className="text-sm text-muted-foreground list-none space-y-1">
                  <li>Bank BCA: 1234567890 (PT Edukasi Teknologi)</li>
                  <li>Bank Mandiri: 0987654321 (PT Edukasi Teknologi)</li>
                  <li>Bank BNI: 1122334455 (PT Edukasi Teknologi)</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    <Heart className="mr-2 h-4 w-4" /> Donasi Sekarang
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cara Berdonasi</DialogTitle>
                    <DialogDescription>
                      Pilih metode donasi yang Anda inginkan
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Transfer Bank</h3>
                      <p className="text-sm text-muted-foreground">
                        Silakan transfer ke salah satu rekening berikut:
                      </p>
                      <ul className="text-sm text-muted-foreground list-none space-y-1 mt-2">
                        <li>Bank BCA: 1234567890 (PT Edukasi Teknologi)</li>
                        <li>Bank Mandiri: 0987654321 (PT Edukasi Teknologi)</li>
                        <li>Bank BNI: 1122334455 (PT Edukasi Teknologi)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium">E-Wallet</h3>
                      <p className="text-sm text-muted-foreground">
                        Scan QRIS di bawah ini untuk donasi melalui e-wallet:
                      </p>
                      <div className="flex justify-center my-4">
                        <div className="bg-gray-100 h-32 w-32 flex items-center justify-center border">
                          <span className="text-xs text-center text-muted-foreground">QRIS Code</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Setelah melakukan donasi, silakan kirim bukti transfer ke email: donasi@edu-score.id
                    </p>
                  </div>
                  <DialogFooter>
                    <Button>Terima Kasih</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
