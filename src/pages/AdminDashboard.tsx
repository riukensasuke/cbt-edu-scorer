
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, UserCheck, FileText, Book, School, BookOpen } from "lucide-react";

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
  const dapodikConfig = {
    appName: "Edu-Score",
    appIp: "192.168.1.100",
    dapodikIp: "10.0.0.100",
    key: "ABC123XYZ456",
    npsn: "20123456",
  };

  return (
    <DashboardLayout title="Dashboard Admin">
      <div className="space-y-6">
        {/* Welcome and Configuration Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Welcome Card */}
          <Card>
            <CardHeader>
              <CardTitle>Selamat Datang di Edu-Score</CardTitle>
              <CardDescription>
                Sistem Ujian Sekolah Dasar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Kelola ujian, soal, dan pengguna dengan mudah melalui dashboard admin.
              </p>
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
                <div className="pt-2">
                  <button className="w-full bg-primary text-white px-4 py-2 rounded text-sm">
                    Edit Konfigurasi
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Statistik Sistem</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Total seluruh pengguna sistem
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pengguna Online</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.onlineUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Pengguna yang sedang aktif
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Siswa Sedang Tes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.studentsInTest}</div>
                <p className="text-xs text-muted-foreground">
                  Siswa yang sedang mengerjakan ujian
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Siswa Online</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.onlineStudents}</div>
                <p className="text-xs text-muted-foreground">
                  Siswa yang sedang online
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Guru Aktif</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeTeachers}</div>
                <p className="text-xs text-muted-foreground">
                  Guru yang aktif dalam sistem
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Siswa Aktif</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeStudents}</div>
                <p className="text-xs text-muted-foreground">
                  Siswa yang aktif dalam sistem
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kelas Aktif</CardTitle>
                <School className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeClasses}</div>
                <p className="text-xs text-muted-foreground">
                  Jumlah kelas yang aktif
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pembelajaran Aktif</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeLearnings}</div>
                <p className="text-xs text-muted-foreground">
                  Jumlah pembelajaran yang aktif
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mata Pelajaran Aktif</CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeSubjects}</div>
                <p className="text-xs text-muted-foreground">
                  Jumlah mapel yang aktif
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Soal Aktif</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeQuestions}</div>
                <p className="text-xs text-muted-foreground">
                  Jumlah soal yang tersedia
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ujian Aktif</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeTests}</div>
                <p className="text-xs text-muted-foreground">
                  Ujian yang sedang berjalan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ujian Akan Datang</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.upcomingTests}</div>
                <p className="text-xs text-muted-foreground">
                  Ujian yang akan datang
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ujian Terlewatkan</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.closedTests}</div>
                <p className="text-xs text-muted-foreground">
                  Ujian yang telah berakhir
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
