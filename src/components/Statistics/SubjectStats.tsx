
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, UserX, UserCheck, Clock, BookOpen, FileText, Book, Calendar } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SubjectStatsProps {
  subject?: string;
}

const mockStatsData = {
  "Matematika": {
    notTaken: 12,
    taken: 28,
    inProgress: 3,
    missed: 5,
    totalStudents: 48,
    learningCount: 6,
    subjectsTaught: 3,
    activeQuestions: 85,
    activeTests: 4,
    upcomingTests: 2,
    chartData: [
      { name: "Belum Mengikuti", value: 12, color: "#9ca3af" },
      { name: "Sedang Mengerjakan", value: 3, color: "#60a5fa" },
      { name: "Selesai", value: 28, color: "#10b981" },
      { name: "Tidak Mengikuti", value: 5, color: "#f87171" }
    ],
    additionalChartData: [
      { name: "Pembelajaran", value: 6, color: "#8b5cf6" },
      { name: "Diampu", value: 3, color: "#14b8a6" },
      { name: "Soal Aktif", value: 85, color: "#f59e0b" },
      { name: "Tes Aktif", value: 4, color: "#8b5cf6" },
      { name: "Ujian Mendatang", value: 2, color: "#0ea5e9" }
    ]
  },
  "Bahasa Indonesia": {
    notTaken: 15,
    taken: 30,
    inProgress: 0,
    missed: 3,
    totalStudents: 48,
    learningCount: 8,
    subjectsTaught: 1,
    activeQuestions: 72,
    activeTests: 2,
    upcomingTests: 1,
    chartData: [
      { name: "Belum Mengikuti", value: 15, color: "#9ca3af" },
      { name: "Sedang Mengerjakan", value: 0, color: "#60a5fa" },
      { name: "Selesai", value: 30, color: "#10b981" },
      { name: "Tidak Mengikuti", value: 3, color: "#f87171" }
    ],
    additionalChartData: [
      { name: "Pembelajaran", value: 8, color: "#8b5cf6" },
      { name: "Diampu", value: 1, color: "#14b8a6" },
      { name: "Soal Aktif", value: 72, color: "#f59e0b" },
      { name: "Tes Aktif", value: 2, color: "#8b5cf6" },
      { name: "Ujian Mendatang", value: 1, color: "#0ea5e9" }
    ]
  },
  "IPA": {
    notTaken: 20,
    taken: 22,
    inProgress: 2,
    missed: 4,
    totalStudents: 48,
    learningCount: 5,
    subjectsTaught: 2,
    activeQuestions: 64,
    activeTests: 3,
    upcomingTests: 2,
    chartData: [
      { name: "Belum Mengikuti", value: 20, color: "#9ca3af" },
      { name: "Sedang Mengerjakan", value: 2, color: "#60a5fa" },
      { name: "Selesai", value: 22, color: "#10b981" },
      { name: "Tidak Mengikuti", value: 4, color: "#f87171" }
    ],
    additionalChartData: [
      { name: "Pembelajaran", value: 5, color: "#8b5cf6" },
      { name: "Diampu", value: 2, color: "#14b8a6" },
      { name: "Soal Aktif", value: 64, color: "#f59e0b" },
      { name: "Tes Aktif", value: 3, color: "#8b5cf6" },
      { name: "Ujian Mendatang", value: 2, color: "#0ea5e9" }
    ]
  }
};

const SubjectStats: React.FC<SubjectStatsProps> = ({ subject = "Matematika" }) => {
  const stats = mockStatsData[subject as keyof typeof mockStatsData] || mockStatsData.Matematika;
  
  // Calculate percentages
  const takenPercentage = Math.round((stats.taken / stats.totalStudents) * 100);
  const inProgressPercentage = Math.round((stats.inProgress / stats.totalStudents) * 100);
  const notTakenPercentage = Math.round((stats.notTaken / stats.totalStudents) * 100);
  const missedPercentage = Math.round((stats.missed / stats.totalStudents) * 100);
  
  // Calculate additional stats percentages
  const maxAdditionalValue = Math.max(
    stats.learningCount, 
    stats.subjectsTaught, 
    stats.activeQuestions / 10, // Scale down for better visualization
    stats.activeTests, 
    stats.upcomingTests
  );
  
  const learningPercentage = Math.round((stats.learningCount / maxAdditionalValue) * 100);
  const taughtPercentage = Math.round((stats.subjectsTaught / maxAdditionalValue) * 100);
  const activeQuestionsPercentage = Math.round(((stats.activeQuestions / 10) / maxAdditionalValue) * 100);
  const activeTestsPercentage = Math.round((stats.activeTests / maxAdditionalValue) * 100);
  const upcomingTestsPercentage = Math.round((stats.upcomingTests / maxAdditionalValue) * 100);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Statistik Mata Pelajaran</CardTitle>
            <CardDescription>Status siswa pada mata pelajaran {subject}</CardDescription>
          </div>
          <Badge variant="outline" className="text-sm font-medium">
            {stats.totalStudents} Siswa
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-4">Status Siswa</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserCheck className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Telah mengikuti ujian</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{stats.taken}</span>
                    <span className="text-xs text-muted-foreground ml-1">({takenPercentage}%)</span>
                  </div>
                </div>
                <Progress value={takenPercentage} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">Sedang mengerjakan</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{stats.inProgress}</span>
                    <span className="text-xs text-muted-foreground ml-1">({inProgressPercentage}%)</span>
                  </div>
                </div>
                <Progress value={inProgressPercentage} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Belum mengikuti</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{stats.notTaken}</span>
                    <span className="text-xs text-muted-foreground ml-1">({notTakenPercentage}%)</span>
                  </div>
                </div>
                <Progress value={notTakenPercentage} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserX className="h-4 w-4 mr-2 text-red-500" />
                    <span className="text-sm">Tidak mengikuti</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{stats.missed}</span>
                    <span className="text-xs text-muted-foreground ml-1">({missedPercentage}%)</span>
                  </div>
                </div>
                <Progress value={missedPercentage} className="h-2" />
              </div>

              <h3 className="font-medium mb-3 mt-6">Informasi Tambahan</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-indigo-500" />
                      <span className="text-sm">Jumlah pembelajaran</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{stats.learningCount}</span>
                      <span className="text-xs text-muted-foreground ml-1">({learningPercentage}%)</span>
                    </div>
                  </div>
                  <Progress value={learningPercentage} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Book className="h-4 w-4 mr-2 text-teal-500" />
                      <span className="text-sm">Pelajaran diampu</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{stats.subjectsTaught}</span>
                      <span className="text-xs text-muted-foreground ml-1">({taughtPercentage}%)</span>
                    </div>
                  </div>
                  <Progress value={taughtPercentage} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-amber-500" />
                      <span className="text-sm">Soal aktif</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{stats.activeQuestions}</span>
                      <span className="text-xs text-muted-foreground ml-1">({activeQuestionsPercentage}%)</span>
                    </div>
                  </div>
                  <Progress value={activeQuestionsPercentage} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-violet-500" />
                      <span className="text-sm">Tes aktif</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{stats.activeTests}</span>
                      <span className="text-xs text-muted-foreground ml-1">({activeTestsPercentage}%)</span>
                    </div>
                  </div>
                  <Progress value={activeTestsPercentage} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-cyan-500" />
                      <span className="text-sm">Ujian akan datang</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{stats.upcomingTests}</span>
                      <span className="text-xs text-muted-foreground ml-1">({upcomingTestsPercentage}%)</span>
                    </div>
                  </div>
                  <Progress value={upcomingTestsPercentage} className="h-2 bg-muted" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Status Siswa Visualization</h3>
            <div className="h-64 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.chartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Jumlah Siswa" 
                    fill="#8884d8" 
                    radius={[4, 4, 0, 0]}
                    colorKey="color" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <h3 className="font-medium mb-4">Informasi Tambahan Visualization</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.additionalChartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Jumlah" 
                    fill="#8884d8" 
                    radius={[4, 4, 0, 0]}
                    colorKey="color" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectStats;
