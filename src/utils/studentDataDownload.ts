
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useToast } from "@/hooks/use-toast";

// Sample student data
const sampleStudents = [
  {
    id: "1",
    name: "Ahmad Rizki",
    nisn: "1234567890",
    class: "6A",
    gender: "L",
    address: "Jl. Merdeka No. 10, Jakarta",
    parentName: "Budi Santoso",
    parentPhone: "081234567890"
  },
  {
    id: "2",
    name: "Siti Nuraini",
    nisn: "1234567891",
    class: "6A",
    gender: "P",
    address: "Jl. Pahlawan No. 15, Jakarta",
    parentName: "Ahmad Darmawan",
    parentPhone: "081234567891"
  },
  {
    id: "3",
    name: "Budi Pratama",
    nisn: "1234567892",
    class: "6A",
    gender: "L",
    address: "Jl. Sudirman No. 20, Jakarta",
    parentName: "Darmawan Susanto",
    parentPhone: "081234567892"
  },
  {
    id: "4",
    name: "Dina Fitriani",
    nisn: "1234567893",
    class: "6A",
    gender: "P",
    address: "Jl. Gatot Subroto No. 25, Jakarta",
    parentName: "Eko Santoso",
    parentPhone: "081234567893"
  },
  {
    id: "5",
    name: "Eko Prasetyo",
    nisn: "1234567894",
    class: "6A",
    gender: "L",
    address: "Jl. Thamrin No. 30, Jakarta",
    parentName: "Faisal Ahmad",
    parentPhone: "081234567894"
  }
];

export const downloadStudentData = (classId?: string, className?: string) => {
  const { toast } = useToast();

  try {
    // Create a workbook
    const wb = XLSX.utils.book_new();
    
    // Create worksheet with student data (filtering by class if provided)
    let filteredStudents = sampleStudents;
    if (classId) {
      // In a real app, you would filter based on classId
      // For demo, we'll just use the sample data
      filteredStudents = sampleStudents;
    }
    
    // Convert data to a format suitable for XLSX
    const wsData = filteredStudents.map(student => ({
      'NISN': student.nisn,
      'Nama Lengkap': student.name,
      'Kelas': student.class,
      'Jenis Kelamin': student.gender === 'L' ? 'Laki-laki' : 'Perempuan',
      'Alamat': student.address,
      'Nama Orang Tua': student.parentName,
      'No. Telepon Orang Tua': student.parentPhone
    }));
    
    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(wsData);
    
    // Set column widths for better readability
    const colWidths = [
      { wch: 12 }, // NISN
      { wch: 25 }, // Nama Lengkap
      { wch: 8 }, // Kelas
      { wch: 15 }, // Jenis Kelamin
      { wch: 30 }, // Alamat
      { wch: 25 }, // Nama Orang Tua
      { wch: 20 }, // No. Telepon Orang Tua
    ];
    
    ws['!cols'] = colWidths;
    
    // Add the worksheet to the workbook
    const sheetName = className ? `Siswa ${className}` : 'Data Siswa';
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    
    // Generate Excel file
    const fileName = className ? `data-siswa-${className.toLowerCase()}.xlsx` : 'data-siswa.xlsx';
    XLSX.writeFile(wb, fileName);

    return true;
  } catch (error) {
    console.error("Error downloading student data:", error);
    return false;
  }
};

export default downloadStudentData;
