/* eslint-disable no-undef */
export const uploadImage = () => {
  // check the button to upload the background
  const uploadImageButton = document.getElementById('upload-image-button');
  uploadImageButton.addEventListener('change', function (event) {
    event.preventDefault();
    const file = this.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      document.body.style.backgroundImage = `url(${reader.result})`;
      document.body.style.backgroundColor = 'none';
      document.body.style.backgroundSize = 'cover';
      localStorage.setItem('backgroundImageUrlUpload', reader.result);
    };
  });
};
