
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  DownloadCloud, 
  Upload, 
  Plus,
  FileSpreadsheet
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { downloadStudentData, downloadStudentTemplate, generateSampleStudentData } from "@/utils/studentDataDownload";

interface StudentActionsProps {
  classId?: string;
  className?: string;
}

const StudentActions = ({ classId, className = "All" }: StudentActionsProps) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDownloadData = () => {
    // Generate sample data and download
    const students = generateSampleStudentData(20, className);
    const success = downloadStudentData(students, className);
    
    if (success) {
      toast({
        title: "Data siswa berhasil diunduh",
        description: `File Excel data siswa kelas ${className} telah diunduh`
      });
    } else {
      toast({
        title: "Gagal mengunduh data",
        description: "Terjadi kesalahan saat mengunduh data siswa",
        variant: "destructive"
      });
    }
  };

  const handleDownloadTemplate = () => {
    const success = downloadStudentTemplate();
    
    if (success) {
      toast({
        title: "Template berhasil diunduh",
        description: "Template data siswa telah diunduh"
      });
    } else {
      toast({
        title: "Gagal mengunduh template",
        description: "Terjadi kesalahan saat mengunduh template",
        variant: "destructive"
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "File belum dipilih",
        description: "Silakan pilih file Excel terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    // Here you would process the Excel file
    // This is a mock implementation
    setTimeout(() => {
      toast({
        title: "Data siswa berhasil diunggah",
        description: `${selectedFile.name} telah berhasil diproses`
      });
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
    }, 1500);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="default" 
        className="bg-green-600 hover:bg-green-700"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Tambah Siswa
      </Button>
      
      <Button 
        variant="outline"
        onClick={handleDownloadData}
      >
        <DownloadCloud className="mr-2 h-4 w-4" />
        Unduh Data
      </Button>
      
      <Button 
        variant="outline"
        onClick={() => setIsUploadDialogOpen(true)}
      >
        <Upload className="mr-2 h-4 w-4" />
        Unggah Data
      </Button>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Siswa</DialogTitle>
            <DialogDescription>
              Fitur tambah siswa akan segera tersedia. Saat ini Anda dapat menggunakan fitur unggah data untuk menambahkan siswa secara massal.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleDownloadTemplate}
              className="w-full sm:w-auto"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Unduh Template
            </Button>
            <Button
              onClick={() => setIsAddDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unggah Data Siswa</DialogTitle>
            <DialogDescription>
              Unggah file Excel berisi data siswa. Pastikan format sesuai dengan template.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">File Excel</label>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-primary/90"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Format yang didukung: .xlsx, .xls
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleDownloadTemplate}
                className="mr-2"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Unduh Template
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUpload} disabled={!selectedFile}>
              Unggah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentActions;
