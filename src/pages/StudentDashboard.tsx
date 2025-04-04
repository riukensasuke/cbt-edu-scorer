
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import UpcomingExams from "@/components/dashboard/UpcomingExams";
import RecentResults from "@/components/dashboard/RecentResults";
import MissedExams from "@/components/dashboard/MissedExams";
import { getStatusBadge, getScoreBadgeColor } from "@/utils/statusUtils";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";

const StudentDashboard = () => {
  const { upcomingExams, recentResults, missedExams, studentName } = useStudentDashboard();
  
  // School info would come from context or state in a real app
  const schoolInfo = {
    name: "SDN Contoh 1",
    address: "Jl. Pendidikan No. 123, Jakarta",
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
          <UpcomingExams 
            exams={upcomingExams} 
            getBadgeForStatus={getStatusBadge} 
          />
          <RecentResults 
            results={recentResults} 
            getScoreBadgeColor={getScoreBadgeColor} 
          />
        </div>

        <MissedExams 
          exams={missedExams} 
          getBadgeForStatus={getStatusBadge} 
        />
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
