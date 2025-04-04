import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  Plus,
  Filter,
  FileText,
  Check,
  X,
  Upload,
  Image,
  ListFilter,
  CheckSquare,
  Edit
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import QuestionListItem from "@/components/question/QuestionListItem";

// Sample question types
const questionTypeOptions = [
  { value: "multiple-choice", label: "Pilihan Ganda" },
  { value: "multiple-choice-complex", label: "Pilihan Ganda Kompleks" },
  { value: "true-false", label: "Benar/Salah" },
  { value: "essay", label: "Uraian" },
  { value: "matching", label: "Menjodohkan" }
];

// Sample difficulty levels
const difficultyOptions = [
  { value: "easy", label: "Mudah" },
  { value: "medium", label: "Sedang" },
  { value: "hard", label: "Sulit" }
];

// Sample subjects
const subjectOptions = [
  { value: "mathematics", label: "Matematika" },
  { value: "indonesian", label: "Bahasa Indonesia" },
  { value: "science", label: "IPA" },
  { value: "social", label: "IPS" },
  { value: "english", label: "Bahasa Inggris" },
  { value: "religion", label: "Pendidikan Agama" },
  { value: "civics", label: "PKn" }
];

// Sample grade levels
const gradeOptions = [
  { value: "1", label: "Kelas 1" },
  { value: "2", label: "Kelas 2" },
  { value: "3", label: "Kelas 3" },
  { value: "4", label: "Kelas 4" },
  { value: "5", label: "Kelas 5" },
  { value: "6", label: "Kelas 6" }
];

// Transform sample questions to the format expected by QuestionListItem
const transformedQuestions = [
  {
    id: "1",
    question: "Hasil dari 5 x 9 adalah...",
    type: "multiple_choice",
    subject: "Matematika",
    grade: "Kelas 3",
    difficulty: "easy",
    options: ["40", "45", "50", "54"],
    correctAnswer: "45",
    explanation: "5 x 9 = 45",
    createdBy: "Ibu Siti",
    createdAt: "2023-10-01",
    tags: ["perkalian", "bilangan"],
    isImage: false
  },
  {
    id: "2",
    question: "Siapakah presiden pertama Indonesia?",
    type: "multiple_choice",
    subject: "IPS",
    grade: "Kelas 5",
    difficulty: "easy",
    options: ["Soekarno", "Soeharto", "Habibie", "Megawati"],
    correctAnswer: "Soekarno",
    explanation: "Ir. Soekarno adalah presiden pertama Indonesia yang menjabat pada periode 1945-1967.",
    createdBy: "Bapak Ahmad",
    createdAt: "2023-10-02",
    tags: ["sejarah", "indonesia", "presiden"],
    isImage: false
  },
  {
    id: "3",
    question: "Tuliskan contoh teks deskriptif dengan tema 'Lingkungan Sekolahku'.",
    type: "essay",
    subject: "Bahasa Indonesia",
    grade: "Kelas 6",
    difficulty: "medium",
    correctAnswer: "Teks deskriptif tentang lingkungan sekolah yang menjelaskan suasana, fasilitas, dan keadaan sekolah secara detail.",
    createdBy: "Ibu Rini",
    createdAt: "2023-10-03",
    tags: ["teks deskriptif", "bahasa indonesia", "menulis"],
    isImage: false
  },
  {
    id: "4",
    question: "Jakarta adalah ibu kota Indonesia.",
    type: "true_false",
    subject: "IPS",
    grade: "Kelas 4",
    difficulty: "easy",
    correctAnswer: "Benar",
    explanation: "Jakarta merupakan ibu kota negara Indonesia yang terletak di pulau Jawa.",
    createdBy: "Bapak Tono",
    createdAt: "2023-10-04",
    tags: ["geografi", "indonesia", "ibu kota"],
    isImage: false
  },
  {
    id: "5",
    question: "Sebutkan dan jelaskan 3 bagian utama tumbuhan beserta fungsinya.",
    type: "essay",
    subject: "IPA",
    grade: "Kelas 5",
    difficulty: "medium",
    correctAnswer: "1. Akar - menyerap air dan nutrisi dari tanah, serta menopang tumbuhan\n2. Batang - mengalirkan air dan nutrisi dari akar ke seluruh bagian tumbuhan\n3. Daun - tempat terjadinya fotosintesis",
    createdBy: "Ibu Dewi",
    createdAt: "2023-10-05",
    tags: ["tumbuhan", "biologi", "organ tumbuhan"],
    isImage: false
  },
  {
    id: "6",
    question: "Manakah di antara berikut ini yang termasuk hewan mamalia? (Pilih semua jawaban yang benar)",
    type: "multiple_choice_complex",
    subject: "IPA",
    grade: "Kelas 4",
    difficulty: "medium",
    options: ["Kucing", "Ayam", "Lumba-lumba", "Kadal", "Kelelawar"],
    correctAnswer: "Kucing, Lumba-lumba, Kelelawar",
    explanation: "Kucing, lumba-lumba, dan kelelawar adalah hewan mamalia karena memiliki kelenjar susu, melahirkan anak, dan memiliki rambut/bulu.",
    createdBy: "Bapak Agus",
    createdAt: "2023-10-06",
    tags: ["hewan", "klasifikasi", "mamalia"],
    isImage: false
  },
  {
    id: "7",
    question: "Air mengalir dari tempat yang lebih tinggi ke tempat yang lebih rendah.",
    type: "true_false",
    subject: "IPA",
    grade: "Kelas 3",
    difficulty: "easy",
    correctAnswer: "Benar",
    explanation: "Air selalu mengalir dari tempat yang lebih tinggi ke tempat yang lebih rendah karena pengaruh gaya gravitasi.",
    createdBy: "Ibu Maya",
    createdAt: "2023-10-07",
    tags: ["air", "fisika", "gravitasi"],
    isImage: false
  }
];

const QuestionBank = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [isEditQuestionOpen, setIsEditQuestionOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [previewQuestion, setPreviewQuestion] = useState<any>(null);
  const [newQuestionImage, setNewQuestionImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // New question form state
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    type: "multiple-choice",
    subject: "",
    grade: "",
    difficulty: "medium",
    options: [
      { id: "a", text: "", isCorrect: false },
      { id: "b", text: "", isCorrect: false },
      { id: "c", text: "", isCorrect: false },
      { id: "d", text: "", isCorrect: false }
    ],
    isTrue: false,
    answerKey: "",
    explanation: "",
    tags: ""
  });
  
  const { toast } = useToast();
  
  // Filter questions
  const filteredQuestions = transformedQuestions.filter(q => {
    // Search filter
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Subject filter
    const matchesSubject = selectedSubject === "all" || 
                          q.subject.toLowerCase() === selectedSubject;
    
    // Grade filter
    const matchesGrade = selectedGrade === "all" || 
                        q.grade.toLowerCase().includes(selectedGrade.toLowerCase());
    
    // Type filter
    const matchesType = selectedType === "all" || 
                      q.type.toLowerCase().includes(selectedType.toLowerCase());
    
    // Tab filter
    const matchesTab = activeTab === "all" || 
                      (activeTab === "multiple-choice" && (q.type === "multiple_choice" || q.type === "multiple_choice_complex")) ||
                      (activeTab === "true-false" && q.type === "true_false") ||
                      (activeTab === "essay" && q.type === "essay") ||
                      (activeTab === "matching" && q.type === "matching");
    
    return matchesSearch && matchesSubject && matchesGrade && matchesType && matchesTab;
  });
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewQuestionImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Gambar diunggah",
        description: `File ${file.name} berhasil diunggah.`
      });
    }
  };

  const handleAddOption = () => {
    // Only add if we have less than 6 options
    if (newQuestion.options.length < 6) {
      const nextOptionId = String.fromCharCode(97 + newQuestion.options.length); // a, b, c, ...
      setNewQuestion({
        ...newQuestion,
        options: [...newQuestion.options, { id: nextOptionId, text: "", isCorrect: false }]
      });
    }
  };

  const handleRemoveOption = (index: number) => {
    if (newQuestion.options.length > 2) { // Keep at least 2 options
      const newOptions = [...newQuestion.options];
      newOptions.splice(index, 1);
      setNewQuestion({
        ...newQuestion,
        options: newOptions
      });
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...newQuestion.options];
    newOptions[index].text = value;
    setNewQuestion({
      ...newQuestion,
      options: newOptions
    });
  };

  const handleCorrectOption = (index: number, checked: boolean) => {
    const newOptions = [...newQuestion.options];
    
    if (newQuestion.type === "multiple-choice") {
      // For single choice, uncheck all first
      newOptions.forEach(option => option.isCorrect = false);
    }
    
    // Set the correct option
    newOptions[index].isCorrect = checked;
    
    setNewQuestion({
      ...newQuestion,
      options: newOptions
    });
  };

  const handleSubmit = () => {
    // Validation would go here
    
    toast({
      title: "Soal berhasil ditambahkan",
      description: "Soal baru telah ditambahkan ke bank soal"
    });
    
    // Reset form
    setNewQuestion({
      question: "",
      type: "multiple-choice",
      subject: "",
      grade: "",
      difficulty: "medium",
      options: [
        { id: "a", text: "", isCorrect: false },
        { id: "b", text: "", isCorrect: false },
        { id: "c", text: "", isCorrect: false },
        { id: "d", text: "", isCorrect: false }
      ],
      isTrue: false,
      answerKey: "",
      explanation: "",
      tags: ""
    });
    
    setNewQuestionImage(null);
    setImagePreview(null);
    setIsAddQuestionOpen(false);
    setIsEditQuestionOpen(false);
  };

  const handlePreviewQuestion = (question: any) => {
    setPreviewQuestion(question);
    setIsPreviewOpen(true);
  };

  const handleEditQuestion = (question: any) => {
    // Set selected question and transform data to match the form structure
    setSelectedQuestion(question);
    
    // Initialize form with selected question data
    setNewQuestion({
      question: question.question,
      type: question.type === "multiple_choice" ? "multiple-choice" : 
            question.type === "multiple_choice_complex" ? "multiple-choice-complex" :
            question.type === "true_false" ? "true-false" : "essay",
      subject: question.subject.toLowerCase(),
      grade: question.grade.toLowerCase().replace("kelas ", ""),
      difficulty: question.difficulty,
      options: question.options ? question.options.map((opt: string, idx: number) => ({
        id: String.fromCharCode(97 + idx), // a, b, c, ...
        text: opt,
        isCorrect: question.correctAnswer.includes(opt)
      })) : [],
      isTrue: question.correctAnswer === "Benar",
      answerKey: question.correctAnswer,
      explanation: question.explanation || "",
      tags: question.tags.join(", ")
    });
    
    setIsEditQuestionOpen(true);
  };

  const handleDeleteQuestion = (id: string) => {
    toast({
      title: "Soal dihapus",
      description: `Soal dengan ID ${id} berhasil dihapus`,
      variant: "destructive"
    });
    // In a real app, this would delete from the database
  };

  return (
    <DashboardLayout title="Bank Soal">
      <div className="space-y-6">
        {/* Filters and search */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari soal..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Mata Pelajaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Mapel</SelectItem>
                {subjectOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                {gradeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Tipe Soal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                {questionTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={() => setIsAddQuestionOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Soal
            </Button>
          </div>
        </div>
        
        {/* Question tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 mb-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="multiple-choice">Pilihan Ganda</TabsTrigger>
            <TabsTrigger value="true-false">Benar/Salah</TabsTrigger>
            <TabsTrigger value="essay">Uraian</TabsTrigger>
            <TabsTrigger value="matching">Menjodohkan</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {/* Example questions */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">
                Contoh Format Soal
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {/* Pilihan Ganda */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="mr-2 h-5 w-5" /> Pilihan Ganda
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-3">
                      <p className="font-medium">Soal:</p>
                      <p>Ibu kota Indonesia adalah...</p>
                      <p className="font-medium">Pilihan:</p>
                      <ul className="list-inside space-y-1">
                        <li>A. Jakarta ✓</li>
                        <li>B. Bandung</li>
                        <li>C. Surabaya</li>
                        <li>D. Yogyakarta</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Pilihan Ganda Kompleks */}
                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <CheckSquare className="mr-2 h-5 w-5" /> Pilihan Ganda Kompleks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-3">
                      <p className="font-medium">Soal:</p>
                      <p>Manakah yang termasuk buah-buahan? (Pilih semua yang benar)</p>
                      <p className="font-medium">Pilihan:</p>
                      <ul className="list-inside space-y-1">
                        <li>A. Apel ✓</li>
                        <li>B. Wortel</li>
                        <li>C. Mangga ✓</li>
                        <li>D. Kentang</li>
                        <li>E. Jeruk ✓</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Benar/Salah */}
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Check className="mr-2 h-5 w-5" /> Benar/Salah
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-3">
                      <p className="font-medium">Soal:</p>
                      <p>Bumi mengelilingi matahari.</p>
                      <p className="font-medium">Jawaban:</p>
                      <p><span className="bg-green-200 px-2 py-0.5 rounded">Benar</span></p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            
              {/* Question list */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Daftar Soal 
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({filteredQuestions.length} soal)
                  </span>
                </h3>
                
                {filteredQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredQuestions.map((question) => (
                      <QuestionListItem
                        key={question.id}
                        question={question}
                        onEdit={handleEditQuestion}
                        onPreview={handlePreviewQuestion}
                        onDelete={handleDeleteQuestion}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Tidak ada soal ditemukan</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Question Form Dialog - Used for both Add and Edit */}
      <Dialog 
        open={isAddQuestionOpen || isEditQuestionOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setIsAddQuestionOpen(false);
            setIsEditQuestionOpen(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {isEditQuestionOpen ? "Edit Soal" : "Tambah Soal Baru"}
            </DialogTitle>
            <DialogDescription>
              {isEditQuestionOpen 
                ? "Edit soal yang sudah ada. Pastikan semua informasi sudah benar."
                : "Buat soal baru untuk bank soal. Isi semua informasi yang diperlukan."
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            {/* Form fields - keep existing code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Mata Pelajaran</Label>
                <Select 
                  value={newQuestion.subject}
                  onValueChange={(value) => setNewQuestion({...newQuestion, subject: value})}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Pilih mata pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="grade">Kelas</Label>
                <Select 
                  value={newQuestion.grade}
                  onValueChange={(value) => setNewQuestion({...newQuestion, grade: value})}
                >
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Tipe Soal</Label>
                <Select 
                  value={newQuestion.type}
                  onValueChange={(value: string) => setNewQuestion({...newQuestion, type: value})}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Pilih tipe soal" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Tingkat Kesulitan</Label>
                <Select 
                  value={newQuestion.difficulty}
                  onValueChange={(value) => setNewQuestion({...newQuestion, difficulty: value})}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Pilih tingkat kesulitan" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="question">Pertanyaan</Label>
              <Textarea 
                id="question"
                placeholder="Tulis pertanyaan di sini"
                className="min-h-[100px]"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
              />
            </div>
            
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Gambar Soal (opsional)</Label>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('image-upload')?.click()}
                  type="button"
                >
                  <Image className="mr-2 h-4 w-4" /> Pilih Gambar
                </Button>
                <Input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <span className="text-sm text-muted-foreground">
                  {newQuestionImage ? newQuestionImage.name : 'Belum ada gambar dipilih'}
                </span>
              </div>
              
              {imagePreview && (
                <div className="mt-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-[200px] object-contain rounded-md border"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setNewQuestionImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Hapus Gambar
                  </Button>
                </div>
              )}
            </div>
            
            {/* Options for multiple choice */}
            {(newQuestion.type === "multiple-choice" || newQuestion.type === "multiple-choice-complex") && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Pilihan Jawaban</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={handleAddOption}
                    disabled={newQuestion.options.length >= 6}
                  >
                    <Plus className="mr-2 h-3 w-3" /> Tambah Pilihan
                  </Button>
                </div>
                
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="pt-3 font-semibold">
                      {option.id.toUpperCase()}.
                    </div>
                    <div className="flex-1 space-y-1">
                      <Textarea
                        placeholder={`Teks pilihan ${option.id.toUpperCase()}`}
                        className="min-h-[60px]"
                        value={option.text}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1 pt-3">
                      <Checkbox
                        checked={option.isCorrect}
                        onCheckedChange={(checked) => 
                          handleCorrectOption(index, checked as boolean)
                        }
                        id={`correct-${index}`}
                      />
                      <Label htmlFor={`correct-${index}`} className="text-xs">
                        {newQuestion.type === "multiple-choice" ? "Benar" : "Pilih"}
                      </Label>
                    </div>
                    {index > 1 && ( // Keep at least 2 options
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="self-center"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                
                <div className="bg-muted/30 p-2 rounded-md text-sm text-muted-foreground">
                  {newQuestion.type === "multiple-choice" ? (
                    "Pilih satu jawaban yang benar dengan mencentang kotak di samping pilihan."
                  ) : (
                    "Pilih satu atau lebih jawaban yang benar dengan mencentang kotak di samping pilihan."
                  )}
                </div>
              </div>
            )}
            
            {/* True/False answer */}
            {newQuestion.type === "true-false" && (
              <div className="space-y-2">
                <Label htmlFor="isTrue">Jawaban</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="true"
                      name="isTrue"
                      checked={newQuestion.isTrue === true}
                      onChange={() => setNewQuestion({...newQuestion, isTrue: true})}
                      className="h-4 w-4 border-muted-foreground/30 focus:ring-primary"
                    />
                    <Label htmlFor="true" className="text-sm">Benar</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="false"
                      name="isTrue"
                      checked={newQuestion.isTrue === false}
                      onChange={() => setNewQuestion({...newQuestion, isTrue: false})}
                      className="h-4 w-4 border-muted-foreground/30 focus:ring-primary"
                    />
                    <Label htmlFor="false" className="text-sm">Salah</Label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Essay answer */}
            {newQuestion.type === "essay" && (
              <div className="space-y-2">
                <Label htmlFor="answerKey">Kunci Jawaban</Label>
                <Textarea 
                  id="answerKey"
                  placeholder="Tulis kunci jawaban atau pedoman penilaian di sini"
                  className="min-h-[100px]"
                  value={newQuestion.answerKey}
                  onChange={(e) => setNewQuestion({...newQuestion, answerKey: e.target.value})}
                />
              </div>
            )}
            
            {/* Explanation */}
            <div className="space-y-2">
              <Label htmlFor="explanation">Penjelasan (opsional)</Label>
              <Textarea 
                id="explanation"
                placeholder="Berikan penjelasan tentang jawaban yang benar"
                className="min-h-[80px]"
                value={newQuestion.explanation}
                onChange={(e) => setNewQuestion({...newQuestion, explanation: e.target.value})}
              />
            </div>
            
            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tag (pisahkan dengan koma)</Label>
              <Input 
                id="tags"
                placeholder="Contoh: aljabar, persamaan, matematika"
                value={newQuestion.tags}
                onChange={(e) => setNewQuestion({...newQuestion, tags: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddQuestionOpen(false);
                setIsEditQuestionOpen(false);
              }}
            >
              Batal
            </Button>
            <Button onClick={handleSubmit}>
              {isEditQuestionOpen ? "Simpan Perubahan" : "Simpan Soal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Question Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detail Soal</DialogTitle>
          </DialogHeader>
          
          {previewQuestion && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge>
                  {questionTypeOptions.find(t => t.value === previewQuestion.type)?.label}
                </Badge>
                <Badge variant="outline">
                  {subjectOptions.find(s => s.value === previewQuestion.subject)?.label}
                </Badge>
                <Badge variant="outline">
                  {gradeOptions.find(g => g.value === previewQuestion.grade)?.label}
                </Badge>
                <Badge variant={
                  previewQuestion.difficulty === "easy" ? "secondary" : 
                  previewQuestion.difficulty === "medium" ? "default" : "destructive"
                }>
                  {difficultyOptions.find(d => d.value === previewQuestion.difficulty)?.label}
                </Badge>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Pertanyaan:</h3>
                <p>{previewQuestion.question}</p>
              </div>
              
              {(previewQuestion.type === "multiple-choice" || previewQuestion.type === "multiple-choice-complex") && (
                <div>
                  <h3 className="font-medium mb-2">Pilihan:</h3>
                  <ul className="space-y-2">
                    {previewQuestion.options.map((option: any) => (
                      <li 
                        key={option.id} 
                        className={`flex gap-2 p-2 rounded-md ${option.isCorrect ? 'bg-green-50 border border-green-200' : ''}`}
                      >
                        <span>{option.id.toUpperCase()}.</span>
                        <span>{option.text}</span>
                        {option.isCorrect && (
                          <span className="text-green-600 ml-auto">✓</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {previewQuestion.type === "true-false" && (
                <div>
                  <h3 className="font-medium mb-2">Jawaban:</h3>
                  <p>
                    {previewQuestion.isTrue ? (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded">Benar</span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded">Salah</span>
                    )}
                  </p>
                </div>
              )}
              
              {previewQuestion.type === "essay" && (
                <div>
                  <h3 className="font-medium mb-2">Kunci Jawaban:</h3>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p>{previewQuestion.answerKey}</p>
                  </div>
                </div>
              )}
              
              {previewQuestion.explanation && (
                <div>
                  <h3 className="font-medium mb-2">Penjelasan:</h3>
                  <div className="bg-amber-50 p-3 rounded-md">
                    <p>{previewQuestion.explanation}</p>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-2">Tag:</h3>
                <div className="flex flex-wrap gap-2">
                  {previewQuestion.tags.map((tag: string, index: number) => (
                    <span 
                      key={index} 
                      className="text-xs bg-muted px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Tutup</Button>
            <Button 
              onClick={() => {
                setIsPreviewOpen(false);
                if (previewQuestion) {
                  handleEditQuestion(previewQuestion);
                }
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Soal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default QuestionBank;
