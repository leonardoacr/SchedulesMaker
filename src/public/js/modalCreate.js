// JavaScript file

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
    clockCreate =
      hoursCreate.value.padStart(2, '0') +
      ':' +
      minutesCreate.value.padStart(2, '0') +
      ' ' +
      periodCreate.toUpperCase();
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
