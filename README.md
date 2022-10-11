# Minecraft [Redstone Lamp](https://minecraft.fandom.com/wiki/Redstone_Lamp) Display Emulator
Website for converting images to Minecraft redstone lamps. Upload an image and each pixel based on its brightness **(0.2126\*R + 0.7152\*G + 0.0722\*B)** value will be converted to  on / off redstone lamp.  
Todo:
- add different dithering algorithms
- add different binarization algorithms
- add scaling algorithms

![image](https://user-images.githubusercontent.com/103208695/194985165-258b9bee-4f48-41e1-86bf-38f59934898a.png)

Here are some examples of it working, for input I took pixelarts from [sexypixelize](https://sexypixelize.newgrounds.com/art) and processed them:

![3](https://user-images.githubusercontent.com/103208695/194202792-630edade-718e-42b2-b785-cc631e2d5888.png)  
Dithering algorithm: Jarvis-Judice  
![image](https://user-images.githubusercontent.com/103208695/194718944-c83878a0-d990-4d6f-8e88-8ad1ce70d5f7.png)

![1](https://user-images.githubusercontent.com/103208695/194202834-5bbb5ccb-f661-4310-90b4-7358e660d995.png)  
Global binarization: threshold  
![image](https://user-images.githubusercontent.com/103208695/194718952-0236a0bb-ee77-43d6-b295-c78846d75621.png)

![2](https://user-images.githubusercontent.com/103208695/194202859-43f3db9f-d3ad-45a5-9774-9ea33328f19f.png)  
Dithering algorithm: Floyd-Steinberg  
![image](https://user-images.githubusercontent.com/103208695/194718977-564f5a3a-7208-4620-9877-3aae05cdb5ae.png)

![4](https://user-images.githubusercontent.com/103208695/194202874-6c1e9007-4b53-43fd-8ae2-c4382685e218.png)  
Dithering algorithm: Bayer 8x8  
![image](https://user-images.githubusercontent.com/103208695/194718985-1d8136da-a704-4074-bbda-2b6420e44732.png)

![5](https://user-images.githubusercontent.com/103208695/194202892-5d435c6f-624f-46e3-8a10-153df3bfc495.png)  
Dithering algorithm: Jarvis-Judice  
![image](https://user-images.githubusercontent.com/103208695/194718992-77b7d633-f81a-44ba-b559-1dc38b3ddf7d.png)

![6](https://user-images.githubusercontent.com/103208695/194202901-9fd1ca30-a230-4001-a270-b73e07cbbdbd.png)  
Dithering algorithm: Jarvis-Judice  
![image](https://user-images.githubusercontent.com/103208695/194719000-94f6e12d-37a2-4fc7-a9ac-a77ba90a809b.png)


## How to launch yourself using [Node.js](https://nodejs.org/en/) and [Visual Studio Code](https://code.visualstudio.com/download)

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
