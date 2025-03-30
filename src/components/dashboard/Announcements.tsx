
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, Trophy } from "lucide-react";

const Announcements = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengumuman</CardTitle>
        <CardDescription>
          Informasi terbaru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 border rounded-lg bg-yellow-50 border-yellow-200">
            <div className="mt-0.5">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <h4 className="font-medium">Jadwal UTS Semester Genap</h4>
              <p className="text-sm text-muted-foreground">
                UTS Semester Genap akan dilaksanakan pada tanggal 15-20 Oktober 2023. Pastikan kamu sudah mempersiapkan diri dengan baik!
              </p>
              <p className="text-xs mt-2 text-muted-foreground">
                12 Oktober 2023
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 border rounded-lg">
            <div className="mt-0.5">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Hasil Lomba Cerdas Cermat</h4>
              <p className="text-sm text-muted-foreground">
                Selamat kepada Tim A yang telah menjadi juara dalam Lomba Cerdas Cermat tingkat Kecamatan. Kalian hebat!
              </p>
              <p className="text-xs mt-2 text-muted-foreground">
                5 Oktober 2023
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Announcements;
