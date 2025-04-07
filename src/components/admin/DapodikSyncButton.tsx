
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface DapodikSyncButtonProps {
  onSyncComplete: (newUsers: any[]) => void;
}

const DapodikSyncButton = ({ onSyncComplete }: DapodikSyncButtonProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    // Simulate sync progress
    const syncInterval = setInterval(() => {
      setSyncProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 20);
        if (newProgress >= 100) {
          clearInterval(syncInterval);
          return 100;
        }
        return newProgress;
      });
    }, 500);
    
    // Simulate sync completion after 3 seconds
    setTimeout(() => {
      clearInterval(syncInterval);
      setSyncProgress(100);
      setIsSyncing(false);
      
      // Generate mock user data
      const mockUsers = [
        { id: "u1001", name: "Budi Santoso", username: "budi.santoso", role: "teacher", status: "active" },
        { id: "u1002", name: "Dewi Lestari", username: "dewi.lestari", role: "teacher", status: "active" },
        { id: "u1003", name: "Ahmad Wahyudi", username: "ahmad.wahyudi", role: "teacher", status: "active" },
        { id: "s2001", name: "Anisa Putri", username: "anisa.putri", role: "student", status: "active" },
        { id: "s2002", name: "Dimas Pratama", username: "dimas.pratama", role: "student", status: "active" },
        { id: "s2003", name: "Fitri Handayani", username: "fitri.handayani", role: "student", status: "active" }
      ];
      
      // Pass the generated users to the parent component
      onSyncComplete(mockUsers);
      
      toast({
        title: "Sinkronisasi Berhasil",
        description: `Berhasil menyinkronkan 6 pengguna baru dari database Dapodik.`,
      });
      
      setIsDialogOpen(false);
    }, 3000);
  };

  return (
    <>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Sinkronisasi Data Dapodik
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sinkronisasi Pengguna dari Dapodik</DialogTitle>
            <DialogDescription>
              Aplikasi akan mengambil data guru dan siswa dari database Dapodik dan membuat akun pengguna secara otomatis.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm mb-2">Informasi penting:</p>
            <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
              <li>Username akan dibuat dari nama lengkap (nama.belakang)</li>
              <li>Password default adalah NIP/NISN</li>
              <li>Guru akan mendapatkan peran "teacher"</li>
              <li>Siswa akan mendapatkan peran "student"</li>
            </ul>
            
            {isSyncing && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Sedang menyinkronkan data...</span>
                  <span className="text-sm text-muted-foreground">{syncProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${syncProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              disabled={isSyncing}
            >
              Batal
            </Button>
            <Button 
              onClick={handleSync}
              disabled={isSyncing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyinkronkan...
                </>
              ) : (
                "Mulai Sinkronisasi"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DapodikSyncButton;
