# Minecraft [Redstone Lamp](https://minecraft.fandom.com/wiki/Redstone_Lamp) Display Emulator
Website for converting images to Minecraft redstone lamps (1 bit). Upload an image and choose [binarization](https://en.wikipedia.org/wiki/Thresholding_(image_processing)) and [dithering](https://en.wikipedia.org/wiki/Dither) algorithm to turn it into the lamps.  

![image](https://user-images.githubusercontent.com/103208695/200155648-c031d91b-8410-44d5-8809-55ae95095d2f.png)
*Screenshot from the game “Return of the Obra Dinn” by Lucas Pope processed by this tool*

## Algorithms
So far I've implemented those local binarization algorithms:
- [Niblack method](http://www.djvu-soft.narod.ru/bookscanlib/028.htm)
- [Sauvola method](https://hal.archives-ouvertes.fr/hal-02181880/document)
- Wulff method
- [Bradley-Roth method](https://habr.com/ru/post/278435/)

and those ordered dithering algorithms:
- White noise
- [Blue noise](https://developer.nvidia.com/blog/rendering-in-real-time-with-spatiotemporal-blue-noise-textures-part-1/)
- [Interleaved Gradient noise](https://bartwronski.com/2016/10/30/dithering-part-three-real-world-2d-quantization-dithering/)
- [R2](https://blog.demofox.org/2022/02/01/two-low-discrepancy-grids-plus-shaped-sampling-ldg-and-r2-ldg/)
- [Plus](https://blog.demofox.org/2022/02/01/two-low-discrepancy-grids-plus-shaped-sampling-ldg-and-r2-ldg/)
- Bayer level 1-3
- Pattern Halftoning
- [Cluster dot](http://cs.haifa.ac.il/hagit/papers/JEI99-HelOrZhangWandell-ClusterDotDithering.pdf)

and those error diffusion dithering algorithms:
- Floyd-Steinber
- Jarvis-Judice-Ninke
- Atkinson
- Stucki
- Burkes
- Sierra
- Two-Row Sierra
- Sierra Lite
- Stevenson-Arce

## How it works
If you wish to know how exactly dithering and binarization works I provided a lot of useful resources later in this article. What I haven't seen anyone else do is combine binarization and dithering. Let me explain on this random image from the internet:  
![d347c39f-10c3-4471-98b2-8ec258dd6faa](https://user-images.githubusercontent.com/103208695/200156120-45b1d030-8ae0-4b3d-9d18-f919e2afbbd9.jpg)  
*input image*

The main goal of dithering is to preserve monochrome colour:  
![image](https://user-images.githubusercontent.com/103208695/200156201-c9dbd24d-ba0d-4f6f-834d-564e3e7eeb8a.png)  
*dithered with R2 algorithm threshold=128*

But this comes with the loss of detail, for example text is not readable now. The main goal of binarization is to preserve detail, is it mainly used in OCR:  
![image](https://user-images.githubusercontent.com/103208695/200156247-60cbcdb9-9f59-4adf-9efb-2ab1025e1d12.png)  
*binarized with Sauvola method m=7, k=0.25*

As you can see now we lost all the colour. So my method is to process original image with binarization and dithering algorithms separately and later combine by multiplying corresponding pixels together. This way we preserve both colour and detail information:  
![image](https://user-images.githubusercontent.com/103208695/200156324-549e95c7-a514-4c7c-b49a-3b973a4489cc.png)  
*both algorithms combined*

## Examples
Here are some examples of it working, for input I took pixelarts from [sexypixelize](https://sexypixelize.newgrounds.com/art) and processed them:
 
![image](https://user-images.githubusercontent.com/103208695/194718944-c83878a0-d990-4d6f-8e88-8ad1ce70d5f7.png)  
*Dithering algorithm: Jarvis-Judice*

![image](https://user-images.githubusercontent.com/103208695/194718952-0236a0bb-ee77-43d6-b295-c78846d75621.png)  
*Global binarization: threshold*

![image](https://user-images.githubusercontent.com/103208695/194718977-564f5a3a-7208-4620-9877-3aae05cdb5ae.png)  
*Dithering algorithm: Floyd-Steinberg*

![image](https://user-images.githubusercontent.com/103208695/194718985-1d8136da-a704-4074-bbda-2b6420e44732.png)  
*Dithering algorithm: Bayer 8x8*

![image](https://user-images.githubusercontent.com/103208695/194718992-77b7d633-f81a-44ba-b559-1dc38b3ddf7d.png)  
*Dithering algorithm: Jarvis-Judice*

![image](https://user-images.githubusercontent.com/103208695/194719000-94f6e12d-37a2-4fc7-a9ac-a77ba90a809b.png)  
*Dithering algorithm: Jarvis-Judice*

## Useful resources if you want to dive deeper into 1 bit image processing
Atricles:  
[Ditherpunk — The article I wish I had about monochrome image dithering](https://surma.dev/things/ditherpunk/)  
[Image Dithering: Eleven Algorithms and Source Code](https://tannerhelland.com/2012/12/28/dithering-eleven-algorithms-source-code.html)  
[Image segmentation (ru)](https://habr.com/ru/post/128768/)  

Tools:  
[dithering demo](https://surma.dev/lab/ditherpunk/lab.html)  
[binarization demo](https://surma.dev/lab/ditherpunk/lab.html)  
[dithering](https://app.dithermark.com/)  

## How to launch yourself using [Node.js](https://nodejs.org/en/) and [Visual Studio Code](https://code.visualstudio.com/download)

```bash
# install yarn
npm install --global yarn

# now install all modules
yarn

# now start project
yarn dev

# build ssg version
yarn generate
```

## License
This program is licensed under the GPL-3.0 License. Please read the License file to know about the usage terms and conditions.
