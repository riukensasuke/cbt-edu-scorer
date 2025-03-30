
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ActiveExams = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Mock data for active exams
  const activeExams = [
    {
      id: "1",
      title: "UTS Matematika",
      subject: "Matematika",
      grade: "Kelas 6",
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
      grade: "Kelas 5",
      teacher: "Bapak Ahmad",
      date: "16 Oktober 2023",
      time: "10:00 - 11:30",
      duration: 90,
      status: "available",
    },
    {
      id: "3",
      title: "UTS IPA",
      subject: "IPA",
      grade: "Kelas 4",
      teacher: "Ibu Rini",
      date: "17 Oktober 2023",
      time: "08:00 - 09:30",
      duration: 90,
      status: "available",
    },
  ];
  
  return (
    <DashboardLayout title="Ujian Aktif">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Ujian Aktif</CardTitle>
          <CardDescription>
            Ujian yang tersedia untuk dikerjakan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeExams.length > 0 ? (
              activeExams.map((exam) => (
                <div
                  key={exam.id}
                  className="border rounded-lg p-4 bg-green-50 border-green-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{exam.title}</h3>
                    <Badge className="bg-green-500">Tersedia</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{exam.subject} • {exam.grade}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{exam.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{exam.time} • {exam.duration} menit</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Guru: {exam.teacher}
                    </div>
                    <Button onClick={() => navigate(`/exam/${exam.id}`)}>
                      Kerjakan
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Tidak ada ujian aktif saat ini</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ActiveExams;
