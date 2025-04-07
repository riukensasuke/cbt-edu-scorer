
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

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
  class?: string;
  date?: string;
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
  const examId = `exam-${i}`;
  initialExams[examId] = {
    id: examId,
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
  
  // Add an exam with numeric ID for testing
  initialExams[i.toString()] = {
    id: i.toString(),
    title: `Ujian Sample ${i} (ID Numerik)`,
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

// Make the exams available globally (for debugging)
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.mockExamData = initialExams;
}

export const useExamData = () => {
  const [exams, setExams] = useState<Record<string, Exam>>(initialExams);
  const { toast } = useToast();
  
  const getExam = (id: string): Exam | null => {
    if (!id) return null;
    
    console.log("Looking for exam with ID:", id);
    
    // Try direct lookup first
    if (exams[id]) {
      console.log("Found exam with exact ID match:", id);
      return exams[id];
    }
    
    // Try with 'exam-' prefix if needed
    const examId = id.startsWith('exam-') ? id : `exam-${id}`;
    if (exams[examId]) {
      console.log("Found exam with prefixed ID:", examId);
      return exams[examId];
    }
    
    // Try numeric lookup if the ID is a number or number string
    if (!isNaN(Number(id)) && exams[id.toString()]) {
      console.log("Found exam with numeric ID:", id);
      return exams[id.toString()];
    }
    
    console.log("No exam found for ID:", id);
    return null;
  };
  
  const updateExam = (id: string, data: Partial<Exam>): void => {
    if (!id) return;
    
    // Find the correct ID format to update
    let examToUpdate: string | null = null;
    
    if (exams[id]) {
      examToUpdate = id;
    } else if (id.startsWith('exam-')) {
      examToUpdate = id;
    } else {
      examToUpdate = `exam-${id}`;
    }
    
    if (examToUpdate && exams[examToUpdate]) {
      setExams(prev => ({
        ...prev,
        [examToUpdate!]: {
          ...prev[examToUpdate!],
          ...data
        }
      }));
      
      toast({
        title: "Ujian diperbarui",
        description: "Perubahan berhasil disimpan",
      });
    }
  };
  
  const createExam = (exam: Exam): void => {
    // Make sure exam has an ID
    const examId = exam.id || `exam-${Date.now()}`;
    const examWithId = { ...exam, id: examId };
    
    setExams(prev => ({
      ...prev,
      [examId]: examWithId
    }));
    
    toast({
      title: "Ujian baru dibuat",
      description: `Ujian "${exam.title}" berhasil dibuat`,
    });
  };
  
  const deleteExam = (id: string): void => {
    if (!id) return;
    
    let examToDelete: string | null = null;
    
    if (exams[id]) {
      examToDelete = id;
    } else if (id.startsWith('exam-')) {
      examToDelete = id;
    } else {
      examToDelete = `exam-${id}`;
    }
    
    if (examToDelete && exams[examToDelete]) {
      const examTitle = exams[examToDelete].title;
      const newExams = { ...exams };
      delete newExams[examToDelete];
      setExams(newExams);
      
      toast({
        title: "Ujian dihapus",
        description: `Ujian "${examTitle}" berhasil dihapus`,
      });
    }
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
