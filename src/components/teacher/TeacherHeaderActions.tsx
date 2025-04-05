
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Book, Users } from "lucide-react";
import TeacherTokenButton from './TeacherTokenButton';

const TeacherHeaderActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <TeacherTokenButton />
      <Button 
        variant="outline" 
        onClick={() => navigate('/questions')}
        className="flex items-center gap-2"
      >
        <Book className="h-4 w-4" />
        Bank Soal
      </Button>
      <Button 
        variant="outline" 
        onClick={() => navigate('/students')}
        className="flex items-center gap-2"
      >
        <Users className="h-4 w-4" />
        Data Siswa
      </Button>
    </div>
  );
};

export default TeacherHeaderActions;
