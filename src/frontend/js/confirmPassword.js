function checkPasswordMatch() {
  let checkPasswordText = document.getElementById('checkPasswordMatchMessage');
  let registerButton = document.getElementById('registerButton');

  if (password.value === confirmPassword.value && username.value !== '') {
    registerButton.style.display = '';
    checkPasswordText.innerHTML = '';
  } else {
    registerButton.style.display = 'none';
    if (password.value !== '' && username.value !== '') {
      checkPasswordText.innerHTML = `<div class="row">
      <div class="col my-3">
        <div class="alert alert-danger">Passwords not matching!</div>
      </div>
    </div>`;
    }
  }
  if (username.value === '') {
    checkPasswordText.innerHTML = `<div class="row">
    <div class="col my-3">
      <div class="alert alert-danger">Username is required!</div>
    </div>`;
  }
}

let username = document.getElementById('typeEmailX');

if (username) {
  username.addEventListener('input', checkPasswordMatch);
}

let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirm-password');
let showPasswordIcon = document.getElementById('show-password-icon');

if (confirmPassword) {
  confirmPassword.addEventListener('input', checkPasswordMatch);
}

function togglePasswordVisibility() {
  if (password.type === 'password') {
    password.type = 'text';
    confirmPassword.type = 'text';
    showPasswordIcon.src = '/img/visibility_on.svg';
  } else {
    password.type = 'password';
    confirmPassword.type = 'password';
    showPasswordIcon.src = '/img/visibility_off.svg';
  }
}

let toggleButton = document.getElementById('toggle-password-visibility');

if (toggleButton) {
  toggleButton.addEventListener('click', togglePasswordVisibility);
}
