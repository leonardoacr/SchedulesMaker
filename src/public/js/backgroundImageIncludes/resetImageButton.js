/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetImage = () => {
  // check the button to reset the background
  const resetImageButton = document.getElementById('reset-image-button');
  resetImageButton.addEventListener('click', function (event) {
    event.preventDefault();
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = 'rgb(34, 39, 46)';
    document.body.style.backgroundImage = 'none';
    localStorage.removeItem('backgroundImageUrl');
    sendDataGlobal();
    localStorage.removeItem('backgroundImageUrlUpload');
  });
};
