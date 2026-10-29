// HÀM GHÉP NỐI CÁC FILE HTML MODULE
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('🌟 BÁO GIÁ')
    .addItem('🚀 HỆ THỐNG Báo Giá (Hộp thoại)', 'moAppGiaoDienLon')
    .addItem('🖥️ Mở Toàn Màn Hình (Full 100%)', 'moFullManHinh')
    .addSeparator()
    .addItem('🌐 Xuất File Website (index.html)', 'xuatFileWebChuanUTF8')
    .addItem('🔄 Làm mới bộ nhớ đệm (Clear Cache)', 'xoaCacheHeThong')
    .addToUi();
}

function moAppGiaoDienLon() {
  khoiTaoHeThongDayDu();
  const html = HtmlService.createTemplateFromFile('App').evaluate()
    .setWidth(1850)
    .setHeight(980);
  SpreadsheetApp.getUi().showModalDialog(html, 'HỆ THỐNG BÁO GIÁ');
}

function moFullManHinh() {
  const url = ScriptApp.getService().getUrl();
  if (!url) {
    SpreadsheetApp.getUi().alert('⚠️ Bạn cần bấm nút "Triển khai (Deploy) -> Triển khai mới -> Ứng dụng web" 1 lần để kích hoạt link Full Màn Hình!');
    return;
  }
  const html = HtmlService.createHtmlOutput(
    `<div style="font-family:sans-serif;text-align:center;padding:20px;">
      <p style="font-size:14px;color:#334155;margin-bottom:16px;">Nhấn nút bên dưới để mở hệ thống <b>Full 100% Màn Hình</b> (không bị giới hạn khung viền của Google Sheets):</p>
      <a href="${url}" target="_blank" onclick="google.script.host.close()" 
         style="display:inline-block;background:#5e72e4;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;box-shadow:0 4px 12px rgba(94,114,228,0.4);">
         🚀 BUNG TOÀN MÀN HÌNH NGAY
      </a>
    </div>`
  ).setWidth(420).setHeight(180);
  SpreadsheetApp.getUi().showModalDialog(html, '🖥️ Chế Độ Toàn Màn Hình');
}
function doGet(e) {
  return HtmlService.createTemplateFromFile('App')
    .evaluate()
    .setTitle('Hệ Thống Báo Giá')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents);
    const args = req.args || [];
    const router = {
      'layDuLieuTongHop': () => layDuLieuTongHop(args[0]),
      'luuKhachHangMoiVaoSheet': () => luuKhachHangMoiVaoSheet(args[0]),
      'luuSanPhamMoiVaoSheet': () => luuSanPhamMoiVaoSheet(args[0]),
      'luuDonVaoAppSheet': () => luuDonVaoAppSheet(args[0]),
      'layDanhSachDonLuuApp': () => layDanhSachDonLuuApp(),
      'xoaDonLuuApp': () => xoaDonLuuApp(args[0]),
      'luuFilePDFVaoDrive': () => luuFilePDFVaoDrive(args[0], args[1], args[2]),
      'guiEmailChoKhach': () => guiEmailChoKhach(args[0], args[1], args[2], args[3], args[4])
    };
    if (!router[req.action]) throw new Error("Hàm không tồn tại: " + req.action);
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', result: router[req.action]() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function xuatFileWebChuanUTF8() {
  const ui = SpreadsheetApp.getUi();
  const res = ui.prompt(
    "🌐 XUẤT FILE WEBSITE (INDEX.HTML)",
    "Dán đường dẫn URL Web App (có đuôi /exec) của bạn vào đây:",
    ui.ButtonSet.OK_CANCEL
  );
  if (res.getSelectedButton() !== ui.Button.OK) return;
  const webAppUrl = res.getResponseText().trim();

  // Tự động gom tất cả các file <?!= include(...) ?> thành 1 file duy nhất
  let fullHtml = HtmlService.createTemplateFromFile('App').evaluate().getContent();
  fullHtml = fullHtml.replace('const GAS_WEB_APP_URL = "";', `const GAS_WEB_APP_URL = "${webAppUrl}";`);

  const utf8Bytes = Utilities.newBlob("\uFEFF" + fullHtml, "text/html;charset=utf-8").getBytes();
  const base64Html = Utilities.base64Encode(utf8Bytes);

  const dlg = HtmlService.createHtmlOutput(`
    <div style="font-family:sans-serif;text-align:center;padding:20px;">
      <h3 style="color:#2dce89;margin-top:0;">✅ Đã đóng gói tất cả Module thành công!</h3>
      <p style="font-size:13px;color:#525f7f;">File <b>index.html</b> đã tích hợp sẵn giao diện Mobile & UTF-8.</p>
      <a id="dl" href="data:text/html;charset=utf-8;base64,${base64Html}" download="index.html"
         style="display:inline-block;background:#5e72e4;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:13px;">
         📥 Tải File index.html
      </a>
      <script>window.onload=function(){document.getElementById('dl').click();};</script>
    </div>
  `).setWidth(420).setHeight(200);
  ui.showModalDialog(dlg, "Xuất Website Độc Lập");
}