
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

const BulkQuestionUploadTemplate = () => {
  const { toast } = useToast();

  const handleDownloadTemplate = () => {
    try {
      // Create sample data for the template
      const multipleChoiceData = [
        {
          'Type': 'multiple_choice',
          'Question': 'Contoh: Siapa presiden pertama Indonesia?',
          'Option A': 'Soekarno',
          'Option B': 'Soeharto',
          'Option C': 'Habibie',
          'Option D': 'Megawati',
          'Correct Answer': 'A',
          'Explanation': 'Soekarno adalah presiden pertama Republik Indonesia',
          'Subject': 'IPS',
          'Grade': '6',
          'Difficulty': 'easy'
        },
        {
          'Type': 'multiple_choice',
          'Question': 'Contoh: Hasil dari 7 x 8 adalah?',
          'Option A': '54',
          'Option B': '56',
          'Option C': '58',
          'Option D': '60',
          'Correct Answer': 'B',
          'Explanation': '7 x 8 = 56',
          'Subject': 'Matematika',
          'Grade': '4',
          'Difficulty': 'medium'
        }
      ];

      const trueFalseData = [
        {
          'Type': 'true_false',
          'Question': 'Contoh: Jakarta adalah ibukota Indonesia',
          'Correct Answer': 'true',
          'Explanation': 'Jakarta masih menjadi ibukota Indonesia saat ini',
          'Subject': 'IPS',
          'Grade': '5',
          'Difficulty': 'easy'
        },
        {
          'Type': 'true_false',
          'Question': 'Contoh: Air mengalir dari tempat tinggi ke tempat rendah',
          'Correct Answer': 'true',
          'Explanation': 'Sesuai dengan sifat air',
          'Subject': 'IPA',
          'Grade': '4',
          'Difficulty': 'easy'
        }
      ];

      const essayData = [
        {
          'Type': 'essay',
          'Question': 'Contoh: Jelaskan proses terjadinya hujan',
          'Correct Answer': 'Proses terjadinya hujan dimulai dari penguapan air laut, danau, dan sungai karena panas matahari. Uap air naik ke atmosfer dan mengalami kondensasi membentuk awan. Ketika awan sudah tidak dapat menampung air, maka terjadilah hujan.',
          'Explanation': '',
          'Subject': 'IPA',
          'Grade': '5',
          'Difficulty': 'medium'
        }
      ];

      const matchingData = [
        {
          'Type': 'matching',
          'Question': 'Contoh: Pasangkan ibukota dengan negaranya',
          'Option A': 'Jakarta - Indonesia',
          'Option B': 'Tokyo - Jepang',
          'Option C': 'Beijing - China',
          'Option D': 'New Delhi - India',
          'Correct Answer': 'A-Indonesia,B-Jepang,C-China,D-India',
          'Explanation': 'Jawaban berisi pasangan yang benar',
          'Subject': 'IPS',
          'Grade': '6',
          'Difficulty': 'medium'
        }
      ];

      // Create worksheet for each type of questions
      const wb = XLSX.utils.book_new();
      
      const wsMultipleChoice = XLSX.utils.json_to_sheet(multipleChoiceData);
      XLSX.utils.book_append_sheet(wb, wsMultipleChoice, 'Pilihan Ganda');
      
      const wsTrueFalse = XLSX.utils.json_to_sheet(trueFalseData);
      XLSX.utils.book_append_sheet(wb, wsTrueFalse, 'Benar Salah');
      
      const wsEssay = XLSX.utils.json_to_sheet(essayData);
      XLSX.utils.book_append_sheet(wb, wsEssay, 'Uraian');
      
      const wsMatching = XLSX.utils.json_to_sheet(matchingData);
      XLSX.utils.book_append_sheet(wb, wsMatching, 'Menjodohkan');
      
      // Add instructions sheet
      const instructionsData = [
        { A: "Petunjuk Pengisian Template Soal" },
        { A: "" },
        { A: "1. Pilihan Ganda (multiple_choice)" },
        { A: "   - Type: Isi dengan 'multiple_choice'" },
        { A: "   - Question: Tulis pertanyaan soal" },
        { A: "   - Option A, B, C, D: Isi dengan pilihan jawaban" },
        { A: "   - Correct Answer: Isi dengan huruf pilihan yang benar (A,B,C,D)" },
        { A: "   - Explanation: Isi dengan penjelasan jawaban (opsional)" },
        { A: "   - Subject: Isi dengan mata pelajaran" },
        { A: "   - Grade: Isi dengan kelas (1-6)" },
        { A: "   - Difficulty: Isi dengan tingkat kesulitan (easy, medium, hard)" },
        { A: "" },
        { A: "2. Benar Salah (true_false)" },
        { A: "   - Type: Isi dengan 'true_false'" },
        { A: "   - Question: Tulis pernyataan soal" },
        { A: "   - Correct Answer: Isi dengan 'true' atau 'false'" },
        { A: "   - Explanation: Isi dengan penjelasan jawaban (opsional)" },
        { A: "   - Subject: Isi dengan mata pelajaran" },
        { A: "   - Grade: Isi dengan kelas (1-6)" },
        { A: "   - Difficulty: Isi dengan tingkat kesulitan (easy, medium, hard)" },
        { A: "" },
        { A: "3. Uraian (essay)" },
        { A: "   - Type: Isi dengan 'essay'" },
        { A: "   - Question: Tulis pertanyaan soal" },
        { A: "   - Correct Answer: Isi dengan jawaban yang benar" },
        { A: "   - Explanation: Isi dengan penjelasan tambahan (opsional)" },
        { A: "   - Subject: Isi dengan mata pelajaran" },
        { A: "   - Grade: Isi dengan kelas (1-6)" },
        { A: "   - Difficulty: Isi dengan tingkat kesulitan (easy, medium, hard)" },
        { A: "" },
        { A: "4. Menjodohkan (matching)" },
        { A: "   - Type: Isi dengan 'matching'" },
        { A: "   - Question: Tulis instruksi soal" },
        { A: "   - Option A, B, C, D: Isi dengan pasangan yang akan dijodohkan" },
        { A: "   - Correct Answer: Isi dengan format 'A-jawaban,B-jawaban,C-jawaban,D-jawaban'" },
        { A: "   - Explanation: Isi dengan penjelasan tambahan (opsional)" },
        { A: "   - Subject: Isi dengan mata pelajaran" },
        { A: "   - Grade: Isi dengan kelas (1-6)" },
        { A: "   - Difficulty: Isi dengan tingkat kesulitan (easy, medium, hard)" },
      ];
      
      const wsInstructions = XLSX.utils.json_to_sheet(instructionsData, {skipHeader: true});
      XLSX.utils.book_append_sheet(wb, wsInstructions, 'Petunjuk');

      // Write to file and trigger download
      XLSX.writeFile(wb, 'template-soal.xlsx');

      toast({
        title: "Template berhasil diunduh",
        description: "Template untuk unggah soal massal telah diunduh",
      });
    } catch (error) {
      console.error("Error downloading template:", error);
      toast({
        title: "Gagal mengunduh template",
        description: "Terjadi kesalahan saat mengunduh template",
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      <Button onClick={handleDownloadTemplate} variant="outline" className="flex items-center">
        <Download className="mr-2 h-4 w-4" />
        Download Template Soal
      </Button>
    </div>
  );
};

export default BulkQuestionUploadTemplate;
