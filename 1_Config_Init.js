const SHEET_NAMES = {
  COMPANY: "THÔNG TIN CÔNG TY",
  CUSTOMER: "KHÁCH HÀNG",
  DATABASE: "DATABASE",
  HISTORY: "LỊCH SỬ",
  SAVED_ORDERS: "ĐƠN HÀNG LƯU",
  BANK: "THÔNG TIN BANK",
};

// Sửa dòng 10: Đổi V4 thành V5 để ép làm mới toàn bộ dữ liệu
const CACHE_KEY_MASTER = "ARGON_ERP_MASTER_DATA_V5";

function khoiTaoHeThongDayDu() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Trang tính Thông tin công ty & Ngân hàng
  let sheetCty = ss.getSheetByName(SHEET_NAMES.COMPANY);
  if (!sheetCty) {
    sheetCty = ss.insertSheet(SHEET_NAMES.COMPANY);
    sheetCty.getRange("A1:C1").setValues([["HẠNG MỤC CẤU HÌNH", "TIẾNG VIỆT (VN)", "TIẾNG ANH (EN)"]])
            .setBackground("#5e72e4").setFontColor("white").setFontWeight("bold");
    sheetCty.getRange("A2:C11").setValues([
      ["Tên Công ty", "CÔNG TY CỔ PHẦN GOODS LINK", "GOODS LINK JOINT STOCK COMPANY"],
      ["Địa chỉ", "157/59/2T2 Đường Bá Trạc, Phường Chánh Hưng, TP. Hồ Chí Minh", "157/59/2T2 Duong Ba Trac Str, Chanh Hung Ward, Ho Chi Minh City, Vietnam"],
      ["MST / Tax Code", "0313885287", "0313885287"],
      ["Điện thoại / Tel", "Hotline: 0909.123.456", "Tel: +8428. 36366887"],
      ["Website / Email", "Website: goodslink.vn", "Website: www.golifresh.com"],
      ["Link Logo (Drive)", "", ""],
      ["Màu chủ đạo (HEX)", "#007a3d", "#007a3d"],
      ["Tên Ngân hàng (Bank Name)", "Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)", "JOINT STOCK COMMERCIAL BANK FOR FOREIGN TRADE OF VIETNAM (VIETCOMBANK)"],
      ["Số Tài khoản (Account No)", "0071001234567 (VNĐ)", "0071371234567 (USD)"],
      ["Mã SWIFT (SWIFT Code)", "BFTVVNVX", "BFTVVNVX"]
    ]);
    sheetCty.setColumnWidth(1, 200); sheetCty.setColumnWidth(2, 380); sheetCty.setColumnWidth(3, 450);
  }

  // 2. Trang tính Khách hàng (CRM)
  let sheetKH = ss.getSheetByName(SHEET_NAMES.CUSTOMER);
  if (!sheetKH) {
    sheetKH = ss.insertSheet(SHEET_NAMES.CUSTOMER);
    sheetKH.getRange("A1:D1").setValues([["Tên Khách Hàng / Công Ty", "Mã số thuế", "Địa chỉ", "Người liên hệ / SĐT"]])
           .setBackground("#11cdef").setFontColor("white").setFontWeight("bold");
    sheetKH.getRange("A2:D4").setValues([
      ["BEIJING FLORIDA'S SUNSHINE TRADING CO,.LTD", "", "Beijing, China", "+84 906 692 919"],
      ["Công ty TNHH Qihong", "0311223344", "Quận 1, TP.HCM", "Anh Minh - 0909112233"]
    ]);
    sheetKH.setColumnWidth(1, 320); sheetKH.setColumnWidth(3, 250); sheetKH.setColumnWidth(4, 250);
  }

  // 3. Trang tính Database Sản phẩm
  let sheetData = ss.getSheetByName(SHEET_NAMES.DATABASE);
  if (!sheetData) {
    sheetData = ss.insertSheet(SHEET_NAMES.DATABASE);
    sheetData.getRange("A1:E1").setValues([["Mã SP", "Tên Sản Phẩm / Quy Cách", "ĐVT", "Đơn Giá", "Link Ảnh (Drive)"]])
             .setBackground("#5e72e4").setFontColor("white").setFontWeight("bold");
    sheetData.getRange("A2:E4").setValues([
      ["COCO01", "Easy open Young Coconut\n(Size 700 grs up/pc, Brix 6.5up)", "CTN", 9.85, ""],
      ["COCO02", "Fresh Diamond Young Coconut", "CTN", 8.50, ""]
    ]);
    sheetData.setColumnWidth(2, 380); sheetData.setColumnWidth(5, 300);
  }

  // 4. Trang tính Lịch sử xuất file
  let sheetLS = ss.getSheetByName(SHEET_NAMES.HISTORY);
  if (!sheetLS) {
    sheetLS = ss.insertSheet(SHEET_NAMES.HISTORY);
    sheetLS.getRange("A1:F1").setValues([["Thời gian", "Loại chứng từ", "Mã số", "Khách hàng", "Tổng Tiền", "Link Drive"]])
           .setBackground("#2dce89").setFontColor("white").setFontWeight("bold");
    sheetLS.setColumnWidth(1, 150); sheetLS.setColumnWidth(3, 150); sheetLS.setColumnWidth(4, 200); sheetLS.setColumnWidth(6, 300);
  }

  // 5. Trang tính Đơn hàng lưu
  getSheetDonLuu();
  // 6. Tạo trang tính DM_Bank nếu chưa có và nạp dữ liệu mẫu
  let sheetBank = ss.getSheetByName(SHEET_NAMES.BANK);
  if (!sheetBank) {
    sheetBank = ss.insertSheet(SHEET_NAMES.BANK);
    sheetBank.getRange(1, 1, 1, 2).setValues([["Tên gợi nhớ Bank", "Nội dung chi tiết T/T"]]);
    sheetBank.getRange(1, 1, 1, 2).setBackground("#5e72e4").setFontColor("white").setFontWeight("bold");
    sheetBank.getRange(2, 1, 2, 2).setValues([
      ["Vietcombank", "Bank Name: JOINT STOCK COMMERCIAL BANK FOR FOREIGN TRADE OF VIETNAM (VIETCOMBANK)\nAccount No: 0071371234567 (USD) | SWIFT Code: BFTVNVX"],
      ["Techcombank", "Bank Name: VIETNAM TECHNOCOMMERCIAL JOINT STOCK COMMERCIAL BANK\nAccount No: 19031234567890 (USD) | SWIFT Code: VTCBVNVX"]
    ]);
  }
}
function getSheetDonLuu() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAMES.SAVED_ORDERS);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES.SAVED_ORDERS);
    sheet.getRange("A1:E1").setValues([["Mã số", "Loại", "Khách hàng", "Ngày lập", "Dữ liệu JSON (Phân mảnh HD)"]])
         .setBackground("#172b4d").setFontColor("white").setFontWeight("bold");
    sheet.setColumnWidth(1, 150); sheet.setColumnWidth(3, 200); sheet.setColumnWidth(5, 400);
  }
  return sheet;
}

function onEdit(e) {
  if (!e || !e.range) return;
  const sheetName = e.range.getSheet().getName();
  if ([SHEET_NAMES.COMPANY, SHEET_NAMES.CUSTOMER, SHEET_NAMES.DATABASE, SHEET_NAMES.BANK].includes(sheetName)) {
    CacheService.getScriptCache().remove(CACHE_KEY_MASTER);
  }
}

function xoaCacheHeThong() {
  CacheService.getScriptCache().remove(CACHE_KEY_MASTER);
}