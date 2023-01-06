import { sendDataGlobal } from './sendData.js';

export const randomImage = () => {
  const setBackgroundImage = (imageUrl) => {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundColor = 'none';
    document.body.style.backgroundSize = 'cover';
    localStorage.setItem('backgroundImageUrl', imageUrl);
    localStorage.removeItem('backgroundImageUrlUpload');
    sendDataGlobal();
  };

  const randomImageButton = document.getElementById('random-image-button');
  randomImageButton.addEventListener('click', async () => {
    const screenWidth = screen.availWidth;
    const screenHeight = screen.availHeight;
    const screenSize = `${screenWidth}x${screenHeight}`;
    const randomImageUrl = `https://source.unsplash.com/random/${screenSize}/?wallpaper,landscape`;
    const loadingImage = document.getElementById('loadingImage');
    loadingImage.style = 'display: block';
    try {
      await fetch(randomImageUrl).then((data) => {
        setBackgroundImage(data.url);
      });
    } catch (error) {
      // //console.log('Error getting random image: ' + error);
    }
    loadingImage.style = 'display: none';
  });
};
