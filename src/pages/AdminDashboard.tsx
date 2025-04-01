import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";
import { Activity, BookOpen, Calendar, FileText, Users, DownloadCloud, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock data for charts
const examData = [
  { name: "Jan", jumlah: 4 },
  { name: "Feb", jumlah: 3 },
  { name: "Mar", jumlah: 5 },
  { name: "Apr", jumlah: 7 },
  { name: "Mei", jumlah: 2 },
  { name: "Jun", jumlah: 6 },
];

// Mock data for exam status by class
const examStatusByClass = [
  {
    className: "Kelas 1A",
    teacher: "Nurjannah",
    active: 2,
    pending: 1,
    missed: 0,
    completed: 4
  },
  {
    className: "Kelas 2B",
    teacher: "Erniwati",
    active: 1,
    pending: 2,
    missed: 1,
    completed: 3
  },
  {
    className: "Kelas 3A",
    teacher: "Rahmawati",
    active: 0,
    pending: 3,
    missed: 0,
    completed: 5
  },
  {
    className: "Kelas 4B",
    teacher: "Sumarno",
    active: 2,
    pending: 0,
    missed: 1,
    completed: 2
  },
  {
    className: "Kelas 5A",
    teacher: "Haryanto",
    active: 1,
    pending: 1,
    missed: 0,
    completed: 6
  },
  {
    className: "Kelas 6B",
    teacher: "Budiman",
    active: 0,
    pending: 2,
    missed: 2,
    completed: 4
  },
];

// Mock data for exam status by subject
const examStatusBySubject = [
  {
    subject: "Matematika",
    active: 4,
    pending: 3,
    missed: 1,
    completed: 12
  },
  {
    subject: "Bahasa Indonesia",
    active: 2,
    pending: 2,
    missed: 0,
    completed: 10
  },
  {
    subject: "IPA",
    active: 1,
    pending: 4,
    missed: 2,
    completed: 8
  },
  {
    subject: "IPS",
    active: 0,
    pending: 3,
    missed: 1,
    completed: 7
  },
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  // Mock stats for dashboard
  const stats = [
    {
      title: "Total Siswa",
      value: "125",
      description: "Aktif di sistem",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      color: "border-blue-200 bg-blue-50",
      iconColor: "bg-blue-100",
    },
    {
      title: "Total Guru",
      value: "8",
      description: "Aktif di sistem",
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
      color: "border-green-200 bg-green-50",
      iconColor: "bg-green-100",
    },
    {
      title: "Ujian Aktif",
      value: "3",
      description: "Dapat diakses siswa",
      icon: <FileText className="h-6 w-6 text-yellow-500" />,
      color: "border-yellow-200 bg-yellow-50",
      iconColor: "bg-yellow-100",
    },
    {
      title: "Semester",
      value: "Genap",
      description: "2023/2024",
      icon: <Calendar className="h-6 w-6 text-purple-500" />,
      color: "border-purple-200 bg-purple-50",
      iconColor: "bg-purple-100",
    },
  ];

  // Mock recent exams
  const recentExams = [
    {
      id: "1",
      title: "UTS Matematika Kelas 6",
      subject: "Matematika",
      grade: "Kelas 6",
      status: "active",
      date: "2023-10-15",
    },
    {
      id: "2",
      title: "UTS Bahasa Indonesia Kelas 5",
      subject: "Bahasa Indonesia",
      grade: "Kelas 5",
      status: "active",
      date: "2023-10-14",
    },
    {
      id: "3",
      title: "UTS IPA Kelas 4",
      subject: "IPA",
      grade: "Kelas 4",
      status: "active",
      date: "2023-10-13",
    },
  ];

  // Handle sync with Dapodik
  const handleSyncDapodik = () => {
    toast({
      title: "Sinkronisasi Dapodik",
      description: "Data sedang disinkronkan dengan Dapodik...",
    });
    
    // Simulate successful sync after 2 seconds
    setTimeout(() => {
      toast({
        title: "Sinkronisasi Berhasil",
        description: "Data dari Dapodik berhasil disinkronkan",
      });
    }, 2000);
  };

  return (
    <DashboardLayout title="Dashboard Administrator">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Ringkasan Data</h2>
          <Button onClick={handleSyncDapodik}>
            <RefreshCw className="mr-2 h-4 w-4" /> Sinkronisasi Dapodik
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className={`border ${stat.color}`}>
              <CardContent className="p-6 flex items-center space-x-4">
                <div className={`p-2 rounded-full ${stat.iconColor}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
            <TabsTrigger value="classes">Kelas</TabsTrigger>
            <TabsTrigger value="subjects">Mata Pelajaran</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Perkembangan Ujian</CardTitle>
                <CardDescription>
                  Jumlah ujian yang dilaksanakan per bulan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart
                    data={examData}
                    width={800}
                    height={300}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  >
                    {/* LineChart components would go here */}
                  </LineChart>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ujian Aktif</CardTitle>
                  <CardDescription>Ujian yang sedang berlangsung</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentExams.map((exam) => (
                      <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{exam.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {exam.subject} · {exam.grade}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Aktif
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                  <CardDescription>Aktivitas dalam 7 hari terakhir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Ujian Matematika Kelas 6 telah selesai</p>
                        <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Guru Bahasa Indonesia menambahkan 15 soal baru</p>
                        <p className="text-xs text-muted-foreground">5 jam yang lalu</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Ujian IPA Kelas 4 dibuat</p>
                        <p className="text-xs text-muted-foreground">1 hari yang lalu</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="classes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistik Ujian Per Kelas</CardTitle>
                <CardDescription>Monitoring status ujian untuk setiap kelas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {examStatusByClass.map((classData, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-semibold">{classData.className}</h3>
                          <p className="text-sm text-muted-foreground">Guru: {classData.teacher}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="flex flex-col items-center p-3 rounded bg-green-50 text-green-700">
                          <span className="text-2xl font-bold">{classData.active}</span>
                          <span className="text-xs">Sedang Mengerjakan</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded bg-blue-50 text-blue-700">
                          <span className="text-2xl font-bold">{classData.pending}</span>
                          <span className="text-xs">Belum Mengerjakan</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded bg-amber-50 text-amber-700">
                          <span className="text-2xl font-bold">{classData.missed}</span>
                          <span className="text-xs">Terlewatkan</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded bg-purple-50 text-purple-700">
                          <span className="text-2xl font-bold">{classData.completed}</span>
                          <span className="text-xs">Selesai</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subjects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistik Ujian Per Mata Pelajaran</CardTitle>
                <CardDescription>Monitoring status ujian untuk setiap mata pelajaran</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {examStatusBySubject.map((subjectData, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">{subjectData.subject}</h3>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="flex flex-col items-center p-3 rounded bg-green-50 text-green-700">
                          <span className="text-2xl font-bold">{subjectData.active}</span>
                          <span className="text-xs">Sedang Mengerjakan</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded bg-blue-50 text-blue-700">
                          <span className="text-2xl font-bold">{subjectData.pending}</span>
                          <span className="text-xs">Belum Mengerjakan</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded bg-amber-50 text-amber-700">
                          <span className="text-2xl font-bold">{subjectData.missed}</span>
                          <span className="text-xs">Terlewatkan</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded bg-purple-50 text-purple-700">
                          <span className="text-2xl font-bold">{subjectData.completed}</span>
                          <span className="text-xs">Selesai</span>
                        </div>
                      </div>

                      <div className="mt-4 h-60">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Tooltip />
                            <Legend />
                            <PieChart width={400} height={200}>
                              <Tooltip formatter={(value, name) => [`${value} ujian`, name]} />
                              <Legend />
                              <PieChart
                                data={[
                                  { name: 'Sedang Mengerjakan', value: subjectData.active },
                                  { name: 'Belum Mengerjakan', value: subjectData.pending },
                                  { name: 'Terlewatkan', value: subjectData.missed },
                                  { name: 'Selesai', value: subjectData.completed },
                                ]}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                              >
                                {[0, 1, 2, 3].map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </PieChart>
                            </PieChart>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Hasil Ujian</CardTitle>
                <CardDescription>Rangkuman hasil ujian terbaru</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">UTS Matematika Kelas 6</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Nilai Rata-rata:</p>
                        <p className="font-medium">75.4</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Nilai Tertinggi:</p>
                        <p className="font-medium">98</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Nilai Terendah:</p>
                        <p className="font-medium">45</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Jumlah Peserta:</p>
                        <p className="font-medium">28</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">UTS Bahasa Indonesia Kelas 5</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Nilai Rata-rata:</p>
                        <p className="font-medium">82.1</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Nilai Tertinggi:</p>
                        <p className="font-medium">100</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Nilai Terendah:</p>
                        <p className="font-medium">60</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Jumlah Peserta:</p>
                        <p className="font-medium">25</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
