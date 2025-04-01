
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, UserX, UserCheck, Clock } from "lucide-react";
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
    chartData: [
      { name: "Belum Mengikuti", value: 12, color: "#9ca3af" },
      { name: "Sedang Mengerjakan", value: 3, color: "#60a5fa" },
      { name: "Selesai", value: 28, color: "#10b981" },
      { name: "Tidak Mengikuti", value: 5, color: "#f87171" }
    ]
  },
  "Bahasa Indonesia": {
    notTaken: 15,
    taken: 30,
    inProgress: 0,
    missed: 3,
    totalStudents: 48,
    chartData: [
      { name: "Belum Mengikuti", value: 15, color: "#9ca3af" },
      { name: "Sedang Mengerjakan", value: 0, color: "#60a5fa" },
      { name: "Selesai", value: 30, color: "#10b981" },
      { name: "Tidak Mengikuti", value: 3, color: "#f87171" }
    ]
  },
  "IPA": {
    notTaken: 20,
    taken: 22,
    inProgress: 2,
    missed: 4,
    totalStudents: 48,
    chartData: [
      { name: "Belum Mengikuti", value: 20, color: "#9ca3af" },
      { name: "Sedang Mengerjakan", value: 2, color: "#60a5fa" },
      { name: "Selesai", value: 22, color: "#10b981" },
      { name: "Tidak Mengikuti", value: 4, color: "#f87171" }
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
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Visualisasi Data</h3>
            <div className="h-64">
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
                  <Bar dataKey="value" name="Jumlah Siswa" fill="#8884d8" />
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
