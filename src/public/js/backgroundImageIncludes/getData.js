const getDataGlobal = async () => {
  const getDataFromLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
      try {
        const data = localStorage.getItem(key);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
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

  const getConfigData = async () => {
    console.log('Getting data from the database...');
    try {
      const response = await fetch('/api/getConfig');
      const result = await response.json();
      if (result.backgroundImage || result.backgroundTheme) {
        console.log('Data received from the database' + JSON.stringify(result));
        // save this on local storage:
        if (result.backgroundImage !== 'none') {
          await setDataOnLocalStorage(
            'backgroundImageUrl',
            result.backgroundImage
          );
        }
        if (result.backgroundTheme !== 'none') {
          await setDataOnLocalStorage('currentColor', result.backgroundTheme);
        }
        // return the specific values from the database
        return {
          storedImageUrl: result.backgroundImage,
          currentColor: result.backgroundTheme
        };
      } else {
        // use the data from the local storage
        console.log(
          'Data not received by the backend, using data from local storage...'
        );
        let storedImageUrl, currentColor;
        if (localStorage.getItem('backgroundImageUrl')) {
          storedImageUrl = await getDataFromLocalStorage('backgroundImageUrl');
        } else {
          console.log('No ImageUrl stored in local storage');
          storedImageUrl = 'none';
        }
        if (localStorage.getItem('currentColor')) {
          currentColor = await getDataFromLocalStorage('currentColor');
        } else {
          console.log('No currentColor stored in local storage');
          currentColor = 'black';
        }

        return {
          storedImageUrl: storedImageUrl,
          currentColor: currentColor
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const configData = async () => {
    let { storedImageUrl, currentColor } = await getConfigData();

    // Uploded image has priority over the other options (stored in local storage or database)
    const imageUrlUpload = await getDataFromLocalStorage(
      'backgroundImageUrlUpload'
    );
    const imageUrl = imageUrlUpload || storedImageUrl;
    console.log('ImageUrl: ' + imageUrl + ' currentColor: ' + currentColor);
    return { imageUrl, currentColor };
  };

  return await configData();
};
