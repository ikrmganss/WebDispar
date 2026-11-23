const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// 1. Decode PNG helper
function decodePNG(filePath) {
  const png = fs.readFileSync(filePath);
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  let offset = 8;
  const chunks = [];
  while (offset < png.length) {
    const len = png.readUInt32BE(offset);
    const type = png.slice(offset + 4, offset + 8).toString();
    if (type === 'IDAT') chunks.push(png.slice(offset + 8, offset + 8 + len));
    offset += 12 + len;
  }
  const uncompressed = zlib.inflateSync(Buffer.concat(chunks));
  const raw = Buffer.alloc(width * height * 4);
  const bpp = 4;
  const rowBytes = width * bpp;
  let srcPos = 0;
  for (let y = 0; y < height; y++) {
    const filter = uncompressed[srcPos++];
    const rowStart = y * rowBytes;
    for (let x = 0; x < rowBytes; x++) {
      const cur = uncompressed[srcPos++];
      const a = x >= bpp ? raw[rowStart + x - bpp] : 0;
      const b = y > 0 ? raw[rowStart - rowBytes + x] : 0;
      const c = (x >= bpp && y > 0) ? raw[rowStart - rowBytes + x - bpp] : 0;
      let val = 0;
      if (filter === 0) val = cur;
      else if (filter === 1) val = (cur + a) & 0xff;
      else if (filter === 2) val = (cur + b) & 0xff;
      else if (filter === 3) val = (cur + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr = a;
        if (pb < pa && pb <= pc) pr = b;
        else if (pc < pa && pc < pb) pr = c;
        val = (cur + pr) & 0xff;
      }
      raw[rowStart + x] = val;
    }
  }
  return { width, height, raw };
}

// 2. Encode PNG helper
function encodePNG(width, height, rgbaBuffer) {
  const rowBytes = width * 4;
  const filtered = Buffer.alloc(height * (rowBytes + 1));
  let destPos = 0;
  let srcPos = 0;
  for (let y = 0; y < height; y++) {
    filtered[destPos++] = 0; // Filter None
    rgbaBuffer.copy(filtered, destPos, srcPos, srcPos + rowBytes);
    destPos += rowBytes;
    srcPos += rowBytes;
  }

  const idatData = zlib.deflateSync(filtered, { level: 9 });

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = crc32(buf.slice(4, 8 + len));
    buf.writeInt32BE(crc, 8 + len);
    return buf;
  }

  // Simple CRC32 table
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c >>> 0;
  }
  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) | 0;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// 3. Process image 2
const srcPath = 'C:/Users/Welcome/.gemini/antigravity/brain/314713c5-5c31-4dcf-80fb-ec89d0a580d7/.user_uploaded/media_1795410302223_9f3ccf64.png';
const { width, height, raw } = decodePNG(srcPath);

// Target bounds for DINAS PARIWISATA
const cropX1 = 12;
const cropX2 = 428;
const cropY1 = 44;
const cropY2 = 82;
const cropW = cropX2 - cropX1 + 1;
const cropH = cropY2 - cropY1 + 1;

console.log(`Original crop: ${cropW} x ${cropH}`);

// Scale factor for ultra high-res (3x)
const scale = 3;
const outW = cropW * scale;
const outH = cropH * scale;
const outBufYellow = Buffer.alloc(outW * outH * 4);
const outBufWhite = Buffer.alloc(outW * outH * 4);

// Function to get smoothed alpha from src
function getSample(srcX, srcY) {
  if (srcX < 0 || srcX >= width || srcY < 0 || srcY >= height) return 0;
  const idx = (Math.floor(srcY) * width + Math.floor(srcX)) * 4;
  const r = raw[idx];
  const g = raw[idx + 1];
  const b = raw[idx + 2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const bg = 30; // background luminance
  if (lum <= bg + 1) return 0;
  return Math.min(255, ((lum - bg) / (255 - bg)) * 255);
}

// Bilinear sample
function sampleBilinear(sx, sy) {
  const x0 = Math.floor(sx);
  const y0 = Math.floor(sy);
  const x1 = Math.min(width - 1, x0 + 1);
  const y1 = Math.min(height - 1, y0 + 1);
  const fx = sx - x0;
  const fy = sy - y0;

  const s00 = getSample(x0, y0);
  const s10 = getSample(x1, y0);
  const s01 = getSample(x0, y1);
  const s11 = getSample(x1, y1);

  const top = s00 * (1 - fx) + s10 * fx;
  const bottom = s01 * (1 - fx) + s11 * fx;
  return top * (1 - fy) + bottom * fy;
}

// Golden yellow palette from Image 1:
// Top: #F7D04B (247, 208, 75)
// Middle: #F5BE2C (245, 190, 44)
// Bottom: #E5A315 (229, 163, 21)
for (let y = 0; y < outH; y++) {
  const sy = cropY1 + (y / scale);
  const vertRatio = y / outH; // 0 at top, 1 at bottom

  // Subtle golden yellow vertical gradient
  const yr = Math.round(247 * (1 - vertRatio) + 235 * vertRatio);
  const yg = Math.round(208 * (1 - vertRatio) + 172 * vertRatio);
  const yb = Math.round(75 * (1 - vertRatio) + 28 * vertRatio);

  for (let x = 0; x < outW; x++) {
    const sx = cropX1 + (x / scale);
    const alpha = Math.min(255, Math.round(sampleBilinear(sx, sy)));

    const outIdx = (y * outW + x) * 4;

    // Yellow version
    outBufYellow[outIdx] = yr;
    outBufYellow[outIdx + 1] = yg;
    outBufYellow[outIdx + 2] = yb;
    outBufYellow[outIdx + 3] = alpha;

    // White version
    outBufWhite[outIdx] = 255;
    outBufWhite[outIdx + 1] = 255;
    outBufWhite[outIdx + 2] = 255;
    outBufWhite[outIdx + 3] = alpha;
  }
}

// Ensure output dir exists
const outDir = path.join(__dirname, '../frontend/public/images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const yellowPngPath = path.join(outDir, 'dinas-pariwisata-yellow.png');
const whitePngPath = path.join(outDir, 'dinas-pariwisata-white.png');

fs.writeFileSync(yellowPngPath, encodePNG(outW, outH, outBufYellow));
fs.writeFileSync(whitePngPath, encodePNG(outW, outH, outBufWhite));

console.log(`Generated high-res yellow logo: ${yellowPngPath} (${outW}x${outH})`);
console.log(`Generated high-res white logo: ${whitePngPath} (${outW}x${outH})`);
