
import React from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Clock, FileText, Type, GraduationCap, 
  Eye, Edit, Copy, Trash2, MoreVertical, BookOpen,
  CheckCircle, AlertCircle, ClipboardList, HelpCircle
} from "lucide-react";
import { getStatusBadge } from "@/utils/statusUtils";
import { useState } from "react";

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
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };
  
  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
    } catch (e) {
      return "";
    }
  };
  
  const getExamTypeText = (type: string) => {
    switch(type) {
      case "mid": return "UTS";
      case "final": return "UAS";
      case "daily": return "Ulangan Harian";
      default: return type;
    }
  };
  
  const getCurrentExam = () => {
    return exams.find(exam => exam.id === selectedExam) || null;
  };
  
  const showExamDetails = (examId: string) => {
    setSelectedExam(examId);
    setDetailsOpen(true);
  };

  if (!exams.length) {
    return (
      <div className="py-10 px-4 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <HelpCircle className="mx-auto h-10 w-10 text-gray-400 mb-3" />
        <p className="text-gray-500 font-medium mb-1">Tidak ada ujian ditemukan</p>
        <p className="text-gray-400 text-sm mb-4">Ujian yang Anda buat akan muncul di sini.</p>
        <Button variant="outline" onClick={() => window.document.getElementById('create-exam-btn')?.click()}>
          Buat Ujian Baru
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {exams.map((exam) => (
        <Card key={exam.id} className="hover:shadow-md transition-shadow overflow-hidden border border-gray-200">
          <CardContent className="p-0">
            <div className="p-4 md:p-5 border-b bg-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-medium text-gray-900">{exam.title}</h3>
                    {getStatusBadge(exam.status)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center">
                    <FileText className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    <span className="mr-3">{exam.subject}</span>
                    <GraduationCap className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    <span>{exam.grade}</span>
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
                        onClick={() => showExamDetails(exam.id)}
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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <Type className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-500">Tipe</div>
                    <div className="text-gray-900">{getExamTypeText(exam.type)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-500">Durasi</div>
                    <div className="text-gray-900">{exam.duration} menit</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                    <ClipboardList className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-500">Soal</div>
                    <div className="text-gray-900">{exam.questions} soal</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-500">Tanggal</div>
                    <div className="text-gray-900">{formatDate(exam.startDate)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 flex flex-col sm:flex-row justify-between bg-gray-50 gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Dibuat oleh: {exam.createdBy}</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => showExamDetails(exam.id)}
                  className="text-blue-700 border-blue-200 hover:bg-blue-50"
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  Detail
                </Button>
                {onViewQuestions && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onViewQuestions(exam.id)}
                    className="text-green-700 border-green-200 hover:bg-green-50"
                  >
                    <BookOpen className="h-3.5 w-3.5 mr-1" />
                    Soal
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEdit(exam.id)}
                  className="text-amber-700 border-amber-200 hover:bg-amber-50"
                >
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-700 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
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
      
      {/* Exam Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {getCurrentExam() && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">{getCurrentExam()?.title}</DialogTitle>
                <DialogDescription>
                  Detail lengkap ujian
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status:</span>
                  {getStatusBadge(getCurrentExam()?.status || "")}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mata Pelajaran</p>
                    <p>{getCurrentExam()?.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Kelas</p>
                    <p>{getCurrentExam()?.grade}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tipe Ujian</p>
                    <p>{getExamTypeText(getCurrentExam()?.type || "")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Durasi</p>
                    <p>{getCurrentExam()?.duration} menit</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tanggal Mulai</p>
                    <p>{formatDate(getCurrentExam()?.startDate || "")} {formatTime(getCurrentExam()?.startDate || "")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tanggal Selesai</p>
                    <p>{formatDate(getCurrentExam()?.endDate || "")} {formatTime(getCurrentExam()?.endDate || "")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Jumlah Soal</p>
                    <p>{getCurrentExam()?.questions} soal</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dibuat Oleh</p>
                    <p>{getCurrentExam()?.createdBy}</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                <div className="order-2 sm:order-1">
                  <DialogClose asChild>
                    <Button variant="outline">Tutup</Button>
                  </DialogClose>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 order-1 sm:order-2">
                  {onViewQuestions && getCurrentExam() && (
                    <Button 
                      onClick={() => {
                        setDetailsOpen(false);
                        onViewQuestions(getCurrentExam()?.id || "");
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Kelola Soal
                    </Button>
                  )}
                  {getCurrentExam() && (
                    <Button 
                      onClick={() => {
                        setDetailsOpen(false);
                        onEdit(getCurrentExam()?.id || "");
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Ujian
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamList;
