// JavaScript file
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
  hoursUpdate.value = hoursUpdate.value.replace(/^0+/, '');
  minutesUpdate.value = minutesUpdate.value.replace(/^0{2,}/, '');

  clockUpdate =
    hoursUpdate.value.padStart(2, '0') +
    ':' +
    minutesUpdate.value.padStart(2, '0') +
    ' ' +
    periodUpdate.toUpperCase();

  // set the value of the clock-display form field
  document.getElementById('clock-display-update-hidden').value = clockUpdate;
  document.getElementById('clock-display-update').innerHTML = clockUpdate;
};

if (modalUpdate) {
  modalUpdate.addEventListener('shown.bs.modal', function () {
    if (ModalUpdate) {
      ModalUpdate.focus();
    }
  });
}

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
  const periodUpdate = document.querySelector(
    'input[name="periodUpdate"]:checked'
  ).value;
  updateClockUpdate(periodUpdate);
});

minutesUpdate.addEventListener('change', () => {
  const periodUpdate = document.querySelector(
    'input[name="periodUpdate"]:checked'
  ).value;
  updateClockUpdate(periodUpdate);
});

// Array to store the text of each note
let noteAreaModalUpdate = document.querySelector('#modalUpdate textarea');
let noteTimeModalUpdate = document.querySelector('#clock-display-update');
const noteContentBoxes = document.querySelectorAll('.note-content-box-wrapper');

noteContentBoxes.forEach((noteContentBox) => {
  noteContentBox.addEventListener('click', () => {
    // Retrieve the time and text of the note from the data attributes
    const time = noteContentBox.dataset.noteTime;
    const text = noteContentBox.dataset.noteText;
    // Update the modal text area with the actual note:
    noteAreaModalUpdate.value = text;
    noteTimeModalUpdate.innerHTML = time;
    // Injecting old values in hidden input form as reference for the backend
    const oldTimeInput = document.querySelector('input[name=oldTime]');
    const oldNoteInput = document.querySelector('input[name=oldNote]');

    // Only update the value of the oldTime input element if it is different from the current time value
    document.getElementById('clock-display-update-hidden').value = time;
    oldTimeInput.value = time;
    oldNoteInput.value = text;

    // Update the modal clock display with the actual note time:
    hoursUpdate.value = time.slice(0, 2);
    minutesUpdate.value = time.slice(3, 5);
    if (time.slice(6, 8) === 'AM') {
      radioAmUpdate.checked = true;
    } else {
      radioPmUpdate.checked = true;
    }
  });
});

// Prevent user to update a note with empty text
const updateBtn = document.querySelector('#update-button');
updateBtn.addEventListener('click', (event) => {
  const text = noteAreaModalUpdate.value;
  if (text === '') {
    event.preventDefault();
    alert('The note is empty!');
  }
});
