
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock exam data - use the same extended data as in ExamDetails.tsx
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
  };
}

const ExamEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [examData, setExamData] = useState<any>({
    title: "",
    subject: "",
    grade: "",
    status: "draft",
    type: "daily",
    duration: 60,
    startDate: "",
    endDate: "",
    description: "",
    instructions: "",
    passingScore: 70,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching exam data from API
    if (id && mockExamData[id as keyof typeof mockExamData]) {
      const exam = mockExamData[id as keyof typeof mockExamData];
      setExamData({
        ...exam,
        startDate: exam.startDate ? new Date(exam.startDate).toISOString().slice(0, 16) : "",
        endDate: exam.endDate ? new Date(exam.endDate).toISOString().slice(0, 16) : ""
      });
      setLoading(false);
    } else if (id) {
      toast({
        title: "Error",
        description: "Ujian tidak ditemukan",
        variant: "destructive",
      });
      navigate("/exams");
    }
  }, [id, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExamData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setExamData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!examData.title || !examData.subject || !examData.grade || !examData.duration) {
      toast({
        title: "Validasi Error",
        description: "Mohon isi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }

    // Success
    toast({
      title: "Ujian berhasil diperbarui",
      description: `Ujian ${examData.title} telah diperbarui`,
    });
    
    // In a real app, you would save the data to API here
    console.log("Updated exam data:", examData);
    
    // Redirect back to exam details
    navigate(`/exams/${id}`);
  };

  const handleContinueToQuestions = () => {
    // Save first
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    
    // Navigate to questions
    navigate("/questions");
    
    toast({
      title: "Lanjutkan pengaturan soal",
      description: "Silakan pilih soal untuk ujian ini",
    });
  };

  if (loading) {
    return (
      <DashboardLayout title="Edit Ujian">
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Ujian">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Ujian</h1>
          <Button variant="outline" onClick={() => navigate("/exams")}>
            Kembali
          </Button>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Informasi Ujian</CardTitle>
              <CardDescription>Edit informasi ujian di bawah ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Judul Ujian *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={examData.title}
                    onChange={handleInputChange}
                    placeholder="Contoh: UTS Matematika Semester 1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Mata Pelajaran *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={examData.subject}
                    onChange={handleInputChange}
                    placeholder="Contoh: Matematika"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="grade" className="text-sm font-medium">
                    Kelas *
                  </label>
                  <Input
                    id="grade"
                    name="grade"
                    value={examData.grade}
                    onChange={handleInputChange}
                    placeholder="Contoh: Kelas 6A"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Tipe Ujian
                  </label>
                  <Select
                    value={examData.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe ujian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Ulangan Harian</SelectItem>
                      <SelectItem value="mid">Ujian Tengah Semester</SelectItem>
                      <SelectItem value="final">Ujian Akhir Semester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <Select
                    value={examData.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status ujian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Terjadwal</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="completed">Selesai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="duration" className="text-sm font-medium">
                    Durasi (menit) *
                  </label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    min="1"
                    value={examData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="startDate" className="text-sm font-medium">
                    Waktu Mulai
                  </label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="datetime-local"
                    value={examData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="endDate" className="text-sm font-medium">
                    Waktu Selesai
                  </label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    value={examData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="passingScore" className="text-sm font-medium">
                  Nilai Minimum Kelulusan
                </label>
                <Input
                  id="passingScore"
                  name="passingScore"
                  type="number"
                  min="0"
                  max="100"
                  value={examData.passingScore}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Deskripsi
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={examData.description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi tentang ujian ini..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="instructions" className="text-sm font-medium">
                  Petunjuk Pengerjaan
                </label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  value={examData.instructions}
                  onChange={handleInputChange}
                  placeholder="Petunjuk untuk siswa saat mengerjakan ujian..."
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(`/exams/${id}`)}
              >
                Batal
              </Button>
              <div className="flex gap-2">
                <Button type="submit">Simpan Perubahan</Button>
                <Button type="button" onClick={handleContinueToQuestions}>
                  Lanjutkan ke Pemilihan Soal
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ExamEdit;
