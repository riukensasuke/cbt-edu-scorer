
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Result {
  id: string;
  title: string;
  subject: string;
  score: number;
  date: string;
}

interface RecentResultsProps {
  results: Result[];
  getScoreBadgeColor: (score: number) => string;
}

const RecentResults = ({ results, getScoreBadgeColor }: RecentResultsProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil Terbaru</CardTitle>
        <CardDescription>
          Nilai ujian terbaru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{result.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {result.subject} • {result.date}
                  </div>
                </div>
                <Badge className={getScoreBadgeColor(result.score)}>
                  {result.score}
                </Badge>
              </div>
              <Progress value={result.score} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/results")}
        >
          Lihat Semua Hasil
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentResults;
