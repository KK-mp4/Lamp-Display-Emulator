<script setup lang="ts">
useHead({ title: "Generator" });

const src = ref("");
async function Draw() {
    // if (url === "") {
    //     alert("No image is selected!");
    //     return;
    // }

  const img = new Image();
  img.src = url;
  await new Promise((resolve) => {
    img.onload = () => resolve(1);
  });

  let imgWidth = img.width;
  let imgHeight = img.height;

  if (imgWidth > 512) {
    imgWidth = 512;
  }

  if (imgHeight > 512) {
    imgHeight = 512;
  }

  const imgCanvas = document.createElement("canvas");
  imgCanvas.width = imgWidth;
  imgCanvas.height = imgHeight;
  const imgContext = imgCanvas.getContext("2d");
  imgContext.drawImage(img, 0, 0, img.width, img.height);

  const canvas = document.createElement("canvas");
  canvas.width = imgWidth * 8;
  canvas.height = imgHeight * 8;
  const ctx = canvas.getContext("2d");

  const lampOff = new Image();
  lampOff.src = "/redstone_lamp_off.png";
  await new Promise((resolve) => {
    lampOff.onload = () => resolve(1);
  });

  const lampOn = new Image();
  lampOn.src = "/redstone_lamp_on.png";
  await new Promise((resolve) => {
    lampOn.onload = () => resolve(1);
  });

  for (let i = 0; i < imgHeight; i++) {
    for (let j = 0; j < imgWidth; j++) {
      const color = imgContext.getImageData(j, i, 1, 1).data;
      const brightness = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
      if (brightness >= 0.5) {
        ctx.drawImage(lampOn, j * 8, i * 8);
      } else {
        ctx.drawImage(lampOff, j * 8, i * 8);
      }
    }
  }

  src.value = canvas.toDataURL();
}

let url;


async function UploadImg(event) {
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed
        url = event.target.result;
        Draw();
        }
        console.log("Image loaded: " + url);
    }
}

</script>

<template>
  <div class="flex justify-center flex-wrap pt-10 flex-col items-center">
    <input class="block text-sm text-gray-400 rounded-lg border cursor-pointer focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" type="file" accept=".png, .jpg" @change="UploadImg($event)">
    <p class="mt-1 text-sm text-gray-300">PNG or JPG (MAX. 512x512px).</p>
    <div
      class="w-full h-full mt-5 flex justify-center"
      style="image-rendering: pixelated"
    >
      <img :src="src" class="w-[75%]" />
    </div>
  </div>
</template>

<style>
#canvas {
  border: 1px solid white;
}
</style>
