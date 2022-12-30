// JavaScript file

// initialize the periodUpdate variable with the value of the selected radio button

const periodUpdate = document.querySelector(
  'input[name="periodUpdate"]:checked'
).value;

const modalUpdate = document.getElementById('modalUpdate');
const ModalUpdate = document.getElementById('note-text-modal');
const hoursUpdate = document.getElementById('hoursUpdate');
const minutesUpdate = document.getElementById('minutesUpdate');

let clockUpdate = document.getElementById('clock-display-update').innerHTML;

const updateClockUpdate = (periodUpdate) => {
  if (hoursUpdate.value > 12) {
    hoursUpdate.value = 12;
  }
  if (hoursUpdate.value <= 1) {
    hoursUpdate.value = 1;
  }
  if (minutesUpdate.value > 59) {
    minutesUpdate.value = 59;
  }
  if (minutesUpdate.value <= 0) {
    minutesUpdate.value = 0;
  }
  if (hoursUpdate.value === '1' && minutesUpdate.value === '0') {
    clockUpdate = '01:00 AM';
  } else {
    hoursUpdate.value = hoursUpdate.value.replace(/^0+/, '');
    minutesUpdate.value = minutesUpdate.value.replace(/^0+/, '');
    clockUpdate =
      hoursUpdate.value.padStart(2, '0') +
      ':' +
      minutesUpdate.value.padStart(2, '0') +
      ' ' +
      periodUpdate.toUpperCase();
  }
  // set the value of the clock-display form field
  document.getElementById('clock-display-update-hidden').value = clockUpdate;
  document.getElementById('clock-display-update').innerHTML = clockUpdate;
};

if (modalUpdate) {
  modalUpdate.addEventListener('shown.bs.modal', function () {
    updateClockUpdate(periodUpdate);
    if (ModalUpdate) {
      ModalUpdate.focus();
    }
  });
}

updateClockUpdate(periodUpdate);

const radioAmUpdate = document.querySelector('#periodUpdate[value="am"]');
const radioPmUpdate = document.querySelector('#periodUpdate[value="pm"]');

radioAmUpdate.addEventListener('change', () => {
  const updatedPeriodUpdate = radioAmUpdate.value;
  updateClockUpdate(updatedPeriodUpdate);
});

radioPmUpdate.addEventListener('change', () => {
  const updatedPeriodUpdate = radioPmUpdate.value;
  updateClockUpdate(updatedPeriodUpdate);
});

hoursUpdate.addEventListener('change', () => {
  updateClockUpdate(periodUpdate);
});

minutesUpdate.addEventListener('change', () => {
  updateClockUpdate(periodUpdate);
});

// Array to store the text of each note
let noteAreaBoardUpdate = document.querySelector('#note-text');
let noteAreaModalUpdate = document.querySelector('#note-text-modal');
const btnModalUpdate = document.querySelector('#btn-modal-update');

// Update the modal text area with the actual note:
btnModalUpdate.addEventListener('click', () => {
  // Set the value of the text field in the modal to the retrieved text
  noteAreaModalUpdate.value = noteAreaBoardUpdate.innerText;
});
