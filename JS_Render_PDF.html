<script>
  const _el = id => document.getElementById(id);
  const _show = (id, disp = 'block') => { const e = _el(id); if (e) e.style.display = disp; };
  const _txt = (id, val) => { const e = _el(id); if (e) e.innerText = val; };

  function chuyenTabMobile(tab) {
    const isForm = tab === 'FORM';
    document.querySelector('.panel-left').style.display = isForm ? 'flex' : 'none';
    document.querySelector('.panel-right').style.display = isForm ? 'none' : 'flex';
    _el('mobBtnForm').className = isForm ? 'mob-nav-btn active' : 'mob-nav-btn';
    _el('mobBtnPreview').className = isForm ? 'mob-nav-btn' : 'mob-nav-btn active';
    if (!isForm) { updatePreview(); renderTable(); }
  }

  function doiGiaoDienPDF(themeClass) { _el('a4Paper').className = 'a4-paper ' + themeClass; }
  function doiTyLeZoom(scaleVal) { _el('a4Wrapper').style.transform = `scale(${scaleVal})`; }
function doiMauChungTu(hexColor) {
    document.documentElement.style.setProperty('--doc-primary', hexColor);
  }

  // Khi chấm màu trên bảng màu -> Cập nhật sang ô gõ text HEX & đổi màu tờ A4 ngay
  function dongBoMauTuPicker(val) {
    const txt = document.getElementById('liveColorHex');
    if (txt) txt.value = val.toUpperCase();
    doiMauChungTu(val);
  }

  // Khi gõ/paste mã HEX vào ô text -> Cập nhật sang nút tròn màu & đổi màu tờ A4 ngay
  function dongBoMauTuText(val) {
    let hex = val.trim();
    if (!hex.startsWith('#')) hex = '#' + hex;
    // Kiểm tra mã màu HEX hợp lệ (dạng #FFF hoặc #FFFFFF)
    if (/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
      const picker = document.getElementById('liveColorPicker');
      if (picker) picker.value = hex;
      doiMauChungTu(hex);
    }
  }
  function loadLogo(input) {
    if (input.files && input.files[0]) {
      compressImageFile(input.files[0], 1000, 0.92, url => { _el('sysLogo').src = url; _show('sysLogo', 'block'); });
    }
  }

  function loadSpImage(input) {
    if (input.files && input.files[0]) {
      compressImageFile(input.files[0], 1000, 0.92, url => {
        currentSpImageBase64 = url; _el('spPreviewLeft').src = url; _show('spPreviewLeft', 'block');
      });
    }
  }

  function loadWatermark(input) {
    if (input.files && input.files[0]) {
      compressImageFile(input.files[0], 1200, 0.88, url => {
        currentWatermarkBase64 = url; _el('watermarkImg').src = url;
        _show('watermarkImg', 'block'); _show('btnXoaWm', 'inline-block');
      });
    }
  }

  function xoaWatermark() {
    currentWatermarkBase64 = ""; _show('watermarkImg', 'none'); _show('btnXoaWm', 'none');
  }

  function taoDonMoi() {
    if (gioHang.length > 0 && !confirm("Làm mới toàn bộ thông tin để tạo đơn mới?")) return;
    ['inKhach','inLienHe','inDiaDiemXK','inBienSoXe','inPreparedBy','inValidUntil','inDieuKhoan','inEnNote','inPaymentTerm'].forEach(id => {
      if (_el(id)) _el(id).value = "";
    });
    gioHang = []; xoaDonNháp(); updatePreview(); renderTable(); renderCartMini();
  }

  function batTatCheDoPI() {
    const isPI = _el('chkIsPI').checked;
    _show('divQuoteTitleDropdown', isPI ? 'none' : 'block');
    _show('divBankInfoInput', isPI ? 'block' : 'none');
    _txt('lblMaType', isPI ? "PI No:" : "Quote No:");
    const ma = _el('inMa').value;
    if (isPI && ma.startsWith("QUO-")) _el('inMa').value = ma.replace("QUO-", "PI-");
    else if (!isPI && ma.startsWith("PI-")) _el('inMa').value = ma.replace("PI-", "QUO-");
    updatePreview(); renderTable();
  }

  function apDungDuLieuDon(d) {
    if (d.pdfTheme) { _el('pdfThemeSelect').value = d.pdfTheme; doiGiaoDienPDF(d.pdfTheme); }
    if (d.titleEN) _el('inTitleEN').value = d.titleEN;
    _el('chkIsPI').checked = !!d.isPI;
    if (d.volumeType) _el('inVolumeType').value = d.volumeType;
    _el('chkShowImage').checked = d.showImage !== undefined ? d.showImage : true;
    _el('chkShowTotal').checked = d.showTotal !== undefined ? d.showTotal : true;
    _el('chkShowWords').checked = d.showWords !== undefined ? d.showWords : true;
    if (d.bankInfo) _el('inBankInfo').value = d.bankInfo;

    doiCheDo(d.mode || 'BG_VN');
    if (_el('inCurrency')) _el('inCurrency').value = d.currency || (d.mode === 'BG_EN' ? 'USD' : 'VND');

    currentWatermarkBase64 = d.watermark || "";
    _el('watermarkImg').src = currentWatermarkBase64;
    _show('watermarkImg', currentWatermarkBase64 ? 'block' : 'none');
    _show('btnXoaWm', currentWatermarkBase64 ? 'inline-block' : 'none');

    const mapVal = {
      inKhach: d.khach, inLienHe: d.lienHe, inDiaDiemXK: d.diaDiemXK, inBienSoXe: d.bienSoXe,
      inMa: d.ma, inNgay: d.ngay, inPreparedBy: d.preparedBy, inValidUntil: d.validUntil,
      inDieuKhoan: d.dieuKhoan, inEnNote: d.enNote, inPaymentTerm: d.paymentTerm
    };
    Object.keys(mapVal).forEach(k => { if (_el(k)) _el(k).value = mapVal[k] || ""; });

    gioHang = d.gioHang || [];
    updatePreview(); renderTable(); renderCartMini();
  }

  function doiCheDo(mode) {
    currentMode = mode;
    ['BG_VN','BG_EN','XK'].forEach(m => { if (_el('btn' + m)) _el('btn' + m).className = (mode === m ? 'mode-btn active' : 'mode-btn'); });
    const isPI = _el('chkIsPI').checked;
    const isEN = mode === 'BG_EN';
    const isXK = mode === 'XK';

    _show('divEnNoteGroup', isEN ? 'block' : 'none');
    _txt('lblNotesHeader', isEN ? "TERMS & NOTES:" : "ĐIỀU KHOẢN & GHI CHÚ:");
    if (isEN && _el('inEnNote') && !_el('inEnNote').value.trim()) {
      const cVal = _el('inThongTinLienHeMail') ? _el('inThongTinLienHeMail').value.trim() : "...";
      _el('inEnNote').value = `Please contact us via information: ${cVal || '...'} for further discussion and information.`;
    }

    if (isEN) {
      _txt('sysTen', configGoc.tenEN || "GOODS LINK JOINT STOCK COMPANY");
      _el('sysDiaChi').innerHTML = configGoc.diaChiEN || "";
      _el('sysLienHeCty').innerHTML = (configGoc.telEN || "") + "<br>" + (configGoc.webEN || "");
      if (_el('inCurrency') && _el('inCurrency').value === 'VND') _el('inCurrency').value = 'USD';
    } else {
      _txt('sysTen', configGoc.tenVN || "CÔNG TY CỔ PHẦN GOODS LINK");
      _txt('sysDiaChi', configGoc.diaChiVN || "");
      _txt('sysLienHeCty', isXK ? (configGoc.telVN || "") : ((configGoc.mst ? "MST: " + configGoc.mst + " | " : "") + (configGoc.telVN || "") + " | " + (configGoc.webVN || "")));
      if (!isXK && _el('inCurrency')) _el('inCurrency').value = 'VND';
    }

    _txt('docTitleMain', isXK ? "PHIẾU XUẤT KHO" : (isEN ? (isPI ? "PROFORMA INVOICE" : _el('inTitleEN').value) : "BẢNG BÁO GIÁ"));
    _txt('lblMaType', isXK ? "Số phiếu:" : (isEN ? (isPI ? "PI No:" : "Quote No:") : "Mã số:"));
    _txt('lblNgayType', isXK ? "Ngày xuất:" : (isEN ? "Date:" : "Ngày lập:"));
    _txt('lblKhachTitle', isXK ? "ĐƠN VỊ / KHÁCH NHẬN HÀNG:" : (isEN ? "TO:" : "KÍNH GỬI KHÁCH HÀNG:"));
    _txt('lblLienHeInput', isEN ? "Attn / Phone / Email:" : "Người liên hệ / SĐT / Attn:");
    _txt('lblTelPrefix', isEN ? "ATTN / CONTACT: " : "LIÊN HỆ: ");
    _txt('signTitleName', isEN ? (isPI ? "FOR AND ON BEHALF OF SELLER" : "") : "ĐẠI DIỆN CÔNG TY");
    _txt('signSubText', isEN ? (isPI ? "(Authorized Signature & Stamp)" : "") : "(Ký, đóng dấu & ghi rõ họ tên)");

    _show('divTitleENSelect', isEN ? 'block' : 'none');
    _show('divQuoteTitleDropdown', (isEN && !isPI) ? 'block' : 'none');
    _show('divBankInfoInput', (isEN && isPI) ? 'block' : 'none');
    _show('preGreeting', isEN ? 'block' : 'none');
    _show('rowXkExtraFields', isXK ? 'block' : 'none');
    _show('rowEnExtra', isEN ? 'flex' : 'none');
    _show('rowEnOptions', isEN ? 'flex' : 'none');
    _show('rowPriceAndVat', isXK ? 'none' : 'flex');
    _show('divVATGroup', (!isEN && !isXK) ? 'block' : 'none');
    _show('lblToggleTotal', isXK ? 'none' : 'flex');
    _show('lblToggleWords', isXK ? 'none' : 'flex');
    _show('divIncotermBuilder', isEN ? 'block' : 'none');
    _show('divPaymentTermInput', isXK ? 'none' : 'block');
    _txt('lblPaymentTermInput', isEN ? "Payment term" : "Phương thức thanh toán");
    _txt('lblPaymentHeader', isEN ? "PAYMENT TERM:" : "PHƯƠNG THỨC THANH TOÁN:");
    _show('sigXKContainer', isXK ? 'flex' : 'none');
    _show('sigSingleContainer', isXK ? 'none' : 'flex');

    renderTable(); updatePreview(); datLaiNoiDungMacDinh();
  }

  function updatePreview() {
    const isPI = _el('chkIsPI').checked;
    const isEN = currentMode === 'BG_EN';
    if (isEN) _txt('docTitleMain', isPI ? "PROFORMA INVOICE" : _el('inTitleEN').value);
    _txt('preKhach', _el('inKhach').value || "...");

    const lienHe = _el('inLienHe').value.trim();
    _txt('preLienHe', lienHe); _show('boxClientTel', lienHe ? 'block' : 'none');

    const diaDiem = _el('inDiaDiemXK').value.trim(), bienSo = _el('inBienSoXe').value.trim();
    _txt('preDiaDiemXK', diaDiem); _txt('preBienSoXe', bienSo);
    _show('boxDiaDiemXK', diaDiem ? 'block' : 'none');
    _show('boxBienSoXe', bienSo ? 'block' : 'none');
    _show('boxXkDetails', (currentMode === 'XK' && (diaDiem || bienSo)) ? 'block' : 'none');

    _txt('preMa', _el('inMa').value); _txt('preNgay', _el('inNgay').value);

    const prep = _el('inPreparedBy').value.trim(), valid = _el('inValidUntil').value.trim();
    _txt('prePreparedBy', prep); _show('boxPreparedBy', (isEN && prep) ? 'table-row' : 'none');
    _txt('preValidUntil', valid); _show('boxValidUntil', (isEN && valid) ? 'table-row' : 'none');

    const notes = _el('inDieuKhoan').value.trim();
    _txt('preDieuKhoan', notes); _show('boxNotesSection', notes ? 'block' : 'none');

    const pay = _el('inPaymentTerm').value.trim(), showPay = (currentMode !== 'XK') && pay;
    _txt('prePaymentTerm', pay); _show('boxPaymentTermPre', showPay ? 'block' : 'none');

    const bank = _el('inBankInfo').value.trim(), showBank = isEN && isPI && bank;
    _txt('preBankInfo', bank); _show('boxBankInfoPre', showBank ? 'block' : 'none');

    _show('termsSectionBox', (notes || showPay || showBank) ? 'block' : 'none');

    const enNote = (isEN && _el('inEnNote')) ? _el('inEnNote').value.trim() : "";
    _txt('preEnNote', enNote); _show('boxEnNotePre', enNote ? 'block' : 'none');

    if (typeof datLaiNoiDungMacDinh === "function") datLaiNoiDungMacDinh();
  }

  function getCurrencyEnglishName(currCode) {
    return { EUR: 'Euros', GBP: 'Pounds Sterling', CNY: 'Chinese Yuan Renminbi', VND: 'Vietnamese Dong' }[currCode] || 'US Dollars';
  }

 function renderTable() {
    const headerRow = _el('tableHeaderRow'), tbody = _el('preTable');
    tbody.innerHTML = ""; _show('boxAmountInWords', 'none');

    const showImg = _el('chkShowImage').checked, showTotal = _el('chkShowTotal').checked;
    const showWords = _el('chkShowWords').checked, isPI = _el('chkIsPI').checked;

    if (currentMode === 'XK') {
      headerRow.innerHTML = `<th width="7%">STT</th><th width="40%" style="text-align:left;">Mô Tả Sản Phẩm - Qui Cách</th><th width="10%">ĐVT</th><th width="12%">Số Lượng</th>${showImg ? '<th width="31%">Hình Ảnh</th>' : ''}`;
      gioHang.forEach((sp, i) => {
        const anh = sp.anh ? `<img src="${sp.anh}" class="product-img-responsive">` : `<div style="font-size:10px;color:#94a3b8;">N/A</div>`;
        tbody.innerHTML += `<tr><td class="text-center" style="font-weight:700;">${i+1}</td><td><div class="desc-cell-text">${sp.ten}</div></td><td class="text-center" style="font-weight:600;">${sp.dvt || ''}</td><td class="text-center" style="font-weight:800;font-size:14px;">${sp.sl}</td>${showImg ? `<td class="text-center"><div class="photo-container">${anh}</div></td>` : ''}</tr>`;
      });
    } else if (currentMode === 'BG_EN') {
      const volType = _el('inVolumeType').value;
      const curr = _el('inCurrency') ? (_el('inCurrency').value || 'USD') : 'USD';
      
      // Lấy ĐVT động từ giỏ hàng hoặc từ ô nhập ĐVT bên trái (Phải đặt TRƯỚC headerRow.innerHTML)
      const uniqueUnits = [...new Set(gioHang.map(sp => (sp.dvt || '').trim().toUpperCase()).filter(Boolean))];
      const unitHeader = uniqueUnits.length > 0 
        ? uniqueUnits.join(', ') 
        : ((_el('inDVT') && _el('inDVT').value.trim()) ? _el('inDVT').value.trim().toUpperCase() : 'UNIT');
      const priceSubHeader = `(${curr}/${unitHeader})`;

      let totalAmount = 0;

      headerRow.innerHTML = `<th width="6%">No.</th><th width="25%" style="text-align:left;">Description</th><th width="15%">Volume<br><span style="font-size:11px;font-weight:normal;">${volType}</span></th><th width="15%">PRICE<br><span style="font-size:9px;font-weight:600;">${priceSubHeader}</span></th>${isPI ? `<th width="14%">Amount<br><span style="font-size:9.5px;font-weight:normal;">(${curr})</span></th>` : ''}${showImg ? '<th width="31%">PHOTO</th>' : ''}`;

      gioHang.forEach((sp, i) => {
        const lineAmt = (sp.sl || 0) * (sp.gia || 0); totalAmount += lineAmt;
        const anh = sp.anh ? `<img src="${sp.anh}" class="product-img-responsive">` : `<div style="font-size:11px;color:#94a3b8;">No photo</div>`;
        tbody.innerHTML += `<tr><td class="text-center" style="font-weight:700;">${i+1}</td><td><div class="desc-cell-text">${sp.ten}</div></td><td class="text-center" style="font-weight:700;">${fmt(sp.sl)}</td><td class="text-center" style="font-weight:700;">${fmt(sp.gia)}</td>${isPI ? `<td class="text-right" style="font-weight:800;">${fmt(lineAmt)}</td>` : ''}${showImg ? `<td class="text-center"><div class="photo-container">${anh}</div></td>` : ''}</tr>`;
      });

      if (isPI && gioHang.length > 0 && showTotal) {
        tbody.innerHTML += `<tr class="summary-row"><td colspan="4" class="text-right">TOTAL AMOUNT (${curr}):</td><td class="text-right" style="color:var(--doc-primary);">${fmt(totalAmount)}</td>${showImg ? '<td></td>' : ''}</tr>`;
      }
      if (gioHang.length > 0 && showWords) {
        _show('boxAmountInWords', 'block');
        const cleanWords = docSoTienUSD(totalAmount).replace(/US\s+Dollars/gi, '').replace(/\bonly\b/gi, '').replace(/\./g, '').trim();
        _txt('lblAmountInWordsPrefix', "Say: ");
        _txt('preAmountInWords', `${getCurrencyEnglishName(curr)} ${cleanWords} only`);
      }
    } else {
      headerRow.innerHTML = `<th width="5%">STT</th><th width="29%" style="text-align:left;">Mô Tả Hàng Hóa</th><th width="8%">ĐVT</th><th width="7%">SL</th><th width="13%" class="text-right">Đơn Giá</th><th width="8%">VAT</th><th width="15%" class="text-right">Thành Tiền<br><span style="font-size:9px;font-weight:normal;">(Đã gồm VAT)</span></th>${showImg ? '<th width="15%">Hình Ảnh</th>' : ''}`;
      let tongSauThue = 0;
      gioHang.forEach((sp, i) => {
        const anh = sp.anh ? `<img src="${sp.anh}" class="product-img-responsive" style="max-width:95px;max-height:95px;">` : `<div style="font-size:10px;color:#94a3b8;">N/A</div>`;
        const vatStr = sp.vatValue === 'KKKNT' ? 'KKKNT' : `${sp.vatValue || 8}%`;
        const tien = (sp.sl || 0) * (sp.gia || 0);
        const vatRate = (sp.vatValue === 'KKKNT' || isNaN(parseFloat(sp.vatValue))) ? 0 : parseFloat(sp.vatValue);
        const sauThue = tien + (tien * vatRate / 100);
        tongSauThue += sauThue;
        tbody.innerHTML += `<tr><td class="text-center" style="font-weight:700;">${i+1}</td><td><div class="desc-cell-text">${sp.ten}</div></td><td class="text-center" style="font-weight:600;">${sp.dvt || ''}</td><td class="text-center" style="font-weight:700;">${sp.sl}</td><td class="text-right" style="font-weight:600;">${fmt(sp.gia)}</td><td class="text-center" style="font-weight:700;color:var(--doc-primary);">${vatStr}</td><td class="text-right" style="font-weight:800;">${fmt(sauThue)}</td>${showImg ? `<td class="text-center"><div class="photo-container">${anh}</div></td>` : ''}</tr>`;
      });

      if (gioHang.length > 0 && showTotal) {
        tbody.innerHTML += `<tr class="summary-row"><td colspan="6" class="text-right">TỔNG CỘNG THANH TOÁN (ĐÃ GỒM VAT):</td><td class="text-right" style="color:var(--doc-primary);">${fmt(tongSauThue)}</td>${showImg ? '<td></td>' : ''}</tr>`;
      }
      if (gioHang.length > 0 && showWords) {
        _show('boxAmountInWords', 'block');
        _txt('lblAmountInWordsPrefix', "Số tiền bằng chữ: ");
        _txt('preAmountInWords', docSoTienVND(tongSauThue));
      }
    }
  }

  function taoVaXuLyPDF(msg, callback) {
    const wrapper = _el('a4Wrapper'), paper = _el('a4Paper'), panelRight = _el('panelRightScroll');
    const prevDisp = panelRight.style.display, prevTrans = wrapper.style.transform;
    panelRight.style.display = 'flex'; wrapper.style.transform = 'scale(1)'; panelRight.scrollTop = 0;
    paper.classList.add('pdf-exporting');
    _show('loading-overlay', 'flex');
    if (document.querySelector('.loading-text') && msg) document.querySelector('.loading-text').innerText = msg;

    const isPI = _el('chkIsPI').checked;
    const loaiCtu = currentMode === 'BG_EN' ? (isPI ? 'Proforma_Invoice' : 'Quotation') : (currentMode === 'BG_VN' ? 'Báo Giá' : 'Xuất Kho');
    const maSoVal = _el('inMa').value, fileName = `${loaiCtu.replace(" ", "_")}_${maSoVal}.pdf`;
    let tongCong = 0;
    gioHang.forEach(sp => {
      const t = (sp.sl || 0) * (sp.gia || 0);
      const v = (currentMode === 'BG_VN' && sp.vatValue !== 'KKKNT' && !isNaN(parseFloat(sp.vatValue))) ? parseFloat(sp.vatValue) : 0;
      tongCong += t + (t * v / 100);
    });

    const opt = {
      margin: 0, filename: fileName, image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 4, useCORS: true, letterRendering: true, scrollY: 0, scrollX: 0, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true }
    };

    setTimeout(() => {
      html2pdf().set(opt).from(paper).outputPdf('datauristring').then(dataUri => {
        wrapper.style.transform = prevTrans; paper.classList.remove('pdf-exporting'); panelRight.style.display = prevDisp;
        callback({ dataUri, base64Data: dataUri.split(',')[1], fileName, loaiCtu, maSoVal, tongCong });
      });
    }, 150);
  }

  function xuatPDF() {
    if (!_el('inKhach').value || gioHang.length === 0) return showToast("⚠️ Vui lòng nhập Tên khách hàng và ít nhất 1 sản phẩm!", true);
    taoVaXuLyPDF("Đang kết xuất PDF Ultra HD...", ({ dataUri, base64Data, fileName, loaiCtu, maSoVal, tongCong }) => {
      const payload = { loaiChungTu: loaiCtu, maSo: maSoVal, khachHang: _el('inKhach').value, tongCong: Math.round(tongCong) };
      google.script.run.withSuccessHandler(() => {
        _show('loading-overlay', 'none');
        const a = document.createElement('a'); a.href = dataUri; a.download = fileName;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        xoaDonNháp(); gioHang = []; renderTable(); renderCartMini();
        showToast("✅ Xuất PDF Ultra HD thành công!");
      }).withFailureHandler(err => {
        _show('loading-overlay', 'none'); showToast("❌ Lỗi lưu Drive: " + err.message, true);
      }).luuFilePDFVaoDrive(base64Data, fileName, payload);
    });
  }

  function guiEmailChoKhachHang() {
    const emailTo = _el('inEmailKhach').value.trim(), tenKhach = _el('inKhach').value.trim();
    if (!emailTo || !emailTo.includes("@") || !tenKhach || gioHang.length === 0) {
      return showToast("⚠️ Vui lòng nhập Tên khách, Email hợp lệ và có ít nhất 1 sản phẩm!", true);
    }
    taoVaXuLyPDF("Đang tạo file PDF và gửi email cho khách...", ({ base64Data, fileName, maSoVal }) => {
      const sub = _el('inEmailSubject').value.trim() || `Báo giá ${maSoVal}`;
      const body = _el('inEmailBody').value.trim() || `Kính gửi Quý khách,\nĐính kèm file báo giá.`;
      google.script.run.withSuccessHandler(() => {
        _show('loading-overlay', 'none'); showToast("✅ Đã gửi email kèm file PDF thành công đến " + emailTo + "!");
      }).withFailureHandler(err => {
        _show('loading-overlay', 'none'); showToast("❌ Lỗi gửi mail: " + err.message, true);
      }).guiEmailChoKhach(emailTo, sub, body, base64Data, fileName);
    });
  }

  function datLaiNoiDungMacDinh() {
    const subEl = _el('inEmailSubject'), bodyEl = _el('inEmailBody'), contactEl = _el('inThongTinLienHeMail');
    if (!subEl || !bodyEl) return;
    if (contactEl) {
      try {
        if (contactEl.value.trim()) {
          localStorage.setItem('ARGON_SAVED_SENDER_CONTACT', contactEl.value.trim());
        } else if (!contactEl.hasAttribute('data-init')) {
          contactEl.value = localStorage.getItem('ARGON_SAVED_SENDER_CONTACT') || "";
          contactEl.setAttribute('data-init', 'true');
        }
      } catch (e) {
        // Bỏ qua nếu Safari chặn localStorage trong iframe
      }
    }
    const lh = (contactEl && contactEl.value.trim()) || "...", kh = _el('inKhach').value.trim() || "Quý khách hàng";
    const ma = _el('inMa').value.trim() || "QUO-2026", isPI = _el('chkIsPI').checked;
    const ctyVN = configGoc.tenVN || "CÔNG TY CỔ PHẦN GOODS LINK", ctyEN = configGoc.tenEN || "GOODS LINK JOINT STOCK COMPANY";

    if (currentMode === 'BG_EN') {
      subEl.value = `[${ctyEN}] ${isPI ? "PROFORMA INVOICE" : "QUOTATION"} - No: ${ma}`;
      bodyEl.value = `Dear Valued Customer (${kh}),\n\nThis is an automated quotation email. Please contact us via information: ${lh} for further discussion and information.\n\nBest regards,\n${ctyEN}`;
    } else {
      subEl.value = `[${ctyVN}] ${currentMode === 'XK' ? "PHIẾU XUẤT KHO" : "BẢNG BÁO GIÁ"} - Số: ${ma}`;
      bodyEl.value = `Kính chào Quý khách hàng (${kh}).\n\nĐây là mail báo giá tự động, vui lòng liên hệ theo thông tin: ${lh} để trao đổi thêm nhiều thông tin.\n\nTrân trọng,\n${ctyVN}`;
    }
  }

  function capNhatLienHeVaoA4() {
    datLaiNoiDungMacDinh();
    if (currentMode === 'BG_EN' && _el('inEnNote')) {
      const cVal = _el('inThongTinLienHeMail') ? _el('inThongTinLienHeMail').value.trim() : "...";
      _el('inEnNote').value = `Please contact us via information: ${cVal || '...'} for further discussion and information.`;
      updatePreview();
    }
  }
  window.addEventListener('DOMContentLoaded', () => setTimeout(datLaiNoiDungMacDinh, 1000));

  function chenIncotermThongMinh() {
    const term = _el('selIncoterm').value, port = _el('inPortName').value.trim().toUpperCase() || "[PORT]";
    const lead = _el('inLeadTime').value.trim(), area = _el('inDieuKhoan');
    let line = `The above rates are ${term} ${port} (Incoterms 2020).` + (lead ? `\nEstimated Shipment: ${lead}.` : '');
    area.value = area.value.trim() ? (area.value.trim() + "\n" + line) : line;
    updatePreview();
  }
</script>