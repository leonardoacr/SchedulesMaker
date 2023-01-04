/* eslint-disable no-undef */
const main = async () => {
  const currentPage = window.location.pathname;
  let imageUrl, currentColor;
  if (typeof imageUrl === 'undefined') {
    imageUrl = 'none';
  }
  if (typeof currentColor === 'undefined') {
    currentColor = 'black';
  }
  defaultThemeGlobal(imageUrl, currentColor);

  if (
    currentPage !== '/login' &&
    currentPage !== '/' &&
    currentPage !== '/register'
  ) {
    let { imageUrl, currentColor } = await getDataGlobal();
    // non-priorities
    backgroundImageGlobal();
    changingThemeGlobal(currentColor);
    sendDataGlobal();
  }
};

main();
