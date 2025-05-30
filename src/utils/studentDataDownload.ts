
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Interface for student data
export interface StudentData {
  id: string;
  name: string;
  nisn: string;
  class: string;
  gender?: string;
  parentName?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
}

// Function to download student data as Excel
export const downloadStudentData = (students: StudentData[], className: string = "All") => {
  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(students);
  
  // Set column widths
  const colWidths = [
    { wch: 5 },    // ID
    { wch: 25 },   // Name
    { wch: 15 },   // NISN
    { wch: 10 },   // Class
    { wch: 15 },   // Gender
    { wch: 25 },   // Parent's Name
    { wch: 15 },   // Phone
    { wch: 30 },   // Address
    { wch: 15 },   // Birth Date
  ];
  
  worksheet['!cols'] = colWidths;
  
  // Create a workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `Siswa ${className}`);
  
  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  // Create a Blob and save the file
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `Data_Siswa_${className}_${new Date().toISOString().split('T')[0]}.xlsx`);
  
  return true;
};

// Generate sample student data (for testing)
export const generateSampleStudentData = (count: number = 20, className: string = "6A"): StudentData[] => {
  const students: StudentData[] = [];
  const genders = ["Laki-laki", "Perempuan"];
  
  for (let i = 1; i <= count; i++) {
    students.push({
      id: `STD-${i.toString().padStart(3, '0')}`,
      name: `Siswa ${i}`,
      nisn: `00${Math.floor(10000000 + Math.random() * 90000000)}`,
      class: className,
      gender: genders[Math.floor(Math.random() * genders.length)],
      parentName: `Orang Tua Siswa ${i}`,
      phone: `08${Math.floor(10000000000 + Math.random() * 90000000000)}`,
      address: `Alamat Siswa ${i}, Kecamatan ABC, Kota XYZ`,
      birthDate: `${Math.floor(1 + Math.random() * 28)}-${Math.floor(1 + Math.random() * 12)}-${Math.floor(2010 + Math.random() * 5)}`
    });
  }
  
  return students;
};

// Create a function to download a template for adding students
export const downloadStudentTemplate = () => {
  // Create a sample template with empty rows
  const templateData = [
    {
      name: "",
      nisn: "",
      class: "",
      gender: "",
      parentName: "",
      phone: "",
      address: "",
      birthDate: ""
    }
  ];
  
  // Create a worksheet with header formatting
  const worksheet = XLSX.utils.json_to_sheet(templateData);
  
  // Set column widths
  const colWidths = [
    { wch: 25 },   // Name
    { wch: 15 },   // NISN
    { wch: 10 },   // Class
    { wch: 15 },   // Gender
    { wch: 25 },   // Parent's Name
    { wch: 15 },   // Phone
    { wch: 30 },   // Address
    { wch: 15 },   // Birth Date
  ];
  
  // Add header comment/notes about valid format
  const headerComment = XLSX.utils.encode_cell({r:0, c:0});
  if(!worksheet.A1) worksheet.A1 = {};
  if(!worksheet.A1.c) worksheet.A1.c = [];
  worksheet.A1.c.push({a:"Author", t:"Nama harus diisi"});
  
  // Add notes for NISN column
  const nisnComment = XLSX.utils.encode_cell({r:0, c:1});
  if(!worksheet[nisnComment]) worksheet[nisnComment] = {};
  if(!worksheet[nisnComment].c) worksheet[nisnComment].c = [];
  worksheet[nisnComment].c.push({a:"Author", t:"NISN harus berupa angka"});
  
  // Add notes for Gender column
  const genderComment = XLSX.utils.encode_cell({r:0, c:3});
  if(!worksheet[genderComment]) worksheet[genderComment] = {};
  if(!worksheet[genderComment].c) worksheet[genderComment].c = [];
  worksheet[genderComment].c.push({a:"Author", t:"Gender: Laki-laki atau Perempuan"});
  
  worksheet['!cols'] = colWidths;
  
  // Create a workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Template Siswa");
  
  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  // Create a Blob and save the file
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `Template_Data_Siswa_${new Date().toISOString().split('T')[0]}.xlsx`);
  
  return true;
};
