
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QuestionListItem from "@/components/question/QuestionListItem";
import QuestionForm from "@/components/question/QuestionForm";
import BulkQuestionUpload from "@/components/question/BulkQuestionUpload";

// Mock data for questions
const mockQuestions = [
  {
    id: "q1",
    question: "Berapa hasil dari 5 x 5?",
    type: "multiple-choice",
    difficulty: "easy",
    subject: "Matematika",
    grade: "Kelas 5",
    options: ["15", "20", "25", "30"],
    correctAnswer: "25"
  },
  {
    id: "q2",
    question: "Siapakah presiden pertama Indonesia?",
    type: "multiple-choice",
    difficulty: "medium",
    subject: "IPS",
    grade: "Kelas 4",
    options: ["Soekarno", "Soeharto", "Habibie", "Megawati"],
    correctAnswer: "Soekarno"
  },
  {
    id: "q3",
    question: "Planet apakah yang terdekat dengan matahari?",
    type: "multiple-choice",
    difficulty: "hard",
    subject: "IPA",
    grade: "Kelas 6",
    options: ["Venus", "Mars", "Merkurius", "Bumi"],
    correctAnswer: "Merkurius"
  }
];

const QuestionBank = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState(mockQuestions);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
    setIsAddingQuestion(true);
    setIsEditing(false);
    setSelectedQuestion(null);
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setIsEditing(true);
    setIsAddingQuestion(true);
  };

  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setIsEditing(false);
    setIsAddingQuestion(true);
  };

  const handleSaveQuestion = (questionData) => {
    if (isEditing) {
      // Update existing question
      setQuestions(prev => prev.map(q => q.id === selectedQuestion.id ? { ...questionData, id: selectedQuestion.id } : q));
      toast({
        title: "Soal diperbarui",
        description: "Soal berhasil diperbarui",
      });
    } else {
      // Add new question
      const newQuestion = { 
        ...questionData, 
        id: `q${questions.length + 1}` 
      };
      setQuestions(prev => [...prev, newQuestion]);
      toast({
        title: "Soal ditambahkan",
        description: "Soal baru berhasil ditambahkan",
      });
    }
    setIsAddingQuestion(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <DashboardLayout title="Bank Soal">
      <div className="space-y-6">
        {isAddingQuestion ? (
          <QuestionForm 
            initialData={selectedQuestion} 
            onSave={handleSaveQuestion} 
            onCancel={() => setIsAddingQuestion(false)}
            isViewOnly={!isEditing && !!selectedQuestion}
          />
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari soal..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <BulkQuestionUpload />
                <Button onClick={handleAddQuestion} className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Soal Baru
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="multiple-choice">Pilihan Ganda</TabsTrigger>
                <TabsTrigger value="true-false">Benar/Salah</TabsTrigger>
                <TabsTrigger value="essay">Uraian</TabsTrigger>
                <TabsTrigger value="matching">Menjodohkan</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Daftar Soal</CardTitle>
                    <CardDescription>
                      Kelola soal ujian yang tersedia
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredQuestions.length > 0 ? (
                        filteredQuestions.map((question) => (
                          <QuestionListItem 
                            key={question.id} 
                            question={question} 
                            onView={() => handleViewQuestion(question)} 
                            onEdit={() => handleEditQuestion(question)}
                          />
                        ))
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-muted-foreground">Tidak ada soal ditemukan</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default QuestionBank;
