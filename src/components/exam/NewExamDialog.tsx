
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";

interface NewExamDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const NewExamDialog = ({ open: controlledOpen, onOpenChange }: NewExamDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use either controlled or internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };
  
  const [examData, setExamData] = useState({
    title: "",
    subject: "",
    grade: "",
    type: "daily",
    duration: "60",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExamData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setExamData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!examData.title || !examData.subject || !examData.grade) {
      toast({
        title: "Validasi Error",
        description: "Mohon isi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }
    
    // Success
    toast({
      title: "Ujian berhasil dibuat",
      description: "Ujian baru telah ditambahkan ke daftar ujian",
    });
    
    // Close dialog
    setOpen(false);
    
    // Navigate to questions bank
    navigate("/questions");
  };

  const handleContinueToQuestions = () => {
    // Save first
    if (!examData.title || !examData.subject || !examData.grade) {
      toast({
        title: "Validasi Error",
        description: "Mohon isi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Ujian berhasil dibuat",
      description: "Silakan pilih soal untuk ujian ini",
    });
    
    // Close dialog and navigate
    setOpen(false);
    navigate("/questions");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Buat Ujian Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Buat Ujian Baru</DialogTitle>
            <DialogDescription>
              Isi informasi dasar untuk ujian baru. Anda dapat menambahkan soal nanti.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Judul Ujian *
              </label>
              <Input
                id="title"
                name="title"
                value={examData.title}
                onChange={handleInputChange}
                placeholder="Contoh: UTS Matematika Semester 1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Mata Pelajaran *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={examData.subject}
                  onChange={handleInputChange}
                  placeholder="Contoh: Matematika"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="grade" className="text-sm font-medium">
                  Kelas *
                </label>
                <Input
                  id="grade"
                  name="grade"
                  value={examData.grade}
                  onChange={handleInputChange}
                  placeholder="Contoh: 6A"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Tipe Ujian
                </label>
                <Select 
                  value={examData.type} 
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe ujian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Ulangan Harian</SelectItem>
                    <SelectItem value="mid">Ujian Tengah Semester</SelectItem>
                    <SelectItem value="final">Ujian Akhir Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="duration" className="text-sm font-medium">
                  Durasi (menit)
                </label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={examData.duration}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Deskripsi
              </label>
              <Textarea
                id="description"
                name="description"
                value={examData.description}
                onChange={handleInputChange}
                placeholder="Deskripsi tentang ujian ini..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <div className="flex gap-2">
              <Button type="submit">Simpan</Button>
              <Button 
                type="button"
                onClick={handleContinueToQuestions}
              >
                Lanjutkan ke Pemilihan Soal
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewExamDialog;
