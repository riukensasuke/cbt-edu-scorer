
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, RefreshCw, Copy, Check, SearchIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockTokens = [
  {
    id: "1",
    examId: "UTS-MTK-6A",
    examTitle: "UTS Matematika Kelas 6A",
    token: "XH7D9P",
    expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    isActive: true,
    autoRefresh: true,
    refreshInterval: 5 // minutes
  },
  {
    id: "2",
    examId: "UAS-IPA-5B",
    examTitle: "UAS IPA Kelas 5B",
    token: "K9M2LR",
    expiresAt: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
    isActive: true,
    autoRefresh: true,
    refreshInterval: 5 // minutes
  },
  {
    id: "3",
    examId: "UH-BIN-4A",
    examTitle: "Ulangan Harian Bahasa Indonesia 4A",
    token: "TG56YH",
    expiresAt: new Date(Date.now() + 1800000).toISOString(), // 30 minutes from now
    isActive: false,
    autoRefresh: false,
    refreshInterval: 0
  }
];

const TokenManagement = () => {
  const [tokens, setTokens] = useState(mockTokens);
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState("active");
  const [selectedToken, setSelectedToken] = useState<typeof mockTokens[0] | null>(null);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [newToken, setNewToken] = useState({
    examId: "",
    examTitle: "",
    autoRefresh: true,
    refreshInterval: 5
  });
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  // Auto-refresh token timer
  useEffect(() => {
    // Token refresh logic
    const refreshTimers = tokens
      .filter(t => t.isActive && t.autoRefresh)
      .map(token => {
        return setInterval(() => {
          refreshToken(token.id);
        }, token.refreshInterval * 60 * 1000); // Convert minutes to milliseconds
      });
    
    return () => {
      refreshTimers.forEach(timer => clearInterval(timer));
    };
  }, [tokens]);

  const refreshToken = (tokenId: string) => {
    setTokens(prevTokens => prevTokens.map(t => {
      if (t.id === tokenId && t.isActive) {
        // Generate a new token
        const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let newTokenValue = "";
        for (let i = 0; i < 6; i++) {
          newTokenValue += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        toast({
          title: "Token Ujian Diperbaharui",
          description: `Token untuk ${t.examTitle} telah diperbaharui secara otomatis.`,
        });
        
        return {
          ...t,
          token: newTokenValue,
          expiresAt: new Date(Date.now() + (t.refreshInterval * 60 * 1000)).toISOString()
        };
      }
      return t;
    }));
  };

  const handleGenerateToken = () => {
    // Generate a random token
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let generatedToken = "";
    for (let i = 0; i < 6; i++) {
      generatedToken += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    const newTokenEntry = {
      id: (tokens.length + 1).toString(),
      examId: newToken.examId,
      examTitle: newToken.examTitle,
      token: generatedToken,
      expiresAt: new Date(Date.now() + 3600000).toISOString(), // Default 1 hour expiration
      isActive: true,
      autoRefresh: newToken.autoRefresh,
      refreshInterval: newToken.refreshInterval
    };
    
    setTokens([...tokens, newTokenEntry]);
    
    toast({
      title: "Token berhasil dibuat",
      description: `Token untuk ${newToken.examTitle} telah dibuat.`,
    });
    
    setNewToken({
      examId: "",
      examTitle: "",
      autoRefresh: true,
      refreshInterval: 5
    });
    setIsGenerateDialogOpen(false);
  };

  const handleRefreshToken = (tokenId: string) => {
    refreshToken(tokenId);
  };

  const handleDeactivateToken = (tokenId: string) => {
    setTokens(prevTokens => prevTokens.map(t => 
      t.id === tokenId ? { ...t, isActive: false } : t
    ));
    
    toast({
      title: "Token dinonaktifkan",
      description: "Token ujian telah berhasil dinonaktifkan.",
    });
  };

  const handleReactivateToken = (tokenId: string) => {
    setTokens(prevTokens => prevTokens.map(t => 
      t.id === tokenId ? { ...t, isActive: true } : t
    ));
    
    toast({
      title: "Token diaktifkan",
      description: "Token ujian telah berhasil diaktifkan kembali.",
    });
  };

  const handleCopy = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopied(token);
    
    toast({
      title: "Token disalin",
      description: "Token ujian telah disalin ke clipboard.",
    });
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  const filteredTokens = tokens.filter(token => {
    const matchesSearch = token.examTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        token.token.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = tabValue === "all" || (tabValue === "active" && token.isActive) || (tabValue === "inactive" && !token.isActive);
    
    return matchesSearch && matchesTab;
  });

  const getTimeRemaining = (expiryDate: string) => {
    const expiry = new Date(expiryDate).getTime();
    const now = Date.now();
    const diff = expiry - now;
    
    if (diff <= 0) return "Kedaluwarsa";
    
    const minutes = Math.floor((diff / 1000) / 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout title="Manajemen Token Ujian">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari token atau ujian..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
              <DialogTrigger asChild>
                <Button>Generate Token Baru</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate Token Ujian</DialogTitle>
                  <DialogDescription>
                    Buat token baru untuk ujian yang akan diselenggarakan.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="examId" className="text-sm font-medium">ID Ujian</label>
                    <Input
                      id="examId"
                      placeholder="ID Ujian"
                      value={newToken.examId}
                      onChange={(e) => setNewToken({ ...newToken, examId: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="examTitle" className="text-sm font-medium">Judul Ujian</label>
                    <Input
                      id="examTitle"
                      placeholder="Judul Ujian"
                      value={newToken.examTitle}
                      onChange={(e) => setNewToken({ ...newToken, examTitle: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="autoRefresh"
                      className="rounded border-gray-300 focus:ring-blue-500"
                      checked={newToken.autoRefresh}
                      onChange={(e) => setNewToken({ ...newToken, autoRefresh: e.target.checked })}
                    />
                    <label htmlFor="autoRefresh" className="text-sm font-medium">
                      Auto-refresh token (untuk mencegah kecurangan)
                    </label>
                  </div>

                  {newToken.autoRefresh && (
                    <div className="space-y-2">
                      <label htmlFor="refreshInterval" className="text-sm font-medium">
                        Interval refresh (menit)
                      </label>
                      <Input
                        id="refreshInterval"
                        type="number"
                        min={1}
                        max={60}
                        value={newToken.refreshInterval}
                        onChange={(e) => setNewToken({ ...newToken, refreshInterval: parseInt(e.target.value) || 5 })}
                      />
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleGenerateToken}>
                    Generate Token
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={tabValue} onValueChange={setTabValue}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="inactive">Nonaktif</TabsTrigger>
          </TabsList>
          
          <TabsContent value={tabValue} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Token Ujian</CardTitle>
                <CardDescription>
                  Kelola token untuk akses ujian oleh siswa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ujian</TableHead>
                      <TableHead>Token</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Auto-Refresh</TableHead>
                      <TableHead>Kedaluwarsa</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTokens.length > 0 ? (
                      filteredTokens.map((token) => (
                        <TableRow key={token.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{token.examTitle}</p>
                              <p className="text-xs text-muted-foreground">{token.examId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <code className="bg-muted p-1 text-lg rounded font-bold">{token.token}</code>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleCopy(token.token)}
                              >
                                {copied === token.token ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={token.isActive ? "default" : "outline"}>
                              {token.isActive ? "Aktif" : "Nonaktif"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {token.autoRefresh ? (
                              <Badge variant="success">Setiap {token.refreshInterval} menit</Badge>
                            ) : (
                              <Badge variant="outline">Tidak aktif</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{formatDate(token.expiresAt)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleRefreshToken(token.id)}
                              >
                                <RefreshCw className="h-4 w-4 mr-1" /> Refresh
                              </Button>
                              {token.isActive ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDeactivateToken(token.id)}
                                >
                                  Nonaktifkan
                                </Button>
                              ) : (
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => handleReactivateToken(token.id)}
                                >
                                  Aktifkan
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                          <p className="text-muted-foreground">Tidak ada token ditemukan</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TokenManagement;
