import ExcelJS from "exceljs";

interface HeaderCell {
  value: string;
  style?: Partial<ExcelJS.Style>;
}

// Allow simple strings or complex cells for input
type HeaderRow = (string | HeaderCell)[];

interface ExportExcelProps {
  data: any[];
  fileName?: string;
  customHeaders?: HeaderRow[];
  merges?: { s: { r: number; c: number }; e: { r: number; c: number } }[];
}

export const exportToExcel = async ({
  data,
  fileName = "export_data",
  customHeaders,
  merges,
}: ExportExcelProps) => {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // 1. Add Custom Headers if provided
  if (customHeaders && customHeaders.length > 0) {
    customHeaders.forEach((row, rowIndex) => {
      const excelRow = worksheet.getRow(rowIndex + 1);

      row.forEach((cell, colIndex) => {
        const cellValue =
          typeof cell === "object" && cell !== null ? cell.value : cell;
        const cellStyle =
          typeof cell === "object" && cell !== null ? cell.style : undefined;

        const excelCell = excelRow.getCell(colIndex + 1);
        excelCell.value = cellValue;

        // Apply Default Header Styles
        excelCell.alignment = { vertical: "middle", horizontal: "center" };
        excelCell.font = { bold: true };
        excelCell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        // Apply Custom Styles (e.g. background color)
        if (cellStyle) {
          if (cellStyle.fill) excelCell.fill = cellStyle.fill;
          if (cellStyle.font)
            excelCell.font = { ...excelCell.font, ...cellStyle.font };
          if (cellStyle.alignment)
            excelCell.alignment = {
              ...excelCell.alignment,
              ...cellStyle.alignment,
            };
        }
      });
      excelRow.commit();
    });
  }

  // 2. Add Data
  data.forEach((row) => {
    const rowValues = typeof row === "object" ? Object.values(row) : row;
    worksheet.addRow(rowValues);
  });

  // 3. Apply Merges
  // Input merges are 0-based. ExcelJS is 1-based (string refs or top,left,bottom,right).
  // Input format: { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }
  if (merges && merges.length > 0) {
    merges.forEach((merge) => {
      // Convert 0-based to 1-based
      const top = merge.s.r + 1;
      const left = merge.s.c + 1;
      const bottom = merge.e.r + 1;
      const right = merge.e.c + 1;

      worksheet.mergeCells(top, left, bottom, right);
    });
  }

  // 4. Trigger Download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
