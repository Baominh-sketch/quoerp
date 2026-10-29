<script>
  let dbSP = [];
  let listKH = [];
  let gioHang = [];
  let currentSpImageBase64 = ""; 
  let currentWatermarkBase64 = ""; 
  let currentMode = 'BG_VN'; 
  let savedOrdersMap = []; 
  let configGoc = {};

  window.onload = function() {
    const today = new Date().toLocaleDateString('en-GB');
    document.getElementById('inNgay').value = today;
    document.getElementById('preNgay').innerText = today;

    google.script.run.withSuccessHandler(data => {
      if(!data) return; 
      configGoc = data.config || {};
      if (configGoc.mau) {
        document.documentElement.style.setProperty('--doc-primary', configGoc.mau);
        document.getElementById('liveColorPicker').value = configGoc.mau;
        if (document.getElementById('liveColorHex')) {
          document.getElementById('liveColorHex').value = configGoc.mau.toUpperCase();
        }
      }
      if (configGoc.logo && configGoc.logo.trim() !== "") {
        const logoImg = document.getElementById('sysLogo');
        logoImg.src = configGoc.logo;
        logoImg.style.display = "block";
      }

      capNhatDropdownSP(data.db || []);
      capNhatDropdownKH(data.khachHang || []);
      
      // Nạp luôn danh sách Bank từ gói dữ liệu tổng hợp (hoặc gọi dự phòng)
      if (data.banks && data.banks.length > 0) {
        capNhatDropdownBank(data.banks);
      } else {
        taiDanhSachBankTuSheet();
      }

      doiCheDo('BG_VN');
      taiDonNháp();
      taiDanhSachDonLuuApp();
    }).layDuLieuTongHop();
  };
  function capNhatDropdownSP(list) {
    dbSP = list;
    const sel = document.getElementById('spSelect');
    sel.innerHTML = '<option value="">-- Chọn sản phẩm từ Database --</option>';
    dbSP.forEach((r, i) => sel.innerHTML += `<option value="${i}">${r[0]} - ${r[1].split('\n')[0]}</option>`);
  }

  function capNhatDropdownKH(list) {
    listKH = list;
    const selKH = document.getElementById('khSelect');
    selKH.innerHTML = '<option value="">-- Chọn khách hàng lưu sẵn --</option>';
    listKH.forEach((kh, i) => selKH.innerHTML += `<option value="${i}">${kh[0]}</option>`);
  }

  function chonKhachHangCRM() {
    const idx = document.getElementById('khSelect').value;
    if (idx !== "") {
      document.getElementById('inKhach').value = listKH[idx][0] || "";
      document.getElementById('inLienHe').value = listKH[idx][3] || "";
      updatePreview();
    }
  }

  function chonSPDatabase() {
    const v = document.getElementById('spSelect').value;
    if (v === "") return;
    document.getElementById('inMaSPMoi').value = dbSP[v][0] || "";
    document.getElementById('inTenSP').value = dbSP[v][1] || "";
    document.getElementById('inDVT').value = dbSP[v][2] || "Trái";
    document.getElementById('inGia').value = dbSP[v][3] || 0;
    
    const prev = document.getElementById('spPreviewLeft');
    if (dbSP[v][4] && dbSP[v][4].toString().trim() !== "") {
      currentSpImageBase64 = dbSP[v][4].toString().trim();
      prev.src = currentSpImageBase64;
      prev.style.display = "block";
    } else {
      currentSpImageBase64 = "";
      prev.style.display = "none";
    }
    document.getElementById('inSpFile').value = "";
  }

  function luuKhachHangMoi() {
    const ten = document.getElementById('inKhach').value.trim();
    const lienHe = document.getElementById('inLienHe').value.trim();
    if (!ten) return showToast("⚠️ Vui lòng nhập Tên khách hàng!", true);

    document.getElementById('loading-overlay').style.display = "flex";
    google.script.run.withSuccessHandler(newList => {
      document.getElementById('loading-overlay').style.display = "none";
      capNhatDropdownKH(newList || []);
      showToast("✅ Đã lưu Khách hàng mới vào Sheet!");
    }).withFailureHandler(err => {
      document.getElementById('loading-overlay').style.display = "none";
      showToast("❌ Lỗi: " + err.message, true);
    }).luuKhachHangMoiVaoSheet({ ten: ten, lienHe: lienHe });
  }

  function luuSanPhamMoi() {
    const ten = document.getElementById('inTenSP').value.trim();
    const ma = document.getElementById('inMaSPMoi').value.trim();
    const dvt = document.getElementById('inDVT').value.trim() || "CTN";
    const gia = parseFloat(document.getElementById('inGia').value) || 0;
    if (!ten) return showToast("⚠️ Vui lòng nhập Tên / Mô tả sản phẩm!", true);

    document.getElementById('loading-overlay').style.display = "flex";
    google.script.run.withSuccessHandler(newDb => {
      document.getElementById('loading-overlay').style.display = "none";
      capNhatDropdownSP(newDb || []);
      showToast("✅ Đã lưu Sản phẩm mới vào Database!");
    }).withFailureHandler(err => {
      document.getElementById('loading-overlay').style.display = "none";
      showToast("❌ Lỗi: " + err.message, true);
    }).luuSanPhamMoiVaoSheet({ ma: ma, ten: ten, dvt: dvt, gia: gia, anh: currentSpImageBase64 });
  }

function themVaoGio() {
  const ten = document.getElementById('inTenSP').value.trim();
  if (!ten) return showToast("⚠️ Vui lòng nhập Tên/Mô tả sản phẩm!", true);

  const sp = {
    ten: ten,
    dvt: document.getElementById('inDVT').value.trim(),
    sl: parseFloat(document.getElementById('inSL').value) || 1,
    gia: parseFloat(document.getElementById('inGia').value) || 0,
    vatValue: document.getElementById('inVAT') ? document.getElementById('inVAT').value : "8",
    anh: currentSpImageBase64 || ""
  };

  // KIỂM TRA CHẾ ĐỘ: ĐANG SỬA HAY THÊM MỚI
  if (dangSuaIndex !== -1) {
    // Nếu đang sửa -> Ghi đè vào đúng dòng cũ
    gioHang[dangSuaIndex] = sp;
    dangSuaIndex = -1; // Reset lại trạng thái
    
    // Trả lại giao diện nút Thêm ban đầu
    const btnAdd = document.querySelector('button[onclick="themVaoGio()"]');
    if (btnAdd) {
      btnAdd.innerHTML = "+ Thêm Sản Phẩm Vào Đơn";
      btnAdd.style.background = ""; // Xóa màu xanh lá
    }
    showToast("✅ Đã cập nhật sản phẩm thành công!");
  } else {
    // Nếu là thêm mới
    gioHang.push(sp);
    showToast("✅ Đã thêm sản phẩm vào đơn!");
  }

  // Xóa trắng form nhập liệu
  document.getElementById('inTenSP').value = "";
  document.getElementById('inDVT').value = "Trái";
  document.getElementById('inSL').value = "1";
  document.getElementById('inGia').value = "0";
  if (document.getElementById('inSpFile')) document.getElementById('inSpFile').value = "";
  currentSpImageBase64 = "";
  document.getElementById('spPreviewLeft').style.display = 'none';
  document.getElementById('inTenSP').focus();

  // Cập nhật lại giao diện
  if (typeof renderCartMini === 'function') renderCartMini();
  if (typeof renderTable === 'function') renderTable();
  if (typeof updatePreview === 'function') updatePreview();
}

  function capNhatSLGio(index, newVal) {
    gioHang[index].sl = Math.max(0, parseFloat(newVal) || 0);
    renderTable();
  }

  function xoaKhoiGio(index) {
    gioHang.splice(index, 1);
    renderTable();
    renderCartMini();
  }

function renderCartMini() {
  const tbody = document.getElementById('cartMiniBody');
  if (!tbody) return;
  if (!gioHang.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--argon-muted);">Chưa có sản phẩm</td></tr>`;
    return;
  }
  tbody.innerHTML = gioHang.map((sp, i) => `
    <tr>
      <td><div style="font-weight:600;font-size:12px;">${sp.ten}</div><div style="font-size:11px;color:#64748b;">${fmt(sp.gia)} / ${sp.dvt || ''}</div></td>
      <td style="text-align:center;font-weight:700;">${sp.sl}</td>
      <td style="text-align:center;font-size:11px;">${sp.vatValue === 'KKKNT' ? 'KKKNT' : (sp.vatValue || 8) + '%'}</td>
      <td style="text-align:center;white-space:nowrap;">
        <span style="cursor:pointer;opacity:${i > 0 ? 1 : 0.2};" onclick="diChuyenSP(${i},-1)">⬆️</span>
        <span style="cursor:pointer;opacity:${i < gioHang.length - 1 ? 1 : 0.2};margin:0 4px;" onclick="diChuyenSP(${i},1)">⬇️</span>
        <span style="cursor:pointer;margin-right:4px;" onclick="suaSPTrongGio(${i})">✏️</span>
        <span style="cursor:pointer;" onclick="hienThiXacNhanXoa(${i})">❌</span>
      </td>
    </tr>`).join('');
}

function diChuyenSP(i, dir) {
  const t = i + dir;
  if (t < 0 || t >= gioHang.length) return;
  [gioHang[i], gioHang[t]] = [gioHang[t], gioHang[i]];
  if (typeof dangSuaIndex !== 'undefined') {
    if (dangSuaIndex === i) dangSuaIndex = t;
    else if (dangSuaIndex === t) dangSuaIndex = i;
  }
  renderCartMini(); renderTable(); updatePreview();
}

let danhSachBankGoc = [];

function capNhatDropdownBank(list) {
  danhSachBankGoc = list || [];
  const sel = document.getElementById('bankSelect');
  if (!sel) return;

  if (danhSachBankGoc.length === 0) {
    sel.innerHTML = `<option value="">-- Chưa có dữ liệu trong sheet THÔNG TIN BANK --</option>`;
    return;
  }

  sel.innerHTML = `<option value="">-- Chọn Bank từ Sheet (${danhSachBankGoc.length}) --</option>` +
    danhSachBankGoc.map((b, idx) => `<option value="${idx}">🏦 ${b.ten}</option>`).join('');

  // Tự động điền sẵn ngân hàng đầu tiên vào ô nếu ô đang trống
  const area = document.getElementById('inBankInfo');
  if (area && !area.value.trim()) {
    area.value = danhSachBankGoc[0].chiTiet;
  }
}

function taiDanhSachBankTuSheet() {
  if (typeof google === 'undefined' || !google.script) return;
  try {
    google.script.run
      .withSuccessHandler(list => capNhatDropdownBank(list))
      .withFailureHandler(err => console.warn("Lỗi tải Bank:", err))
      .layDanhSachBank();
  } catch (e) {
    console.warn("Bỏ qua gọi lẻ layDanhSachBank:", e);
  }
}

function chonBankTuSheet() {
  const sel = document.getElementById('bankSelect');
  const idx = sel ? sel.value : "";
  if (idx === "" || !danhSachBankGoc[idx]) return;
  const area = document.getElementById('inBankInfo');
  if (area) {
    area.value = danhSachBankGoc[idx].chiTiet;
    if (typeof updatePreview === 'function') updatePreview();
  }
}

// Tự động gọi tải danh sách Bank sau khi giao diện đã load xong ổn định
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(taiDanhSachBankTuSheet, 600);
});
// Biến toàn cục để nhớ vị trí sản phẩm đang sửa (-1 nghĩa là đang thêm mới)
let dangSuaIndex = -1; 

function suaSPTrongGio(index) {
  try {
    const sp = gioHang[index];
    if (!sp) return;

    dangSuaIndex = index; // Lưu lại vị trí dòng đang sửa

    // 1. Đẩy ngược dữ liệu lên form
    document.getElementById('inTenSP').value = sp.ten || "";
    document.getElementById('inDVT').value = sp.dvt || "";
    document.getElementById('inSL').value = sp.sl || 1;
    document.getElementById('inGia').value = sp.gia || 0;
    if (document.getElementById('inVAT')) {
      document.getElementById('inVAT').value = sp.vatValue || "8";
    }

    // Xử lý ảnh
    if (sp.anh) {
      currentSpImageBase64 = sp.anh;
      document.getElementById('spPreviewLeft').src = sp.anh;
      document.getElementById('spPreviewLeft').style.display = 'block';
    } else {
      currentSpImageBase64 = "";
      document.getElementById('spPreviewLeft').style.display = 'none';
      if (document.getElementById('inSpFile')) document.getElementById('inSpFile').value = ""; 
    }

    // 2. KHÔNG DÙNG splice() NỮA ĐỂ GIỮ NGUYÊN DÒNG TRÊN TỜ A4.
    
    // 3. Đổi tên nút "Thêm" thành nút "Cập nhật" để dễ thao tác
    const btnAdd = document.querySelector('button[onclick="themVaoGio()"]');
    if (btnAdd) {
      btnAdd.innerHTML = "💾 Lưu Cập Nhật Sản Phẩm";
      btnAdd.style.background = "linear-gradient(87deg, #2dce89 0, #2dcecc 100%)"; // Đổi sang màu xanh lá
    }

    document.getElementById('inGia').focus();
    if (typeof showToast === 'function') {
      showToast("✏️ Đang sửa sản phẩm số " + (index + 1) + ". Nhấn 'Lưu Cập Nhật' khi xong!");
    }
  } catch (err) {
    console.error("Lỗi khi sửa SP:", err);
  }
}

// HÀM TẠO POPUP XÁC NHẬN TÍCH HỢP TRONG APP (Thay thế confirm mặc định)
function hienThiXacNhanXoa(index) {
  // Tạo lớp phủ mờ (Overlay)
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
  overlay.style.backdropFilter = 'blur(4px)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.id = 'argonCustomConfirm';

  // Tạo hộp thoại (Modal Box)
  const modal = document.createElement('div');
  modal.style.background = '#ffffff';
  modal.style.padding = '24px';
  modal.style.borderRadius = '12px';
  modal.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
  modal.style.width = '320px';
  modal.style.textAlign = 'center';
  modal.style.fontFamily = "'Plus Jakarta Sans', sans-serif";

  // Lời nhắn
  const title = document.createElement('div');
  title.innerHTML = '⚠️ <b>Xác nhận xóa</b>';
  title.style.fontSize = '18px';
  title.style.color = '#f5365c';
  title.style.marginBottom = '10px';

  const message = document.createElement('div');
  message.innerText = 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi đơn hàng?';
  message.style.fontSize = '14px';
  message.style.color = '#334155';
  message.style.marginBottom = '20px';
  message.style.lineHeight = '1.5';

  // Cụm nút bấm
  const btnContainer = document.createElement('div');
  btnContainer.style.display = 'flex';
  btnContainer.style.gap = '10px';

  // Nút Hủy
  const btnCancel = document.createElement('button');
  btnCancel.innerText = 'Không';
  btnCancel.style.flex = '1';
  btnCancel.style.padding = '10px';
  btnCancel.style.border = 'none';
  btnCancel.style.borderRadius = '6px';
  btnCancel.style.background = '#e2e8f0';
  btnCancel.style.color = '#475569';
  btnCancel.style.fontWeight = '700';
  btnCancel.style.cursor = 'pointer';
  btnCancel.onclick = () => document.body.removeChild(overlay);

  // Nút Xác nhận Xóa
  const btnOk = document.createElement('button');
  btnOk.innerText = 'Xóa ngay';
  btnOk.style.flex = '1';
  btnOk.style.padding = '10px';
  btnOk.style.border = 'none';
  btnOk.style.borderRadius = '6px';
  btnOk.style.background = '#f5365c'; // Màu đỏ Argon
  btnOk.style.color = '#ffffff';
  btnOk.style.fontWeight = '700';
  btnOk.style.cursor = 'pointer';
  btnOk.onclick = () => {
    document.body.removeChild(overlay);
    xoaSPTrongGio(index); // Gọi hàm xóa thực sự
  };

  // Ghép nối các thành phần
  btnContainer.appendChild(btnCancel);
  btnContainer.appendChild(btnOk);
  modal.appendChild(title);
  modal.appendChild(message);
  modal.appendChild(btnContainer);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// HÀM XÓA SẢN PHẨM TRONG GIỎ (Hàm thực thi ngầm sau khi bấm OK)
function xoaSPTrongGio(index) {
  gioHang.splice(index, 1);
  
  // Ép render lại tờ A4 và Giỏ hàng ngay lập tức
  if (typeof renderCartMini === 'function') renderCartMini();
  if (typeof renderTable === 'function') renderTable();
  if (typeof updatePreview === 'function') updatePreview();
  
  if (typeof showToast === 'function') {
    showToast("🗑️ Đã xóa sản phẩm khỏi đơn!");
  }
}
  function thuThapDuLieuHienTai() {
    return {
      mode: currentMode,
      isPI: document.getElementById('chkIsPI').checked,
      pdfTheme: document.getElementById('pdfThemeSelect').value,
      showImage: document.getElementById('chkShowImage').checked,
      showTotal: document.getElementById('chkShowTotal').checked,
      showWords: document.getElementById('chkShowWords').checked,
      titleEN: document.getElementById('inTitleEN').value,
      currency: document.getElementById('inCurrency').value,
      volumeType: document.getElementById('inVolumeType').value,
      watermark: currentWatermarkBase64,
      khach: document.getElementById('inKhach').value,
      lienHe: document.getElementById('inLienHe').value,
      diaDiemXK: document.getElementById('inDiaDiemXK').value,
      bienSoXe: document.getElementById('inBienSoXe').value,
      ma: document.getElementById('inMa').value.trim(),
      ngay: document.getElementById('inNgay').value,
      preparedBy: document.getElementById('inPreparedBy').value,
      validUntil: document.getElementById('inValidUntil').value,
      dieuKhoan: document.getElementById('inDieuKhoan').value,
      paymentTerm: document.getElementById('inPaymentTerm').value,
      bankInfo: document.getElementById('inBankInfo').value,
      gioHang: gioHang
    };
  }

  function luuDonNháp() {
    localStorage.setItem('APP_DON_NHAP_BAO_GIA', JSON.stringify(thuThapDuLieuHienTai()));
    showToast("💾 Đã lưu nháp trên thiết bị!");
  }
  function taiDonNháp() {
    const saved = localStorage.getItem('APP_DON_NHAP_BAO_GIA');
    if (saved) { try { apDungDuLieuDon(JSON.parse(saved)); } catch(e) {} }
  }
  function xoaDonNháp() { localStorage.removeItem('APP_DON_NHAP_BAO_GIA'); }

// Tự động thu nhỏ các ảnh cũ bị nặng quá 80KB còn sót trong bộ nhớ nháp trước khi gửi lên Cloud
  function nenAnhBase64NeuNang(base64Str) {
    return new Promise((resolve) => {
      if (!base64Str || !base64Str.startsWith("data:image") || base64Str.length < 80000) {
        return resolve(base64Str || "");
      }
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const limit = 600;
        let w = img.width, h = img.height;
        if (w > h && w > limit) { h = Math.round((h * limit) / w); w = limit; }
        else if (h >= w && h > limit) { w = Math.round((w * limit) / h); h = limit; }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = () => resolve("");
      img.src = base64Str;
    });
  }

  async function luuVaoAppSheet() {
    const orderData = thuThapDuLieuHienTai();
    if (!orderData.ma || !orderData.khach) {
      return showToast("⚠️ Vui lòng nhập Mã số và Tên khách hàng!", true);
    }
    document.getElementById('loading-overlay').style.display = "flex";
    document.querySelector('.loading-text').innerText = "Đang tối ưu dung lượng và lưu lên Cloud...";

    try {
      // Quét và nén gọn ảnh cũ trước khi truyền đi
      orderData.watermark = await nenAnhBase64NeuNang(orderData.watermark);
      for (let i = 0; i < orderData.gioHang.length; i++) {
        orderData.gioHang[i].anh = await nenAnhBase64NeuNang(orderData.gioHang[i].anh);
      }

      google.script.run
        .withSuccessHandler(() => {
          document.getElementById('loading-overlay').style.display = "none";
          showToast("☁️ Đã lưu đơn hàng [" + orderData.ma + "] lên Cloud thành công!");
          taiDanhSachDonLuuApp(); 
        })
        .withFailureHandler(err => {
          document.getElementById('loading-overlay').style.display = "none";
          showToast("❌ Lỗi: " + (err.message || err), true);
          alert("Chi tiết lỗi lưu Cloud:\n" + (err.message || err));
        })
        .luuDonVaoAppSheet(orderData);
    } catch (e) {
      document.getElementById('loading-overlay').style.display = "none";
      showToast("❌ Lỗi xử lý: " + e.message, true);
    }
  }

  function taiDanhSachDonLuuApp() {
    google.script.run.withSuccessHandler(list => {
      savedOrdersMap = list || [];
      if (typeof renderKapellaDashboard === 'function') renderKapellaDashboard();
      const sel = document.getElementById('savedOrdersSelect');
      sel.innerHTML = savedOrdersMap.length === 0
        ? '<option value="">-- Chưa có đơn hàng lưu --</option>'
        : '<option value="">-- Chọn đơn đã lưu (' + savedOrdersMap.length + ') --</option>';
      savedOrdersMap.forEach((item, idx) => {
        sel.innerHTML += `<option value="${idx}">[${item.loai}] ${item.ma} - ${item.khach}</option>`;
      });
    }).layDanhSachDonLuuApp();
  }

  function taiDonTuApp() {
    const idx = document.getElementById('savedOrdersSelect').value;
    if (idx === "") return showToast("⚠️ Chọn một đơn hàng!", true);
    try { apDungDuLieuDon(JSON.parse(savedOrdersMap[idx].json)); showToast("📂 Đã mở đơn hàng!"); }
    catch(e) { showToast("❌ Lỗi đọc dữ liệu!", true); }
  }

  function xoaDonTrongApp() {
    const idx = document.getElementById('savedOrdersSelect').value;
    if (idx === "") return showToast("⚠️ Chọn đơn cần xóa!", true);
    if (confirm(`Xóa đơn [${savedOrdersMap[idx].ma}]?`)) {
      google.script.run.withSuccessHandler(ok => {
        if (ok) { showToast("🗑️ Đã xóa!"); taiDanhSachDonLuuApp(); }
      }).xoaDonLuuApp(savedOrdersMap[idx].ma);
    }
  }
  let kpChartInstance = null;

  function chuyenManHinhKapella(view) {
    const isDash = (view === 'DASH');
    document.getElementById('viewDashboard').style.display = isDash ? 'block' : 'none';
    document.getElementById('viewStudio').style.display = isDash ? 'none' : 'flex';
    document.getElementById('tabBtnDash').classList.toggle('active', isDash);
    document.getElementById('tabBtnStudio').classList.toggle('active', !isDash);
    if (isDash) renderKapellaDashboard();
  }

  function renderKapellaDashboard() {
    const total = savedOrdersMap.length;
    const countEN = savedOrdersMap.filter(o => String(o.loai).includes('EN') || String(o.loai).includes('PI')).length;
    const countXK = savedOrdersMap.filter(o => String(o.loai).includes('XK')).length;
    const countVN = total - countEN - countXK;

    const elTotal = document.getElementById('kpTotalOrders');
    if (!elTotal) return;
    elTotal.innerText = total;
    document.getElementById('kpCountEN').innerText = countEN;
    document.getElementById('kpCountVN').innerText = (countVN + countXK) + ` (${countVN} VN / ${countXK} XK)`;
    document.getElementById('kpCountMaster').innerText = `${dbSP.length} SP / ${listKH.length} KH`;

    document.getElementById('kpBarEN').style.width = total ? Math.round((countEN / total) * 100) + '%' : '0%';
    document.getElementById('kpBarVN').style.width = total ? Math.round(((countVN + countXK) / total) * 100) + '%' : '0%';

    // Render bảng danh sách đơn có lọc tìm kiếm
    const kw = (document.getElementById('kpSearchOrder')?.value || '').toLowerCase().trim();
    const tbody = document.getElementById('kpRecentOrdersBody');
    const filtered = savedOrdersMap
      .map((item, idx) => ({ ...item, origIdx: idx }))
      .filter(item => !kw || String(item.ma).toLowerCase().includes(kw) || String(item.khach).toLowerCase().includes(kw));

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#94a3b8;padding:20px;">Không có đơn hàng nào khớp tìm kiếm</td></tr>`;
    } else {
      tbody.innerHTML = filtered.map(item => {
        let badgeClass = 'kp-badge-vn';
        if (String(item.loai).includes('EN') || String(item.loai).includes('PI')) badgeClass = 'kp-badge-en';
        else if (String(item.loai).includes('XK')) badgeClass = 'kp-badge-xk';
        return `
          <tr>
            <td style="font-weight:700;color:#464dee;">${item.ma}</td>
            <td><span class="kp-badge ${badgeClass}">${item.loai}</span></td>
            <td style="font-weight:600;">${item.khach}</td>
            <td style="color:#64748b;">${item.ngay || ''}</td>
            <td style="text-align:right;">
              <button onclick="moDonTuDashboard(${item.origIdx})" style="background:#464dee;color:#fff;border:none;padding:4px 10px;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;">📂 Mở đơn</button>
            </td>
          </tr>`;
      }).join('');
    }

    // Vẽ biểu đồ Doughnut chuẩn Kapella
    const ctx = document.getElementById('kpOrderChart');
    if (ctx && typeof Chart !== 'undefined') {
      if (kpChartInstance) kpChartInstance.destroy();
      kpChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Báo giá VN', 'Quote / PI (EN)', 'Xuất Kho'],
          datasets: [{
            data: [countVN, countEN, countXK],
            backgroundColor: ['#464dee', '#0ddbb9', '#f6881f'],
            borderWidth: 0
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
      });
    }
  }

  function moDonTuDashboard(idx) {
    const sel = document.getElementById('savedOrdersSelect');
    if (sel) {
      sel.value = idx;
      taiDonTuApp();
      chuyenManHinhKapella('STUDIO');
    }
  }
  // =========================================================================
  // BỘ HÀM GIAO TIẾP FIREBASE FIRESTORE (THAY THẾ GOOGLE SHEETS)
  // =========================================================================

  // 1. Tải toàn bộ Database sản phẩm & Khách hàng từ Firestore khi mở ứng dụng
  async function taiDuLieuMasterTuFirestore() {
    try {
      showLoading(true);
      
      // Lấy danh sách Sản phẩm
      const spSnap = await db.collection("Database").get();
      dbSP = [];
      spSnap.forEach(doc => dbSP.push(doc.data()));
      
      // Lấy danh sách Khách hàng
      const khSnap = await db.collection("KhachHang").get();
      listKH = [];
      khSnap.forEach(doc => listKH.push(doc.data()));

      // Lấy danh sách Ngân hàng T/T
      const bankSnap = await db.collection("DM_Bank").get();
      listBank = [];
      bankSnap.forEach(doc => listBank.push(doc.data()));

      // Cập nhật lại giao diện chọn sản phẩm và khách hàng
      renderDropdownSanPham();
      renderDropdownKhachHang();
      renderDropdownBank();
      
      // Tải luôn danh sách đơn hàng đã lưu
      await taiDanhSachDonTuFirestore();

      showLoading(false);
      showToast("🔥 Đã đồng bộ dữ liệu từ Firebase thành công!");
    } catch (error) {
      showLoading(false);
      console.error("Lỗi tải dữ liệu Firestore: ", error);
      showToast("❌ Không thể kết nối Firestore!", "error");
    }
  }

  // 2. Lưu đơn hàng (Báo giá / PI / Xuất kho) lên Firestore
  async function luuVaoAppSheet() {
    try {
      const maDon = document.getElementById('inMa').value.trim();
      const tenKhach = document.getElementById('inKhach').value.trim();
      if (!maDon || !tenKhach) {
        showToast("⚠️ Vui lòng nhập Mã chứng từ và Tên khách hàng!", "error");
        return;
      }

      showLoading(true);
      const donData = {
        ma: maDon,
        loai: cheDoHienTai, // BG_VN, BG_EN, XK
        khach: tenKhach,
        lienHe: document.getElementById('inLienHe').value,
        ngay: document.getElementById('inNgay').value,
        dieuKhoan: document.getElementById('inDieuKhoan').value,
        paymentTerm: document.getElementById('inPaymentTerm').value,
        bankInfo: document.getElementById('inBankInfo').value || '',
        items: cartItems,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      // Lưu vào collection "Orders" trên Firestore (dùng mã đơn làm Document ID)
      await db.collection("Orders").doc(maDon).set(donData, { merge: true });

      showLoading(false);
      showToast("🚀 Đã lưu đơn hàng lên Cloud Firebase thành công!");
      await taiDanhSachDonTuFirestore();
    } catch (error) {
      showLoading(false);
      console.error("Lỗi lưu đơn: ", error);
      showToast("❌ Lưu đơn thất bại!", "error");
    }
  }

  // 3. Tải danh sách đơn hàng đổ ra bảng Dashboard và Dropdown mở đơn
  async function taiDanhSachDonTuFirestore() {
    try {
      const snapshot = await db.collection("Orders").orderBy("updatedAt", "desc").get();
      savedOrdersMap = [];
      snapshot.forEach(doc => {
        savedOrdersMap.push(doc.data());
      });

      // Cập nhật Dropdown chọn đơn ở cột trái
      const sel = document.getElementById('savedOrdersSelect');
      if (sel) {
        sel.innerHTML = `<option value="">-- Chọn đơn đã lưu (${savedOrdersMap.length}) --</option>` +
          savedOrdersMap.map((o, idx) => `<option value="${idx}">[${o.loai}] ${o.ma} - ${o.khach}</option>`).join('');
      }

      // Cập nhật Kapella Dashboard nếu đang mở
      if (typeof renderKapellaDashboard === 'function') {
        renderKapellaDashboard();
      }
    } catch (error) {
      console.error("Lỗi tải danh sách đơn: ", error);
    }
  }

  // 4. Mở đơn từ danh sách đã lưu
  function taiDonTuApp() {
    const idx = document.getElementById('savedOrdersSelect').value;
    if (idx === "") return;
    const item = savedOrdersMap[idx];
    if (!item) return;

    cheDoHienTai = item.loai || 'BG_VN';
    document.getElementById('inMa').value = item.ma || '';
    document.getElementById('inKhach').value = item.khach || '';
    document.getElementById('inLienHe').value = item.lienHe || '';
    document.getElementById('inNgay').value = item.ngay || '';
    document.getElementById('inDieuKhoan').value = item.dieuKhoan || '';
    document.getElementById('inPaymentTerm').value = item.paymentTerm || '';
    if(document.getElementById('inBankInfo')) document.getElementById('inBankInfo').value = item.bankInfo || '';
    
    cartItems = item.items || [];
    renderTable();
    updatePreview();
    showToast(`📂 Đã mở đơn: ${item.ma}`);
  }

  // 5. Xóa đơn hàng trên Firestore
  async function xoaDonTrongApp() {
    const idx = document.getElementById('savedOrdersSelect').value;
    if (idx === "") {
      showToast("⚠️ Vui lòng chọn đơn cần xóa!", "error");
      return;
    }
    const item = savedOrdersMap[idx];
    if (!confirm(`Bạn có chắc chắn muốn xóa đơn hàng [${item.ma}] trên Cloud không?`)) return;

    try {
      showLoading(true);
      await db.collection("Orders").doc(item.ma).delete();
      showLoading(false);
      showToast("🗑️ Đã xóa đơn thành công!");
      await taiDanhSachDonTuFirestore();
    } catch (error) {
      showLoading(false);
      console.error("Lỗi xóa đơn: ", error);
      showToast("❌ Xóa đơn thất bại!", "error");
    }
  }

  // 6. Lưu Khách hàng mới vào Firestore
  async function luuKhachHangMoi() {
    const ten = document.getElementById('inKhach').value.trim();
    const lienHe = document.getElementById('inLienHe').value.trim();
    if (!ten) {
      showToast("⚠️ Vui lòng nhập tên khách hàng trước khi lưu!", "error");
      return;
    }
    try {
      const khId = 'KH_' + Date.now();
      await db.collection("KhachHang").doc(khId).set({ tenKhach: ten, thongTin: lienHe });
      showToast("➕ Đã lưu Khách hàng vào Firestore thành công!");
      taiDuLieuMasterTuFirestore();
    } catch (error) {
      console.error("Lỗi lưu KH: ", error);
      showToast("❌ Lưu KH thất bại!", "error");
    }
  }

  // 7. Lưu Sản phẩm mới vào Firestore
  async function luuSanPhamMoi() {
    const ten = document.getElementById('inTenSP').value.trim();
    if (!ten) {
      showToast("⚠️ Vui lòng nhập tên sản phẩm trước khi lưu!", "error");
      return;
    }
    try {
      const spId = 'SP_' + Date.now();
      const spData = {
        maSP: document.getElementById('inMaSPMoi').value || spId,
        tenSP: ten,
        dvt: document.getElementById('inDVT').value || 'Cái',
        gia: parseFloat(document.getElementById('inGia').value) || 0
      };
      await db.collection("Database").doc(spId).set(spData);
      showToast("➕ Đã lưu Sản phẩm vào Firestore thành công!");
      taiDuLieuMasterTuFirestore();
    } catch (error) {
      console.error("Lỗi lưu SP: ", error);
      showToast("❌ Lưu SP thất bại!", "error");
    }
  }

  // Các hàm phụ trợ đổ dữ liệu vào thẻ Select
  function renderDropdownSanPham() {
    const sel = document.getElementById('spSelect');
    if (!sel) return;
    sel.innerHTML = `<option value="">-- Chọn sản phẩm từ Database --</option>` +
      dbSP.map((s, i) => `<option value="${i}">${s.maSP ? '['+s.maSP+'] ' : ''}${s.tenSP} (${s.dvt || 'Cái'}) - ${formatMoney(s.gia || 0)}</option>`).join('');
  }

  function renderDropdownKhachHang() {
    const sel = document.getElementById('khSelect');
    if (!sel) return;
    sel.innerHTML = `<option value="">-- Chọn khách hàng CRM --</option>` +
      listKH.map((k, i) => `<option value="${i}">${k.tenKhach}</option>`).join('');
  }

  function renderDropdownBank() {
    const sel = document.getElementById('bankSelect');
    if (!sel) return;
    sel.innerHTML = `<option value="">-- Chọn Ngân hàng T/T --</option>` +
      listBank.map((b, i) => `<option value="${i}">${b.tenBank || b.bankName}</option>`).join('');
  }

  function chonKhachHangCRM() {
    const idx = document.getElementById('khSelect').value;
    if (idx === "") return;
    const kh = listKH[idx];
    document.getElementById('inKhach').value = kh.tenKhach || '';
    document.getElementById('inLienHe').value = kh.thongTin || '';
    updatePreview();
  }

  function chonSPDatabase() {
    const idx = document.getElementById('spSelect').value;
    if (idx === "") return;
    const sp = dbSP[idx];
    document.getElementById('inTenSP').value = sp.tenSP || '';
    document.getElementById('inMaSPMoi').value = sp.maSP || '';
    document.getElementById('inDVT').value = sp.dvt || 'Cái';
    document.getElementById('inGia').value = sp.gia || 0;
  }

  function chonBankTuSheet() {
    const idx = document.getElementById('bankSelect').value;
    if (idx === "") return;
    const b = listBank[idx];
    const textBank = `Beneficiary Name: ${b.accName || ''}\nA/C No: ${b.accNo || ''}\nBank Name: ${b.tenBank || ''}\nSwift Code: ${b.swift || ''}`;
    document.getElementById('inBankInfo').value = textBank;
    updatePreview();
  }
</script>