
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ClassCardProps {
  classData: {
    id: string;
    name: string;
    level: string;
    students: number;
    teacher: string;
    year: string;
    isActive: boolean;
  };
  colorIndex: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onManageStudents: (id: string) => void;
}

// Pastel color backgrounds for different classes
const classColors = [
  "bg-blue-50 border-blue-200",
  "bg-green-50 border-green-200",
  "bg-yellow-50 border-yellow-200",
  "bg-purple-50 border-purple-200",
  "bg-pink-50 border-pink-200",
  "bg-orange-50 border-orange-200",
  "bg-indigo-50 border-indigo-200",
  "bg-rose-50 border-rose-200"
];

const ClassCard = ({ classData, colorIndex, onEdit, onDelete, onManageStudents }: ClassCardProps) => {
  const colorClass = classColors[colorIndex % classColors.length];
  
  return (
    <Card className={`${colorClass} transition-all hover:shadow-md`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{classData.name}</CardTitle>
          {classData.isActive ? (
            <Badge className="bg-green-500">Aktif</Badge>
          ) : (
            <Badge variant="outline">Tidak Aktif</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{classData.students} Siswa</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Wali Kelas: {classData.teacher}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Tahun Ajaran: {classData.year}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onManageStudents(classData.id)}
          className="bg-white hover:bg-gray-50"
        >
          Kelola Siswa
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onEdit(classData.id)}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(classData.id)}
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClassCard;
