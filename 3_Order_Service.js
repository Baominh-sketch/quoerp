function laySheetDonHangLuuAnToan() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("ĐƠN HÀNG LƯU");
  if (!sheet) {
    sheet = ss.insertSheet("ĐƠN HÀNG LƯU");
    sheet.getRange("A1:E1").setValues([["Mã số", "Loại", "Khách hàng", "Ngày lập", "Dữ liệu JSON (Phân mảnh HD)"]])
         .setBackground("#172b4d").setFontColor("white").setFontWeight("bold");
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(3, 200);
    sheet.setColumnWidth(5, 400);
  }
  return sheet;
}

function luuDonVaoAppSheet(donData) {
  try {
    if (!donData || !donData.ma) {
      throw new Error("Thiếu mã số đơn hàng!");
    }
    const sheet = laySheetDonHangLuuAnToan();
    const lastRow = sheet.getLastRow();
    let foundRow = -1;
    const maCanTim = String(donData.ma).trim();

    if (lastRow > 1) {
      const values = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
      for (let i = 0; i < values.length; i++) {
        if (String(values[i][0]).trim() === maCanTim) {
          foundRow = i + 2;
          break;
        }
      }
    }

    const jsonString = JSON.stringify(donData);
    // Chia mỗi ô 40.000 ký tự và gắn tiền tố CHUNK: để chống lỗi công thức (+, =, -) trên Sheet
    const rawChunks = jsonString.match(/[\s\S]{1,40000}/g) || [jsonString];
    const safeChunks = rawChunks.map(c => "CHUNK:" + c);

    const loaiStr = donData.mode === 'BG_EN'
      ? (donData.isPI ? 'Proforma Invoice' : 'Quote (EN)')
      : (donData.mode === 'BG_VN' ? 'Báo Giá (VN)' : 'Xuất Kho');

    const rowValues = [maCanTim, loaiStr, String(donData.khach || ""), String(donData.ngay || "")].concat(safeChunks);

    if (rowValues.length > sheet.getMaxColumns()) {
      sheet.insertColumnsAfter(sheet.getMaxColumns(), rowValues.length - sheet.getMaxColumns());
    }

    const targetRow = foundRow > -1 ? foundRow : (lastRow + 1);
    if (foundRow > -1 && sheet.getLastColumn() > 0) {
      sheet.getRange(targetRow, 1, 1, sheet.getLastColumn()).clearContent();
    }

    const targetRange = sheet.getRange(targetRow, 1, 1, rowValues.length);
    targetRange.setNumberFormat("@"); // Ép kiểu Plain Text tuyệt đối
    targetRange.setValues([rowValues]);
    SpreadsheetApp.flush();
    return { ok: true, row: targetRow };
  } catch (err) {
    throw new Error("Không thể ghi vào tab ĐƠN HÀNG LƯU: " + err.message);
  }
}

function layDanhSachDonLuuApp() {
  try {
    const sheet = laySheetDonHangLuuAnToan();
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return [];

    const lastCol = Math.max(5, sheet.getLastColumn());
    const rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getDisplayValues();
    const list = [];

    for (let i = 0; i < rows.length; i++) {
      const ma = String(rows[i][0] || "").trim();
      if (ma !== "") {
        const fullJson = rows[i]
          .slice(4)
          .filter(cell => cell !== "")
          .map(cell => String(cell).replace(/^CHUNK:/, ""))
          .join("");

        if (fullJson.startsWith("{")) {
          list.push({
            ma: ma,
            loai: String(rows[i][1] || ""),
            khach: String(rows[i][2] || ""),
            ngay: String(rows[i][3] || ""),
            json: fullJson
          });
        }
      }
    }
    return list;
  } catch (err) {
    return [];
  }
}

function xoaDonLuuApp(maSo) {
  const sheet = laySheetDonHangLuuAnToan();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;

  const maCanXoa = String(maSo).trim();
  const values = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0]).trim() === maCanXoa) {
      sheet.deleteRow(i + 2);
      return true;
    }
  }
  return false;
}