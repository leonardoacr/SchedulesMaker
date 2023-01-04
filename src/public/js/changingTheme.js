/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const changingThemeGlobal = (currentColor) => {
  let dayContainer;
  const changeTheme = document.getElementById('change-theme');
  const body = document.body;
  const modalTextElements = document.querySelectorAll('.modal');

  // wait the EJS file load the elements and set the stored theme for schedules route
  if (window.location.pathname === '/schedules') {
    dayContainer = document.querySelectorAll('.container-day');
    if (dayContainer.length > 0) {
      // console.log('Day container elements found');
      // Apply the stored color
      if (currentColor === 'black') {
        for (const element of dayContainer) {
          element.style.backgroundColor = 'rgba(79, 86, 96, 0.5)';
        }
        setThemeBlack();
        console.log('Black theme set');
      } else if (currentColor === 'white') {
        for (const element of dayContainer) {
          element.style.backgroundColor = 'rgba(145, 151, 159, 0.5)';
        }
        setThemeWhite();
        console.log('White theme set');
      }
    } else {
      // console.log('Day container elements not found');
      setTimeout(getDayContainer, 100);
    }
  } else {
    if (currentColor === 'black') {
      setThemeBlack();
      console.log('Black theme set');
    } else if (currentColor === 'white') {
      setThemeWhite();
      console.log('White theme set');
    }
  }
  // Get the stored color from local storage
  // currentColor = localStorage.getItem('currentColor') || 'black';

  // Set the change theme button event listener
  changeTheme.addEventListener('click', () => {
    // Change the theme
    currentColor = changeThemeColor(currentColor);
    // Store the current color in localStorage
    localStorage.setItem('currentColor', currentColor);
    sendDataGlobal();
  });

  function changeThemeColor(currentColor) {
    if (currentColor === 'black') {
      currentColor = 'white';
      setThemeWhite();
      if (window.location.pathname === '/schedules') {
        for (const element of dayContainer) {
          element.style.backgroundColor = 'rgba(145, 151, 159, 0.5)';
        }
      }
    } else if (currentColor === 'white') {
      currentColor = 'black';
      setThemeBlack();
      if (window.location.pathname === '/schedules') {
        for (const element of dayContainer) {
          element.style.backgroundColor = 'rgba(79, 86, 96, 0.5)';
        }
      }
    }
    return currentColor;
  }

  function setThemeBlack() {
    console.log('Setting theme black');
    body.style.color = 'white';
    body.style.backgroundColor = 'rgb(34, 39, 46)';

    modalTextElements.forEach((element) => {
      element.style.color = 'white';
    });
  }

  function setThemeWhite() {
    console.log('Setting theme white');
    body.style.color = 'rgb(34, 39, 46)';
    body.style.backgroundColor = 'white';

    modalTextElements.forEach((element) => {
      element.style.color = 'white';
    });
  }

  function getDayContainer() {
    // Select all .container-day elements and assign them to the dayContainer variable
    dayContainer = document.querySelectorAll('.container-day');

    // Check if any .container-day elements were found
    if (dayContainer.length > 0) {
      console.log('Day container elements found');
      // Apply the stored color
      if (currentColor === 'black') {
        for (const element of dayContainer) {
          element.style.backgroundColor = 'rgba(79, 86, 96, 0.5)';
        }
        setThemeBlack();
        console.log('Black theme set');
      } else if (currentColor === 'white') {
        for (const element of dayContainer) {
          element.style.backgroundColor = 'rgba(145, 151, 159, 0.5)';
        }
        setThemeWhite();
        console.log('White theme set');
      } else {
        console.log('No day container elements found');
      }
    }
  }
};
