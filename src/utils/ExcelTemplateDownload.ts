
import { exportToExcel } from '@/utils/excelUtils';

export const downloadQuestionTemplate = () => {
  // Sample template data
  const templateData = [
    {
      question: "Contoh Soal Pilihan Ganda",
      type: "multiple_choice",
      difficulty: "medium",
      subject: "Matematika",
      grade: "Kelas 6",
      options: "A: Jawaban 1; B: Jawaban 2; C: Jawaban 3; D: Jawaban 4",
      correctAnswer: "A",
      explanation: "Penjelasan mengapa jawaban A benar"
    },
    {
      question: "Contoh Soal Benar/Salah",
      type: "true_false",
      difficulty: "easy",
      subject: "IPA",
      grade: "Kelas 5",
      options: "Benar; Salah",
      correctAnswer: "Benar",
      explanation: "Penjelasan mengapa jawaban Benar adalah benar"
    },
    {
      question: "Contoh Soal Essay",
      type: "essay",
      difficulty: "hard",
      subject: "Bahasa Indonesia",
      grade: "Kelas 4",
      options: "",
      correctAnswer: "Kriteria penilaian: kelengkapan argumen, tata bahasa, kesesuaian dengan tema",
      explanation: "Panduan penilaian untuk guru"
    }
  ];
  
  // Export the template
  exportToExcel(templateData, 'template-soal-ujian', 'Template Soal');
  
  return true;
};
