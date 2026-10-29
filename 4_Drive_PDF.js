// LƯU FILE PDF VÀO GOOGLE DRIVE PHÂN LOẠI THEO THÁNG
function luuFilePDFVaoDrive(base64Data, fileName, duLieu) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const decodedData = Utilities.base64Decode(base64Data);
  const blob = Utilities.newBlob(decodedData, 'application/pdf', fileName);
  
  let rootFolder = DriveApp.getRootFolder();
  let parentFolderName = "QUẢN LÝ BÁO GIÁ & XUẤT KHO";
  let parentFolders = rootFolder.getFoldersByName(parentFolderName);
  let mainFolder = parentFolders.hasNext() ? parentFolders.next() : rootFolder.createFolder(parentFolderName);

  let dateObj = new Date();
  let yearMonth = dateObj.getFullYear() + "-" + String(dateObj.getMonth() + 1).padStart(2, '0');
  let subFolders = mainFolder.getFoldersByName(yearMonth);
  let targetFolder = subFolders.hasNext() ? subFolders.next() : mainFolder.createFolder(yearMonth);

  const savedFile = targetFolder.createFile(blob);

  const sheetLS = ss.getSheetByName("LỊCH SỬ");
  if (sheetLS) {
    sheetLS.appendRow([new Date(), duLieu.loaiChungTu, duLieu.maSo, duLieu.khachHang, duLieu.tongCong || 0, savedFile.getUrl()]);
  }

  return savedFile.getUrl();
}

// TỰ ĐỘNG GOM TẤT CẢ CÁC FILE MODULE THÀNH 1 FILE INDEX.HTML CHUẨN UTF-8
function xuatFileWebChuanUTF8() {
  const ui = SpreadsheetApp.getUi();
  const res = ui.prompt(
    "🌐 XUẤT FILE WEBSITE (INDEX.HTML)",
    "Dán đường dẫn URL Web App (có đuôi /exec) của bạn vào đây:",
    ui.ButtonSet.OK_CANCEL
  );
  if (res.getSelectedButton() !== ui.Button.OK) return;
  const webAppUrl = res.getResponseText().trim();

  // Tự động ghép nối toàn bộ các file HTML con thành 1 bản hoàn chỉnh
  let htmlContent = HtmlService.createTemplateFromFile('App').evaluate().getContent();

  // Thay thế đường dẫn API Web App vào cầu nối
  htmlContent = htmlContent.replace("__WEB_APP_URL_PLACEHOLDER__", webAppUrl);

  // Đóng gói chuẩn UTF-8 kèm BOM (\uFEFF) chống lỗi font 100%
  const utf8Bytes = Utilities.newBlob("\uFEFF" + htmlContent, "text/html;charset=utf-8").getBytes();
  const base64Html = Utilities.base64Encode(utf8Bytes);

  const downloadDialog = HtmlService.createHtmlOutput(`
    <div style="font-family: sans-serif; text-align: center; padding: 20px;">
      <h3 style="color: #2dce89; margin-top: 0;">✅ Đã hợp nhất các Module chuẩn UTF-8!</h3>
      <p style="font-size: 13px; color: #525f7f;">File <b>index.html</b> đang tự động tải về máy. Bạn hãy kéo trực tiếp file này lên Web Hosting (không mở lại bằng Notepad).</p>
      <a id="dlLink" href="data:text/html;charset=utf-8;base64,${base64Html}" download="index.html" 
         style="display: inline-block; background: #5e72e4; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px;">
         📥 Tải lại nếu chưa tự tải
      </a>
      <script>
        window.onload = function() { document.getElementById('dlLink').click(); };
      </script>
    </div>
  `).setWidth(420).setHeight(210);

  ui.showModalDialog(downloadDialog, "Tải File Website Chuẩn UTF-8");
}
// HÀM GỬI EMAIL ĐÍNH KÈM FILE PDF CHO KHÁCH HÀNG
function guiEmailChoKhach(emailTo, subject, bodyText, base64Data, fileName) {
  try {
    if (!emailTo || !emailTo.includes("@")) {
      throw new Error("Địa chỉ email khách hàng không hợp lệ!");
    }
    const decodedData = Utilities.base64Decode(base64Data);
    const pdfBlob = Utilities.newBlob(decodedData, 'application/pdf', fileName);

    // Chuyển các ký tự xuống dòng (\n) thành thẻ ngắt dòng HTML (<br>) để giữ nguyên vẹn định dạng
    const htmlBody = `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.6;">` +
                     bodyText.replace(/\n/g, '<br>') + 
                     `</div>`;

    GmailApp.sendEmail(emailTo, subject, "", {
      attachments: [pdfBlob],
      htmlBody: htmlBody // Sử dụng htmlBody thay vì text thuần túy để giữ nguyên khoảng cách xuống dòng
    });
    return true;
  } catch (err) {
    throw new Error("Lỗi gửi mail: " + err.message);
  }
}