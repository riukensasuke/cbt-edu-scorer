
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock data for exam tokens
const mockTokens = [
  { id: "1", examName: "UTS Matematika Semester Ganjil", token: "MTH6A123", validUntil: "2023-10-15 10:30", status: "active" },
  { id: "2", examName: "UTS Bahasa Indonesia", token: "BIN5B456", validUntil: "2023-10-20 12:00", status: "expired" },
  { id: "3", examName: "Ulangan Harian IPA", token: "IPA4A789", validUntil: "2023-10-25 09:15", status: "scheduled" },
  { id: "4", examName: "Ujian Akhir Semester IPS", token: "IPS3B101", validUntil: "2023-10-30 11:00", status: "scheduled" },
];

const TokenManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const filteredTokens = mockTokens.filter(token => 
    token.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.token.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateToken = () => {
    toast({
      title: "Token Dibuat",
      description: "Token ujian baru berhasil dibuat",
    });
  };

  const regenerateToken = (id: string) => {
    toast({
      title: "Token Diperbarui",
      description: "Token ujian berhasil diperbarui",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Aktif</Badge>;
      case "expired":
        return <Badge variant="destructive">Kedaluwarsa</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Terjadwal</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  return (
    <DashboardLayout title="Manajemen Token Ujian">
      <div className="space-y-6">
        <div className="flex justify-between flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari token ujian..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={generateToken}>
            Buat Token Baru
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Token Ujian</CardTitle>
            <CardDescription>
              Kelola token untuk mencegah kecurangan saat ujian berlangsung
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">No</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Nama Ujian</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Token</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Berlaku Hingga</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredTokens.map((token, index) => (
                    <tr key={token.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{index + 1}</td>
                      <td className="p-4 align-middle">{token.examName}</td>
                      <td className="p-4 align-middle">
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                          {token.token}
                        </code>
                      </td>
                      <td className="p-4 align-middle flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {token.validUntil}
                      </td>
                      <td className="p-4 align-middle">{getStatusBadge(token.status)}</td>
                      <td className="p-4 align-middle">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => regenerateToken(token.id)}
                          className="flex items-center"
                        >
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Perbarui
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredTokens.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Tidak ada token ditemukan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TokenManagement;
