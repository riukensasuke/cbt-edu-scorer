
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface ExamData {
  id: string;
  title: string;
  subject: string;
  class: string;
  date: string;
  duration: number;
  status: string;
  questions: number;
  creator: string;
  grade: string; // Changed from optional to required
  type: string; // Changed from optional to required
  startDate: string; // Changed from optional to required
  endDate: string; // Changed from optional to required
  createdBy: string; // Changed from optional to required
}

// Mock data for exams
const mockExams: ExamData[] = [
  {
    id: "1",
    title: "UTS Matematika Semester Ganjil",
    subject: "Matematika",
    class: "6A",
    date: "2023-10-15",
    duration: 90,
    status: "active",
    questions: 25,
    creator: "Ibu Siti",
    grade: "6A",
    type: "UTS",
    startDate: "2023-10-15",
    endDate: "2023-10-15",
    createdBy: "Ibu Siti"
  },
  {
    id: "2",
    title: "UTS Bahasa Indonesia Semester Ganjil",
    subject: "Bahasa Indonesia",
    class: "5B",
    date: "2023-10-20",
    duration: 60,
    status: "scheduled",
    questions: 20,
    creator: "Bapak Ahmad",
    grade: "5B",
    type: "UTS",
    startDate: "2023-10-20",
    endDate: "2023-10-20",
    createdBy: "Bapak Ahmad"
  },
  {
    id: "3",
    title: "Latihan Soal IPA Bab 1",
    subject: "IPA",
    class: "4A",
    date: "2023-10-10",
    duration: 45,
    status: "draft",
    questions: 15,
    creator: "Ibu Rini",
    grade: "4A",
    type: "Latihan",
    startDate: "2023-10-10",
    endDate: "2023-10-10",
    createdBy: "Ibu Rini"
  },
  {
    id: "4",
    title: "Ulangan Harian IPS",
    subject: "IPS",
    class: "3B",
    date: "2023-09-28",
    duration: 60,
    status: "completed",
    questions: 20,
    creator: "Bapak Tono",
    grade: "3B",
    type: "Ulangan Harian",
    startDate: "2023-09-28",
    endDate: "2023-09-28",
    createdBy: "Bapak Tono"
  },
];

export const useExamManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExams, setFilteredExams] = useState(mockExams);
  
  // Filter exams based on tab and search query
  const filterExams = (status: string, search: string) => {
    let filtered = [...mockExams];
    
    // Filter by status if not "all"
    if (status !== "all") {
      filtered = filtered.filter(exam => exam.status === status);
    }
    
    // Filter by search query
    if (search) {
      filtered = filtered.filter(exam => 
        exam.title.toLowerCase().includes(search.toLowerCase()) || 
        exam.subject.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredExams(filtered);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterExams(value, searchQuery);
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterExams(activeTab, query);
  };
  
  // Delete exam
  const deleteExam = (examId: string) => {
    // In a real app, this would call an API
    setFilteredExams(prev => prev.filter(exam => exam.id !== examId));
    
    toast({
      title: "Ujian dihapus",
      description: "Ujian telah berhasil dihapus",
    });
  };
  
  return {
    activeTab,
    searchQuery,
    filteredExams,
    handleTabChange,
    handleSearch,
    deleteExam
  };
};
