
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Eye, Edit, Copy, Trash2 } from "lucide-react";
import { getStatusBadge } from "@/utils/statusUtils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ExamItemProps {
  exam: {
    id: string;
    title: string;
    subject: string;
    grade: string;
    status: string;
    type: string;
    duration: number;
    questions: number;
    startDate: string;
    endDate: string;
    createdBy: string;
  };
  onDelete?: (examId: string) => void;
  onView?: (examId: string) => void;
  onEdit?: (examId: string) => void;
}

const ExamListItem = ({ exam, onDelete, onView, onEdit }: ExamItemProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleView = () => {
    if (onView) {
      onView(exam.id);
    } else {
      toast({
        title: "Lihat ujian",
        description: `Melihat detail ujian ${exam.title}`,
      });
      navigate(`/exams/${exam.id}`);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(exam.id);
    } else {
      toast({
        title: "Edit ujian",
        description: `Mengedit ujian ${exam.title}`,
      });
      navigate(`/exams/edit/${exam.id}`);
    }
  };

  const handleCopy = () => {
    toast({
      title: "Duplikasi ujian",
      description: `Ujian ${exam.title} berhasil diduplikasi`,
    });
    // In a real app, this would create a copy in the database
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(exam.id);
    } else {
      toast({
        title: "Hapus ujian",
        description: `Ujian ${exam.title} berhasil dihapus`,
        variant: "destructive",
      });
    }
    // In a real app, this would delete the exam from the database
  };

  return (
    <div
      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{exam.title}</h3>
        {getStatusBadge(exam.status)}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{exam.subject} • {exam.grade}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{new Date(exam.startDate).toLocaleDateString('id-ID')}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{exam.duration} menit</span>
        </div>
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{exam.questions} soal</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Dibuat oleh: {exam.createdBy}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleView} title="Lihat">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleEdit} title="Edit">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleCopy} title="Duplikasi">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDelete} className="text-destructive hover:text-destructive" title="Hapus">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamListItem;
