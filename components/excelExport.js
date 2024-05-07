import * as XLSX from 'xlsx';

export function exportTableToExcel(fileName, tableId) {
    const table = document.getElementById(tableId);
    if (table) {
      // Clone the table to avoid modifying the original DOM
      const clonedTable = table.cloneNode(true);
  
      // Remove the last column (action column)
      const rows = clonedTable.querySelectorAll('tr');
      rows.forEach(row => {
        const lastCell = row.lastElementChild;
        if (lastCell) {
          row.removeChild(lastCell);
        }
      });
  
      const ws = XLSX.utils.table_to_sheet(clonedTable);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    } else {
      console.error(`Table with ID "${tableId}" not found.`);
    }
  }