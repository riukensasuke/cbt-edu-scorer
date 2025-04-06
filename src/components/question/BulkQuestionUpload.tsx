
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Upload, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BulkQuestionUploadTemplate from './BulkQuestionUploadTemplate';

const BulkQuestionUpload = () => {
  const { toast } = useToast();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      console.log("File selected:", e.target.files[0].name);
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

    console.log("Uploading file:", selectedFile.name);
    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      
      toast({
        title: "Upload berhasil",
        description: `${selectedFile.name} berhasil diunggah. 15 soal telah ditambahkan.`
      });
      
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
    }, 1500);
  };

  const handleOpenTemplateDialog = () => {
    console.log("Opening template dialog");
    setIsTemplateDialogOpen(true);
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsUploadDialogOpen(true)}
        className="w-full md:w-auto"
      >
        <Upload className="mr-2 h-4 w-4" />
        Unggah Soal Massal
      </Button>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unggah Soal Massal</DialogTitle>
            <DialogDescription>
              Unggah file Excel berisi daftar soal sesuai format template
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">File Excel</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-primary/90"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Format yang didukung: .xlsx, .xls (sesuai template)
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleOpenTemplateDialog}
                className="text-sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Unduh Template
              </Button>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsUploadDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || isUploading}
              className="w-full sm:w-auto"
            >
              {isUploading ? "Mengunggah..." : "Unggah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BulkQuestionUploadTemplate 
        open={isTemplateDialogOpen} 
        onOpenChange={setIsTemplateDialogOpen} 
      />
    </>
  );
};

export default BulkQuestionUpload;
