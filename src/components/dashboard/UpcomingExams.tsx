
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ExamCard from "./ExamCard";

interface Exam {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  date: string;
  time: string;
  duration: number;
  status: string;
}

interface UpcomingExamsProps {
  exams: Exam[];
  getBadgeForStatus: (status: string) => JSX.Element;
}

const UpcomingExams = ({ exams, getBadgeForStatus }: UpcomingExamsProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Ujian Mendatang</CardTitle>
            <CardDescription>
              Ujian yang harus kamu kerjakan
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/exams/active")}>
            Lihat Semua
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exams.map((exam) => (
            <ExamCard 
              key={exam.id} 
              exam={exam} 
              getBadgeForStatus={getBadgeForStatus} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingExams;
