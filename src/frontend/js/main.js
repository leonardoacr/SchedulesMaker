/* eslint-disable @typescript-eslint/no-var-requires */
import { defaultThemeGlobal } from './default';
import { getDataGlobal } from './backgroundImageIncludes/getData.js';
import { sendDataGlobal } from './backgroundImageIncludes/sendData.js';
import { backgroundImageGlobal } from './backgroundImage.js';
import { changingThemeGlobal } from './changingTheme.js';

const main = async () => {
  const currentPage = window.location.pathname;
  let imageUrl, currentColor;
  if (typeof imageUrl === 'undefined') {
    imageUrl = 'none';
  }
  if (typeof currentColor === 'undefined') {
    currentColor = 'black';
  }

  if (
    currentPage !== '/login' &&
    currentPage !== '/' &&
    currentPage !== '/register'
  ) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    let { imageUrl, currentColor } = await getDataGlobal();
    defaultThemeGlobal(imageUrl, currentColor);
    // non-priorities
    backgroundImageGlobal();
    changingThemeGlobal(currentColor);
    sendDataGlobal();
  }
};

main();
