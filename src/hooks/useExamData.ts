
import { useState, useEffect } from 'react';

// Mock exam data structure
interface Exam {
  id: string;
  title: string;
  subject: string;
  grade: string;
  status: string;
  type: string;
  duration: number;
  questions: number;
  startDate: string;
  endDate: string;
  createdBy: string;
  description: string;
  instructions: string;
  passingScore: number;
}

// Initial mock data
const initialExams: Record<string, Exam> = {
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

// Add more exams
for (let i = 4; i <= 10; i++) {
  initialExams[`exam-${i}`] = {
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

// Make the exams available globally
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.mockExamData = initialExams;
}

export const useExamData = () => {
  const [exams, setExams] = useState<Record<string, Exam>>(initialExams);
  
  const getExam = (id: string): Exam | null => {
    // Fix: Convert numbers to strings to handle different id formats
    if (id && id.startsWith('exam-')) {
      return exams[id] || null;
    }
    // Try finding by numeric ID (convert to exam-N format)
    const examId = `exam-${id}`;
    return exams[examId] || null;
  };
  
  const updateExam = (id: string, data: Partial<Exam>): void => {
    const examId = id.startsWith('exam-') ? id : `exam-${id}`;
    setExams(prev => ({
      ...prev,
      [examId]: {
        ...prev[examId],
        ...data
      }
    }));
  };
  
  const createExam = (exam: Exam): void => {
    setExams(prev => ({
      ...prev,
      [exam.id]: exam
    }));
  };
  
  const deleteExam = (id: string): void => {
    const examId = id.startsWith('exam-') ? id : `exam-${id}`;
    const newExams = { ...exams };
    delete newExams[examId];
    setExams(newExams);
  };
  
  return {
    exams,
    getExam,
    updateExam,
    createExam,
    deleteExam,
    examsList: Object.values(exams)
  };
};
