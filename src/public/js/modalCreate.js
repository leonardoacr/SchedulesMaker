// JavaScript file

// initialize the periodCreate variable with the value of the selected radio button
const periodCreate = document.querySelector(
  'input[name="periodCreate"]:checked'
).value;

const modalCreate = document.getElementById('modalCreate');
const modalInput = document.getElementById('note-text-modal');
const hoursCreate = document.getElementById('hoursCreate');
const minutesCreate = document.getElementById('minutesCreate');

let clockCreate = document.getElementById('clock-display-create').innerHTML;

if (modalCreate) {
  modalCreate.addEventListener('shown.bs.modal', function () {
    updateClock(periodCreate);
    if (modalInput) {
      modalInput.focus();
    }
  });
}

function updateClock(periodCreate) {
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
    // console.log('oi: ' + clockCreate);
  } else {
    clockCreate =
      hoursCreate.value.padStart(2, '0') +
      ':' +
      minutesCreate.value.padStart(2, '0') +
      ' ' +
      periodCreate.toUpperCase();
  }
  // set the value of the clock-display form field
  // console.log('teste clockCreate: ' + clockCreate);
  document.getElementById('clock-display-create-hidden').value = clockCreate;
  document.getElementById('clock-display-create').innerHTML = clockCreate;
}

updateClock(periodCreate);

const radioAm = document.querySelector('#periodCreate[value="am"]');
const radioPm = document.querySelector('#periodCreate[value="pm"]');

radioAm.addEventListener('change', () => {
  const updatedPeriodCreate = radioAm.value;
  updateClock(updatedPeriodCreate);
});

radioPm.addEventListener('change', () => {
  const updatedPeriodCreate = radioPm.value;
  updateClock(updatedPeriodCreate);
});

hoursCreate.addEventListener('change', () => {
  updateClock(periodCreate);
});

minutesCreate.addEventListener('change', () => {
  updateClock(periodCreate);
});
