<script setup lang="ts">
useHead({ title: "Generator" });

const textureResolution = ref("16x16"); // Lamp texture resolution
const src = ref(""); // DataURL of processed image
let textureSize = 16; // Lamp texture resolution
const maxSize = ref(512); // Displays maximum size for image depending on texture size
let inputUrl; // DataURL of uploaded image
const dithering = ref("None");  // Dithering algorithm option
const threshold = ref(128); // Threshold for binarization
const isLoading = ref(false); // Controls loading animation

const gammaCoorect = ref(false);
const renderAsLamps = ref(true);

// Canvas needed for animated favicon
let faviCanvas = document.createElement("canvas");
faviCanvas.width = 16;
faviCanvas.height = 16;
let favictx = faviCanvas.getContext("2d");

// Rendering function
async function Draw() {
  const start = Date.now();
  isLoading.value = true;
  setLoadFavicon();

  const img = new Image();
  img.src = inputUrl;
  await new Promise((resolve) => {
    img.onload = () => resolve(1);
  });

  let imgWidth = img.width;
  let imgHeight = img.height;

  // Limits input image to max size depending on selected rs lamp res
  if (imgWidth > maxSize.value) {
    imgWidth = maxSize.value;
  }

  if (imgHeight > maxSize.value) {
    imgHeight = maxSize.value;
  }

  const imgCanvas = document.createElement("canvas");
  imgCanvas.width = imgWidth;
  imgCanvas.height = imgHeight;
  const imgContext = imgCanvas.getContext("2d", { willReadFrequently: true });
  imgContext.drawImage(img, 0, 0, img.width, img.height);
  const inputRGBA = imgContext.getImageData(0, 0, imgWidth, imgHeight);

  // gamma correction
  if (gammaCoorect.value) {
    const gammaCorrectionData = gammaCorrection(inputRGBA);
    imgContext.putImageData(gammaCorrectionData, 0, 0);
  }

  switch (dithering.value) {
    case "None": {
      break;
    }
    case "White noise": {
      const processedData = ditherWhiteNoise(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Blue noise": {
      const processedData = await ditherBlueNoise(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Interleaved Gradient Noise": {
      const processedData = ditherIGN(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "R2": {
      const processedData = ditherR2(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Plus": {
      const processedData = ditherPlus(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Bayer 2x2": {
      const processedData = ditherBayer2x2(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Bayer 4x4": {
      const processedData = ditherBayer4x4(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Bayer 8x8": {
      const processedData = ditherBayer8x8(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Riemersma": {

      break;
    }
    case "Floyd-Steinberg": {
      const processedData = ditherFloydSteinberg(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Jarvis-Judice-Ninke": {
      const processedData = ditherJarvisJudiceNinke(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Atkinson": {
      const processedData = ditherAtkinson(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Stucki": {
      const processedData = ditherStucki(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Burkes": {
      const processedData = ditherBurkes(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Sierra": {
      const processedData = ditherSierra(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Two-Row Sierra": {
      const processedData = ditherSierra2row(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Sierra Lite": {
      const processedData = ditherSierraLite(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
    case "Stevenson-Arce": {
      const processedData = ditherStevensonArce(inputRGBA);
      imgContext.putImageData(processedData, 0, 0);
      break;
    }
  }

  // Loading of lamp textures
  const lampOff = new Image();
  lampOff.src = "./" + textureResolution.value + "/redstone_lamp_off.png";
  await new Promise((resolve) => {
    lampOff.onload = () => resolve(1);
  });

  const lampOn = new Image();
  lampOn.src = "./" + textureResolution.value + "/redstone_lamp_on.png";
  await new Promise((resolve) => {
    lampOn.onload = () => resolve(1);
  });

  const canvas = document.createElement("canvas");
  canvas.width = imgWidth * textureSize;
  canvas.height = imgHeight * textureSize;
  const ctx = canvas.getContext("2d");

  // Generation of the output 
  if (renderAsLamps.value) {
    const imgRGBA = imgContext.getImageData(0, 0, imgWidth, imgHeight);
    for (let i = 0; i < imgHeight; i++) {
      for (let j = 0; j < imgWidth; j++) {
        const pixelBrightness = 0.2126 * imgRGBA.data[((i * imgWidth) + j) * 4] + 0.7152 * imgRGBA.data[(((i * imgWidth) + j) * 4) + 1] + 0.0722 * imgRGBA.data[(((i * imgWidth) + j) * 4) + 2];
        if (pixelBrightness >= threshold.value) {
          ctx.drawImage(lampOn, j * textureSize, i * textureSize);
        } else {
          ctx.drawImage(lampOff, j * textureSize, i * textureSize);
        }
      }
    }

    src.value = canvas.toDataURL();
  }
  else {
    src.value = imgCanvas.toDataURL();
  }

  isLoading.value = false;
  setNormalFavicon();
  console.log(Date.now() - start + "ms - Calculation time");
}

function gammaCorrection(image) {
  for (let i = 0; i < image.data.length; i += 4) {
    const vR = image.data[i] / 255;
    const vG = image.data[i + 1] / 255;
    const vB = image.data[i + 2] / 255;

    // image.data[i] = sRGBtoLin(vR);
    // image.data[i + 1] = sRGBtoLin(vG);
    // image.data[i + 2] = sRGBtoLin(vB);

    const Y = (0.2126 * sRGBtoLin(vR) + 0.7152 * sRGBtoLin(vG) + 0.0722 * sRGBtoLin(vB))
    const starL = YtoLstar(Y) * 2.55;
    image.data.fill(starL, i, i + 3);
  }

  return image;
}

function sRGBtoLin(colorChannel) {
  if ( colorChannel <= 0.04045 ) {
      return colorChannel / 12.92;
  }
  else {
      return Math.pow((( colorChannel + 0.055) / 1.055), 2.4);
  }
}

function YtoLstar(Y) {
  if ( Y <= (216/24389)) {
      return Y * (24389 / 27);
  }
  else {
      return Math.pow(Y,(1 / 3)) * 116 - 16;
  }
}

function ditherWhiteNoise(image) {
  for (let i = 0; i < image.data.length; i += 4) {
    const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    const map = Math.floor((luminance + (Math.random() * 255)) / 2);
    const value = map < threshold.value ? 0 : 255;
    image.data.fill(value, i, i + 3);
  }

  return image;
}

function ditherIGN(image) {
  for (let i = 0; i < image.data.length; i += 4) {
    const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    const x = i / 4 % image.width;
    const y = Math.floor(i / 4 / image.width);
    const val = ((((0.06711056 * x) + (0.00583715 * y)) % 1) * 52.9829189 ) % 1;
    const map = Math.floor((luminance + (val * 255)) / 2);
    const value = map < threshold.value ? 0 : 255;
    image.data.fill(value, i, i + 3);
  }

  return image;
}

async function ditherBlueNoise(image) {
  const blueNoise = new Image();
  blueNoise.src = "./bluenoise.png";
  await new Promise((resolve) => {
    blueNoise.onload = () => resolve(1);
  });

  const width = blueNoise.width;
  const height = blueNoise.height;

  const blueNoiseCanvas = document.createElement("canvas");
  blueNoiseCanvas.width = width;
  blueNoiseCanvas.height = height;
  const BlueNoiseCtx = blueNoiseCanvas.getContext("2d", { willReadFrequently: true });
  BlueNoiseCtx.drawImage(blueNoise, 0, 0, width, height);
  const noiseData = BlueNoiseCtx.getImageData(0, 0, width, height);

  for (let i = 0; i < image.data.length; i += 4) {
    const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    const x = i / 4 % image.width;
    const y = Math.floor(i / 4 / image.width);
    const map = Math.floor((luminance + noiseData.data[(x % width) * 4 * width + (y % height) * 4]) / 2);
    const value = map < threshold.value ? 0 : 255;
    image.data.fill(value, i, i + 3);
  }

  return image;
}

function ditherR2(image) {
  for (let i = 0; i < image.data.length; i += 4) {
    const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    const x = i / 4 % image.width;
    const y = Math.floor(i / 4 / image.width);
    const val = (x / 1.32471795724474602596 + y / (1.32471795724474602596 * 1.32471795724474602596)) % 1;
    const map = Math.floor((luminance + (val * 255)) / 2);
    const value = map < threshold.value ? 0 : 255;
    image.data.fill(value, i, i + 3);
  }

  return image;
}

function ditherPlus(image) {
  for (let i = 0; i < image.data.length; i += 4) {
    const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    const x = i / 4 % image.width;
    const y = Math.floor(i / 4 / image.width);
    const val = (x / 5 + y * 0.6) % 1;
    const map = Math.floor((luminance + (val * 255)) / 2);
    const value = map < threshold.value ? 0 : 255;
    image.data.fill(value, i, i + 3);
  }

  return image;
}

function ditherBayer2x2(image) {
  const thresholdMap = [
    [0,  127],
    [192, 63]
  ];

  for (let i = 0; i < image.data.length; i += 4) {
    const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    const x = i / 4 % image.width;
    const y = Math.floor(i / 4 / image.width);
    const map = Math.floor((luminance + thresholdMap[x % 2][y % 2]) / 2);
    const value = map < threshold.value ? 0 : 255;
    image.data.fill(value, i, i + 3);
  }

  return image;
}

function ditherBayer4x4(image) {
  const thresholdMap = [
    [15, 135, 45, 165],
    [195, 75, 225, 105],
    [60, 180, 30, 150],
    [240, 120, 210, 90]
  ];

  for (let i = 0; i < image.data.length; i += 4) {
    const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    const x = i / 4 % image.width;
    const y = Math.floor(i / 4 / image.width);
    const map = Math.floor((luminance + thresholdMap[x % 4][y % 4]) / 2);
    const value = map < threshold.value ? 0 : 255;
    image.data.fill(value, i, i + 3);
  }

  return image;
}

function ditherBayer8x8(image) {
  const thresholdMap = [
    [0,  32, 8,  40, 2,  34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4,  36, 14, 46, 6,  38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3,  35, 11, 43, 1,  33, 9,  41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7,  39, 13, 45, 5,  37],
    [63, 31, 55, 23, 61, 29, 53, 21]
  ];

  for (let i = 0; i < image.data.length; i += 4) {
    const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    const x = i / 4 % image.width;
    const y = Math.floor(i / 4 / image.width);
    const map = Math.floor((luminance + (thresholdMap[x % 8][y % 8] * 4)) / 2);
    const value = map < threshold.value ? 0 : 255;
    image.data.fill(value, i, i + 3);
  }

  return image;
}

function ditherFloydSteinberg(image) {
  // credits to https://github.com/NielsLeenheer/CanvasDither
  const width = image.width;
  const luminance = new Uint8ClampedArray(image.width * image.height);

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
  }

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    const value = luminance[l] < threshold.value ? 0 : 255;
    const error = Math.floor((luminance[l] - value) / 16);
    image.data.fill(value, i, i + 3);

    luminance[l + 1] += error * 7;
    luminance[l + width - 1] += error * 3;
    luminance[l + width] += error * 5;
    luminance[l + width + 1] += error;
  }

  return image;
}

function ditherAtkinson(image) {
  const width = image.width;
  const luminance = new Uint8ClampedArray(image.width * image.height);

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
  }

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    const value = luminance[l] < threshold.value ? 0 : 255;
    const error = Math.floor((luminance[l] - value) / 8);
    image.data.fill(value, i, i + 3);

    luminance[l + 1] += error;
    luminance[l + 2] += error;
    luminance[l + width - 1] += error;
    luminance[l + width] += error;
    luminance[l + width + 1] += error;
    luminance[l + 2 * width] += error;
  }

  return image;
}

function ditherJarvisJudiceNinke(image) {
  const width = image.width;
  const luminance = new Uint8ClampedArray(image.width * image.height);

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
  }

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    const value = luminance[l] < threshold.value ? 0 : 255;
    const error = Math.floor((luminance[l] - value) / 48);
    image.data.fill(value, i, i + 3);

    luminance[l + 1] += error * 7;
    luminance[l + 2] += error * 5;
    luminance[l + width - 2] += error * 3;
    luminance[l + width - 1] += error * 5;
    luminance[l + width] += error * 7;
    luminance[l + width + 1] += error * 5;
    luminance[l + width + 2] += error * 3;
    luminance[l + (width * 2) - 2] += error;
    luminance[l + (width * 2) - 1] += error* 3;
    luminance[l + (width * 2)] += error * 5;
    luminance[l + (width * 2) + 1] += error * 3;
    luminance[l + (width * 2) + 2] += error;
  }

  return image;
}

function ditherStucki(image) {
  const width = image.width;
  const luminance = new Uint8ClampedArray(image.width * image.height);

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
  }

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    const value = luminance[l] < threshold.value ? 0 : 255;
    const error = Math.floor((luminance[l] - value) / 42);
    image.data.fill(value, i, i + 3);

    luminance[l + 1] += error << 3;
    luminance[l + 2] += error << 2;
    luminance[l + width - 2] += error << 1;
    luminance[l + width - 1] += error << 2;
    luminance[l + width] += error << 3;
    luminance[l + width + 1] += error << 2;
    luminance[l + width + 2] += error << 1;
    luminance[l + (width * 2) - 2] += error;
    luminance[l + (width * 2) - 1] += error << 1;
    luminance[l + (width * 2)] += error << 2;
    luminance[l + (width * 2) + 1] += error << 1;
    luminance[l + (width * 2) + 2] += error;
  }

  return image;
}

function ditherBurkes(image) {
  const width = image.width;
  const luminance = new Uint8ClampedArray(image.width * image.height);

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
  }

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    const value = luminance[l] < threshold.value ? 0 : 255;
    const error = Math.floor((luminance[l] - value) / 32);
    image.data.fill(value, i, i + 3);

    luminance[l + 1] += error << 3;
    luminance[l + 2] += error << 2;
    luminance[l + width - 2] += error << 1;
    luminance[l + width - 1] += error << 2;
    luminance[l + width] += error << 3;
    luminance[l + width + 1] += error << 2;
    luminance[l + width + 2] += error << 1;
  }

  return image;
}

function ditherSierra(image) {
  const width = image.width;
  const luminance = new Uint8ClampedArray(image.width * image.height);

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
  }

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    const value = luminance[l] < threshold.value ? 0 : 255;
    const error = Math.floor((luminance[l] - value) / 32);
    image.data.fill(value, i, i + 3);

    luminance[l + 1] += error * 5;
    luminance[l + 2] += error * 3;
    luminance[l + width - 2] += error << 1;
    luminance[l + width - 1] += error << 2;
    luminance[l + width] += error * 5;
    luminance[l + width + 1] += error << 2;
    luminance[l + width + 2] += error << 1;
    luminance[l + (width * 2) - 1] += error << 1;
    luminance[l + (width * 2)] += error * 3;
    luminance[l + (width * 2) + 1] += error << 1;
  }

  return image;
}

function ditherSierra2row(image) {
  const width = image.width;
  const luminance = new Uint8ClampedArray(image.width * image.height);

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
  }

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    const value = luminance[l] < threshold.value ? 0 : 255;
    const error = Math.floor((luminance[l] - value) / 16);
    image.data.fill(value, i, i + 3);

    luminance[l + 1] += error << 2;
    luminance[l + 2] += error * 3;
    luminance[l + width - 2] += error;
    luminance[l + width - 1] += error << 1;
    luminance[l + width] += error * 3;
    luminance[l + width + 1] += error << 1;
    luminance[l + width + 2] += error;
  }

  return image;
}

function ditherSierraLite(image) {
  const width = image.width;
  const luminance = new Uint8ClampedArray(image.width * image.height);

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
  }

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    const value = luminance[l] < threshold.value ? 0 : 255;
    const error = Math.floor((luminance[l] - value) / 4);
    image.data.fill(value, i, i + 3);

    luminance[l + 1] += error << 1;
    luminance[l + width - 1] += error;
    luminance[l + width] += error;
  }

  return image;
}

function ditherStevensonArce(image) {
  const width = image.width;
  const luminance = new Uint8ClampedArray(image.width * image.height);

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
  }

  for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
    const value = luminance[l] < threshold.value ? 0 : 255;
    const error = Math.floor((luminance[l] - value) / 200);
    image.data.fill(value, i, i + 3);

    luminance[l + 2] += error << 5;
    luminance[l + width - 3] += error * 12;
    luminance[l + width - 1] += error * 26;
    luminance[l + width + 1] += error * 30;
    luminance[l + width + 3] += error << 4;
    luminance[l + (width * 2) - 2] += error * 12;
    luminance[l + (width * 2)] += error * 26;
    luminance[l + (width * 2) + 2] += error * 12;
    luminance[l + (width * 3) - 3] += error * 5;
    luminance[l + (width * 3) - 1] += error * 12;
    luminance[l + (width * 3) + 1] += error * 12;
    luminance[l + (width * 3) + 3] += error * 5;
  }

  return image;
}

// Uploads image to DataURL
async function UploadImg(event) {
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed
        inputUrl = event.target.result;
        Draw();
        }
    }
}

// Calls Draw function on resolution/dithering/threshold change
async function ResolutionChange() {
  if (textureResolution.value === "1x1") {
    textureSize = 1;
    maxSize.value = 8192;
  }
  else if (textureResolution.value === "2x2") {
    textureSize = 2;
    maxSize.value = 4096;
  }
  else if (textureResolution.value === "4x4") {
    textureSize = 4;
    maxSize.value = 2048;
  }
  else if (textureResolution.value === "8x8") {
    textureSize = 8;
    maxSize.value = 1024;
  }
  else if (textureResolution.value === "32x32") {
    textureSize = 32;
    maxSize.value = 256;
  }
  else {
    textureSize = 16;
    maxSize.value = 512;
  }

  if (inputUrl) {
    Draw();
  }
}

// Sets favicon to normal rs lamps while it generates an image
async function setLoadFavicon() {
  const img = new Image();
  img.src = "./faviconLoad.ico";
  await new Promise((resolve) => {
    img.onload = () => resolve(1);
  });

  favictx.drawImage(img, 0, 0, 16, 16);

  let favicon = document.getElementById("favicon");
  favicon.setAttribute("href", faviCanvas.toDataURL());
	history.replaceState(null, null, window.location.hash == "#1" ? "#0" : "#1");
}

// Sets favicon to lit rs lamps
async function setNormalFavicon() {
  const img = new Image();
  img.src = "./favicon.ico";
  await new Promise((resolve) => {
    img.onload = () => resolve(1);
  });

  favictx.drawImage(img, 0, 0, 16, 16);

  let favicon = document.getElementById("favicon");
  favicon.setAttribute("href", faviCanvas.toDataURL());
	history.replaceState(null, null, window.location.hash == "#1" ? "#0" : "#1");
}
</script>

<template>
  <div class="flex justify-center flex-wrap pt-2 flex-col items-center min-w-[300px]">
    <p class="text-lg text-gray-300">Lamp Display Emulator by KK</p>
    <a class="text-xs text-blue-400 underline" href="https://github.com/KK-mp4/Lamp-Display-Emulator#readme" target="_blank" rel="noopener noreferrer">More info in GitHub</a>
    <a class="mb-5 text-xs text-blue-400 underline" href="https://kk-mp4.github.io/RGB-Lamp-Display-Emulator/" target="_blank" rel="noopener noreferrer">RGB 3 bit version</a>
      <div class="flex flex-wrap flex-row justify-center">
      <div class="w-[300px] mb-5">
        <p class="mb-1 text-sm text-gray-300">Lamp texture resolution:</p>
        <select v-model="textureResolution" class="w-[90%] mb-5 rounded-lg border h-7 bg-gray-700 border-gray-600 text-gray-400" @change="ResolutionChange()">
          <option value="1x1">1x1</option>
          <option value="2x2">2x2</option>
          <option value="4x4">4x4</option>
          <option value="8x8">8x8</option>
          <option value="16x16">16x16</option>
          <option value="32x32">32x32</option>
        </select>
        <p class="mb-1 text-sm text-gray-300">PNG or JPG ({{ maxSize }}x{{ maxSize }}px max)</p>
        <input class="block w-[90%] text-sm text-gray-400 rounded-lg border cursor-pointer focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" type="file" accept=".png, .jpg" @change="UploadImg($event)">
      </div>
      <div class="w-[300px] mb-5">
        <p class="mb-1 text-sm text-gray-300">Dithering algorithm:</p>
        <select v-model="dithering" class="w-[90%] mb-5 rounded-lg border h-7 bg-gray-700 border-gray-600 text-gray-400" @change="ResolutionChange()">
          <option value="None">None</option>
          <option class="text-[0px] bg-gray-500" disabled>&nbsp;</option>
          <option value="White noise">White noise</option>
          <option value="Blue noise">Blue noise</option>
          <option value="Interleaved Gradient Noise">Interleaved Gradient noise</option>
          <option value="R2">R2</option>
          <option value="Plus">Plus</option>
          <option class="text-[0px] bg-gray-500" disabled>&nbsp;</option>
          <option value="Bayer 2x2">Bayer 2x2</option>
          <option value="Bayer 4x4">Bayer 4x4</option>
          <option value="Bayer 8x8">Bayer 8x8</option>
          <option value="Cluster dot">WIP Cluster dot</option>
          <option value="Riemersma">WIP Riemersma</option>
          <option class="text-[0px] bg-gray-500" disabled>&nbsp;</option>
          <option value="Floyd-Steinberg">Floyd-Steinberg</option>
          <option value="Gradient-based">WIP Gradient-based</option>
          <option value="Lattice-Boltzmann">WIP Lattice-Boltzmann</option>
          <option value="Jarvis-Judice-Ninke">Jarvis-Judice-Ninke</option>
          <option value="Atkinson">Atkinson</option>
          <option value="Stucki">Stucki</option>
          <option value="Burkes">Burkes</option>
          <option value="Sierra">Sierra</option>
          <option value="Two-Row Sierra">Two-Row Sierra</option>
          <option value="Sierra Lite">Sierra Lite</option>
          <option value="Stevenson-Arce">Stevenson-Arce</option>
        </select>
        <label class="block mb-2 text-sm font-medium text-gray-300">Threshold: {{  threshold }}</label>
        <input v-model="threshold" type="range" min="0" max="255" class="mb-4 w-[90%] h-2 rounded-lg appearance-none cursor-pointer bg-gray-700" @change="ResolutionChange()">
      </div>
      <div class="w-[300px] mb-5">
        <div class="mt-7 flex items-center mb-4">
          <input v-model= "gammaCoorect" @change="ResolutionChange()" id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600">
          <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-300">Gamma correction</label>
        </div>
        <div class="flex items-center mb-4">
          <input v-model= "renderAsLamps" @change="ResolutionChange()" id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600">
          <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-300">Apply lamp texture</label>
        </div>
      </div>
    </div>
    <img v-if="isLoading" class="animate-spin h-7 w-7 top-52 absolute" src="/load.png" />
    <div class="flex justify-center" style="image-rendering: pixelated">
      <img :src="src" v-if="src" class="w-[90vw] h-70vh object-contain"/>
    </div>
  </div>
</template>