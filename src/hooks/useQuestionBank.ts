
import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Define QuestionType interface
export interface QuestionType {
  id: string;
  question: string;
  type: string;
  difficulty: string;
  subject: string;
  grade: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  createdBy: string;
  createdAt: string;
  isImage?: boolean;
}

// Mock data with expanded question types
const mockQuestions: QuestionType[] = [
  {
    id: "q1",
    question: "Berapa hasil dari 5 x 5?",
    type: "multiple_choice",
    difficulty: "easy",
    subject: "Matematika",
    grade: "Kelas 5",
    options: ["15", "20", "25", "30"],
    correctAnswer: "25",
    createdBy: "Admin",
    createdAt: "2023-07-15",
  },
  {
    id: "q2",
    question: "Siapakah presiden pertama Indonesia?",
    type: "multiple_choice",
    difficulty: "medium",
    subject: "IPS",
    grade: "Kelas 4",
    options: ["Soekarno", "Soeharto", "Habibie", "Megawati"],
    correctAnswer: "Soekarno",
    createdBy: "Admin",
    createdAt: "2023-07-20",
  },
  {
    id: "q3",
    question: "Planet apakah yang terdekat dengan matahari?",
    type: "multiple_choice",
    difficulty: "hard",
    subject: "IPA",
    grade: "Kelas 6",
    options: ["Venus", "Mars", "Merkurius", "Bumi"],
    correctAnswer: "Merkurius",
    createdBy: "Admin",
    createdAt: "2023-08-05",
  },
  {
    id: "q4",
    question: "Manakah pernyataan yang benar tentang fotosintesis?",
    type: "multiple_choice_complex",
    difficulty: "medium",
    subject: "IPA",
    grade: "Kelas 6",
    options: [
      "Terjadi di daun", 
      "Menghasilkan oksigen", 
      "Membutuhkan cahaya matahari", 
      "Dapat terjadi pada malam hari", 
      "Menghasilkan karbondioksida"
    ],
    correctAnswer: "A,B,C",
    explanation: "Fotosintesis terjadi di daun, menghasilkan oksigen, dan membutuhkan cahaya matahari.",
    createdBy: "Admin",
    createdAt: "2023-08-10",
  },
  {
    id: "q5",
    question: "Apakah bumi itu bulat?",
    type: "true_false",
    difficulty: "easy",
    subject: "IPA",
    grade: "Kelas 3",
    options: ["Benar", "Salah"],
    correctAnswer: "Benar",
    explanation: "Bumi memiliki bentuk bulat seperti bola, tepatnya sedikit pepat di kutub-kutubnya.",
    createdBy: "Admin",
    createdAt: "2023-08-15",
  },
  {
    id: "q6",
    question: "Jelaskan proses pembuatan kue tradisional Indonesia yang kamu ketahui!",
    type: "essay",
    difficulty: "medium",
    subject: "Prakarya",
    grade: "Kelas 5",
    options: [],
    correctAnswer: "Jawaban berisi langkah-langkah pembuatan kue tradisional Indonesia dengan lengkap dan runtut.",
    explanation: "Penilaian berdasarkan kelengkapan langkah, ketepatan bahan, dan keruntutan penjelasan.",
    createdBy: "Admin",
    createdAt: "2023-09-01",
  },
  {
    id: "q7",
    question: "Jodohkan ibukota dengan negaranya!",
    type: "matching",
    difficulty: "hard",
    subject: "IPS",
    grade: "Kelas 6",
    options: [
      "Jakarta - Indonesia", 
      "Tokyo - Jepang", 
      "Beijing - China", 
      "New Delhi - India"
    ],
    correctAnswer: "Jakarta-Indonesia;Tokyo-Jepang;Beijing-China;New Delhi-India",
    explanation: "Setiap ibukota dipasangkan dengan negara tempat ibukota tersebut berada.",
    createdBy: "Admin",
    createdAt: "2023-09-10",
  }
];

export const useQuestionBank = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>(mockQuestions);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter questions based on tab and search
  const filteredQuestions = questions.filter(q => {
    if (activeTab !== "all" && q.type !== activeTab) {
      return false;
    }
    if (searchQuery && !q.question.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleAddQuestion = () => {
    console.log("Add question button clicked");
    setIsAddingQuestion(true);
    setIsEditing(false);
    setIsViewOnly(false);
    setSelectedQuestion(null);
  };

  const handleEditQuestion = (question: QuestionType) => {
    console.log("Editing question:", question);
    
    // Simulate a loading state
    setIsLoading(true);
    
    setTimeout(() => {
      setSelectedQuestion(question);
      setIsEditing(true);
      setIsViewOnly(false);
      setIsAddingQuestion(true);
      setIsLoading(false);
      
      // Add toast for feedback
      toast({
        title: "Edit Soal",
        description: `Mengedit soal: ${question.question.substring(0, 30)}...`,
      });
    }, 300); // Short timeout to simulate loading
  };

  const handleViewQuestion = (question: QuestionType) => {
    console.log("Viewing question:", question);
    
    // Simulate a loading state
    setIsLoading(true);
    
    setTimeout(() => {
      setSelectedQuestion(question);
      setIsEditing(false);
      setIsViewOnly(true);
      setIsAddingQuestion(true);
      setIsLoading(false);
      
      // Add toast for feedback
      toast({
        title: "Lihat Soal",
        description: `Melihat detail soal: ${question.question.substring(0, 30)}...`,
      });
    }, 300); // Short timeout to simulate loading
  };

  const handleDuplicateQuestion = (question: QuestionType) => {
    console.log("Duplicating question:", question);
    
    // Create a copy with a new ID
    const newQuestion = {
      ...question,
      id: `q${questions.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: user?.name || "Admin",
      question: `${question.question} (copy)`
    };
    
    setQuestions(prev => [...prev, newQuestion]);
  };

  const handleSaveQuestion = (questionData: any) => {
    console.log("Saving question:", questionData);
    
    if (isEditing && selectedQuestion) {
      // Update existing question
      setQuestions(prev => prev.map(q => q.id === selectedQuestion.id ? { 
        ...questionData, 
        id: selectedQuestion.id,
        createdBy: selectedQuestion.createdBy,
        createdAt: selectedQuestion.createdAt
      } : q));
      toast({
        title: "Soal diperbarui",
        description: "Soal berhasil diperbarui",
      });
    } else {
      // Add new question
      const newQuestion = { 
        ...questionData, 
        id: `q${questions.length + 1}`,
        createdBy: user?.name || "Admin",
        createdAt: new Date().toISOString().split('T')[0]
      };
      setQuestions(prev => [...prev, newQuestion]);
      toast({
        title: "Soal ditambahkan",
        description: "Soal baru berhasil ditambahkan",
      });
    }
    setIsAddingQuestion(false);
    setSelectedQuestion(null);
    setIsViewOnly(false);
    setIsEditing(false);
  };

  const handleDeleteQuestion = (id: string) => {
    console.log("Deleting question:", id);
    setQuestions(prev => prev.filter(q => q.id !== id));
    toast({
      title: "Soal dihapus",
      description: "Soal berhasil dihapus",
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleCancel = () => {
    console.log("Cancelling question edit/add");
    setIsAddingQuestion(false);
    setIsViewOnly(false);
    setIsEditing(false);
    setSelectedQuestion(null);
  };

  // Debug logs
  useEffect(() => {
    console.log("QuestionBank state:", { 
      isAddingQuestion, 
      isEditing, 
      isViewOnly, 
      selectedQuestion,
      isLoading,
      activeTab,
      filteredQuestions: filteredQuestions.length
    });
  }, [isAddingQuestion, isEditing, isViewOnly, selectedQuestion, isLoading, activeTab, filteredQuestions.length]);
  
  return {
    activeTab,
    searchQuery,
    filteredQuestions,
    isAddingQuestion,
    isEditing,
    isViewOnly,
    selectedQuestion,
    isLoading,
    handleAddQuestion,
    handleEditQuestion,
    handleViewQuestion,
    handleDuplicateQuestion,
    handleSaveQuestion,
    handleDeleteQuestion,
    handleSearch,
    handleTabChange,
    handleCancel
  };
};
