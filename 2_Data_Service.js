// ĐỌC DỮ LIỆU TỔNG HỢP (TÍCH HỢP CACHE GIÚP ĐIỆN THOẠI MỞ APP TRONG 0.2 GIÂY)
function layDuLieuTongHop(forceRefresh) {
  const cache = CacheService.getScriptCache();
  if (!forceRefresh) {
    const cachedData = cache.get(CACHE_KEY_MASTER);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (parsed.banks) return parsed; // Chỉ dùng cache nếu đã có mục banks
      } catch (e) {}
    }
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetData = ss.getSheetByName(SHEET_NAMES.DATABASE);
  const sheetCty = ss.getSheetByName(SHEET_NAMES.COMPANY);
  const sheetKH = ss.getSheetByName(SHEET_NAMES.CUSTOMER);
  
  let db = [];
  try {
    if (sheetData && sheetData.getLastRow() > 1) {
      let rawDb = sheetData.getRange(2, 1, sheetData.getLastRow() - 1, 5).getValues().filter(r => r[0] !== "");
      db = rawDb.map(row => {
        row[4] = chuanHoaLinkDrive(row[4]);
        return row;
      });
    }
  } catch(e) {}
  
  let khachHangList = [];
  try {
    if (sheetKH && sheetKH.getLastRow() > 1) {
      khachHangList = sheetKH.getRange(2, 1, sheetKH.getLastRow() - 1, 4).getValues().filter(r => r[0] !== "");
    }
  } catch(e) {}

  let config = {
    tenVN: "CÔNG TY CỔ PHẦN GOODS LINK", tenEN: "GOODS LINK JOINT STOCK COMPANY",
    diaChiVN: "", diaChiEN: "", mst: "", telVN: "", telEN: "", webVN: "", webEN: "",
    logo: "", mau: "#007a3d",
    bankNameEN: "JOINT STOCK COMMERCIAL BANK FOR FOREIGN TRADE OF VIETNAM (VIETCOMBANK)",
    bankAccEN: "0071371234567 (USD)",
    swiftCode: "BFTVVNVX"
  };

  try {
    if (sheetCty && sheetCty.getLastRow() > 1) {
      const ctyData = sheetCty.getRange(2, 1, sheetCty.getLastRow() - 1, 3).getValues();
      ctyData.forEach(row => {
        let key = row[0] ? row[0].toString().trim() : "";
        let valVN = row[1], valEN = row[2];
        if (key.includes("Tên Công ty")) { config.tenVN = valVN; config.tenEN = valEN; }
        if (key.includes("Địa chỉ")) { config.diaChiVN = valVN; config.diaChiEN = valEN; }
        if (key.includes("MST")) { config.mst = valVN; }
        if (key.includes("Điện thoại") || key.includes("Tel")) { config.telVN = valVN; config.telEN = valEN; }
        if (key.includes("Website") || key.includes("Email")) { config.webVN = valVN; config.webEN = valEN; }
        if (key.includes("Logo")) { config.logo = chuanHoaLinkDrive(valVN || valEN); }
        if (key.includes("Màu")) { config.mau = valVN || valEN; }
        if (key.includes("Bank Name") || key.includes("Tên Ngân hàng")) { config.bankNameEN = valEN || valVN; }
        if (key.includes("Account No") || key.includes("Số Tài khoản")) { config.bankAccEN = valEN || valVN; }
        if (key.includes("SWIFT")) { config.swiftCode = valEN || valVN; }
      });
    }
  } catch(e) {}
  
  const payload = { 
    db: db, 
    khachHang: khachHangList, 
    config: config,
    banks: layDanhSachBank() 
  };
  
  try {
    const strPayload = JSON.stringify(payload);
    if (strPayload.length < 95000) {
      cache.put(CACHE_KEY_MASTER, strPayload, 600);
    }
  } catch(e) {}

  return payload;
}

// LƯU KHÁCH HÀNG MỚI TỪ ĐIỆN THOẠI / PC VÀO SHEET
function luuKhachHangMoiVaoSheet(khObj) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheetKH = ss.getSheetByName(SHEET_NAMES.CUSTOMER);
    if (!sheetKH) {
      khoiTaoHeThongDayDu();
      sheetKH = ss.getSheetByName(SHEET_NAMES.CUSTOMER);
    }
    sheetKH.appendRow([khObj.ten, "", "", khObj.lienHe]);
    xoaCacheHeThong();
    return sheetKH.getRange(2, 1, sheetKH.getLastRow() - 1, 4).getValues().filter(r => r[0] !== "");
  } finally {
    lock.releaseLock();
  }
}

// LƯU SẢN PHẨM MỚI TỪ ĐIỆN THOẠI / PC VÀO DATABASE
function luuSanPhamMoiVaoSheet(spObj) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheetData = ss.getSheetByName(SHEET_NAMES.DATABASE);
    if (!sheetData) {
      khoiTaoHeThongDayDu();
      sheetData = ss.getSheetByName(SHEET_NAMES.DATABASE);
    }
    let maSP = spObj.ma ? spObj.ma.trim() : ("SP0" + sheetData.getLastRow());
    let anhSafe = (spObj.anh && spObj.anh.length < 45000) ? spObj.anh : "";
    sheetData.appendRow([maSP, spObj.ten, spObj.dvt, spObj.gia, anhSafe]);
    xoaCacheHeThong();
    
    let rawDb = sheetData.getRange(2, 1, sheetData.getLastRow() - 1, 5).getValues().filter(r => r[0] !== "");
    return rawDb.map(row => {
      row[4] = chuanHoaLinkDrive(row[4]);
      return row;
    });
  } finally {
    lock.releaseLock();
  }
}

function chuanHoaLinkDrive(rawLink) {
  let link = rawLink ? rawLink.toString().trim() : "";
  if (link.includes("drive.google.com")) {
    let match = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) return "https://drive.google.com/uc?export=view&id=" + match[1];
  }
  return link;
} // <-- ĐÃ BỔ SUNG DẤU ĐÓNG NGOẶC CHUẨN XÁC TẠI ĐÂY

function layDanhSachBank() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAMES.BANK || "THÔNG TIN BANK");
    if (!sheet || sheet.getLastRow() < 2) return [];
    return sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues()
      .filter(r => r[0] && String(r[0]).trim() !== "")
      .map(r => ({ ten: String(r[0]).trim(), chiTiet: String(r[1] || "").trim() }));
  } catch (e) {
    return [];
  }
}