// Update the background image when the "random-image-button" is clicked
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const randomImage = () => {
  let getUrlImage;
  const randomImageButton = document.getElementById('random-image-button');
  randomImageButton.addEventListener('click', async () => {
    const screenWidth = screen.availWidth;
    const screenHeight = screen.availHeight;
    // const screenWidth = '1920';
    // const screenHeight = '1080';
    const screenSize = screenWidth + 'x' + screenHeight;
    const randomImageUrl = `https://source.unsplash.com/random/${screenSize}/?wallpaper,landscape`;
    // console.log('Screen Size: ' + screenSize);
    try {
      await fetch(randomImageUrl).then((data) => {
        getUrlImage = data.url;

        document.body.style.backgroundImage = `url(${getUrlImage})`;
        document.body.style.backgroundColor = 'none';
        document.body.style.backgroundSize = 'cover';
        // eslint-disable-next-line no-undef
        sendDataGlobal();
        localStorage.setItem('backgroundImageUrl', getUrlImage); // also save on local storage
        localStorage.removeItem('backgroundImageUrlUpload'); // remove the upload image from local storage
      });
    } catch (error) {
      console.log('Error getting random image: ' + error);
    }
  });
};
