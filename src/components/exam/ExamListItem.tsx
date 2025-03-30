
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Eye, Edit, Copy, Trash2 } from "lucide-react";
import { getStatusBadge } from "@/utils/statusUtils";

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
}

const ExamListItem = ({ exam }: ExamItemProps) => {
  return (
    <div
      key={exam.id}
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
          <Button variant="outline" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamListItem;
