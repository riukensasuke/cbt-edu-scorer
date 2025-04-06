
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Info, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface BulkQuestionUploadTemplateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BulkQuestionUploadTemplate = ({ open, onOpenChange }: BulkQuestionUploadTemplateProps) => {
  const { toast } = useToast();

  const downloadTemplate = () => {
    // Example template data
    const templateData = [
      {
        question: 'Contoh soal pilihan ganda?',
        type: 'multiple_choice',
        difficulty: 'medium',
        subject: 'Matematika',
        grade: 'Kelas 5',
        option_a: 'Pilihan A',
        option_b: 'Pilihan B',
        option_c: 'Pilihan C',
        option_d: 'Pilihan D',
        correct_option: 'A',
        explanation: 'Penjelasan jawaban'
      },
      {
        question: 'Contoh soal benar/salah?',
        type: 'true_false',
        difficulty: 'easy',
        subject: 'IPA',
        grade: 'Kelas 6',
        option_a: 'Benar',
        option_b: 'Salah',
        option_c: '',
        option_d: '',
        correct_option: 'A',
        explanation: 'Penjelasan jawaban'
      }
    ];

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    
    // Set column widths
    const colWidths = [
      { wch: 40 },  // question
      { wch: 15 },  // type
      { wch: 10 },  // difficulty
      { wch: 15 },  // subject
      { wch: 10 },  // grade
      { wch: 20 },  // option_a
      { wch: 20 },  // option_b
      { wch: 20 },  // option_c
      { wch: 20 },  // option_d
      { wch: 15 },  // correct_option
      { wch: 30 },  // explanation
    ];
    
    worksheet['!cols'] = colWidths;
    
    // Add notes/descriptions as comments
    const typeCell = XLSX.utils.encode_cell({r:0, c:1});
    if(!worksheet[typeCell]) worksheet[typeCell] = {};
    if(!worksheet[typeCell].c) worksheet[typeCell].c = [];
    worksheet[typeCell].c.push({
      a: "Author",
      t: "Jenis soal: multiple_choice, true_false, essay, matching"
    });
    
    const difficultyCell = XLSX.utils.encode_cell({r:0, c:2});
    if(!worksheet[difficultyCell]) worksheet[difficultyCell] = {};
    if(!worksheet[difficultyCell].c) worksheet[difficultyCell].c = [];
    worksheet[difficultyCell].c.push({
      a: "Author",
      t: "Tingkat kesulitan: easy, medium, hard"
    });
    
    const correctOptionCell = XLSX.utils.encode_cell({r:0, c:9});
    if(!worksheet[correctOptionCell]) worksheet[correctOptionCell] = {};
    if(!worksheet[correctOptionCell].c) worksheet[correctOptionCell].c = [];
    worksheet[correctOptionCell].c.push({
      a: "Author",
      t: "Jawaban benar: A, B, C, D (sesuai pilihan)"
    });
    
    // Create a second sheet with instructions
    const instructionData = [
      { column: 'question', description: 'Teks soal (wajib diisi)' },
      { column: 'type', description: 'Jenis soal: multiple_choice, true_false, essay, matching (wajib diisi)' },
      { column: 'difficulty', description: 'Tingkat kesulitan: easy, medium, hard (wajib diisi)' },
      { column: 'subject', description: 'Mata pelajaran (wajib diisi)' },
      { column: 'grade', description: 'Kelas (wajib diisi)' },
      { column: 'option_a', description: 'Pilihan jawaban A (wajib diisi untuk multiple_choice dan true_false)' },
      { column: 'option_b', description: 'Pilihan jawaban B (wajib diisi untuk multiple_choice dan true_false)' },
      { column: 'option_c', description: 'Pilihan jawaban C (opsional untuk multiple_choice)' },
      { column: 'option_d', description: 'Pilihan jawaban D (opsional untuk multiple_choice)' },
      { column: 'correct_option', description: 'Jawaban benar: A, B, C, D (wajib diisi untuk multiple_choice dan true_false)' },
      { column: 'explanation', description: 'Penjelasan jawaban (opsional)' }
    ];
    
    const instructionSheet = XLSX.utils.json_to_sheet(instructionData);
    instructionSheet['!cols'] = [
      { wch: 15 },  // column
      { wch: 60 },  // description
    ];
    
    // Create workbook with both sheets
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template Soal');
    XLSX.utils.book_append_sheet(workbook, instructionSheet, 'Petunjuk');
    
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Create a Blob and save the file
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `Template_Soal_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Template berhasil diunduh",
      description: "Template untuk unggah soal massal telah diunduh"
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Template Unggah Soal Massal</DialogTitle>
          <DialogDescription>
            Unduh template Excel untuk mengunggah soal secara massal
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">Petunjuk Penggunaan Template</h4>
                <ul className="mt-2 text-sm text-blue-700 space-y-1 list-disc list-inside">
                  <li>Isi semua kolom yang diwajibkan sesuai petunjuk</li>
                  <li>Jangan mengubah nama kolom atau struktur file</li>
                  <li>Pastikan jenis soal sesuai dengan format yang ditentukan</li>
                  <li>Lihat sheet "Petunjuk" untuk informasi detail setiap kolom</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Format yang didukung:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Jenis Soal:</span>
                <ul className="list-disc list-inside pl-2 text-muted-foreground">
                  <li>Pilihan Ganda (multiple_choice)</li>
                  <li>Benar/Salah (true_false)</li>
                  <li>Uraian (essay)</li>
                  <li>Menjodohkan (matching)</li>
                </ul>
              </div>
              <div>
                <span className="font-medium">Tingkat Kesulitan:</span>
                <ul className="list-disc list-inside pl-2 text-muted-foreground">
                  <li>Mudah (easy)</li>
                  <li>Sedang (medium)</li>
                  <li>Sulit (hard)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={downloadTemplate} className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Unduh Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkQuestionUploadTemplate;
