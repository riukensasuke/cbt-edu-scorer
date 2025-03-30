
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  Flag,
  AlertTriangle,
  Check
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock exam data
const mockExam = {
  id: "1",
  title: "UTS Matematika Kelas 6",
  subject: "Matematika",
  instructions: "Jawablah semua soal dengan teliti. Perhatikan waktu yang tersedia.",
  duration: 90, // in minutes
  questions: [
    {
      id: "q1",
      text: "Berapakah hasil dari 24 × 8?",
      type: "multiple_choice",
      options: ["172", "184", "192", "196"],
      answer: "192"
    },
    {
      id: "q2",
      text: "Berapa hasil dari (4 × 6) + (7 × 3)?",
      type: "multiple_choice",
      options: ["45", "39", "51", "57"],
      answer: "45"
    },
    {
      id: "q3",
      text: "Selesaikan soal cerita berikut: Ibu membeli 5 kg buah apel dengan harga Rp15.000 per kg dan 3 kg buah jeruk dengan harga Rp12.000 per kg. Berapa total uang yang harus dibayar ibu?",
      type: "multiple_choice",
      options: ["Rp75.000", "Rp36.000", "Rp111.000", "Rp93.000"],
      answer: "Rp111.000"
    },
    {
      id: "q4",
      text: "Sebuah persegi panjang memiliki panjang 12 cm dan lebar 8 cm. Berapakah luas persegi panjang tersebut?",
      type: "multiple_choice",
      options: ["20 cm²", "96 cm²", "40 cm²", "64 cm²"],
      answer: "96 cm²"
    },
    {
      id: "q5",
      text: "Jelaskan cara menghitung luas segitiga dan berikan contoh perhitungannya!",
      type: "essay"
    }
  ]
};

const TakeExam = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(mockExam.duration * 60); // in seconds
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  
  const totalQuestions = mockExam.questions.length;
  
  // Start exam
  const startExam = () => {
    setExamStarted(true);
    // In a real application, you would start a timer here
  };
  
  // Handle answer change
  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
    
    // Provide feedback
    toast.success("Jawaban disimpan!");
  };
  
  // Toggle flag on question
  const toggleFlag = (questionId: string) => {
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== questionId));
      toast.info("Soal tidak ditandai");
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
      toast.info("Soal ditandai untuk ditinjau nanti");
    }
  };
  
  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  // Navigate to specific question
  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };
  
  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress
  const calculateProgress = () => {
    const answered = Object.keys(answers).length;
    return (answered / totalQuestions) * 100;
  };
  
  // Check if question is answered
  const isQuestionAnswered = (questionId: string) => {
    return !!answers[questionId];
  };
  
  // Submit exam
  const submitExam = () => {
    // In a real application, you would submit answers to a backend here
    navigate("/results/1", { state: { examId: id, answers } });
  };
  
  // Render question based on type
  const renderQuestion = () => {
    const question = mockExam.questions[currentQuestion];
    
    switch (question.type) {
      case "multiple_choice":
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">
              Soal {currentQuestion + 1}: {question.text}
            </h3>
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case "essay":
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">
              Soal {currentQuestion + 1}: {question.text}
            </h3>
            <Textarea
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Tulis jawaban kamu di sini..."
              className="min-h-[200px]"
            />
          </div>
        );
      default:
        return (
          <div>Tipe soal tidak didukung</div>
        );
    }
  };
  
  // If exam hasn't started yet, show instructions
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-primary">{mockExam.title}</h1>
            <p className="text-muted-foreground">{mockExam.subject}</p>
          </div>
        </header>
        
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Petunjuk Ujian</h2>
                  <p className="text-muted-foreground mb-4">
                    Baca petunjuk berikut dengan seksama sebelum memulai ujian.
                  </p>
                  <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5">
                    <p>{mockExam.instructions}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Informasi Ujian:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="w-32">Mata Pelajaran:</span>
                      <span className="font-medium">{mockExam.subject}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-32">Jumlah Soal:</span>
                      <span className="font-medium">{totalQuestions} soal</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-32">Waktu:</span>
                      <span className="font-medium">{mockExam.duration} menit</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Penting!</p>
                      <ul className="list-disc ml-5 text-sm space-y-1 mt-2">
                        <li>Pastikan koneksi internet stabil selama ujian</li>
                        <li>Jangan meninggalkan halaman ujian sebelum selesai</li>
                        <li>Jawaban akan tersimpan secara otomatis</li>
                        <li>Klik tombol "Mulai Ujian" untuk memulai</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={startExam}
                  className="w-full"
                  size="lg"
                >
                  Mulai Ujian
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Exam Header */}
      <header className="bg-white shadow-sm py-2 px-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">{mockExam.title}</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
            
            <Dialog open={confirmSubmit} onOpenChange={setConfirmSubmit}>
              <DialogTrigger asChild>
                <Button>Selesai</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Konfirmasi Pengumpulan</DialogTitle>
                  <DialogDescription>
                    Apakah kamu yakin ingin mengumpulkan jawaban? Kamu sudah menjawab {Object.keys(answers).length} dari {totalQuestions} soal.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {Object.keys(answers).length < totalQuestions && (
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <p className="text-sm">Masih ada {totalQuestions - Object.keys(answers).length} soal yang belum dijawab!</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline"
                    onClick={() => setConfirmSubmit(false)}
                  >
                    Kembali ke Ujian
                  </Button>
                  <Button 
                    onClick={submitExam}
                  >
                    Ya, Kumpulkan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      
      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center space-x-3">
            <Progress value={calculateProgress()} className="h-2" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {Object.keys(answers).length}/{totalQuestions} Dijawab
            </span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Question Content */}
          <div className="flex-1">
            <Card>
              <CardContent className="pt-6">
                {renderQuestion()}
                
                <div className="mt-6 flex items-center justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => toggleFlag(mockExam.questions[currentQuestion].id)}
                    className={flaggedQuestions.includes(mockExam.questions[currentQuestion].id) ? "border-yellow-500 text-yellow-500" : ""}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {flaggedQuestions.includes(mockExam.questions[currentQuestion].id) ? "Batal Tandai" : "Tandai Soal"}
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline"
                      onClick={prevQuestion}
                      disabled={currentQuestion === 0}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Sebelumnya
                    </Button>
                    
                    <Button 
                      onClick={nextQuestion}
                      disabled={currentQuestion === totalQuestions - 1}
                    >
                      Selanjutnya
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Question Navigator */}
          <div className="md:w-64">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-20">
              <h3 className="font-medium mb-3">Navigasi Soal</h3>
              <div className="grid grid-cols-5 gap-2">
                {mockExam.questions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`w-9 h-9 rounded-md flex items-center justify-center text-sm ${
                      currentQuestion === index
                        ? 'bg-primary text-white'
                        : isQuestionAnswered(question.id)
                        ? 'bg-green-100 text-green-700 border border-green-500'
                        : flaggedQuestions.includes(question.id)
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-500'
                        : 'bg-gray-100'
                    }`}
                  >
                    {index + 1}
                    {isQuestionAnswered(question.id) && (
                      <Check className="h-3 w-3 absolute -bottom-1 -right-1" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-500 rounded-sm"></div>
                  <span className="text-xs">Sudah dijawab</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 rounded-sm"></div>
                  <span className="text-xs">Ditandai</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 rounded-sm"></div>
                  <span className="text-xs">Belum dijawab</span>
                </div>
              </div>
              
              <Button className="w-full mt-6" onClick={() => setConfirmSubmit(true)}>
                Selesai
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeExam;
