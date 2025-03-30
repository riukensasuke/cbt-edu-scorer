
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import UpcomingExams from "@/components/dashboard/UpcomingExams";
import RecentResults from "@/components/dashboard/RecentResults";
import MissedExams from "@/components/dashboard/MissedExams";
import Announcements from "@/components/dashboard/Announcements";
import { getStatusBadge, getScoreBadgeColor } from "@/utils/statusUtils";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";

const StudentDashboard = () => {
  const { upcomingExams, recentResults, missedExams, studentName } = useStudentDashboard();

  return (
    <DashboardLayout title="Dashboard Siswa">
      <div className="grid gap-6">
        <WelcomeCard studentName={studentName} />

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

        <Announcements />
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
