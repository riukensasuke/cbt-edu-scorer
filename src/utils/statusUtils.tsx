
import React from "react";
import { Badge } from "@/components/ui/badge";

// Get exam status badge
export const getStatusBadge = (status: string) => {
  switch (status) {
    case "available":
      return <Badge className="bg-green-500">Tersedia</Badge>;
    case "upcoming":
      return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Akan Datang</Badge>;
    case "missed":
      return <Badge className="bg-red-500">Terlewatkan</Badge>;
    default:
      return <Badge variant="outline">Tidak Tersedia</Badge>;
  }
};

// Get score badge color
export const getScoreBadgeColor = (score: number) => {
  if (score >= 90) return "bg-green-500";
  if (score >= 80) return "bg-blue-500";
  if (score >= 70) return "bg-yellow-500";
  return "bg-red-500";
};
