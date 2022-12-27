let consonants = document.getElementById('consonants');
const consonantsList = 'bcdfghjklmnpqrstwvxyz';

for (letter of consonantsList)
consonants.innerHTML +=
`<input type="checkbox" id="consonants" name="deleteConsonant_${letter}">
<label for="consonants">${letter}</label> `;