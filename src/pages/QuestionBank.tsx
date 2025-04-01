
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { exportToExcel, importExcelFile, readExcelFile } from "@/utils/excelUtils";
import {
  BookOpen,
  Filter,
  Plus,
  Search,
  Edit,
  Trash2,
  ImagePlus,
  ListChecks,
  FileText,
  AlignLeft,
  Upload,
  Download
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for questions
const mockQuestions = [
  {
    id: "1",
    question: "Berapakah hasil dari 5 × 7?",
    type: "multiple_choice",
    subject: "Matematika",
    grade: "Kelas 4",
    options: ["25", "30", "35", "40"],
    answer: "35",
    creator: "Ibu Siti"
  },
  {
    id: "2",
    question: "Sebutkan 3 contoh hewan mamalia!",
    type: "essay",
    subject: "IPA",
    grade: "Kelas 3",
    answer: "Kucing, Anjing, Sapi, dll.",
    creator: "Bapak Rudi"
  },
  {
    id: "3",
    question: "Jodohkan nama provinsi dengan ibukotanya!",
    type: "matching",
    subject: "IPS",
    grade: "Kelas 5",
    options: [
      { left: "Jawa Barat", right: "Bandung" },
      { left: "Jawa Tengah", right: "Semarang" },
      { left: "Jawa Timur", right: "Surabaya" }
    ],
    creator: "Ibu Ani"
  },
  {
    id: "4",
    question: "Apakah nama dari bagian tumbuhan pada gambar di atas?",
    type: "image",
    subject: "IPA",
    grade: "Kelas 2",
    imageUrl: "https://example.com/plant-parts.jpg",
    options: ["Akar", "Batang", "Daun", "Bunga"],
    answer: "Daun",
    creator: "Ibu Rini"
  },
  {
    id: "5",
    question: "Jelaskan proses fotosintesis!",
    type: "essay",
    subject: "IPA",
    grade: "Kelas 6",
    answer: "Fotosintesis adalah proses pembuatan makanan oleh tumbuhan hijau dengan bantuan cahaya matahari...",
    creator: "Bapak Ahmad"
  },
];

const QuestionBank = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState(mockQuestions);
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>("multiple_choice");
  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false);
  const [isEditQuestionDialogOpen, setIsEditQuestionDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    type: "multiple_choice",
    subject: "",
    grade: "",
    options: ["", "", "", ""],
    answer: "",
    creator: user?.name || ""
  });
  
  // Filter function
  const filterQuestions = (type: string, search: string) => {
    let filtered = [...mockQuestions];
    
    // Filter by type if not "all"
    if (type !== "all") {
      filtered = filtered.filter(question => question.type === type);
    }
    
    // Filter by search query
    if (search) {
      filtered = filtered.filter(question => 
        question.question.toLowerCase().includes(search.toLowerCase()) ||
        question.subject.toLowerCase().includes(search.toLowerCase()) ||
        question.grade.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredQuestions(filtered);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterQuestions(value, searchQuery);
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterQuestions(activeTab, query);
  };

  // Handle question form change
  const handleQuestionFormChange = (field: string, value: any) => {
    setNewQuestion(prev => ({ ...prev, [field]: value }));
  };

  // Handle option change for multiple choice
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion(prev => ({ ...prev, options: updatedOptions }));
  };

  // Save new question
  const saveQuestion = () => {
    // Validate form
    if (!newQuestion.question || !newQuestion.subject || !newQuestion.grade) {
      toast({
        title: "Form tidak lengkap",
        description: "Silakan lengkapi informasi soal",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would save to a database
    toast({
      title: "Soal berhasil ditambahkan",
      description: "Soal baru telah ditambahkan ke bank soal"
    });

    // Close dialog and reset form
    setIsAddQuestionDialogOpen(false);
    setNewQuestion({
      question: "",
      type: "multiple_choice",
      subject: "",
      grade: "",
      options: ["", "", "", ""],
      answer: "",
      creator: user?.name || ""
    });
  };

  // Edit question
  const handleEditQuestion = (questionId: string) => {
    const question = mockQuestions.find(q => q.id === questionId);
    if (question) {
      setCurrentQuestion(question);
      setIsEditQuestionDialogOpen(true);
    }
  };

  // Save edited question
  const saveEditedQuestion = () => {
    // In a real app, this would update the question in the database
    toast({
      title: "Soal berhasil diperbarui",
      description: "Perubahan pada soal telah disimpan"
    });
    
    setIsEditQuestionDialogOpen(false);
  };

  // Export questions to Excel
  const handleExportToExcel = () => {
    const dataToExport = filteredQuestions.map(question => ({
      'Pertanyaan': question.question,
      'Jenis Soal': question.type === 'multiple_choice' ? 'Pilihan Ganda' : 
                   question.type === 'essay' ? 'Esai' : 
                   question.type === 'matching' ? 'Menjodohkan' : 'Bergambar',
      'Mata Pelajaran': question.subject,
      'Kelas': question.grade,
      'Pembuat': question.creator
    }));
    
    exportToExcel(dataToExport, "Data_Soal", "Bank_Soal");
    
    toast({
      title: "Data berhasil diexport",
      description: "Data soal telah diexport ke Excel"
    });
  };
  
  // Import questions from Excel
  const handleImportFromExcel = () => {
    importExcelFile(async (file) => {
      try {
        const importedQuestions = await readExcelFile(file);
        
        toast({
          title: "Data berhasil diimport",
          description: `${importedQuestions.length} data soal telah diimport`
        });
        
        // In a real app, this would process and save the imported questions
      } catch (error) {
        toast({
          title: "Gagal import data",
          description: "Format file tidak valid",
          variant: "destructive"
        });
      }
    });
  };
  
  // Question type badge and icon
  const getQuestionTypeBadge = (type: string) => {
    switch (type) {
      case "multiple_choice":
        return (
          <Badge className="bg-blue-500 flex items-center gap-1">
            <ListChecks className="h-3 w-3" /> Pilihan Ganda
          </Badge>
        );
      case "essay":
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <AlignLeft className="h-3 w-3" /> Esai
          </Badge>
        );
      case "matching":
        return (
          <Badge className="bg-yellow-500 flex items-center gap-1">
            <FileText className="h-3 w-3" /> Menjodohkan
          </Badge>
        );
      case "image":
        return (
          <Badge className="bg-purple-500 flex items-center gap-1">
            <ImagePlus className="h-3 w-3" /> Bergambar
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">Unknown</Badge>
        );
    }
  };
  
  // Render question form based on type
  const renderQuestionForm = () => {
    switch (selectedQuestionType) {
      case "multiple_choice":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Pertanyaan</Label>
              <Textarea id="question" placeholder="Tulis pertanyaan di sini..." />
            </div>
            
            <div className="space-y-2">
              <Label>Pilihan Jawaban</Label>
              
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input placeholder={`Pilihan ${index + 1}`} />
                  {index === 0 && (
                    <Badge className="bg-green-500">Jawaban Benar</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case "essay":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Pertanyaan</Label>
              <Textarea id="question" placeholder="Tulis pertanyaan di sini..." />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="answer">Kunci Jawaban (untuk referensi)</Label>
              <Textarea id="answer" placeholder="Tulis jawaban yang diharapkan di sini..." />
            </div>
          </div>
        );
      
      case "matching":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Instruksi</Label>
              <Textarea id="question" placeholder="Contoh: Jodohkan nama provinsi dengan ibukotanya" />
            </div>
            
            <Label>Item untuk Dijodohkan</Label>
            {[...Array(4)].map((_, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 mt-2">
                <Input placeholder="Item Kiri" />
                <Input placeholder="Item Kanan" />
              </div>
            ))}
          </div>
        );
      
      case "image":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Gambar</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-muted/50 transition-colors">
                <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Klik untuk mengunggah gambar</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, atau GIF (maks. 2MB)</p>
                <Input id="image" type="file" accept="image/*" className="hidden" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="question">Pertanyaan</Label>
              <Textarea id="question" placeholder="Contoh: Apakah nama dari bagian tumbuhan pada gambar di atas?" />
            </div>
            
            <div className="space-y-2">
              <Label>Pilihan Jawaban</Label>
              
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input placeholder={`Pilihan ${index + 1}`} />
                  {index === 0 && (
                    <Badge className="bg-green-500">Jawaban Benar</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="Bank Soal">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari soal..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleImportFromExcel}>
              <Upload className="h-4 w-4 mr-2" /> Impor
            </Button>
            <Button variant="outline" onClick={handleExportToExcel}>
              <Download className="h-4 w-4 mr-2" /> Ekspor
            </Button>
            <Dialog open={isAddQuestionDialogOpen} onOpenChange={setIsAddQuestionDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Tambah Soal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Tambah Soal Baru</DialogTitle>
                  <DialogDescription>
                    Isi informasi soal baru. Klik simpan ketika selesai.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="questionType">Jenis Soal</Label>
                    <Select 
                      value={selectedQuestionType} 
                      onValueChange={(value) => {
                        setSelectedQuestionType(value);
                        handleQuestionFormChange("type", value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis soal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple_choice">Pilihan Ganda</SelectItem>
                        <SelectItem value="essay">Esai</SelectItem>
                        <SelectItem value="matching">Menjodohkan</SelectItem>
                        <SelectItem value="image">Bergambar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Mata Pelajaran</Label>
                      <Select onValueChange={(value) => handleQuestionFormChange("subject", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih mata pelajaran" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="matematika">Matematika</SelectItem>
                          <SelectItem value="bahasa-indonesia">Bahasa Indonesia</SelectItem>
                          <SelectItem value="ipa">IPA</SelectItem>
                          <SelectItem value="ips">IPS</SelectItem>
                          <SelectItem value="bahasa-inggris">Bahasa Inggris</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="grade">Kelas</Label>
                      <Select onValueChange={(value) => handleQuestionFormChange("grade", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kelas-1">Kelas 1</SelectItem>
                          <SelectItem value="kelas-2">Kelas 2</SelectItem>
                          <SelectItem value="kelas-3">Kelas 3</SelectItem>
                          <SelectItem value="kelas-4">Kelas 4</SelectItem>
                          <SelectItem value="kelas-5">Kelas 5</SelectItem>
                          <SelectItem value="kelas-6">Kelas 6</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Question content based on type */}
                  {selectedQuestionType === "multiple_choice" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="question">Pertanyaan</Label>
                        <Textarea 
                          id="question" 
                          placeholder="Tulis pertanyaan di sini..." 
                          onChange={(e) => handleQuestionFormChange("question", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Pilihan Jawaban</Label>
                        
                        {newQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2 mt-2">
                            <Input 
                              placeholder={`Pilihan ${index + 1}`} 
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleQuestionFormChange("answer", option)}
                            >
                              {newQuestion.answer === option ? "✓ Jawaban Benar" : "Pilih Sebagai Jawaban"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {selectedQuestionType === "essay" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="question">Pertanyaan</Label>
                        <Textarea 
                          id="question" 
                          placeholder="Tulis pertanyaan di sini..." 
                          onChange={(e) => handleQuestionFormChange("question", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="answer">Kunci Jawaban (untuk referensi)</Label>
                        <Textarea 
                          id="answer" 
                          placeholder="Tulis jawaban yang diharapkan di sini..." 
                          onChange={(e) => handleQuestionFormChange("answer", e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  
                  {selectedQuestionType === "matching" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="question">Instruksi</Label>
                        <Textarea 
                          id="question" 
                          placeholder="Contoh: Jodohkan nama provinsi dengan ibukotanya" 
                          onChange={(e) => handleQuestionFormChange("question", e.target.value)}
                        />
                      </div>
                      
                      <Label>Item untuk Dijodohkan</Label>
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className="grid grid-cols-2 gap-2 mt-2">
                          <Input placeholder="Item Kiri" />
                          <Input placeholder="Item Kanan" />
                        </div>
                      ))}
                    </>
                  )}
                  
                  {selectedQuestionType === "image" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="image">Gambar</Label>
                        <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                          <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Klik untuk mengunggah gambar</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, atau GIF (maks. 2MB)</p>
                          <Input id="image" type="file" accept="image/*" className="hidden" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="question">Pertanyaan</Label>
                        <Textarea 
                          id="question" 
                          placeholder="Contoh: Apakah nama dari bagian tumbuhan pada gambar di atas?" 
                          onChange={(e) => handleQuestionFormChange("question", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Pilihan Jawaban</Label>
                        
                        {newQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2 mt-2">
                            <Input 
                              placeholder={`Pilihan ${index + 1}`} 
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleQuestionFormChange("answer", option)}
                            >
                              {newQuestion.answer === option ? "✓ Jawaban Benar" : "Pilih Sebagai Jawaban"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddQuestionDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="button" onClick={saveQuestion}>
                    Simpan Soal
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="multiple_choice">Pilihan Ganda</TabsTrigger>
            <TabsTrigger value="essay">Esai</TabsTrigger>
            <TabsTrigger value="matching">Menjodohkan</TabsTrigger>
            <TabsTrigger value="image">Bergambar</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Soal</CardTitle>
                <CardDescription>
                  Kelola semua soal yang telah dibuat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question) => (
                      <div
                        key={question.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {question.subject} • {question.grade}
                            </span>
                          </div>
                          {getQuestionTypeBadge(question.type)}
                        </div>
                        
                        <p className="mb-4 font-medium">
                          {question.question}
                        </p>
                        
                        {question.type === "multiple_choice" && (
                          <div className="ml-4 space-y-1 mb-4">
                            {question.options.map((option, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${option === question.answer ? "bg-primary border-primary text-white" : "border-gray-300"}`}>
                                  {option === question.answer && "✓"}
                                </div>
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {question.type === "essay" && (
                          <div className="ml-4 mb-4">
                            <p className="text-sm text-muted-foreground">Kunci jawaban: {question.answer}</p>
                          </div>
                        )}
                        
                        {question.type === "matching" && (
                          <div className="ml-4 space-y-1 mb-4">
                            {question.options.map((item, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <span className="font-medium">{item.left}</span>
                                <span>→</span>
                                <span>{item.right}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {question.type === "image" && (
                          <div className="ml-4 space-y-2 mb-4">
                            <div className="bg-gray-100 h-24 flex items-center justify-center rounded-md mb-2">
                              <ImagePlus className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                              {question.options.map((option, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${option === question.answer ? "bg-primary border-primary text-white" : "border-gray-300"}`}>
                                    {option === question.answer && "✓"}
                                  </div>
                                  <span>{option}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Dibuat oleh: {question.creator}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleEditQuestion(question.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
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
      </div>

      {/* Edit Question Dialog */}
      <Dialog open={isEditQuestionDialogOpen} onOpenChange={setIsEditQuestionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Soal</DialogTitle>
            <DialogDescription>
              Edit informasi soal. Klik simpan ketika selesai.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {currentQuestion && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-question">Pertanyaan</Label>
                  <Textarea 
                    id="edit-question" 
                    defaultValue={currentQuestion.question}
                  />
                </div>
                
                {currentQuestion.type === "multiple_choice" && (
                  <div className="space-y-2">
                    <Label>Pilihan Jawaban</Label>
                    {currentQuestion.options.map((option: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 mt-2">
                        <Input defaultValue={option} />
                        <Badge className={option === currentQuestion.answer ? "bg-green-500" : ""}>
                          {option === currentQuestion.answer ? "Jawaban Benar" : "Opsi"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
                
                {currentQuestion.type === "essay" && (
                  <div className="space-y-2">
                    <Label htmlFor="edit-answer">Kunci Jawaban (untuk referensi)</Label>
                    <Textarea 
                      id="edit-answer" 
                      defaultValue={currentQuestion.answer}
                    />
                  </div>
                )}
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditQuestionDialogOpen(false)}>
              Batal
            </Button>
            <Button type="button" onClick={saveEditedQuestion}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default QuestionBank;
