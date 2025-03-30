
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Plus, Users } from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for exams
  const myExams = [
    {
      id: "1",
      title: "UTS Matematika",
      subject: "Matematika",
      grade: "Kelas 6",
      status: "active",
      questions: 25,
      date: "15 Oktober 2023",
      submissions: 18,
    },
    {
      id: "2",
      title: "UTS Matematika",
      subject: "Matematika",
      grade: "Kelas 5",
      status: "active",
      questions: 20,
      date: "16 Oktober 2023",
      submissions: 12,
    },
    {
      id: "3",
      title: "UTS Matematika",
      subject: "Matematika",
      grade: "Kelas 4",
      status: "draft",
      questions: 15,
      date: "17 Oktober 2023",
      submissions: 0,
    },
  ];
  
  // Mock data for question bank
  const questionStats = [
    { category: "Pilihan Ganda", count: 150 },
    { category: "Esai", count: 45 },
    { category: "Menjodohkan", count: 30 },
    { category: "Bergambar", count: 25 },
  ];
  
  // Mock data for classes
  const myClasses = [
    { name: "Kelas 6A", count: 28 },
    { name: "Kelas 5A", count: 25 },
    { name: "Kelas 4A", count: 30 },
  ];

  return (
    <DashboardLayout title="Dashboard Guru">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Ujian Saya</CardTitle>
                <CardDescription>
                  Kelola ujian yang telah Anda buat
                </CardDescription>
              </div>
              <Button onClick={() => navigate("/exams")} size="sm">
                <Plus className="mr-2 h-4 w-4" /> Buat Ujian
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{exam.title} {exam.grade}</h3>
                      <Badge variant={exam.status === "active" ? "default" : "outline"}>
                        {exam.status === "active" ? "Aktif" : "Draft"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Mata Pelajaran: {exam.subject} • {exam.questions} soal • {exam.date}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">{exam.submissions}</span> pengumpulan
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/exams/${exam.id}`)}>
                        Detail
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={() => navigate("/exams")}>
                Lihat Semua Ujian
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bank Soal</CardTitle>
                <CardDescription>
                  Soal yang telah Anda buat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {questionStats.map((stat) => (
                    <div key={stat.category} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{stat.category}</span>
                      </div>
                      <Badge variant="outline">{stat.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate("/questions")}>
                  Kelola Bank Soal
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kelas Saya</CardTitle>
                <CardDescription>
                  Kelas yang Anda ajar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {myClasses.map((cls) => (
                    <div key={cls.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{cls.name}</span>
                      </div>
                      <Badge variant="outline">{cls.count} siswa</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Tugas</CardTitle>
            <CardDescription>
              Tugas yang perlu diselesaikan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">Penilaian Esai</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  8 jawaban esai yang belum dinilai dari UTS Matematika Kelas 6
                </p>
                <Button size="sm" onClick={() => navigate("/results/1")}>
                  Nilai Sekarang
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Persiapan Ujian</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Ujian UTS Matematika Kelas 4 belum memiliki cukup soal (minimal 15 soal)
                </p>
                <Button variant="outline" size="sm" onClick={() => navigate("/questions")}>
                  Tambah Soal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
