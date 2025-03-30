
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import ExamCard from "./ExamCard";

interface MissedExam {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  date: string;
  status: string;
}

interface MissedExamsProps {
  exams: MissedExam[];
  getBadgeForStatus: (status: string) => JSX.Element;
}

const MissedExams = ({ exams, getBadgeForStatus }: MissedExamsProps) => {
  return (
    <Card className="border-red-200">
      <CardHeader className="text-red-700">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5" />
          <CardTitle>Ujian Terlewatkan</CardTitle>
        </div>
        <CardDescription className="text-red-600/80">
          Mata pelajaran yang belum dikerjakan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exams.map((exam) => (
            <ExamCard 
              key={exam.id} 
              exam={exam} 
              getBadgeForStatus={getBadgeForStatus}
              showWorkButton={false}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-red-600 w-full text-center">
          Hubungi guru pengampu untuk informasi lebih lanjut
        </p>
      </CardFooter>
    </Card>
  );
};

export default MissedExams;
