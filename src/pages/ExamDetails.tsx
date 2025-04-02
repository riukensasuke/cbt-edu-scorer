
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, User, Users, Info, Edit, Trash2, Copy, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Ensure we get the mock data from the global window object
const getExamData = (id: string) => {
  // @ts-ignore
  const mockExamData = window.mockExamData || {};
  return mockExamData[id];
};

const ExamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate loading exam data with a small delay
    const timer = setTimeout(() => {
      if (id) {
        const examData = getExamData(id);
        if (examData) {
          setExam(examData);
          setLoading(false);
        } else {
          toast({
            title: "Error",
            description: "Ujian tidak ditemukan",
            variant: "destructive",
          });
          navigate("/exams");
        }
      }
    }, 500); // Simulate API delay

    return () => clearTimeout(timer);
  }, [id, navigate, toast]);

  // Handle delete confirmation
  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    toast({
      title: "Ujian Dihapus",
      description: `Ujian ${exam.title} berhasil dihapus`,
    });
    navigate("/exams");
  };

  // Handle duplicate exam
  const handleDuplicate = () => {
    toast({
      title: "Ujian Diduplikasi",
      description: `Salinan dari ${exam.title} telah dibuat`,
    });
  };

  // Status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Aktif</Badge>;
      case "scheduled":
        return <Badge variant="secondary">Terjadwal</Badge>;
      case "completed":
        return <Badge variant="outline">Selesai</Badge>;
      case "draft":
      default:
        return <Badge variant="outline">Draft</Badge>;
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Detail Ujian">
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Detail Ujian">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Detail Ujian</h1>
          <Button variant="outline" onClick={() => navigate("/exams")}>
            Kembali
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-xl">{exam.title}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                {getStatusBadge(exam.status)}
                <span className="ml-3">{exam.subject} • {exam.grade}</span>
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigate(`/exams/edit/${exam.id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleDuplicate}>
                <Copy className="mr-2 h-4 w-4" />
                Duplikasi
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 hover:text-red-500" 
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Informasi Ujian</h3>
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">Durasi: {exam.duration} menit</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">
                        Waktu: {exam.startDate ? new Date(exam.startDate).toLocaleString() : "Belum dijadwalkan"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">Jumlah Soal: {exam.questions}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">Dibuat oleh: {exam.createdBy}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">KKM: {exam.passingScore}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Deskripsi</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm">{exam.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Petunjuk Pengerjaan</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm">{exam.instructions}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Statistik Pengerjaan</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-2 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs text-green-700">Telah Mengerjakan</p>
                        <p className="text-xl font-semibold text-green-700">24</p>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs text-yellow-700">Belum Mengerjakan</p>
                        <p className="text-xl font-semibold text-yellow-700">8</p>
                      </div>
                      <div className="text-center p-2 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-xs text-orange-700">Nilai Rata-rata</p>
                        <p className="text-xl font-semibold text-orange-700">76.5</p>
                      </div>
                      <div className="text-center p-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-700">Tingkat Kelulusan</p>
                        <p className="text-xl font-semibold text-blue-700">86%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Daftar Soal</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-muted/40">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soal</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kesulitan</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <tr key={num} className="hover:bg-muted/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{num}</td>
                        <td className="px-6 py-4 text-sm">Soal nomor {num} tentang {exam.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Badge variant="outline">{num % 2 === 0 ? "Pilihan Ganda" : "Essay"}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Badge variant={num % 3 === 0 ? "destructive" : num % 3 === 1 ? "default" : "secondary"}>
                            {num % 3 === 0 ? "Sulit" : num % 3 === 1 ? "Sedang" : "Mudah"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <Button variant="outline" disabled>
                  Kelola Soal
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/exams")}>
              Kembali ke Daftar Ujian
            </Button>
            <Button onClick={() => navigate(`/results/${exam.id}`)}>
              Lihat Hasil
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus Ujian</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus ujian "{exam?.title}"? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>
              Hapus Ujian
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ExamDetails;
