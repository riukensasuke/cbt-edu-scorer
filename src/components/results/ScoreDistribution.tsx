
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ScoreDistributionProps {
  examId?: string;
  examTitle?: string;
}

// Mock data for score distribution
const generateMockDistribution = (examTitle: string) => {
  const distribution = [
    { range: '0-10', count: Math.floor(Math.random() * 3) },
    { range: '11-20', count: Math.floor(Math.random() * 4) },
    { range: '21-30', count: Math.floor(Math.random() * 5) },
    { range: '31-40', count: Math.floor(Math.random() * 7) },
    { range: '41-50', count: Math.floor(Math.random() * 8) },
    { range: '51-60', count: Math.floor(Math.random() * 10) + 2 },
    { range: '61-70', count: Math.floor(Math.random() * 15) + 5 },
    { range: '71-80', count: Math.floor(Math.random() * 20) + 8 },
    { range: '81-90', count: Math.floor(Math.random() * 12) + 3 },
    { range: '91-100', count: Math.floor(Math.random() * 6) + 1 }
  ];
  
  return {
    examTitle,
    distribution,
    totalStudents: distribution.reduce((sum, item) => sum + item.count, 0),
    avgScore: Math.floor(Math.random() * 30) + 60, // Average between 60-90
    minScore: Math.floor(Math.random() * 20) + 30, // Min between 30-50
    maxScore: Math.floor(Math.random() * 15) + 85, // Max between 85-100
    passingScore: 70,
    passingCount: Math.floor(Math.random() * 25) + 20 // Between 20-45 students passing
  };
};

const mockResultsData = {
  "exam-1": generateMockDistribution("UTS Matematika Semester 1"),
  "exam-2": generateMockDistribution("UAS Bahasa Indonesia"),
  "exam-3": generateMockDistribution("Ulangan Harian IPA"),
};

// Add more examples
for (let i = 4; i <= 10; i++) {
  mockResultsData[`exam-${i}`] = generateMockDistribution(`Ujian Sample ${i}`);
}

const ScoreDistribution: React.FC<ScoreDistributionProps> = ({ 
  examId = "exam-1", 
  examTitle = "Semua Ujian" 
}) => {
  // Get data based on examId or use combined data for all exams
  const data = examId && mockResultsData[examId as keyof typeof mockResultsData] 
    ? mockResultsData[examId as keyof typeof mockResultsData]
    : {
        examTitle: "Semua Ujian",
        distribution: [
          { range: '0-10', count: 2 },
          { range: '11-20', count: 3 },
          { range: '21-30', count: 5 },
          { range: '31-40', count: 8 },
          { range: '41-50', count: 12 },
          { range: '51-60', count: 18 },
          { range: '61-70', count: 25 },
          { range: '71-80', count: 35 },
          { range: '81-90', count: 22 },
          { range: '91-100', count: 10 }
        ],
        totalStudents: 140,
        avgScore: 68,
        minScore: 25,
        maxScore: 98,
        passingScore: 70,
        passingCount: 67
      };

  const passingPercentage = Math.round((data.passingCount / data.totalStudents) * 100);
  const notPassingCount = data.totalStudents - data.passingCount;
  const notPassingPercentage = Math.round((notPassingCount / data.totalStudents) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribusi Nilai</CardTitle>
        <CardDescription>
          {examId ? `Distribusi nilai untuk ${data.examTitle}` : "Distribusi nilai untuk semua ujian"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.distribution}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} siswa`, 'Jumlah']} />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Jumlah Siswa" 
                    fill="#8884d8" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Ringkasan Nilai</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-muted-foreground text-xs">Total Siswa</div>
                  <div className="text-2xl font-bold">{data.totalStudents}</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-muted-foreground text-xs">Nilai Rata-rata</div>
                  <div className="text-2xl font-bold">{data.avgScore}</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-muted-foreground text-xs">Nilai Terendah</div>
                  <div className="text-2xl font-bold">{data.minScore}</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-muted-foreground text-xs">Nilai Tertinggi</div>
                  <div className="text-2xl font-bold">{data.maxScore}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-sm">Status Kelulusan (KKM: {data.passingScore})</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Lulus</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{data.passingCount}</span>
                    <span className="text-xs text-muted-foreground ml-1">({passingPercentage}%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Tidak Lulus</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{notPassingCount}</span>
                    <span className="text-xs text-muted-foreground ml-1">({notPassingPercentage}%)</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${passingPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreDistribution;
