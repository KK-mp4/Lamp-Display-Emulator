export function ditherWhiteNoise(image, threshold) {
    for (let i = 0; i < image.data.length; i += 4) {
        const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
        const map = (luminance + (Math.random() * 255)) / 2;
        const value = map < threshold ? 0 : 255;
        image.data.fill(value, i, i + 3);
    }

    return image;
}

export async function ditherBlueNoise(image, threshold) {
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
        const map = (luminance + noiseData.data[(x % width) * 4 * width + (y % height) * 4]) / 2;
        const value = map < threshold ? 0 : 255;
        image.data.fill(value, i, i + 3);
    }

    return image;
}

export function ditherIGN(image, threshold) {
    for (let i = 0; i < image.data.length; i += 4) {
        const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
        const x = i / 4 % image.width;
        const y = Math.floor(i / 4 / image.width);
        const val = ((((0.06711056 * x) + (0.00583715 * y)) % 1) * 52.9829189) % 1;
        const map = (luminance + (val * 255)) / 2;
        const value = map < threshold ? 0 : 255;
        image.data.fill(value, i, i + 3);
    }

    return image;
}

export function ditherR2(image, threshold) {
    for (let i = 0; i < image.data.length; i += 4) {
        const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
        const x = i / 4 % image.width;
        const y = Math.floor(i / 4 / image.width);
        const val = (x / 1.32471795724474602596 + y / (1.32471795724474602596 * 1.32471795724474602596)) % 1;
        const map = (luminance + (val * 255)) / 2;
        const value = map < threshold ? 0 : 255;
        image.data.fill(value, i, i + 3);
    }

    return image;
}

export function ditherPlus(image, threshold) {
    for (let i = 0; i < image.data.length; i += 4) {
        const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
        const x = i / 4 % image.width;
        const y = Math.floor(i / 4 / image.width);
        const val = (x / 5 + y * 0.6) % 1;
        const map = (luminance + (val * 255)) / 2;
        const value = map < threshold ? 0 : 255;
        image.data.fill(value, i, i + 3);
    }

    return image;
}

export function ditherBayer2x2(image, threshold) {
    const thresholdMap = [
        [0, 127],
        [192, 63]
    ];

    for (let i = 0; i < image.data.length; i += 4) {
        const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
        const x = i / 4 % image.width;
        const y = Math.floor(i / 4 / image.width);
        const map = (luminance + thresholdMap[x % 2][y % 2]) / 2;
        const value = map < threshold ? 0 : 255;
        image.data.fill(value, i, i + 3);
    }

    return image;
}

export function ditherBayer4x4(image, threshold) {
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
        const map = (luminance + thresholdMap[x % 4][y % 4]) / 2;
        const value = map < threshold ? 0 : 255;
        image.data.fill(value, i, i + 3);
    }

    return image;
}

export function ditherBayer8x8(image, threshold) {
    const thresholdMap = [
        [0, 128, 32, 160, 8, 136, 40, 168],
        [192, 64, 224, 96, 200, 72, 232, 104],
        [48, 176, 16, 144, 56, 184, 24, 152],
        [240, 112, 208, 80, 248, 120, 216, 88],
        [12, 140, 44, 172, 4, 132, 36, 164],
        [204, 76, 236, 108, 196, 68, 228, 100],
        [60, 188, 28, 156, 52, 180, 20, 148],
        [252, 124, 220, 92, 244, 116, 212, 84]
    ];

    for (let i = 0; i < image.data.length; i += 4) {
        const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
        const x = i / 4 % image.width;
        const y = Math.floor(i / 4 / image.width);
        const map = (luminance + thresholdMap[x % 8][y % 8]) / 2;
        const value = map < threshold ? 0 : 255;
        image.data.fill(value, i, i + 3);
    }

    return image;
}

export function ditherPatternHalftoning(image, threshold) {
    // source: https://people.ece.ubc.ca/irenek/techpaps/introip/manual04.html
    const thresholdMap = [
        [0, 128, 32, 160],
        [64, 192, 96, 224],
        [48, 176, 16, 144],
        [112, 240, 80, 208]
    ];

    for (let i = 0; i < image.data.length; i += 4) {
        const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
        const x = i / 4 % image.width;
        const y = Math.floor(i / 4 / image.width);
        const map = (luminance + thresholdMap[x % 4][y % 4]) / 2;
        const value = map < threshold ? 0 : 255;
        image.data.fill(value, i, i + 3);
    }

    return image;
}

export function ditherClusterDot(image, threshold) {
    // source: https://people.ece.ubc.ca/irenek/techpaps/introip/manual04.html
    const thresholdMap = [
        [167, 200, 230, 216, 181],
        [94, 72, 193, 242, 232],
        [36, 52, 222, 167, 200],
        [181, 126, 210, 94, 72],
        [232, 153, 111, 36, 52]
    ];

    for (let i = 0; i < image.data.length; i += 4) {
        const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
        const x = i / 4 % image.width;
        const y = Math.floor(i / 4 / image.width);
        const map = (luminance + thresholdMap[x % 5][y % 5]) / 2;
        const value = map < threshold ? 0 : 255;
        image.data.fill(value, i, i + 3);
    }

    return image;
}

// export function ditherRiemersma(image, threshold) {

// }

export function ditherFloydSteinberg(image, threshold) {
    // credits to https://github.com/NielsLeenheer/CanvasDither
    const width = image.width;
    const luminance = new Uint8ClampedArray(image.width * image.height);

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    }

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        const value = luminance[l] < threshold ? 0 : 255;
        const error = Math.floor((luminance[l] - value) / 16);
        image.data.fill(value, i, i + 3);

        luminance[l + 1] += error * 7;
        luminance[l + width - 1] += error * 3;
        luminance[l + width] += error * 5;
        luminance[l + width + 1] += error;
    }

    return image;
}

export function ditherJarvisJudiceNinke(image, threshold) {
    const width = image.width;
    const luminance = new Uint8ClampedArray(image.width * image.height);

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    }

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        const value = luminance[l] < threshold ? 0 : 255;
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
        luminance[l + (width * 2) - 1] += error * 3;
        luminance[l + (width * 2)] += error * 5;
        luminance[l + (width * 2) + 1] += error * 3;
        luminance[l + (width * 2) + 2] += error;
    }

    return image;
}

export function ditherAtkinson(image, threshold) {
    const width = image.width;
    const luminance = new Uint8ClampedArray(image.width * image.height);

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    }

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        const value = luminance[l] < threshold ? 0 : 255;
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

export function ditherStucki(image, threshold) {
    const width = image.width;
    const luminance = new Uint8ClampedArray(image.width * image.height);

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    }

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        const value = luminance[l] < threshold ? 0 : 255;
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

export function ditherBurkes(image, threshold) {
    const width = image.width;
    const luminance = new Uint8ClampedArray(image.width * image.height);

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    }

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        const value = luminance[l] < threshold ? 0 : 255;
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

export function ditherSierra(image, threshold) {
    const width = image.width;
    const luminance = new Uint8ClampedArray(image.width * image.height);

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    }

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        const value = luminance[l] < threshold ? 0 : 255;
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

export function ditherSierra2row(image, threshold) {
    const width = image.width;
    const luminance = new Uint8ClampedArray(image.width * image.height);

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    }

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        const value = luminance[l] < threshold ? 0 : 255;
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

export function ditherSierraLite(image, threshold) {
    const width = image.width;
    const luminance = new Uint8ClampedArray(image.width * image.height);

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    }

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        const value = luminance[l] < threshold ? 0 : 255;
        const error = Math.floor((luminance[l] - value) / 4);
        image.data.fill(value, i, i + 3);

        luminance[l + 1] += error << 1;
        luminance[l + width - 1] += error;
        luminance[l + width] += error;
    }

    return image;
}

export function ditherStevensonArce(image, threshold) {
    const width = image.width;
    const luminance = new Uint8ClampedArray(image.width * image.height);

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
    }

    for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
        const value = luminance[l] < threshold ? 0 : 255;
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