
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText } from "lucide-react";

interface ExamCardProps {
  exam: {
    id: string;
    title: string;
    subject: string;
    teacher: string;
    date: string;
    time?: string; // This is already optional
    duration?: number;
    status: string;
  };
  getBadgeForStatus: (status: string) => JSX.Element;
  showWorkButton?: boolean;
}

const ExamCard = ({ exam, getBadgeForStatus, showWorkButton = true }: ExamCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div
      key={exam.id}
      className={`border rounded-lg p-4 ${
        exam.status === "available" ? "bg-green-50 border-green-200" : 
        exam.status === "missed" ? "bg-red-50 border-red-200" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{exam.title}</h3>
        {getBadgeForStatus(exam.status)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{exam.subject}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{exam.status === "missed" ? `Batas waktu: ${exam.date}` : exam.date}</span>
        </div>
        {exam.time && (
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{exam.time}{exam.duration ? ` • ${exam.duration} menit` : ''}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Guru: {exam.teacher}
        </div>
        {showWorkButton && exam.status === "available" ? (
          <Button onClick={() => navigate(`/exam/${exam.id}`)}>
            Kerjakan
          </Button>
        ) : showWorkButton && (
          <Button variant="outline" disabled>
            Belum Tersedia
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExamCard;
