export function defaultThemeGlobal(imageUrl, currentColor) {
  const setDataOnLocalStorage = async (key, value) => {
    return new Promise((resolve, reject) => {
      try {
        const data = localStorage.setItem(key, value);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
  const body = document.body;
  const modalTextElements = document.querySelectorAll('.modal');
  if (!imageUrl || imageUrl === 'none') {
    body.style.backgroundColor = 'rgb(34, 39, 46)';
    document.documentElement.style.backgroundColor = 'rgb(34, 39, 46)';
    setDataOnLocalStorage('backgroundImageUrl', 'none');
  }

  if (imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.documentElement.style.backgroundColor = '';
  }

  if (typeof currentColor === 'undefined' || currentColor === 'none') {
    // The background has no image, so set the background-color of the body and html elements to the default color
    currentColor = 'black';
    body.style.color = 'white';
    modalTextElements.forEach((element) => {
      element.style.color = 'white';
    });
    setDataOnLocalStorage('currentColor', currentColor);
  }
}
