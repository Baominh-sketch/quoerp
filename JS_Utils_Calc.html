<script>
  // CẦU NỐI API TỰ ĐỘNG KHI CHẠY TRÊN WEBSITE ĐỘC LẬP HOẶC ĐIỆN THOẠI
  const GAS_WEB_APP_URL = "";
  if (typeof google === "undefined" || !google.script) {
    function createGasBridge(onSuccess = null, onFailure = null) {
      return new Proxy({}, {
        get(_, prop) {
          if (prop === "withSuccessHandler") return (fn) => createGasBridge(fn, onFailure);
          if (prop === "withFailureHandler") return (fn) => createGasBridge(onSuccess, fn);
          return (...args) => {
            fetch(GAS_WEB_APP_URL, {
              method: "POST",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify({ action: prop, args: args })
            })
            .then(r => r.json())
            .then(d => d.status === "error" ? (onFailure && onFailure(new Error(d.message))) : (onSuccess && onSuccess(d.result)))
            .catch(err => onFailure && onFailure(err));
          };
        }
      });
    }
    window.google = { script: { run: createGasBridge() } };
  }

  // ĐỊNH DẠNG SỐ THEO TIỀN TỆ
  const fmt = (num) => {
    const curr = document.getElementById('inCurrency').value;
    const n = Number(num) || 0;
    return curr === 'USD'
      ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : Math.round(n).toLocaleString('vi-VN');
  };

  // ĐỌC SỐ TIỀN BẰNG CHỮ TIẾNG VIỆT (VNĐ)
  function docSoTienVND(totalAmount) {
    let val = Math.round(Number(totalAmount));
    if (!val || val <= 0) return "Không đồng.";
    const digits = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const scales = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ"];

    function readTriple(num, showZeroHundred) {
      let h = Math.floor(num / 100);
      let t = Math.floor((num % 100) / 10);
      let u = num % 10;
      let parts = [];
      if (h > 0 || showZeroHundred) parts.push(digits[h] + " trăm");
      if (t === 0 && u > 0 && (h > 0 || showZeroHundred)) parts.push("lẻ");
      else if (t === 1) parts.push("mười");
      else if (t > 1) parts.push(digits[t] + " mươi");

      if (u > 0) {
        if (t > 1 && u === 1) parts.push("mốt");
        else if (t >= 1 && u === 5) parts.push("lăm");
        else parts.push(digits[u]);
      }
      return parts.join(" ");
    }

    let groups = [];
    while (val > 0) {
      groups.push(val % 1000);
      val = Math.floor(val / 1000);
    }

    let textParts = [];
    for (let i = groups.length - 1; i >= 0; i--) {
      if (groups[i] > 0) {
        let hasHigher = i < groups.length - 1;
        textParts.push(readTriple(groups[i], hasHigher) + (scales[i] ? " " + scales[i] : ""));
      }
    }
    let finalStr = textParts.join(" ").trim();
    return finalStr.charAt(0).toUpperCase() + finalStr.slice(1) + " đồng chẵn.";
  }

  // ĐỌC SỐ TIỀN BẰNG CHỮ TIẾNG ANH (USD)
  function numberToWordsEN(numVal) {
    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const units = ["", "thousand", "million", "billion"];

    function convertChunk(n) {
      let res = "";
      if (n >= 100) { res += ones[Math.floor(n / 100)] + " hundred "; n %= 100; }
      if (n >= 20) { res += tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : ""); }
      else if (n > 0) { res += ones[n]; }
      return res.trim();
    }

    if (numVal === 0) return "zero";
    let idx = 0, out = [];
    while (numVal > 0) {
      let chunk = numVal % 1000;
      if (chunk > 0) out.unshift(convertChunk(chunk) + (units[idx] ? " " + units[idx] : ""));
      numVal = Math.floor(numVal / 1000);
      idx++;
    }
    return out.join(" ").trim();
  }

  function docSoTienUSD(amount) {
    let val = Number(amount);
    if (!val || val <= 0) return "US Dollars Zero only.";
    let dollars = Math.floor(val);
    let cents = Math.round((val - dollars) * 100);
    let mainWords = numberToWordsEN(dollars);
    mainWords = mainWords.charAt(0).toUpperCase() + mainWords.slice(1);
    return cents > 0
      ? `US Dollars ${mainWords} and ${numberToWordsEN(cents)} cents only.`
      : `US Dollars ${mainWords} only.`;
  }

 // NÉN VÀ TỐI ƯU HÓA ẢNH SIÊU NHẸ (CHỐNG TREO APP)
  function compressImageFile(file, maxDimension, quality, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const limit = Math.min(maxDimension, 650);
        let w = img.width, h = img.height;
        if (w > h && w > limit) { h = Math.round((h * limit) / w); w = limit; }
        else if (h >= w && h > limit) { w = Math.round((w * limit) / h); h = limit; }
        
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        
        // Lót nền trắng để ảnh trong suốt không bị nền đen
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        
        // Chuyển sang JPEG siêu nhẹ (chỉ ~35KB mỗi ảnh) nhưng vẫn cực nét
        callback(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function showToast(message, isError = false) {
    const toast = document.getElementById('custom-toast');
    toast.innerText = message;
    toast.style.borderLeftColor = isError ? '#f5365c' : '#2dce89';
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3500);
  }

  function chenMauNhanh(targetId, text, replaceAll = false) {
    const el = document.getElementById(targetId);
    el.value = (replaceAll || !el.value.trim()) ? text : (el.value.trim() + "\n" + text);
    updatePreview();
    showToast("⚡ Đã chèn nội dung mẫu!");
  }
</script>