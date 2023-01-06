import { sendDataGlobal } from './sendData.js';

export const resetImage = () => {
  const setBackgroundImage = (imageUrl) => {
    document.body.style.backgroundImage = imageUrl;
    document.body.style.backgroundColor = 'rgb(34, 39, 46)';
    localStorage.removeItem('backgroundImageUrl');
    sendDataGlobal();
    localStorage.removeItem('backgroundImageUrlUpload');
  };

  const resetImageButton = document.querySelector('#reset-image-button');
  resetImageButton.addEventListener('click', function resetImageHandler(event) {
    event.preventDefault();
    setBackgroundImage('none');
  });
};
