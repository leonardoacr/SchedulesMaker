import { randomImage } from './backgroundImageIncludes/randomImageButton.js';
import { unsplashImage } from './backgroundImageIncludes/unsplashImageButton.js';
import { uploadImage } from './backgroundImageIncludes/uploadImageButton.js';
import { resetImage } from './backgroundImageIncludes/resetImageButton.js';

export const backgroundImageGlobal = () => {
  randomImage();
  unsplashImage();
  uploadImage();
  resetImage();
};
