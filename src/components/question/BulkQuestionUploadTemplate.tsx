
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Sample data for template
const sampleMultipleChoiceData = [
  {
    "No.": 1,
    "Soal": "Berapa hasil dari 5 x 5?",
    "Opsi A": "15",
    "Opsi B": "20",
    "Opsi C": "25",
    "Opsi D": "30",
    "Jawaban Benar": "C",
    "Tingkat Kesulitan": "Mudah",
    "Keterangan": "Operasi perkalian dasar"
  },
  {
    "No.": 2,
    "Soal": "Siapakah presiden pertama Indonesia?",
    "Opsi A": "Soekarno",
    "Opsi B": "Soeharto",
    "Opsi C": "Habibie",
    "Opsi D": "Megawati",
    "Jawaban Benar": "A",
    "Tingkat Kesulitan": "Sedang",
    "Keterangan": "Sejarah Indonesia"
  }
];

const sampleTrueFalseData = [
  {
    "No.": 1,
    "Soal": "Jakarta adalah ibukota Indonesia.",
    "Jawaban Benar": "Benar",
    "Tingkat Kesulitan": "Mudah",
    "Keterangan": "Geografi Indonesia"
  },
  {
    "No.": 2,
    "Soal": "Bulan memiliki cahaya sendiri.",
    "Jawaban Benar": "Salah",
    "Tingkat Kesulitan": "Mudah",
    "Keterangan": "Ilmu pengetahuan dasar"
  }
];

const sampleEssayData = [
  {
    "No.": 1,
    "Soal": "Jelaskan proses terjadinya hujan.",
    "Kunci Jawaban": "Proses terjadinya hujan dimulai dengan penguapan air dari permukaan bumi, kemudian membentuk awan di atmosfer, dan akhirnya jatuh kembali ke bumi sebagai hujan ketika terjadi kondensasi.",
    "Tingkat Kesulitan": "Sedang",
    "Keterangan": "Siklus air"
  },
  {
    "No.": 2,
    "Soal": "Sebutkan 3 contoh sumber energi terbarukan dan jelaskan keuntungannya.",
    "Kunci Jawaban": "1. Energi matahari: tidak akan habis, ramah lingkungan. 2. Energi angin: tersedia di banyak tempat, tidak menimbulkan polusi. 3. Energi air: dapat dimanfaatkan berulang kali, biaya operasional rendah.",
    "Tingkat Kesulitan": "Sulit",
    "Keterangan": "Sumber energi"
  }
];

const BulkQuestionUploadTemplate = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("multiple_choice");
  
  const handleDownloadTemplate = () => {
    let data;
    let filename;
    
    // Select data based on active tab
    if (activeTab === "multiple_choice") {
      data = sampleMultipleChoiceData;
      filename = "Template_Soal_Pilihan_Ganda.xlsx";
    } else if (activeTab === "true_false") {
      data = sampleTrueFalseData;
      filename = "Template_Soal_Benar_Salah.xlsx";
    } else if (activeTab === "essay") {
      data = sampleEssayData;
      filename = "Template_Soal_Uraian.xlsx";
    } else {
      // Default to multiple choice
      data = sampleMultipleChoiceData;
      filename = "Template_Soal_Pilihan_Ganda.xlsx";
    }
    
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template Soal");
    
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Create a Blob and save the file
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, filename);
    
    toast({
      title: "Template berhasil diunduh",
      description: `Template untuk soal ${activeTab === "multiple_choice" ? "pilihan ganda" : activeTab === "true_false" ? "benar/salah" : "uraian"} telah diunduh`,
    });
    
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Lihat Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Template Unggah Soal</DialogTitle>
          <DialogDescription>
            Berikut contoh format template untuk unggah soal. Pilih jenis soal dan unduh template yang sesuai.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex border-b space-x-4">
          <button 
            className={`px-4 py-2 ${activeTab === "multiple_choice" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("multiple_choice")}
          >
            Pilihan Ganda
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === "true_false" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("true_false")}
          >
            Benar/Salah
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === "essay" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("essay")}
          >
            Uraian
          </button>
        </div>
        
        <div className="overflow-auto max-h-96">
          {activeTab === "multiple_choice" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Soal</TableHead>
                  <TableHead>Opsi A</TableHead>
                  <TableHead>Opsi B</TableHead>
                  <TableHead>Opsi C</TableHead>
                  <TableHead>Opsi D</TableHead>
                  <TableHead>Jawaban Benar</TableHead>
                  <TableHead>Tingkat Kesulitan</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleMultipleChoiceData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row["No."]}</TableCell>
                    <TableCell>{row["Soal"]}</TableCell>
                    <TableCell>{row["Opsi A"]}</TableCell>
                    <TableCell>{row["Opsi B"]}</TableCell>
                    <TableCell>{row["Opsi C"]}</TableCell>
                    <TableCell>{row["Opsi D"]}</TableCell>
                    <TableCell>{row["Jawaban Benar"]}</TableCell>
                    <TableCell>{row["Tingkat Kesulitan"]}</TableCell>
                    <TableCell>{row["Keterangan"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {activeTab === "true_false" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Soal</TableHead>
                  <TableHead>Jawaban Benar</TableHead>
                  <TableHead>Tingkat Kesulitan</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleTrueFalseData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row["No."]}</TableCell>
                    <TableCell>{row["Soal"]}</TableCell>
                    <TableCell>{row["Jawaban Benar"]}</TableCell>
                    <TableCell>{row["Tingkat Kesulitan"]}</TableCell>
                    <TableCell>{row["Keterangan"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {activeTab === "essay" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Soal</TableHead>
                  <TableHead>Kunci Jawaban</TableHead>
                  <TableHead>Tingkat Kesulitan</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleEssayData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row["No."]}</TableCell>
                    <TableCell>{row["Soal"]}</TableCell>
                    <TableCell>{row["Kunci Jawaban"]}</TableCell>
                    <TableCell>{row["Tingkat Kesulitan"]}</TableCell>
                    <TableCell>{row["Keterangan"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={handleDownloadTemplate}>
            <Download className="mr-2 h-4 w-4" />
            Unduh Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkQuestionUploadTemplate;
