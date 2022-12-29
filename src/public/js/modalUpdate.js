// var modalUpdate = document.getElementById('modalUpdate');
// var modalInput = document.getElementById('note-text-modal');
// let hoursUpdate = document.getElementById('hoursUpdate');
// let minutesUpdate = document.getElementById('minutesUpdate');

// if (modalUpdate) {
//   modalUpdate.addEventListener('shown.bs.modal', function () {
//     if (modalInput) {
//       modalInput.focus();
//     }
//   });
// }

// function updateClock() {
//   if (hoursUpdate.value > 11) {
//     hoursUpdate.value = 11;
//   }
//   if (hoursUpdate.value <= 0) {
//     hoursUpdate.value = 0;
//   }
//   if (minutesUpdate.value > 59) {
//     minutesUpdate.value = 59;
//   }
//   if (minutesUpdate.value <= 0) {
//     minutesUpdate.value = 0;
//   }
//   if ([hoursUpdate.value, minutesUpdate.value].every((val) => val === '0')) {
//     document.getElementById('clock-display-update').innerHTML = '00:00';
//   } else {
//     document.getElementById('clock-display-update').innerHTML =
//       hoursUpdate.value.padStart(2, '0') +
//       ':' +
//       minutesUpdate.value.padStart(2, '0');
//   }
// }

// hoursUpdate.addEventListener('change', updateClock);
// minutesUpdate.addEventListener('change', updateClock);

// updateClock();

// // Array to store the text of each note
// let noteAreaBoardUpdate = document.querySelector('#note-text');
// let noteAreaModalUpdate = document.querySelector('#note-text-modal');
// const btnModalUpdate = document.querySelector('#btn-modal-update');

// // Update the modal text area with the actual note:
// btnModalUpdate.addEventListener('click', () => {
//   // Set the value of the text field in the modal to the retrieved text
//   noteAreaModalUpdate.value = noteAreaBoardUpdate.innerText;
// });
