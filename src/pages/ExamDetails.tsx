
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Users, School, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getStatusBadge } from "@/utils/statusUtils";

// Extended mock exam data to include proper IDs from ExamManagement
const mockExamData = {
  "exam-1": {
    id: "exam-1",
    title: "UTS Matematika Semester 1",
    subject: "Matematika",
    grade: "Kelas 6A",
    status: "active",
    type: "mid",
    duration: 90,
    questions: 25,
    startDate: "2023-10-10T08:00:00",
    endDate: "2023-10-10T09:30:00",
    createdBy: "Ibu Siti",
    description: "Ujian Tengah Semester untuk mata pelajaran Matematika kelas 6A",
    instructions: "Kerjakan soal dengan teliti. Baca setiap pertanyaan dengan seksama sebelum menjawab.",
    passingScore: 70,
    questionDetails: [
      {
        id: "q1",
        type: "multiple_choice",
        question: "Berapakah hasil dari 24 × 8?",
        options: ["192", "172", "196", "188"],
        answer: "192"
      },
      {
        id: "q2",
        type: "multiple_choice",
        question: "Berapa hasil dari (4 × 6) + (7 × 3)?",
        options: ["45", "39", "51", "42"],
        answer: "45"
      },
      {
        id: "q3",
        type: "essay",
        question: "Selesaikan soal cerita berikut: Ibu membeli 5 kg buah apel dengan harga Rp15.000 per kg dan 3 kg buah jeruk dengan harga Rp12.000 per kg. Berapa total uang yang harus dibayar ibu?",
        answer: "Rp111.000"
      },
      {
        id: "q4",
        type: "multiple_choice",
        question: "Sebuah persegi panjang memiliki panjang 12 cm dan lebar 8 cm. Berapakah luas persegi panjang tersebut?",
        options: ["96 cm²", "80 cm²", "20 cm²", "40 cm²"],
        answer: "96 cm²"
      },
      {
        id: "q5",
        type: "essay",
        question: "Jelaskan cara menghitung luas segitiga dan berikan contoh perhitungannya!",
        answer: "Luas segitiga = (alas × tinggi) ÷ 2"
      }
    ]
  },
  "exam-2": {
    id: "exam-2",
    title: "UAS Bahasa Indonesia",
    subject: "Bahasa Indonesia",
    grade: "Kelas 5A",
    status: "scheduled",
    type: "final",
    duration: 120,
    questions: 30,
    startDate: "2023-12-15T10:00:00",
    endDate: "2023-12-15T12:00:00",
    createdBy: "Bapak Ahmad",
    description: "Ujian Akhir Semester untuk mata pelajaran Bahasa Indonesia kelas 5A",
    instructions: "Jawablah dengan bahasa yang baik dan benar. Perhatikan penggunaan tanda baca.",
    passingScore: 75,
    questionDetails: [
      {
        id: "q1",
        type: "multiple_choice",
        question: "Kalimat berikut yang menggunakan kata baku adalah...",
        options: [
          "Dia praktek mengajar di sekolah itu",
          "Saya mempraktikkan ilmu yang telah saya pelajari",
          "Mereka mempraktekan apa yang diajarkan",
          "Kami sedang praktek memasak"
        ],
        answer: "Saya mempraktikkan ilmu yang telah saya pelajari"
      },
      {
        id: "q2",
        type: "essay",
        question: "Tuliskan satu paragraf deskriptif tentang lingkungan sekolahmu!",
        answer: "(Jawaban bervariasi)"
      }
    ]
  },
  "exam-3": {
    id: "exam-3",
    title: "Ulangan Harian IPA",
    subject: "IPA",
    grade: "Kelas 6A",
    status: "draft",
    type: "daily",
    duration: 60,
    questions: 20,
    startDate: "",
    endDate: "",
    createdBy: "Ibu Rini",
    description: "Ulangan harian untuk mata pelajaran IPA kelas 6A tentang sistem tata surya",
    instructions: "Kerjakan dengan teliti dan jangan lupa tulis nama pada lembar jawaban.",
    passingScore: 70,
    questionDetails: [
      {
        id: "q1",
        type: "multiple_choice",
        question: "Planet terbesar di tata surya kita adalah...",
        options: ["Jupiter", "Saturnus", "Uranus", "Neptunus"],
        answer: "Jupiter"
      },
      {
        id: "q2",
        type: "multiple_choice",
        question: "Berapa jumlah planet di tata surya?",
        options: ["7", "8", "9", "10"],
        answer: "8"
      }
    ]
  }
};

// Add more exams to match with ExamManagement
for (let i = 4; i <= 10; i++) {
  mockExamData[`exam-${i}`] = {
    id: `exam-${i}`,
    title: `Ujian Sample ${i}`,
    subject: i % 3 === 0 ? "Matematika" : i % 3 === 1 ? "Bahasa Indonesia" : "IPA",
    grade: `Kelas ${Math.floor(Math.random() * 6) + 1}`,
    status: i % 4 === 0 ? "active" : i % 4 === 1 ? "scheduled" : i % 4 === 2 ? "completed" : "draft",
    type: i % 3 === 0 ? "mid" : i % 3 === 1 ? "final" : "daily",
    duration: 60 + (i * 10),
    questions: 10 + i,
    startDate: new Date(Date.now() + (i * 86400000)).toISOString(),
    endDate: new Date(Date.now() + (i * 86400000) + 3600000).toISOString(),
    createdBy: i % 2 === 0 ? "Ibu Siti" : "Bapak Ahmad",
    description: `Deskripsi untuk ujian sample ${i}`,
    instructions: `Petunjuk pengerjaan untuk ujian sample ${i}`,
    passingScore: 60 + i,
    questionDetails: [
      {
        id: `q1-exam${i}`,
        type: "multiple_choice",
        question: `Contoh pertanyaan 1 untuk ujian ${i}?`,
        options: ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
        answer: "Pilihan A"
      },
      {
        id: `q2-exam${i}`,
        type: "essay",
        question: `Contoh pertanyaan essay untuk ujian ${i}?`,
        answer: "Contoh jawaban"
      }
    ]
  };
}

const ExamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching exam details
    if (id && mockExamData[id as keyof typeof mockExamData]) {
      setExam(mockExamData[id as keyof typeof mockExamData]);
    } else {
      toast({
        title: "Error",
        description: "Ujian tidak ditemukan",
        variant: "destructive",
      });
    }
    setLoading(false);
  }, [id, toast]);

  if (loading) {
    return (
      <DashboardLayout title="Detail Ujian">
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!exam) {
    return (
      <DashboardLayout title="Detail Ujian">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-bold mb-2">Ujian tidak ditemukan</h2>
          <Button onClick={() => navigate("/exams")}>Kembali ke Daftar Ujian</Button>
        </div>
      </DashboardLayout>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout title="Detail Ujian">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{exam.title}</h1>
            <p className="text-muted-foreground">
              {exam.subject} • {exam.grade}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/exams")}>
              Kembali
            </Button>
            <Button onClick={() => navigate(`/exams/edit/${exam.id}`)}>
              Edit Ujian
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{exam.title}</CardTitle>
                <CardDescription>
                  {exam.subject} • {exam.grade}
                </CardDescription>
              </div>
              {getStatusBadge(exam.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Durasi: {exam.duration} menit</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Soal: {exam.questions} butir</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Mulai: {formatDate(exam.startDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Selesai: {formatDate(exam.endDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <School className="h-4 w-4 text-muted-foreground" />
                <span>Nilai Minimum: {exam.passingScore}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Dibuat oleh: {exam.createdBy}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Detail</TabsTrigger>
            <TabsTrigger value="questions">Daftar Soal</TabsTrigger>
            <TabsTrigger value="participants">Peserta</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Ujian</CardTitle>
                <CardDescription>Detail lengkap tentang ujian</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Deskripsi</h3>
                  <p>{exam.description || "Tidak ada deskripsi"}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Petunjuk</h3>
                  <p>{exam.instructions || "Tidak ada petunjuk"}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Tipe Ujian</h3>
                  <Badge variant="outline" className="capitalize">
                    {exam.type === "mid"
                      ? "Ujian Tengah Semester"
                      : exam.type === "final"
                      ? "Ujian Akhir Semester"
                      : "Ulangan Harian"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Soal</CardTitle>
                <CardDescription>{exam.questions} soal dalam ujian ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exam.questionDetails?.map((question: any, index: number) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Soal {index + 1}</h3>
                        <Badge variant="outline">{question.type === "multiple_choice" ? "Pilihan Ganda" : "Essay"}</Badge>
                      </div>
                      <p className="mb-4">{question.question}</p>
                      
                      {question.type === "multiple_choice" && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Pilihan Jawaban:</h4>
                          <ul className="space-y-1 ml-4">
                            {question.options.map((option: string, i: number) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="text-xs bg-muted px-2 py-1 rounded-full">{String.fromCharCode(65 + i)}</span>
                                <span>{option}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-4 pt-2 border-t">
                        <h4 className="text-sm font-medium">Kunci Jawaban:</h4>
                        <p className="text-green-600">{question.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Peserta</CardTitle>
                <CardDescription>Siswa yang mengikuti ujian ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 font-medium">Tidak ada peserta saat ini</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mt-1">
                    {exam.status === "draft"
                      ? "Ujian masih dalam status draft. Peserta akan ditampilkan setelah ujian dijadwalkan."
                      : exam.status === "scheduled"
                      ? "Ujian sudah terjadwal. Peserta akan ditampilkan setelah ujian dimulai."
                      : "Ujian sedang berlangsung, belum ada siswa yang mengakses ujian ini."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ExamDetails;
