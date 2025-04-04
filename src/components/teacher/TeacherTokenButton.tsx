
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Key, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TeacherTokenButton = () => {
  const { toast } = useToast();
  const [tokenGenerated, setTokenGenerated] = useState(false);
  const [token, setToken] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const classes = ['Kelas 6A', 'Kelas 6B', 'Kelas 5A', 'Kelas 5B'];
  const subjects = ['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS'];

  const generateToken = () => {
    if (!selectedClass || !selectedSubject) {
      toast({
        title: "Informasi tidak lengkap",
        description: "Pilih kelas dan mata pelajaran terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    
    // Generate random token (in real app, this would be a secure token from backend)
    const randomToken = Math.random().toString(36).substring(2, 10).toUpperCase();
    setToken(randomToken);
    setTokenGenerated(true);
    
    toast({
      title: "Token berhasil dibuat",
      description: `Token untuk ${selectedClass} - ${selectedSubject} telah dibuat`
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    setIsCopied(true);
    
    toast({
      title: "Token disalin",
      description: "Token telah disalin ke clipboard"
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <Button 
        onClick={() => setIsDialogOpen(true)} 
        className="bg-blue-600 hover:bg-blue-700 flex gap-2 items-center"
      >
        <Key className="h-4 w-4" />
        <span>Buat Token Ujian</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Buat Token Ujian</DialogTitle>
            <DialogDescription>
              Buat token untuk siswa mengakses ujian. Token akan berlaku untuk kelas dan mata pelajaran yang dipilih.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="class" className="text-right">
                Kelas
              </Label>
              <Select
                value={selectedClass}
                onValueChange={setSelectedClass}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Mata Pelajaran
              </Label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih mata pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subj) => (
                    <SelectItem key={subj} value={subj}>
                      {subj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {tokenGenerated && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="token" className="text-right">
                  Token
                </Label>
                <div className="col-span-3 flex">
                  <Input
                    id="token"
                    value={token}
                    readOnly
                    className="font-mono text-lg tracking-wider text-center"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={copyToClipboard}
                  >
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button onClick={generateToken} type="submit">
              {tokenGenerated ? "Buat Token Baru" : "Buat Token"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeacherTokenButton;
