
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, X, Download, Search, FileText, User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { exportToExcel } from "@/utils/excelUtils";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Mock data for results
const mockResultDetails = {
  id: "1",
  examTitle: "UTS Matematika Kelas 6",
  subject: "Matematika",
  grade: "Kelas 6",
  date: "15 Oktober 2023",
  duration: 90,
  totalQuestions: 25,
  highestScore: 100,
  lowestScore: 60,
  averageScore: 82.5,
  students: [
    {
      id: "s1",
      name: "Muhammad Andi",
      score: 85,
      correctAnswers: 21,
      wrongAnswers: 4,
      rank: 3,
      status: "pass",
    },
    {
      id: "s2",
      name: "Siti Rahma",
      score: 92,
      correctAnswers: 23,
      wrongAnswers: 2,
      rank: 1,
      status: "pass",
    },
    {
      id: "s3",
      name: "Ahmad Rizki",
      score: 80,
      correctAnswers: 20,
      wrongAnswers: 5,
      rank: 5,
      status: "pass",
    },
    {
      id: "s4",
      name: "Anisa Putri",
      score: 88,
      correctAnswers: 22,
      wrongAnswers: 3,
      rank: 2,
      status: "pass",
    },
    {
      id: "s5",
      name: "Budi Santoso",
      score: 76,
      correctAnswers: 19,
      wrongAnswers: 6,
      rank: 7,
      status: "pass",
    }
  ]
};

// Mock data for class and subject filters
const mockClasses = ["Kelas 4A", "Kelas 5A", "Kelas 6A"];
const mockSubjects = ["Matematika", "Bahasa Indonesia", "IPA", "IPS", "Bahasa Inggris"];

// Score badge color based on score
const getScoreBadgeColor = (score: number) => {
  if (score >= 90) return "bg-green-500";
  if (score >= 80) return "bg-blue-500";
  if (score >= 70) return "bg-yellow-500";
  return "bg-red-500";
};

const ExamResults = () => {
  const { id } = useParams<{id?: string}>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("Kelas 6A");
  const [selectedSubject, setSelectedSubject] = useState<string>("Matematika");
  
  // Filter students based on search query
  const filteredStudents = mockResultDetails.students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle export to Excel
  const handleExportToExcel = () => {
    // Prepare data for export
    const dataToExport = filteredStudents.map((student, index) => ({
      'No': index + 1,
      'Nama Siswa': student.name,
      'Nilai': student.score,
      'Benar': student.correctAnswers,
      'Salah': student.wrongAnswers,
      'Peringkat': student.rank,
      'Status': student.status === 'pass' ? 'Lulus' : 'Tidak Lulus',
    }));
    
    // Add summary data
    const summaryData = [
      { 
        'No': '', 
        'Nama Siswa': 'NILAI RATA-RATA', 
        'Nilai': mockResultDetails.averageScore, 
        'Benar': '', 
        'Salah': '', 
        'Peringkat': '', 
        'Status': '' 
      },
      { 
        'No': '', 
        'Nama Siswa': 'NILAI TERTINGGI', 
        'Nilai': mockResultDetails.highestScore, 
        'Benar': '', 
        'Salah': '', 
        'Peringkat': '', 
        'Status': '' 
      },
      { 
        'No': '', 
        'Nama Siswa': 'NILAI TERENDAH', 
        'Nilai': mockResultDetails.lowestScore, 
        'Benar': '', 
        'Salah': '', 
        'Peringkat': '', 
        'Status': '' 
      },
      { 
        'No': '', 
        'Nama Siswa': 'JUMLAH SISWA', 
        'Nilai': filteredStudents.length, 
        'Benar': '', 
        'Salah': '', 
        'Peringkat': '', 
        'Status': '' 
      }
    ];
    
    // Combine student data with summary
    const allData = [...dataToExport, ...summaryData];
    
    // Export to Excel
    const filename = `Hasil_Ujian_${selectedSubject}_${selectedClass}`;
    exportToExcel(allData, filename);
    
    toast({
      title: "Data berhasil diexport",
      description: `Data hasil ujian ${selectedSubject} untuk ${selectedClass} telah diexport ke Excel`
    });
  };

  // Mock student detailed result
  const studentDetailedResult = {
    student: mockResultDetails.students[0],
    examTitle: mockResultDetails.examTitle,
    subject: mockResultDetails.subject,
    date: mockResultDetails.date,
    questions: [
      {
        id: "q1",
        question: "Berapakah hasil dari 24 × 8?",
        answer: "192",
        studentAnswer: "192",
        correct: true
      },
      {
        id: "q2",
        question: "Berapa hasil dari (4 × 6) + (7 × 3)?",
        answer: "45",
        studentAnswer: "45",
        correct: true
      },
      {
        id: "q3",
        question: "Selesaikan soal cerita berikut: Ibu membeli 5 kg buah apel dengan harga Rp15.000 per kg dan 3 kg buah jeruk dengan harga Rp12.000 per kg. Berapa total uang yang harus dibayar ibu?",
        answer: "Rp111.000",
        studentAnswer: "Rp75.000",
        correct: false
      },
      {
        id: "q4",
        question: "Sebuah persegi panjang memiliki panjang 12 cm dan lebar 8 cm. Berapakah luas persegi panjang tersebut?",
        answer: "96 cm²",
        studentAnswer: "96 cm²",
        correct: true
      },
      {
        id: "q5",
        question: "Jelaskan cara menghitung luas segitiga dan berikan contoh perhitungannya!",
        answer: "Luas segitiga = (alas × tinggi) ÷ 2",
        studentAnswer: "Luas segitiga dihitung dengan rumus (alas × tinggi) ÷ 2. Contoh: Segitiga dengan alas 6 cm dan tinggi 8 cm memiliki luas (6 × 8) ÷ 2 = 24 cm².",
        correct: true,
        score: 8,
        maxScore: 10
      }
    ]
  };

  // View for admin and teachers
  const renderTeacherView = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{mockResultDetails.examTitle}</CardTitle>
            <CardDescription>
              {mockResultDetails.subject} • {mockResultDetails.grade} • {mockResultDetails.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex flex-col">
                <span className="text-sm text-blue-600">Nilai Rata-rata</span>
                <span className="text-2xl font-bold">{mockResultDetails.averageScore}</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex flex-col">
                <span className="text-sm text-green-600">Nilai Tertinggi</span>
                <span className="text-2xl font-bold">{mockResultDetails.highestScore}</span>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex flex-col">
                <span className="text-sm text-yellow-600">Nilai Terendah</span>
                <span className="text-2xl font-bold">{mockResultDetails.lowestScore}</span>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-md p-4 flex flex-col">
                <span className="text-sm text-purple-600">Jumlah Peserta</span>
                <span className="text-2xl font-bold">{mockResultDetails.students.length}</span>
              </div>
            </div>
            
            {/* Score distribution graph would go here */}
            <div className="h-60 mb-6 border rounded-lg flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground">Grafik distribusi nilai akan ditampilkan di sini</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
              <h3 className="font-medium">Daftar Nilai Siswa</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full md:w-auto">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClasses.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Pilih mata pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSubjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button onClick={handleExportToExcel} className="w-full md:w-auto">
                  <Download className="mr-2 h-4 w-4" /> Download Nilai
                </Button>
              </div>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari siswa..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">No</th>
                    <th className="px-4 py-2 text-left font-medium">Nama</th>
                    <th className="px-4 py-2 text-center font-medium">Nilai</th>
                    <th className="px-4 py-2 text-center font-medium">Jawaban Benar</th>
                    <th className="px-4 py-2 text-center font-medium">Peringkat</th>
                    <th className="px-4 py-2 text-center font-medium">Status</th>
                    <th className="px-4 py-2 text-center font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className="border-t">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">{student.name}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge className={getScoreBadgeColor(student.score)}>
                          {student.score}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {student.correctAnswers}/{mockResultDetails.totalQuestions}
                      </td>
                      <td className="px-4 py-3 text-center">{student.rank}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={student.status === "pass" ? "default" : "destructive"}>
                          {student.status === "pass" ? "Lulus" : "Tidak Lulus"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedStudentId(student.id)}
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => navigate("/exams")}>
              Kembali ke Daftar Ujian
            </Button>
          </CardFooter>
        </Card>
        
        {/* Student Detail Dialog */}
        {selectedStudentId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Detail Hasil Ujian</h2>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedStudentId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4 mb-6 pb-4 border-b">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-medium">
                    {studentDetailedResult.student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{studentDetailedResult.student.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {studentDetailedResult.examTitle} • {studentDetailedResult.date}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{studentDetailedResult.student.score}</div>
                      <div className="text-xs text-muted-foreground">Nilai</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <Check className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-green-600 font-medium">{studentDetailedResult.student.correctAnswers}</span>
                    </div>
                    <span className="text-xs text-green-600">Jawaban Benar</span>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <X className="h-4 w-4 text-red-600 mr-1" />
                      <span className="text-red-600 font-medium">{studentDetailedResult.student.wrongAnswers}</span>
                    </div>
                    <span className="text-xs text-red-600">Jawaban Salah</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <Users className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-blue-600 font-medium">Peringkat {studentDetailedResult.student.rank}</span>
                    </div>
                    <span className="text-xs text-blue-600">dari {mockResultDetails.students.length} siswa</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {studentDetailedResult.questions.map((q, index) => (
                    <div 
                      key={q.id} 
                      className={`border rounded-md p-4 ${
                        q.correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Soal {index + 1}</h4>
                        {q.correct ? (
                          <Badge className="bg-green-500">Benar</Badge>
                        ) : (
                          <Badge variant="destructive">Salah</Badge>
                        )}
                      </div>
                      <p className="mb-3">{q.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Jawaban Siswa:</p>
                          <p className={`text-sm p-2 rounded-md ${q.correct ? "bg-green-100" : "bg-red-100"}`}>
                            {q.studentAnswer}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Jawaban Benar:</p>
                          <p className="text-sm p-2 rounded-md bg-green-100">
                            {q.answer}
                          </p>
                        </div>
                      </div>
                      {q.score !== undefined && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Skor:</span>
                            <span className="font-medium">
                              {q.score}/{q.maxScore}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setSelectedStudentId(null)} variant="outline">
                    Tutup
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // View for students
  const renderStudentView = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hasil Ujian Saya</CardTitle>
            <CardDescription>
              Lihat hasil ujian yang telah kamu kerjakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recent">
              <TabsList className="mb-4">
                <TabsTrigger value="recent">Terbaru</TabsTrigger>
                <TabsTrigger value="all">Semua</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent">
                <div className="space-y-4">
                  {/* Student's Recent Result */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{studentDetailedResult.examTitle}</CardTitle>
                          <CardDescription>
                            {studentDetailedResult.subject} • {studentDetailedResult.date}
                          </CardDescription>
                        </div>
                        <Badge className={getScoreBadgeColor(studentDetailedResult.student.score)}>
                          {studentDetailedResult.student.score}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="bg-green-50 border border-green-200 rounded-md p-3 flex flex-col items-center">
                          <div className="flex items-center mb-1">
                            <Check className="h-4 w-4 text-green-600 mr-1" />
                            <span className="text-green-600 font-medium">{studentDetailedResult.student.correctAnswers}</span>
                          </div>
                          <span className="text-xs text-green-600">Jawaban Benar</span>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-md p-3 flex flex-col items-center">
                          <div className="flex items-center mb-1">
                            <X className="h-4 w-4 text-red-600 mr-1" />
                            <span className="text-red-600 font-medium">{studentDetailedResult.student.wrongAnswers}</span>
                          </div>
                          <span className="text-xs text-red-600">Jawaban Salah</span>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex flex-col items-center">
                          <div className="flex items-center mb-1">
                            <Users className="h-4 w-4 text-blue-600 mr-1" />
                            <span className="text-blue-600 font-medium">Peringkat {studentDetailedResult.student.rank}</span>
                          </div>
                          <span className="text-xs text-blue-600">dari {mockResultDetails.students.length} siswa</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">Nilai Rata-rata Kelas</div>
                            <div className="font-medium">{mockResultDetails.averageScore}</div>
                          </div>
                          <Progress value={(mockResultDetails.averageScore / 100) * 100} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">Nilai Kamu</div>
                            <div className="font-medium">{studentDetailedResult.student.score}</div>
                          </div>
                          <Progress value={(studentDetailedResult.student.score / 100) * 100} className="h-2 bg-muted" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setSelectedStudentId(studentDetailedResult.student.id)}
                      >
                        Lihat Detail Jawaban
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">Hasil ujian lainnya ditampilkan di tab "Semua"</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {/* Latihan Matematika Result */}
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Latihan Matematika</h3>
                        <p className="text-sm text-muted-foreground">10 Oktober 2023</p>
                      </div>
                      <Badge className={getScoreBadgeColor(85)}>85</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">17/20 soal benar</span>
                      <Button variant="outline" size="sm">Detail</Button>
                    </div>
                  </div>
                  
                  {/* The current result */}
                  <div className="border rounded-lg p-4 bg-primary/5 border-primary/20 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{studentDetailedResult.examTitle}</h3>
                        <p className="text-sm text-muted-foreground">{studentDetailedResult.date}</p>
                      </div>
                      <Badge className={getScoreBadgeColor(studentDetailedResult.student.score)}>
                        {studentDetailedResult.student.score}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {studentDetailedResult.student.correctAnswers}/{studentDetailedResult.questions.length} soal benar
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedStudentId(studentDetailedResult.student.id)}
                      >
                        Detail
                      </Button>
                    </div>
                  </div>
                  
                  {/* Latihan Bahasa Indonesia Result */}
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Latihan Bahasa Indonesia</h3>
                        <p className="text-sm text-muted-foreground">5 Oktober 2023</p>
                      </div>
                      <Badge className={getScoreBadgeColor(90)}>90</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">18/20 soal benar</span>
                      <Button variant="outline" size="sm">Detail</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Student Detail Dialog */}
        {selectedStudentId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Detail Jawaban</h2>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedStudentId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <div>
                    <h3 className="font-medium">{studentDetailedResult.examTitle}</h3>
                    <p className="text-sm text-muted-foreground">
                      {studentDetailedResult.subject} • {studentDetailedResult.date}
                    </p>
                  </div>
                  <div>
                    <Badge className={getScoreBadgeColor(studentDetailedResult.student.score)}>
                      Nilai: {studentDetailedResult.student.score}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {studentDetailedResult.questions.map((q, index) => (
                    <div 
                      key={q.id} 
                      className={`border rounded-md p-4 ${
                        q.correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Soal {index + 1}</h4>
                        {q.correct ? (
                          <Badge className="bg-green-500">Benar</Badge>
                        ) : (
                          <Badge variant="destructive">Salah</Badge>
                        )}
                      </div>
                      <p className="mb-3">{q.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Jawaban Kamu:</p>
                          <p className={`text-sm p-2 rounded-md ${q.correct ? "bg-green-100" : "bg-red-100"}`}>
                            {q.studentAnswer}
                          </p>
                        </div>
                        {!q.correct && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Jawaban Benar:</p>
                            <p className="text-sm p-2 rounded-md bg-green-100">
                              {q.answer}
                            </p>
                          </div>
                        )}
                      </div>
                      {q.score !== undefined && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Skor:</span>
                            <span className="font-medium">
                              {q.score}/{q.maxScore}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setSelectedStudentId(null)} variant="outline">
                    Tutup
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <DashboardLayout title="Hasil Ujian">
      {user?.role === "student" ? renderStudentView() : renderTeacherView()}
    </DashboardLayout>
  );
};

export default ExamResults;
