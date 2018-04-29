import path from 'path';
import sharp from 'sharp';
import Multer from 'multer';
import Storage from '@google-cloud/storage';

const projectId = process.env.GCP_PROJECT_ID;
const CLOUD_BUCKET = 'tojem-app-product-images';

export const SIZE_SMALL = 'small';
export const SIZE_MEDIUM = 'medium';
export const SIZE_LARGE = 'large';
export const SIZE_ORIGINAL = 'original';

const getDimension = (size) => {
  const dimensionMap = {
    [SIZE_SMALL]: [240, 240],
    [SIZE_MEDIUM]: [480, 480],
    [SIZE_LARGE]: [800, 800],
  };

  const dimension = dimensionMap[size];

  if (!dimension) {
    throw new Error(`No dimention for size: ${size} was found `);
  }

  return dimension;
};

export const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

let storageOpts = {};

if (process.env.NODE_ENV === 'production') {
  storageOpts = {
    keyFilename: path.resolve('../../.key/gcp-key.json'),
  };
} else {
  storageOpts = { projectId };
}

export const storage = new Storage(storageOpts);

export const bucket = storage.bucket(CLOUD_BUCKET);

export function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

const uploadImageToGCS = ({
  productId,
  size,
  rawFile,
  fileBuffer,
}) => new Promise((resolve, reject) => {
  const gcsname = `products/${productId}/${size}/${Date.now()}-${rawFile.originalname}`;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.on('error', (err) => {
    reject(err);
  });

  stream.on('finish', () => {
    file.makePublic().then(() => {
      resolve({
        productId,
        name: gcsname,
        size,
        url: getPublicUrl(gcsname),
      });
    });
  });

  stream.end(fileBuffer);
});

const resizeImage = (file, size) => {
  const dimension = getDimension(size);

  return sharp(file.buffer)
    .resize(...dimension)
    .toBuffer();
};

export async function sendUploadToGCS(request, response, next) {
  if (!request.file) {
    return next();
  }

  try {
    const fileBuffer = await resizeImage(request.file, SIZE_MEDIUM);

    const imageData = await uploadImageToGCS({
      productId: request.params.id,
      rawFile: request.file,
      size: SIZE_MEDIUM,
      fileBuffer,
    });

    const images = [imageData];

    request.file.images = images;

    return next();
  } catch (error) {
    return next(error);
  }
}
