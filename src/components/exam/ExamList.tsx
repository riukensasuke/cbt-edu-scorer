
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Clock, FileText, Type, GraduationCap, 
  Eye, Edit, Copy, Trash2, MoreVertical, BookOpen 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getStatusBadge } from "@/utils/statusUtils";

interface ExamListProps {
  exams: Array<{
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
  }>;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onViewQuestions?: (id: string) => void;
}

const ExamList = ({ exams, onDelete, onView, onEdit, onDuplicate, onViewQuestions }: ExamListProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!exams.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Tidak ada ujian ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {exams.map((exam) => (
        <Card key={exam.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-5 border-b">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{exam.title}</h3>
                    {getStatusBadge(exam.status)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    ID: {exam.id}
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="end">
                    <div className="grid gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start" 
                        onClick={() => onView(exam.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Lihat Detail
                      </Button>
                      {onViewQuestions && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="justify-start" 
                          onClick={() => onViewQuestions(exam.id)}
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Lihat Soal
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start" 
                        onClick={() => onEdit(exam.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Ujian
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start" 
                        onClick={() => onDuplicate(exam.id)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Duplikasi
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="justify-start text-destructive hover:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Ujian</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus ujian "{exam.title}"? Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(exam.id)} className="bg-destructive text-destructive-foreground">
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <div className="font-medium">Mata Pelajaran</div>
                    <div>{exam.subject}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <div className="font-medium">Kelas</div>
                    <div>{exam.grade}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <div className="font-medium">Tipe</div>
                    <div>
                      {exam.type === "mid" ? "UTS" : 
                       exam.type === "final" ? "UAS" : 
                       exam.type === "daily" ? "Ulangan Harian" : exam.type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <div className="font-medium">Durasi</div>
                    <div>{exam.duration} menit</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 flex justify-between bg-muted/30">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(exam.startDate).toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onView(exam.id)}
                  className="hidden sm:flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" />
                  Lihat
                </Button>
                {onViewQuestions && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onViewQuestions(exam.id)}
                    className="hidden sm:flex items-center gap-1"
                  >
                    <BookOpen className="h-4 w-4" />
                    Soal
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEdit(exam.id)}
                  className="hidden sm:flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onDuplicate(exam.id)}
                  className="hidden sm:flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Duplikasi
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hidden sm:flex items-center gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Ujian</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus ujian "{exam.title}"? Tindakan ini tidak dapat dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(exam.id)} className="bg-destructive text-destructive-foreground">
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExamList;
