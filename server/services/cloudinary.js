import cloudinary from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { generateRandomString } from '@utils/functions';
import logger from '../utils/logger';

export const cleanUp = (file) => {
  const fileLocation = path.join(file.destination, file.filename);
  fs.unlinkSync(fileLocation);
};

export const upload = async (
  file: any,
  options: any,
  callback: (option: Array<any>) => void
) => {
  const fileLocation = path.join(file.destination, file.filename);
  const response = await cloudinary.v2.uploader.upload(
    fileLocation,
    { ...options },
    callback
  );
  cleanUp(file);
  return response;
};

export const uploadBase64 = async (
  base64: string,
  options: any,
  callback: (option: Array<any>) => void
) => {
  const response = await cloudinary.v2.uploader.upload(
    base64,
    { ...options },
    callback
  );
  return response;
};

export const completeUploadBase64 = async (
  base64Array: Array<string>,
  folder: string
) => {
  const uploadOptions = {
    folder,
    overwrite: true,
    invalidated: true,
  };
  const responseArray = [];
  const promiseArray = base64Array.map((base64) =>
    uploadBase64(base64, uploadOptions, (error, result) => {
      if (error) logger.error(error);
      else responseArray.push(result);
    })
  );

  try {
    await Promise.all(promiseArray);
  } catch (error) {
    logger.error(error);
  }
  if (responseArray.length) {
    const images: Array<any> = responseArray.map((response) => {
      const {
        // url,
        secure_url: secureUrl,
        // asset_id: assetId,
        // public_id: publicId,
      } = response;
      const data = { secureUrl };
      return data;
    });
    return images;
  }
  return [];
};

export const completeUpload = async (files: any, folder: string) => {
  const uploadOptions = {
    folder,
  };
  const responseArray = [];
  const promiseArray = files.map((file) =>
    upload(file, uploadOptions, (error, result) => {
      if (error) logger.error(error);
      else responseArray.push(result);
    })
  );

  try {
    await Promise.all(promiseArray);
  } catch (error) {
    logger.error(error);
  }
  if (responseArray.length) {
    const images: Array<any> = responseArray.map((response) => {
      const {
        url,
        secure_url: secureUrl,
        asset_id: assetId,
        public_id: publicId,
      } = response;
      const data = { url, secureUrl, assetId, publicId };
      return data;
    });
    return images;
  }
  return [];
};

export const convertBase64ToFile = (dataUrl: string) => {
  const base64String = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
  const fileName = `${generateRandomString(8)}.jpeg`;
  const uploadPath = path.join('uploads', fileName);

  const promise = new Promise((resolve, reject) => {
    fs.writeFile(uploadPath, base64String, 'base64', (error) => {
      if (error) {
        reject(error);
      }
      resolve(fileName);
    });
  });
  return promise;
};
