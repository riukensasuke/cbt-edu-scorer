
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const NewExamDialog = () => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Buat Ujian Baru</DialogTitle>
        <DialogDescription>
          Isi informasi ujian baru. Klik simpan ketika selesai.
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">Nama Ujian</label>
          <Input id="title" placeholder="Contoh: UTS Matematika Kelas 6" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">Mata Pelajaran</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih mata pelajaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matematika">Matematika</SelectItem>
                <SelectItem value="bahasa-indonesia">Bahasa Indonesia</SelectItem>
                <SelectItem value="ipa">IPA</SelectItem>
                <SelectItem value="ips">IPS</SelectItem>
                <SelectItem value="bahasa-inggris">Bahasa Inggris</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="grade" className="text-sm font-medium">Kelas</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kelas-1">Kelas 1</SelectItem>
                <SelectItem value="kelas-2">Kelas 2</SelectItem>
                <SelectItem value="kelas-3">Kelas 3</SelectItem>
                <SelectItem value="kelas-4">Kelas 4</SelectItem>
                <SelectItem value="kelas-5">Kelas 5</SelectItem>
                <SelectItem value="kelas-6">Kelas 6</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">Jenis Ujian</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uts">UTS</SelectItem>
                <SelectItem value="uas">UAS</SelectItem>
                <SelectItem value="ulangan">Ulangan Harian</SelectItem>
                <SelectItem value="latihan">Latihan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="duration" className="text-sm font-medium">Durasi (menit)</label>
            <Input id="duration" type="number" placeholder="90" min="5" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="startDate" className="text-sm font-medium">Tanggal Mulai</label>
            <Input id="startDate" type="date" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="endDate" className="text-sm font-medium">Tanggal Selesai</label>
            <Input id="endDate" type="date" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="startTime" className="text-sm font-medium">Waktu Mulai</label>
            <Input id="startTime" type="time" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="endTime" className="text-sm font-medium">Waktu Selesai</label>
            <Input id="endTime" type="time" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Status Ujian</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Terjadwal</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Batal</Button>
        </DialogClose>
        <Button type="submit">
          Lanjutkan ke Pemilihan Soal
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default NewExamDialog;
