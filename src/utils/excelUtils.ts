
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Export data to Excel file
 * @param data Array of data to export
 * @param filename Filename without extension
 * @param sheetName Sheet name
 */
export const exportToExcel = (data: any[], filename: string, sheetName: string = 'Sheet1') => {
  // Create worksheet from data
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // Generate Excel file as array buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  // Create blob and save file
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${filename}.xlsx`);
  
  return true;
};

/**
 * Read data from Excel file
 * @param file File object from input
 * @returns Promise that resolves with parsed data
 */
export const readExcelFile = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const results = XLSX.utils.sheet_to_json(worksheet);
        resolve(results);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Trigger file selection dialog for importing Excel
 * @param onFileSelected Callback function when file is selected
 */
export const importExcelFile = (onFileSelected: (file: File) => void) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xlsx, .xls';
  
  input.onchange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelected(file);
    }
  };
  
  input.click();
};
