
import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WelcomeCardProps {
  name: string;
  role: string;
}

const WelcomeCard = ({ name, role }: WelcomeCardProps) => {
  const welcomeMessage = role === "teacher" 
    ? "Selamat datang kembali di Edu-Score. Anda memiliki ujian yang terjadwal."
    : "Selamat datang kembali di Edu-Score. Ada ujian yang tersedia untuk kamu kerjakan.";
    
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-white">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Halo, {name}! 👋</h2>
            <p className="text-muted-foreground">
              {welcomeMessage}
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border shadow-sm">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Tahun Ajaran</div>
              <div className="text-xl font-bold">2023/2024</div>
              <div className="text-xs text-muted-foreground">Semester Genap</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
