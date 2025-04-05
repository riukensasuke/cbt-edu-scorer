import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Plus, Image } from "lucide-react";

interface QuestionFormProps {
  initialValues?: any;
  isEditing?: boolean;
  isViewOnly?: boolean;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ 
  initialValues = {
    type: "multiple_choice",
    subject: "",
    grade: "",
    difficulty: "medium",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
    isImage: false
  }, 
  isEditing = false,
  isViewOnly = false,
  onSubmit,
  onCancel
}) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [optionType, setOptionType] = useState(initialValues.type || "multiple_choice");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues((prev: any) => ({ ...prev, [name]: value }));
    if (name === 'type') {
      setOptionType(value);
      
      if (value === 'multiple_choice') {
        setFormValues((prev: any) => ({ 
          ...prev, 
          options: prev.options?.length ? prev.options : ["", "", "", ""] 
        }));
      } else if (value === 'true_false') {
        setFormValues((prev: any) => ({ 
          ...prev, 
          options: ["Benar", "Salah"] 
        }));
      } else if (value === 'multiple_choice_complex') {
        setFormValues((prev: any) => ({ 
          ...prev, 
          options: prev.options?.length >= 5 ? prev.options : ["", "", "", "", ""]
        }));
      } else {
        setFormValues((prev: any) => ({ ...prev, options: [] }));
      }
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formValues.options];
    newOptions[index] = value;
    setFormValues((prev: any) => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setFormValues((prev: any) => ({
      ...prev,
      options: [...prev.options, ""]
    }));
  };

  const removeOption = (index: number) => {
    const newOptions = [...formValues.options];
    newOptions.splice(index, 1);
    setFormValues((prev: any) => ({ ...prev, options: newOptions }));
  };

  const toggleImageQuestion = () => {
    setFormValues((prev: any) => ({ ...prev, isImage: !prev.isImage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const subjects = [
    "Matematika", "Bahasa Indonesia", "IPA", "IPS", "Bahasa Inggris",
    "Pendidikan Agama", "PKN", "Seni Budaya", "PJOK"
  ];

  const gradeOptions = [
    { value: "grade-1", label: "Kelas 1" },
    { value: "grade-2", label: "Kelas 2" },
    { value: "grade-3", label: "Kelas 3" },
    { value: "grade-4", label: "Kelas 4" },
    { value: "grade-5", label: "Kelas 5" },
    { value: "grade-6", label: "Kelas 6" }
  ];

  const difficultyOptions = [
    { value: "easy", label: "Mudah" },
    { value: "medium", label: "Sedang" },
    { value: "hard", label: "Sulit" }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>{isEditing ? "Edit Soal" : "Tambah Soal Baru"}</DialogTitle>
      <DialogDescription>
        {isEditing ? "Edit soal yang sudah ada" : "Tambahkan soal baru ke bank soal"}
      </DialogDescription>
      
      <div className="mt-4 space-y-4">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
            <TabsTrigger value="content">Konten Soal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Mata Pelajaran*</Label>
                <Select
                  value={formValues.subject}
                  onValueChange={(value) => handleSelectChange("subject", value)}
                  disabled={isViewOnly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih mata pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="grade">Kelas*</Label>
                <Select
                  value={formValues.grade}
                  onValueChange={(value) => handleSelectChange("grade", value)}
                  disabled={isViewOnly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((grade) => (
                      <SelectItem key={grade.value} value={grade.value}>
                        {grade.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipe Soal*</Label>
                <Select
                  value={formValues.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                  disabled={isViewOnly}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple_choice">Pilihan Ganda</SelectItem>
                    <SelectItem value="multiple_choice_complex">Pilihan Ganda Kompleks</SelectItem>
                    <SelectItem value="true_false">Benar/Salah</SelectItem>
                    <SelectItem value="essay">Essay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Tingkat Kesulitan*</Label>
                <Select
                  value={formValues.difficulty}
                  onValueChange={(value) => handleSelectChange("difficulty", value)}
                  disabled={isViewOnly}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="isImage" 
                checked={formValues.isImage}
                onCheckedChange={toggleImageQuestion}
                disabled={isViewOnly}
              />
              <Label htmlFor="isImage">Soal mengandung gambar</Label>
            </div>
            
            {formValues.isImage && (
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Image className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Unggah gambar untuk soal ini</p>
                <p className="text-xs text-muted-foreground mb-4">PNG, JPG, atau GIF hingga 5MB</p>
                <Button type="button" size="sm" variant="outline" disabled={isViewOnly}>
                  Pilih File
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="question">Pertanyaan*</Label>
              <Textarea
                id="question"
                name="question"
                value={formValues.question}
                onChange={handleChange}
                placeholder="Masukkan pertanyaan di sini..."
                rows={3}
                required
                disabled={isViewOnly}
              />
            </div>
            
            {(optionType === "multiple_choice" || optionType === "multiple_choice_complex" || optionType === "true_false") && (
              <div className="space-y-4">
                <Label>Pilihan Jawaban*</Label>
                {formValues.options?.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Pilihan ${String.fromCharCode(65 + index)}`}
                      disabled={optionType === "true_false" || isViewOnly}
                      required
                    />
                    {optionType !== "true_false" && index > 1 && !isViewOnly && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => removeOption(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                
                {(optionType === "multiple_choice" || optionType === "multiple_choice_complex") && !isViewOnly && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                    disabled={formValues.options?.length >= 6}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Tambah Pilihan
                  </Button>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="correctAnswer">Jawaban Benar*</Label>
                  
                  {optionType === "true_false" ? (
                    <RadioGroup
                      value={formValues.correctAnswer}
                      onValueChange={(value) => handleSelectChange("correctAnswer", value)}
                      className="flex space-x-4"
                      disabled={isViewOnly}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Benar" id="true" />
                        <Label htmlFor="true">Benar</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Salah" id="false" />
                        <Label htmlFor="false">Salah</Label>
                      </div>
                    </RadioGroup>
                  ) : optionType === "multiple_choice" ? (
                    <RadioGroup
                      value={formValues.correctAnswer}
                      onValueChange={(value) => handleSelectChange("correctAnswer", value)}
                      className="flex flex-col space-y-2"
                      disabled={isViewOnly}
                    >
                      {formValues.options?.map((option: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`}>{option || `Pilihan ${String.fromCharCode(65 + index)}`}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : optionType === "multiple_choice_complex" ? (
                    <div className="space-y-2">
                      <Label htmlFor="complexAnswer">
                        Untuk pilihan ganda kompleks, masukkan jawaban yang benar (pisahkan dengan koma):
                      </Label>
                      <Input
                        id="complexAnswer"
                        name="correctAnswer"
                        value={formValues.correctAnswer}
                        onChange={handleChange}
                        placeholder="Contoh: A,C,D"
                        disabled={isViewOnly}
                      />
                    </div>
                  ) : (
                    <Textarea
                      id="correctAnswer"
                      name="correctAnswer"
                      value={formValues.correctAnswer}
                      onChange={handleChange}
                      placeholder="Masukkan jawaban benar untuk essay"
                      rows={2}
                      disabled={isViewOnly}
                    />
                  )}
                </div>
              </div>
            )}
            
            {optionType === "essay" && (
              <div className="space-y-2">
                <Label htmlFor="correctAnswer">Kunci Jawaban*</Label>
                <Textarea
                  id="correctAnswer"
                  name="correctAnswer"
                  value={formValues.correctAnswer}
                  onChange={handleChange}
                  placeholder="Masukkan kunci jawaban untuk soal essay"
                  rows={3}
                  required
                  disabled={isViewOnly}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="explanation">Pembahasan (Opsional)</Label>
              <Textarea
                id="explanation"
                name="explanation"
                value={formValues.explanation}
                onChange={handleChange}
                placeholder="Masukkan pembahasan jawaban (opsional)"
                rows={3}
                disabled={isViewOnly}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          {isViewOnly ? "Kembali" : "Batal"}
        </Button>
        {!isViewOnly && (
          <Button type="submit">
            {isEditing ? "Simpan Perubahan" : "Tambah Soal"}
          </Button>
        )}
      </DialogFooter>
    </form>
  );
};

export default QuestionForm;
