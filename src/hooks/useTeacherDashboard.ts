
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from "@/components/ui/badge";

export interface ExamData {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  date: string;
  time?: string;
  duration?: number;
  status: string;
}

export interface ResultData {
  id: string;
  title: string;
  subject: string;
  score: number;
  date: string;
}

export const useTeacherDashboard = () => {
  const { user } = useAuth();
  
  // Mock data for teacher's upcoming exams
  const upcomingExams: ExamData[] = [
    {
      id: "1",
      title: "UTS Matematika Kelas 6A",
      subject: "Matematika",
      teacher: user?.name || "Guru",
      date: "15 Oktober 2023",
      time: "08:00 - 09:30",
      duration: 90,
      status: "scheduled",
    },
    {
      id: "2",
      title: "UTS Bahasa Indonesia Kelas 5B",
      subject: "Bahasa Indonesia",
      teacher: user?.name || "Guru",
      date: "16 Oktober 2023",
      time: "10:00 - 11:30",
      duration: 90,
      status: "draft",
    },
    {
      id: "3",
      title: "UTS IPA Kelas 4A",
      subject: "IPA",
      teacher: user?.name || "Guru",
      date: "17 Oktober 2023",
      time: "08:00 - 09:30",
      duration: 90,
      status: "scheduled",
    },
  ];
  
  // Mock data for teacher's recent results
  const recentResults: ResultData[] = [
    {
      id: "1",
      title: "Latihan Matematika Kelas 6A",
      subject: "Matematika",
      score: 85,
      date: "10 Oktober 2023",
    },
    {
      id: "2",
      title: "Latihan Bahasa Indonesia Kelas 5B",
      subject: "Bahasa Indonesia",
      score: 90,
      date: "5 Oktober 2023",
    },
  ];

  // Function to get the appropriate badge for exam status
  const getBadgeForStatus = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "scheduled":
        return <Badge variant="secondary">Terjadwal</Badge>;
      case "active":
        return <Badge>Aktif</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Selesai</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Function to get the color for score badges
  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return {
    user,
    upcomingExams,
    recentResults,
    getBadgeForStatus,
    getScoreBadgeColor
  };
};
