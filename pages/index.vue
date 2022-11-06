<script setup lang="ts">
useHead({ title: "Generator" });

const textureResolution = ref("16x16"); // Lamp texture resolution
const src = ref(""); // DataURL of processed image
let textureSize = 16; // Lamp texture resolution
const maxSize = ref(512); // Displays maximum size for image depending on texture size
let inputUrl; // DataURL of uploaded image
const dithering = ref("None");  // Dithering algorithm option
const binarization = ref("None");  // Binarization algorithm option
const threshold = ref(128); // Threshold for binarization
const isLoading = ref(false); // Controls loading animation
const renderTime = ref(0);  // Time it took to process last image

const gammaCoorect = ref(false);  // Gamma correction toggle
const renderAsLamps = ref(true);  // Render lamps toggle

// binarization options
const matrixRadius = ref(15); // Matrix size for binarization
const sensitivity = ref(-0.2);  // Coefficient for Niblack method
const k = ref(0.25);  // Coefficient for Sauvola method
const t = ref(0.15);  // Coefficient for Wulff method
const a = ref(0.5); // Coefficient for Bradley-Roth method

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

  let binarizationData = imgContext.getImageData(0, 0, imgWidth, imgHeight);
  let ditheringData;

  if (binarization.value != "None") {
    switch (binarization.value) {
      case "Niblack": {
        binarizationNiblack(binarizationData, imgWidth, imgHeight, matrixRadius.value, sensitivity.value);
        break;
      }
      case "Sauvola": {
        binarizationSauvola(binarizationData, imgWidth, imgHeight, matrixRadius.value, k.value);
        break;
      }
      case "Wulff": {
        binarizationWulff(binarizationData, imgWidth, imgHeight, matrixRadius.value, a.value);
        break;
      }
      case "Bradley-Roth": {
        binarizationBradleyRoth(binarizationData, imgWidth, imgHeight, matrixRadius.value, t.value);
        break;
      }
    }
  }

  if (dithering.value != "None") {
    switch (dithering.value) {
      case "White noise": {
        ditheringData = ditherWhiteNoise(inputRGBA, threshold.value);
        break;
      }
      case "Blue noise": {
        ditheringData = await ditherBlueNoise(inputRGBA, threshold.value);
        break;
      }
      case "Interleaved Gradient Noise": {
        ditheringData = ditherIGN(inputRGBA, threshold.value);
        break;
      }
      case "R2": {
        ditheringData = ditherR2(inputRGBA, threshold.value);
        break;
      }
      case "Plus": {
        ditheringData = ditherPlus(inputRGBA, threshold.value);
        break;
      }
      case "Bayer 2x2": {
        ditheringData = ditherBayer2x2(inputRGBA, threshold.value);
        break;
      }
      case "Bayer 4x4": {
        ditheringData = ditherBayer4x4(inputRGBA, threshold.value);
        break;
      }
      case "Bayer 8x8": {
        ditheringData = ditherBayer8x8(inputRGBA, threshold.value);
        break;
      }
      case "Pattern Halftoning": {
        ditheringData = ditherPatternHalftoning(inputRGBA, threshold.value);
        break;
      }
      case "Cluster dot": {
        ditheringData = ditherClusterDot(inputRGBA, threshold.value);
        break;
      }
      case "Riemersma": {

        break;
      }
      case "Floyd-Steinberg": {
        ditheringData = ditherFloydSteinberg(inputRGBA, threshold.value);
        break;
      }
      case "Jarvis-Judice-Ninke": {
        ditheringData = ditherJarvisJudiceNinke(inputRGBA, threshold.value);
        break;
      }
      case "Atkinson": {
        ditheringData = ditherAtkinson(inputRGBA, threshold.value);
        break;
      }
      case "Stucki": {
        ditheringData = ditherStucki(inputRGBA, threshold.value);
        break;
      }
      case "Burkes": {
        ditheringData = ditherBurkes(inputRGBA, threshold.value);
        break;
      }
      case "Sierra": {
        ditheringData = ditherSierra(inputRGBA, threshold.value);
        break;
      }
      case "Two-Row Sierra": {
        ditheringData = ditherSierra2row(inputRGBA, threshold.value);
        break;
      }
      case "Sierra Lite": {
        ditheringData = ditherSierraLite(inputRGBA, threshold.value);
        break;
      }
      case "Stevenson-Arce": {
        ditheringData = ditherStevensonArce(inputRGBA, threshold.value);
        break;
      }
    }
  }

  // multiply overlay mode of dithered and binarized images
  if (binarization.value != "None" && dithering.value != "None") {
    for (let i = 0; i < binarizationData.data.length; i += 4) {
      const luminance = (binarizationData.data[i] * 0.299) + (binarizationData.data[i + 1] * 0.587) + (binarizationData.data[i + 2] * 0.114);
      ditheringData.data[i] *= luminance / 255;
      ditheringData.data[i + 1] *= luminance / 255;
      ditheringData.data[i + 2] *= luminance / 255;
    }

    imgContext.putImageData(ditheringData, 0, 0);
  }
  else if (binarization.value === "None" && dithering.value != "None") {
    imgContext.putImageData(ditheringData, 0, 0);
  }
  else if (binarization.value != "None" && dithering.value === "None") {
    imgContext.putImageData(binarizationData, 0, 0);
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
  renderTime.value = Date.now() - start;
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

async function checkSoefficients() {
  if (matrixRadius.value > 25) {
    matrixRadius.value = 25;
  }
  else if (matrixRadius.value < 1) {
    matrixRadius.value = 1;
  }
  else {
    matrixRadius.value = Math.floor(matrixRadius.value);
  }

  if (sensitivity.value > 0.2) {
    sensitivity.value = 0.2;
  }
  else if (sensitivity.value < -0.2) {
    sensitivity.value = -0.2;
  }

  if (k.value >= 1) {
    k.value = 0.9999;
  }
  else if (k.value < 0) {
    k.value = 0.0001;
  }

  if (a.value > 10) {
    a.value = 10;
  }
  else if (a.value < -10) {
    a.value = -10;
  }

  if (t.value > 1) {
    t.value = 1;
  }
  else if (t.value < 0) {
    t.value = 0;
  }

  if (inputUrl) {
    Draw();
  }
}
</script>

<template>
  <div class="flex justify-center flex-wrap pt-2 flex-col items-center min-w-[300px]">
    <p class="text-lg text-gray-300">Lamp Display Emulator by KK</p>
    <a class="text-xs text-blue-400 underline" href="https://github.com/KK-mp4/Lamp-Display-Emulator#readme" target="_blank" rel="noopener noreferrer">More info in GitHub</a>
    <a class="mb-5 text-xs text-blue-400 underline" href="https://kk-mp4.github.io/RGB-Lamp-Display-Emulator/">RGB 3 bit version</a>
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
        <input aria-label="Input for images to process" class="block w-[90%] text-sm text-gray-400 rounded-lg border cursor-pointer focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" type="file" accept=".png, .jpg" @change="UploadImg($event)">
        <div class="mt-3">
          <input aria-label="Gamma correct?" v-model= "gammaCoorect" @change="ResolutionChange()" id="Gamma correction" type="checkbox" class="w-3 h-3 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600">
          <label for="default-checkbox" class="ml-1 text-xs font-medium text-gray-300">Gamma correction</label>
          <input aria-label="Render lamps?" v-model= "renderAsLamps" @change="ResolutionChange()" id="Apply lamp texture" type="checkbox" class="ml-7 w-3 h-3 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600">
          <label for="default-checkbox" class="ml-1 text-xs font-medium text-gray-300">Apply lamp texture</label>
        </div>
      </div>
      <div class="w-[300px] mb-5">
        <p class="mb-1 text-sm text-gray-300">Binarization algorithm:</p>
        <select v-model="binarization" class="w-[90%] rounded-lg border h-7 bg-gray-700 border-gray-600 text-gray-400" @change="ResolutionChange()">
          <option value="None">None</option>
          <option class="text-[0px] bg-gray-500" disabled>&nbsp;</option>
          <option value="Niblack">Niblack method</option>
          <option value="Sauvola">Sauvola method</option>
          <option value="Wulff">Wulff method</option>
          <option value="Bradley-Roth">Bradley-Roth method</option>
        </select>
        <div class="flex flex-row w-[90%] mt-5 justify-between">
          <div v-if="binarization != 'None'" class="w-[45%]">
            <p class="mb-1 text-sm text-gray-300">Matrix radius:</p>
            <input v-model="matrixRadius" type="number" min="1" step="1" max="25" id="Matrix radius" @change="checkSoefficients()" class="block h-7 w-full rounded-lg border sm:text-xs bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div v-if="binarization === 'Niblack'" class="w-[45%]">
            <p class="mb-1 text-sm text-gray-300">Sensitivity:</p>
            <input v-model="sensitivity" type="number" min="-0.2" step="0.4" max="0.2" id="Sensitivity" @change="checkSoefficients()" class="block h-7 w-full rounded-lg border sm:text-xs bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div v-if="binarization === 'Sauvola'" class="w-[45%]">
            <p class="mb-1 text-sm text-gray-300">k:</p>
            <input v-model="k" type="number" id="k" min="0.0001" step="0.01" max="0.9999" @change="checkSoefficients()" class="block h-7 w-full rounded-lg border sm:text-xs bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div v-if="binarization === 'Wulff'" class="w-[45%]">
            <p class="mb-1 text-sm text-gray-300">a:</p>
            <input v-model="a" type="number" id="a" min="-10" step="0.1" max="10" @change="checkSoefficients()" class="block h-7 w-full rounded-lg border sm:text-xs bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div v-if="binarization === 'Bradley-Roth'" class="w-[45%]">
            <p class="mb-1 text-sm text-gray-300">t:</p>
            <input v-model="t" type="number" id="t" min="0" step="0.05" max="1" @change="checkSoefficients()" class="block h-7 w-full rounded-lg border sm:text-xs bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
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
          <option value="Bayer 2x2">Bayer 2x2</option>
          <option value="Bayer 4x4">Bayer 4x4</option>
          <option value="Bayer 8x8">Bayer 8x8</option>
          <option value="Pattern Halftoning">Pattern Halftoning</option>
          <option value="Cluster dot">Cluster dot</option>
          <option class="text-[0px] bg-gray-500" disabled>&nbsp;</option>
          <option value="Riemersma">WIP Riemersma</option>
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
        <label class="block mb-2 text-sm font-medium text-gray-300">Quantization threshold: {{  threshold }}</label>
        <input aria-label="Quantization threshold" v-model="threshold" type="range" min="0" max="255" class="mb-4 w-[90%] h-2 rounded-lg appearance-none cursor-pointer bg-gray-700" @change="ResolutionChange()">
      </div>
    </div>
    <img v-if="isLoading" class="animate-spin h-7 w-7 top-52 absolute" src="/load.png" />
    <div class="flex justify-center" style="image-rendering: pixelated">
      <img :src="src" v-if="src" class="min-w-[300px] w-[90vw] h-[70vh] object-contain"/>
    </div>
    <p v-if="src && !isLoading" class="fixed bottom-5 right-5">{{ renderTime }} ms</p>
  </div>
</template>