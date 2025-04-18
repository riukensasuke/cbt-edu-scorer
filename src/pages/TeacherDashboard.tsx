import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import UpcomingExams from "@/components/dashboard/UpcomingExams";
import RecentResults from "@/components/dashboard/RecentResults";
import { useTeacherDashboard } from "@/hooks/useTeacherDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, BookOpen, Info, User, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getScoreBadgeColor } from "@/utils/statusUtils";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const TeacherDashboard = () => {
  const { user, upcomingExams, recentResults, getBadgeForStatus } = useTeacherDashboard();
  const navigate = useNavigate();
  
  const stats = [
    { title: "Total Siswa", value: 120, icon: <Users className="h-5 w-5" /> },
    { title: "Total Kelas", value: 4, icon: <BookOpen className="h-5 w-5" /> },
    { title: "Jadwal Hari Ini", value: 3, icon: <Calendar className="h-5 w-5" /> }
  ];

  const handleViewProfile = () => {
    navigate("/teacher/profile");
  };

  const handleViewTokens = () => {
    navigate("/token");
  };

  return (
    <DashboardLayout title="Dashboard Guru">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <WelcomeCard 
              name={user?.name || "Ibu/Bapak Guru"} 
              role="teacher"
              schoolName="SDN Contoh 1"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Info Profil Guru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-1">
                  <p className="text-sm font-medium">Nama:</p>
                  <p className="text-sm col-span-2">{user?.name || "Guru"}</p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <p className="text-sm font-medium">NIP:</p>
                  <p className="text-sm col-span-2">198304152005012003</p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <p className="text-sm font-medium">Wali Kelas:</p>
                  <p className="text-sm col-span-2">6A</p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <p className="text-sm font-medium">Status:</p>
                  <p className="text-sm col-span-2">PNS</p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <p className="text-sm font-medium">Mengajar:</p>
                  <p className="text-sm col-span-2">Matematika, IPA</p>
                </div>
                <div className="mt-3 space-y-2">
                  <Button variant="default" size="sm" className="w-full" onClick={handleViewProfile}>
                    Lihat Profil Lengkap
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" onClick={handleViewTokens}>
                    Kelola Token Ujian
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <UpcomingExams 
              exams={upcomingExams} 
              getBadgeForStatus={getBadgeForStatus} 
            />
          </div>
          <div>
            <RecentResults 
              results={recentResults} 
              getScoreBadgeColor={getScoreBadgeColor} 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terakhir</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="border-b pb-2">
                  <div className="text-sm">Membuat ujian Matematika Kelas 6A</div>
                  <div className="text-xs text-muted-foreground">Hari ini, 08:30</div>
                </li>
                <li className="border-b pb-2">
                  <div className="text-sm">Mengunduh hasil ujian Bahasa Indonesia</div>
                  <div className="text-xs text-muted-foreground">Kemarin, 14:15</div>
                </li>
                <li>
                  <div className="text-sm">Menambahkan 5 soal pada bank soal</div>
                  <div className="text-xs text-muted-foreground">2 hari lalu, 10:20</div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <Separator className="my-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Tentang Aplikasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Aplikasi Ujian Online adalah sistem manajemen ujian komprehensif yang dikembangkan untuk memudahkan 
                  pelaksanaan ujian di lingkungan pendidikan. Aplikasi ini memberikan kemudahan bagi guru dan admin 
                  untuk mengelola bank soal, menyusun ujian, dan menganalisis hasil ujian siswa.
                </p>
                <div className="mt-4">
                  <p className="text-sm font-medium">Versi: 1.2.0</p>
                  <p className="text-sm text-muted-foreground">Terakhir diperbarui: 5 April 2025</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Pembuat Aplikasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Aplikasi ini dikembangkan oleh Tim Pengembang Edukasi Digital dengan dukungan dari Kementerian Pendidikan dan Kebudayaan.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Pengembang:</span> PT Edukasi Teknologi Indonesia
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Website:</span> www.edukasi-teknologi.co.id
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> support@edukasi-teknologi.co.id
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Gift className="h-5 w-5 mr-2" />
                  Donasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Dukung pengembangan aplikasi ini dengan memberikan donasi. Dana yang terkumpul akan digunakan untuk 
                  meningkatkan fitur dan kualitas layanan aplikasi.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Gift className="h-4 w-4 mr-2" />
                  Donasi Sekarang
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Untuk informasi lebih lanjut tentang program donasi, hubungi kami di donasi@edukasi-teknologi.co.id
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
