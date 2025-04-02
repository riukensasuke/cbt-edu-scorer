
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Database, Download, Upload, Calendar, Check, Clock, Archive, 
  FileQuestion, FileText, Users, CircleDashed, FileDown, File
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { saveAs } from "file-saver";

const BackupRestore = () => {
  const { toast } = useToast();
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [restoreProgress, setRestoreProgress] = useState(0);
  const [backupFiles, setBackupFiles] = useState<File[]>([]);

  // Sample backup history
  const backupHistory = [
    {
      id: "1",
      date: "2023-10-15 14:30",
      size: "24.5 MB",
      status: "completed",
      filename: "backup_20231015_1430.zip",
      items: {
        users: 120,
        students: 95,
        teachers: 15,
        admins: 10,
        classes: 12,
        subjects: 8,
        questions: 250,
        exams: 18,
      }
    },
    {
      id: "2",
      date: "2023-10-01 09:15",
      size: "23.8 MB",
      status: "completed",
      filename: "backup_20231001_0915.zip",
      items: {
        users: 115,
        students: 90,
        teachers: 15,
        admins: 10,
        classes: 12,
        subjects: 8,
        questions: 230,
        exams: 15,
      }
    },
    {
      id: "3",
      date: "2023-09-15 11:45",
      size: "22.1 MB",
      status: "completed",
      filename: "backup_20230915_1145.zip",
      items: {
        users: 110,
        students: 85,
        teachers: 15,
        admins: 10,
        classes: 12,
        subjects: 8,
        questions: 210,
        exams: 12,
      }
    },
  ];

  const handleBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);

    // Simulate backup process
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          
          // Create a mock backup file
          const now = new Date();
          const filename = `backup_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}.zip`;
          
          toast({
            title: "Backup berhasil",
            description: `Data berhasil dibackup dengan nama file ${filename}`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleRestore = (backupId: string) => {
    setIsRestoring(true);
    setRestoreProgress(0);

    // Simulate restore process
    const interval = setInterval(() => {
      setRestoreProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRestoring(false);
          toast({
            title: "Restore berhasil",
            description: "Data berhasil dipulihkan",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleDownload = (backupId: string) => {
    const backup = backupHistory.find(b => b.id === backupId);
    if (!backup) return;
    
    // Create mock data for the backup file
    const mockData = {
      backupInfo: {
        id: backup.id,
        date: backup.date,
        items: backup.items
      }
    };
    
    // Convert to JSON blob
    const blob = new Blob([JSON.stringify(mockData, null, 2)], { type: "application/json" });
    
    // Download file using FileSaver
    saveAs(blob, backup.filename);
    
    toast({
      title: "Download berhasil",
      description: `Backup ${backup.filename} berhasil didownload`,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setBackupFiles(Array.from(files));
      toast({
        title: "File berhasil diunggah",
        description: `File ${files[0].name} siap untuk dipulihkan`,
      });
    }
  };

  return (
    <DashboardLayout title="Backup & Restore">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Backup Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" /> Backup Data
              </CardTitle>
              <CardDescription>
                Cadangkan seluruh data pada sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Backup akan menyimpan seluruh data aplikasi termasuk:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Data Pengguna</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Data Guru</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Data Siswa</span>
                </div>
                <div className="flex items-center">
                  <FileQuestion className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Bank Soal</span>
                </div>
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Data Ujian</span>
                </div>
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Hasil Ujian</span>
                </div>
              </div>
              {isBackingUp && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sedang membackup data...</span>
                    <span>{backupProgress}%</span>
                  </div>
                  <Progress value={backupProgress} className="h-2" />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleBackup} 
                disabled={isBackingUp}
                className="w-full"
              >
                {isBackingUp ? (
                  <>
                    <CircleDashed className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Buat Backup
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Restore Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Archive className="mr-2 h-5 w-5" /> Restore Data
              </CardTitle>
              <CardDescription>
                Pulihkan data dari backup yang tersimpan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Pilih file backup untuk memulihkan data sistem. Proses ini akan menimpa data yang ada saat ini.
              </p>
              
              <div className="border border-dashed rounded-md p-4 text-center">
                <input
                  type="file"
                  id="restore-file"
                  className="hidden"
                  accept=".zip,.sql,.backup"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="restore-file"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium">Klik untuk memilih file backup</span>
                  <span className="text-xs text-muted-foreground mt-1">atau drop file disini</span>
                </label>
              </div>
              
              {backupFiles.length > 0 && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <File className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm flex-1 truncate">{backupFiles[0].name}</div>
                    <Button variant="outline" size="sm" onClick={() => setBackupFiles([])}>
                      Hapus
                    </Button>
                  </div>
                </div>
              )}
              
              {isRestoring && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sedang memulihkan data...</span>
                    <span>{restoreProgress}%</span>
                  </div>
                  <Progress value={restoreProgress} className="h-2" />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleRestore("upload")} 
                disabled={isRestoring || backupFiles.length === 0}
                className="w-full"
              >
                {isRestoring ? (
                  <>
                    <CircleDashed className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Pulihkan Data
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Backup History */}
        <div>
          <h2 className="text-xl font-bold mb-4">Riwayat Backup</h2>
          <div className="grid gap-4">
            {backupHistory.map((backup) => (
              <Card key={backup.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">Backup {backup.date}</CardTitle>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Sukses</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid md:grid-cols-3 gap-y-2 gap-x-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Tanggal: {backup.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Ukuran: {backup.size}</span>
                    </div>
                    <div className="flex items-center">
                      <FileDown className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>File: {backup.filename}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Pengguna: {backup.items.users}</span>
                    </div>
                    <div className="flex items-center">
                      <FileQuestion className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Soal: {backup.items.questions}</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Ujian: {backup.items.exams}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(backup.id)}
                  >
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleRestore(backup.id)}
                    disabled={isRestoring}
                  >
                    <Upload className="h-4 w-4 mr-1" /> Restore
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BackupRestore;
