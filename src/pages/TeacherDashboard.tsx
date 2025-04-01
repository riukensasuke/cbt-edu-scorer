
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import UpcomingExams from "@/components/dashboard/UpcomingExams";
import RecentResults from "@/components/dashboard/RecentResults";
import Announcements from "@/components/dashboard/Announcements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubjectStats from "@/components/Statistics/SubjectStats";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string>("Matematika");
  
  const subjects = ["Matematika", "Bahasa Indonesia", "IPA"];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <WelcomeCard 
          name={user?.name || "Guru"} 
          role="teacher"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Statistik Mata Pelajaran</CardTitle>
                    <CardDescription>Status siswa pada ujian yang dibuat</CardDescription>
                  </div>
                  <Select 
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pilih mata pelajaran" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <SubjectStats subject={selectedSubject} />
              </CardContent>
            </Card>
            
            <UpcomingExams />
            <RecentResults />
          </div>
          
          <div className="col-span-1 space-y-6">
            <Announcements />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
