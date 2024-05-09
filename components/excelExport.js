import { format } from 'date-fns';
import * as XLSX from 'xlsx';

function formatDate(date) {
  return format(date, 'dd/MM/yyyy');
}

// export function exportTableToExcel(fileName, tableId) {
//   const table = document.getElementById(tableId);
//   if (table) {
//     // Clone the table to avoid modifying the original DOM
//     const clonedTable = table.cloneNode(true);

//     // Remove the last column (action column)
//     const rows = clonedTable.querySelectorAll('tr');
//     rows.forEach(row => {
//       const lastCell = row.lastElementChild;
//       if (lastCell) {
//         row.removeChild(lastCell);
//       }
//     });

//     // Format the date in each cell that contains a date
//     const dateCells = clonedTable.querySelectorAll('td[data-date]');
//     dateCells.forEach(cell => {
//       const dateValue = new Date(cell.getAttribute('data-date'));
//       cell.textContent = formatDate(dateValue);
//     });

//     const ws = XLSX.utils.table_to_sheet(clonedTable);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//     XLSX.writeFile(wb, `${fileName}.xlsx`);
//   } else {
//     console.error(`Table with ID "${tableId}" not found.`);
//   }
// }



export function exportTableToExcel(fileName, data) {
  if (data.length === 0) {
    console.error('Table data is empty.');
    return;
  }

  // Create a copy of the data to avoid modifying the original array
  const clonedData = JSON.parse(JSON.stringify(data));

  // Format date objects as "dd/mm/yyyy" strings
  data.forEach(row => {
    for (const key in row) {

      if (Object.prototype.hasOwnProperty.call(row, key)) {
        console.log(row[key]);
        if (row[key] instanceof Date) {
          console.log("qweqwemamamamamma");
          row[key] = formatDate( new Date(row[key]));
        }
      }
    }
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}