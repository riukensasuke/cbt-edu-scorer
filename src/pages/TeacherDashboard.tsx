
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import UpcomingExams from "@/components/dashboard/UpcomingExams";
import RecentResults from "@/components/dashboard/RecentResults";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubjectStats from "@/components/Statistics/SubjectStats";
import { useTeacherDashboard } from "@/hooks/useTeacherDashboard";
import { Heart, Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TeacherTokenButton from "@/components/teacher/TeacherTokenButton";

const TeacherDashboard = () => {
  const { user, upcomingExams, recentResults, getBadgeForStatus, getScoreBadgeColor } = useTeacherDashboard();
  const [selectedSubject, setSelectedSubject] = useState<string>("Matematika");
  
  const subjects = ["Matematika", "Bahasa Indonesia", "IPA"];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <WelcomeCard 
            name={user?.name || "Guru"} 
            role="teacher"
          />
          <TeacherTokenButton />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Statistik Mata Pelajaran</CardTitle>
                    <CardDescription>Status siswa pada ujian yang dibuat</CardDescription>
                  </div>
                  <Select 
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pilih mata pelajaran" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <SubjectStats subject={selectedSubject} />
              </CardContent>
            </Card>
            
            <UpcomingExams exams={upcomingExams} getBadgeForStatus={getBadgeForStatus} />
            <RecentResults results={recentResults} getScoreBadgeColor={getScoreBadgeColor} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
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
            <CardFooter>
              <Button variant="outline" className="w-full">
                Hubungi Kami
              </Button>
            </CardFooter>
          </Card>
          
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

export default TeacherDashboard;
