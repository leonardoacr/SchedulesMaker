// initialize the periodCreate variable with the value of the selected radio button
const periodCreate = document.querySelector(
  'input[name="periodCreate"]:checked'
).value;

const modalCreate = document.getElementById('modalCreate');
const modalInput = document.getElementById('note-text-modal');
const hoursCreate = document.getElementById('hoursCreate');
const minutesCreate = document.getElementById('minutesCreate');

// let clockCreate = document.getElementById('clock-display-create');
let clockCreate = '01:00 AM';

// update the clock display
const updateClockCreate = (periodCreate) => {
  if (hoursCreate.value > 12) {
    hoursCreate.value = 12;
  }
  if (hoursCreate.value <= 1) {
    hoursCreate.value = 1;
  }
  if (minutesCreate.value > 59) {
    minutesCreate.value = 59;
  }
  if (minutesCreate.value <= 0) {
    minutesCreate.value = 0;
  }
  if (hoursCreate.value === '1' && minutesCreate.value === '0') {
    clockCreate = '01:00 AM';
  } else {
    hoursCreate.value = hoursCreate.value.replace(/^0+/, '');
    minutesCreate.value = minutesCreate.value.replace(/^0+/, '');
    clockCreate = `${hoursCreate.value.padStart(
      2,
      '0'
    )}:${minutesCreate.value.padStart(2, '0')} ${periodCreate.toUpperCase()}`;
  }
  // set the value of the clock-display form field
  document.getElementById('clock-display-create-hidden').value = clockCreate;
  document.getElementById('clock-display-create').innerHTML = clockCreate;
};

if (modalCreate) {
  modalCreate.addEventListener('shown.bs.modal', function () {
    updateClockCreate(periodCreate);
    if (modalInput) {
      modalInput.focus();
    }
  });
}

updateClockCreate(periodCreate);

const radioAm = document.querySelector('#periodCreate[value="am"]');
const radioPm = document.querySelector('#periodCreate[value="pm"]');

radioAm.addEventListener('change', () => {
  const updatedPeriodCreate = radioAm.value;
  updateClockCreate(updatedPeriodCreate);
});

radioPm.addEventListener('change', () => {
  const updatedPeriodCreate = radioPm.value;
  updateClockCreate(updatedPeriodCreate);
});

hoursCreate.addEventListener('change', () => {
  updateClockCreate(periodCreate);
});

minutesCreate.addEventListener('change', () => {
  updateClockCreate(periodCreate);
});

// Prevent of submitting the form when it already has same value for time registered
const createButton = document.getElementById('create-button');

createButton.addEventListener('click', function (event) {
  // Construct the time string using the input values

  const time = document.getElementById('clock-display-create').innerHTML;
  const text = document.querySelector('#modalCreate textarea').value;

  // Loop through all of the existing notes
  const noteContentBoxes = document.querySelectorAll(
    '.note-content-box-wrapper'
  );
  for (const noteContentBox of noteContentBoxes) {
    // Get the time of the current note
    const noteTime = noteContentBox.dataset.noteTime;
    // If the time of the current note is the same as the time being entered by the user,
    // display an error message and prevent the form from being submitted
    if (time === noteTime) {
      event.preventDefault();
      alert('This time is already registered!');
      break;
    }
  }
  if (text === '') {
    event.preventDefault();
    alert('The note is empty!');
  }
});
