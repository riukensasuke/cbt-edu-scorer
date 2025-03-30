
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, Clock, FileText, Trophy, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for upcoming exams
  const upcomingExams = [
    {
      id: "1",
      title: "UTS Matematika",
      subject: "Matematika",
      teacher: "Ibu Siti",
      date: "15 Oktober 2023",
      time: "08:00 - 09:30",
      duration: 90,
      status: "available",
    },
    {
      id: "2",
      title: "UTS Bahasa Indonesia",
      subject: "Bahasa Indonesia",
      teacher: "Bapak Ahmad",
      date: "16 Oktober 2023",
      time: "10:00 - 11:30",
      duration: 90,
      status: "upcoming",
    },
    {
      id: "3",
      title: "UTS IPA",
      subject: "IPA",
      teacher: "Ibu Rini",
      date: "17 Oktober 2023",
      time: "08:00 - 09:30",
      duration: 90,
      status: "upcoming",
    },
  ];
  
  // Mock data for recent results
  const recentResults = [
    {
      id: "1",
      title: "Latihan Matematika",
      subject: "Matematika",
      score: 85,
      date: "10 Oktober 2023",
    },
    {
      id: "2",
      title: "Latihan Bahasa Indonesia",
      subject: "Bahasa Indonesia",
      score: 90,
      date: "5 Oktober 2023",
    },
  ];

  // Mock data for missed exams
  const missedExams = [
    {
      id: "4",
      title: "Latihan IPA",
      subject: "IPA",
      teacher: "Ibu Rini",
      date: "1 Oktober 2023",
      status: "missed",
    },
    {
      id: "5",
      title: "Latihan IPS",
      subject: "IPS",
      teacher: "Bapak Ahmad",
      date: "25 September 2023",
      status: "missed",
    },
  ];
  
  // Get exam status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Tersedia</Badge>;
      case "upcoming":
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Akan Datang</Badge>;
      case "missed":
        return <Badge className="bg-red-500">Terlewatkan</Badge>;
      default:
        return <Badge variant="outline">Tidak Tersedia</Badge>;
    }
  };
  
  // Get score badge color
  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <DashboardLayout title="Dashboard Siswa">
      <div className="grid gap-6">
        {/* Welcome Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Halo, Muhammad Andi! 👋</h2>
                <p className="text-muted-foreground">
                  Selamat datang kembali di Edu-Score. Ada ujian yang tersedia untuk kamu kerjakan.
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border shadow-sm">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Tahun Ajaran</div>
                  <div className="text-xl font-bold">2023/2024</div>
                  <div className="text-xs text-muted-foreground">Semester Genap</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Ujian Mendatang</CardTitle>
                  <CardDescription>
                    Ujian yang harus kamu kerjakan
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/exams/active")}>
                  Lihat Semua
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div
                    key={exam.id}
                    className={`border rounded-lg p-4 ${
                      exam.status === "available" ? "bg-green-50 border-green-200" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{exam.title}</h3>
                      {getStatusBadge(exam.status)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{exam.subject}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{exam.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{exam.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Guru: {exam.teacher}
                      </div>
                      {exam.status === "available" ? (
                        <Button onClick={() => navigate(`/exam/${exam.id}`)}>
                          Kerjakan
                        </Button>
                      ) : (
                        <Button variant="outline" disabled>
                          Belum Tersedia
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hasil Terbaru</CardTitle>
              <CardDescription>
                Nilai ujian terbaru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentResults.map((result) => (
                  <div key={result.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {result.subject} • {result.date}
                        </div>
                      </div>
                      <Badge className={getScoreBadgeColor(result.score)}>
                        {result.score}
                      </Badge>
                    </div>
                    <Progress value={result.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/results")}
              >
                Lihat Semua Hasil
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Missed Exams Section */}
        <Card className="border-red-200">
          <CardHeader className="text-red-700">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <CardTitle>Ujian Terlewatkan</CardTitle>
            </div>
            <CardDescription className="text-red-600/80">
              Mata pelajaran yang belum dikerjakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {missedExams.map((exam) => (
                <div
                  key={exam.id}
                  className="border border-red-200 rounded-lg p-4 bg-red-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{exam.title}</h3>
                    {getStatusBadge(exam.status)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{exam.subject}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Batas waktu: {exam.date}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Guru: {exam.teacher}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-red-600 w-full text-center">
              Hubungi guru pengampu untuk informasi lebih lanjut
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengumuman</CardTitle>
            <CardDescription>
              Informasi terbaru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                <div className="mt-0.5">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-medium">Jadwal UTS Semester Genap</h4>
                  <p className="text-sm text-muted-foreground">
                    UTS Semester Genap akan dilaksanakan pada tanggal 15-20 Oktober 2023. Pastikan kamu sudah mempersiapkan diri dengan baik!
                  </p>
                  <p className="text-xs mt-2 text-muted-foreground">
                    12 Oktober 2023
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="mt-0.5">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Hasil Lomba Cerdas Cermat</h4>
                  <p className="text-sm text-muted-foreground">
                    Selamat kepada Tim A yang telah menjadi juara dalam Lomba Cerdas Cermat tingkat Kecamatan. Kalian hebat!
                  </p>
                  <p className="text-xs mt-2 text-muted-foreground">
                    5 Oktober 2023
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
