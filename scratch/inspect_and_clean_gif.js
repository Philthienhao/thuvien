const fs = require('fs');

function parseGif(buf) {
  let pos = 0;
  const sig = buf.toString('ascii', 0, 6); pos += 6;
  const screenWidth = buf.readUInt16LE(pos); pos += 2;
  const screenHeight = buf.readUInt16LE(pos); pos += 2;
  const packed = buf[pos++];
  const gctFlag = (packed & 0x80) !== 0;
  const gctSize = 2 << (packed & 0x07);
  const bgColorIndex = buf[pos++];
  const pixelAspect = buf[pos++];

  let gct = null;
  if (gctFlag) {
    gct = buf.slice(pos, pos + gctSize * 3);
    pos += gctSize * 3;
  }

  const frames = [];
  let currentGce = null;
  const blocks = [];

  while (pos < buf.length) {
    const blockType = buf[pos++];
    if (blockType === 0x3B) {
      blocks.push({ type: 'trailer' });
      break;
    }
    if (blockType === 0x21) {
      const extType = buf[pos++];
      const blockSize = buf[pos++];
      if (extType === 0xF9) {
        const gcePacked = buf[pos];
        const delay = buf.readUInt16LE(pos + 1);
        const transIndex = buf[pos + 3];
        const hasTrans = (gcePacked & 0x01) !== 0;
        const disposal = (gcePacked >> 2) & 0x07;
        currentGce = { hasTrans, transIndex, delay, disposal, raw: buf.slice(pos - 3, pos + blockSize + 1) };
        pos += blockSize;
        pos++; // terminator 0
      } else {
        const startExt = pos - 2;
        pos += blockSize;
        while (pos < buf.length && buf[pos] !== 0) {
          pos += buf[pos] + 1;
        }
        pos++; // skip 0
        blocks.push({ type: 'ext', raw: buf.slice(startExt, pos) });
      }
    } else if (blockType === 0x2C) {
      const imgStart = pos - 1;
      const left = buf.readUInt16LE(pos); pos += 2;
      const top = buf.readUInt16LE(pos + 1); pos += 2;
      const width = buf.readUInt16LE(pos + 2); pos += 2;
      const height = buf.readUInt16LE(pos + 3); pos += 2;
      const imgPacked = buf[pos++];
      const lctFlag = (imgPacked & 0x80) !== 0;
      let lct = null;
      let colorCount = gctSize;
      if (lctFlag) {
        const lctSize = 2 << (imgPacked & 0x07);
        colorCount = lctSize;
        lct = buf.slice(pos, pos + lctSize * 3);
        pos += lctSize * 3;
      }
      const minCodeSize = buf[pos++];
      const subBlockStart = pos;
      const dataChunks = [];
      while (pos < buf.length && buf[pos] !== 0) {
        const subLen = buf[pos++];
        dataChunks.push(buf.slice(pos, pos + subLen));
        pos += subLen;
      }
      pos++; // terminator 0
      const compressedData = Buffer.concat(dataChunks);
      
      frames.push({
        gce: currentGce,
        left, top, width, height,
        lctFlag, lct, minCodeSize,
        compressedData,
        palette: lct || gct,
        rawHeader: buf.slice(imgStart, subBlockStart)
      });
      currentGce = null;
    }
  }

  return {
    sig, screenWidth, screenHeight, gctFlag, gctSize, bgColorIndex, pixelAspect, gct, frames, blocks
  };
}

const gif = parseGif(fs.readFileSync('avatargif.gif'));
console.log('GIF loaded. Screen:', gif.screenWidth, 'x', gif.screenHeight, 'Frames:', gif.frames.length);
gif.frames.forEach((f, i) => {
  console.log(`Frame ${i}: ${f.width}x${f.height} at (${f.left},${f.top}), minCodeSize: ${f.minCodeSize}, compressedLen: ${f.compressedData.length}, trans:`, f.gce ? f.gce.transIndex : 'none');
});
