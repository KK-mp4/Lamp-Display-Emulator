<script setup lang="ts">
useHead({ title: "Generator" });

const textureResolution = ref("16x16");
const src = ref("");
let textureSize = 16;
let maxSize = ref(512);
let inputUrl;

async function Draw() {
  const img = new Image();
  img.src = inputUrl;
  await new Promise((resolve) => {
    img.onload = () => resolve(1);
  });

  let imgWidth = img.width;
  let imgHeight = img.height;

  if (imgWidth > maxSize.value) {
    imgWidth = maxSize.value;
  }

  if (imgHeight > maxSize.value) {
    imgHeight = maxSize.value;
  }

  const imgCanvas = document.createElement("canvas");
  imgCanvas.width = imgWidth;
  imgCanvas.height = imgHeight;
  const imgContext = imgCanvas.getContext("2d");
  imgContext.drawImage(img, 0, 0, img.width, img.height);

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

  for (let i = 0; i < imgHeight; i++) {
    for (let j = 0; j < imgWidth; j++) {
      const color = imgContext.getImageData(j, i, 1, 1).data;
      const brightness = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
      if (brightness >= 0.5) {
        ctx.drawImage(lampOn, j * textureSize, i * textureSize);
      } else {
        ctx.drawImage(lampOff, j * textureSize, i * textureSize);
      }
    }
  }

  src.value = canvas.toDataURL();
}

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

async function ResolutionChane() {
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
  else {
    textureSize = 16;
    maxSize.value = 512;
  }

  if (inputUrl) {
    Draw();
  }
}

</script>

<template>
  <div class="flex justify-center flex-wrap pt-2 flex-col items-center min-w-[300px]">
    <p class="text-lg text-gray-300">Lamp Display Emulator by KK</p>
    <a class="mb-5 text-xs text-blue-400 underline" href="https://github.com/KK-mp4/Lamp-Display-Emulator#readme" target="_blank" rel="noopener noreferrer">More info in GitHub</a>
    <select v-model="textureResolution" class="w-64 mb-5 rounded-lg border h-7 bg-gray-700 border-gray-600 text-gray-400" @change="ResolutionChane()">
      <option value="1x1">1x1</option>
      <option value="2x2">2x2</option>
      <option value="4x4">4x4</option>
      <option value="8x8">8x8</option>
      <option value="16x16">16x16</option>
    </select>
    <input class="block text-sm text-gray-400 rounded-lg border cursor-pointer focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" type="file" accept=".png, .jpg" @change="UploadImg($event)">
    <p class="mt-1 text-sm text-gray-300">PNG or JPG ({{ maxSize }}x{{ maxSize }}px max)</p>
    <div
      class="w-full h-full mt-5 flex justify-center"
      style="image-rendering: pixelated"
    >
      <img :src="src" class="w-[75%]"/>
    </div>
  </div>
</template>
