/* eslint-disable @typescript-eslint/no-unused-vars */
const sendDataGlobal = () => {
  // get data from localstorage and send to the database

  let imageUrl = localStorage?.getItem('backgroundImageUrl') || 'none';
  let currentColor = localStorage?.getItem('currentColor') || 'none';

  let backgroundImage, backgroundTheme;

  if (imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.documentElement.style.backgroundColor = '';
  }

  if (document.body.style.backgroundImage !== 'none') {
    // The background has an image, so set the background-color of the body and html elements to ''
    // document.body.style.backgroundColor = '';
    // document.documentElement.style.backgroundColor = '';
    backgroundImage = 'none';
  }

  // function responsible to send the image url to the backend
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendData = async (backgroundImage, backgroundTheme) => {
    const response = await fetch('/api/sendConfig', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        backgroundImage: backgroundImage,
        backgroundTheme: backgroundTheme
      })
    }).catch((error) => {
      console.error(error);
    });
    const result = await response.json();
    if (JSON.stringify(result.success) === 'true') {
      console.log('Data sent to backend successfully');
    } else {
      console.log('Data not sent to backend');
    }
  };

  backgroundImage = imageUrl;
  backgroundTheme = currentColor;
  sendData(backgroundImage, backgroundTheme);
};
