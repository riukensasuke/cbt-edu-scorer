
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import UpcomingExams from "@/components/dashboard/UpcomingExams";
import RecentResults from "@/components/dashboard/RecentResults";
import MissedExams from "@/components/dashboard/MissedExams";
import { getStatusBadge, getScoreBadgeColor } from "@/utils/statusUtils";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentDashboard = () => {
  const { upcomingExams, recentResults, missedExams, studentName, user } = useStudentDashboard();
  
  // School info would come from context or state in a real app
  const schoolInfo = {
    name: "SDN Contoh 1",
    address: "Jl. Pendidikan No. 123, Jakarta",
  };

  // Student profile info
  const studentProfile = {
    name: studentName,
    nisn: "0056782341",
    class: "6A",
    address: "Jl. Cendrawasih No. 45, Jakarta",
    parentName: "Budi Santoso",
    phoneNumber: "08123456789"
  };

  return (
    <DashboardLayout title="Dashboard Siswa">
      <div className="grid gap-6">
        <WelcomeCard 
          name={studentName} 
          role="student"
          schoolName={schoolInfo.name}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profil Siswa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-1">
                  <p className="text-sm font-medium">Nama:</p>
                  <p className="text-sm col-span-2">{studentProfile.name}</p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <p className="text-sm font-medium">NISN:</p>
                  <p className="text-sm col-span-2">{studentProfile.nisn}</p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <p className="text-sm font-medium">Kelas:</p>
                  <p className="text-sm col-span-2">{studentProfile.class}</p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <p className="text-sm font-medium">Alamat:</p>
                  <p className="text-sm col-span-2">{studentProfile.address}</p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <p className="text-sm font-medium">Wali:</p>
                  <p className="text-sm col-span-2">{studentProfile.parentName}</p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <p className="text-sm font-medium">Telepon:</p>
                  <p className="text-sm col-span-2">{studentProfile.phoneNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <UpcomingExams 
              exams={upcomingExams} 
              getBadgeForStatus={getStatusBadge} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecentResults 
            results={recentResults} 
            getScoreBadgeColor={getScoreBadgeColor} 
          />
          
          <MissedExams 
            exams={missedExams} 
            getBadgeForStatus={getStatusBadge} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
