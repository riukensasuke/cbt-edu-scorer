
import { useState } from "react";

// Mock data for exams
const mockExams = [
  {
    id: "1",
    title: "UTS Matematika Kelas 6",
    subject: "Matematika",
    grade: "Kelas 6",
    status: "active",
    type: "UTS",
    duration: 90,
    questions: 25,
    startDate: "2023-10-15",
    endDate: "2023-10-15",
    createdBy: "Ibu Siti"
  },
  {
    id: "2",
    title: "UTS Bahasa Indonesia Kelas 5",
    subject: "Bahasa Indonesia",
    grade: "Kelas 5",
    status: "active",
    type: "UTS",
    duration: 90,
    questions: 20,
    startDate: "2023-10-16",
    endDate: "2023-10-16",
    createdBy: "Bapak Ahmad"
  },
  {
    id: "3",
    title: "UTS IPA Kelas 4",
    subject: "IPA",
    grade: "Kelas 4",
    status: "draft",
    type: "UTS",
    duration: 90,
    questions: 15,
    startDate: "2023-10-17",
    endDate: "2023-10-17",
    createdBy: "Ibu Rini"
  },
  {
    id: "4",
    title: "UAS Matematika Kelas 6",
    subject: "Matematika",
    grade: "Kelas 6",
    status: "scheduled",
    type: "UAS",
    duration: 120,
    questions: 40,
    startDate: "2023-12-10",
    endDate: "2023-12-10",
    createdBy: "Ibu Siti"
  },
];

export const useExamManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExams, setFilteredExams] = useState(mockExams);
  
  // Filter function
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
        exam.subject.toLowerCase().includes(search.toLowerCase()) ||
        exam.grade.toLowerCase().includes(search.toLowerCase())
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
  
  return {
    activeTab,
    searchQuery,
    filteredExams,
    handleTabChange,
    handleSearch
  };
};
