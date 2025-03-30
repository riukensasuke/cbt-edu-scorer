
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface ExamData {
  id: string;
  title: string;
  subject: string;
  grade?: string;
  teacher: string;
  date: string;
  time?: string; // Optional time is correct
  duration?: number;
  status: string;
  class?: string;
}

export interface ResultData {
  id: string;
  title: string;
  subject: string;
  score: number;
  date: string;
}

export const useStudentDashboard = () => {
  const { user } = useAuth();
  
  // Mock data for upcoming exams
  const upcomingExams: ExamData[] = [
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
  const recentResults: ResultData[] = [
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
  const missedExams: ExamData[] = [
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

  return {
    user,
    upcomingExams,
    recentResults,
    missedExams,
    studentName: user?.name || "Siswa"
  };
};
