/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsplashImage = () => {
  const saveImageButton = document.createElement('button');
  // hidden button:
  const imageUrlInput = document.createElement('input');
  imageUrlInput.type = 'text';
  imageUrlInput.placeholder = 'Enter image URL';
  imageUrlInput.id = 'image-url-input';
  imageUrlInput.style.display = 'none';

  const unsplashImageButton = document.getElementById('unsplash-image-button');
  unsplashImageButton.addEventListener('click', function (event) {
    // open url field:
    const modalBody = document.querySelector('.modal-body');
    imageUrlInput.style.display = 'block';
    modalBody.appendChild(imageUrlInput);

    // hide buttons and show a new button to save the image
    document.getElementById('upload-image-button').style.display = 'none';
    document.getElementById('random-image-button').style.display = 'none';
    document.getElementById('unsplash-image-button').style.display = 'none';
    saveImageButton.id = 'save-image-button';
    saveImageButton.textContent = 'Save Image';
    saveImageButton.classList.add('btn', 'btn-success');
    modalBody.appendChild(saveImageButton);

    // open new window to Unsplash website
    event.preventDefault();
    document.getElementById('upload-image-button').style.display = 'none';
    document.getElementById('random-image-button').style.display = 'none';
    window.open('https://unsplash.com/', '_blank');
  });

  // Save the image when the "save-image-button" is clicked (unsplash option)
  saveImageButton.addEventListener('click', function (event) {
    event.preventDefault();
    const imageUrl = imageUrlInput.value;
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundColor = 'none';
    document.body.style.backgroundSize = 'cover';
    localStorage.setItem('backgroundImageUrl', imageUrl);
    sendDataGlobal();
    localStorage.removeItem('backgroundImageUrlUpload');
  });
};
