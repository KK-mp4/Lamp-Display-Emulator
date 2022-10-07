# Minecraft [Redstone Lamp](https://minecraft.fandom.com/wiki/Redstone_Lamp) Display Emulator
Website for converting images to Minecraft redstone lamps. Upload an image and each pixel based on its brightness **(0.2126\*R + 0.7152\*G + 0.0722\*B)** value will be converted to  on / off redstone lamp.  
Todo:
- add different dithering algorithms
- add different binarization algorithms
- add scaling algorithms

![screencapture-localhost-3000-2022-10-06-04_17_43](https://user-images.githubusercontent.com/103208695/194201556-68ab3f7d-e3b9-431b-8d80-c7361dacf09b.png)

Since each pixel becomes 8x8 I limited size to 512x512px. Instead of using vanilla 16x16px redstone lamp texture I used 8x8px texture from [Rodrigo's](https://www.curseforge.com/minecraft/texture-packs/rodrigos-pack) texture pack. Here are some examples of it working, for input I took pixelarts from [sexypixelize](https://sexypixelize.newgrounds.com/art) and processed them:

![3](https://user-images.githubusercontent.com/103208695/194202792-630edade-718e-42b2-b785-cc631e2d5888.png)  
Dithering algorithm: Jarvis-Judice  
![3](https://user-images.githubusercontent.com/103208695/194202803-8e5cad46-6101-4e10-938d-e9f8c6df4d0a.png)

![1](https://user-images.githubusercontent.com/103208695/194202834-5bbb5ccb-f661-4310-90b4-7358e660d995.png)  
Global binarization: threshold  
![1](https://user-images.githubusercontent.com/103208695/194202845-a8d257b6-7b43-46a0-ad70-7822937b6ec9.png)

![2](https://user-images.githubusercontent.com/103208695/194202859-43f3db9f-d3ad-45a5-9774-9ea33328f19f.png)  
Dithering algorithm: Floyd-Steinberg  
![2](https://user-images.githubusercontent.com/103208695/194202865-8637c622-0966-49c4-85fd-464fc9f19ab8.png)

![4](https://user-images.githubusercontent.com/103208695/194202874-6c1e9007-4b53-43fd-8ae2-c4382685e218.png)  
Dithering algorithm: Bayer 8x8  
![4](https://user-images.githubusercontent.com/103208695/194202881-9c59a910-6809-4984-a8f2-d97874b451cc.png)

![5](https://user-images.githubusercontent.com/103208695/194202892-5d435c6f-624f-46e3-8a10-153df3bfc495.png)  
Dithering algorithm: Jarvis-Judice  
![5](https://user-images.githubusercontent.com/103208695/194202897-7aa7c6c0-e935-4364-924e-54b8b90231d9.png)

![6](https://user-images.githubusercontent.com/103208695/194202901-9fd1ca30-a230-4001-a270-b73e07cbbdbd.png)  
Dithering algorithm: Jarvis-Judice  
![6](https://user-images.githubusercontent.com/103208695/194202907-23fc6510-f9b6-4afb-aff4-b450c04a0da5.png)


## How to launch using [Node.js](https://nodejs.org/en/) and [Visual Studio Code](https://code.visualstudio.com/download)

```bash
# install yarn
npm install --global yarn

# now install all modules
yarn

# now start project
yarn dev
```

## License
This program is licensed under the GPL-3.0 License. Please read the License file to know about the usage terms and conditions.
