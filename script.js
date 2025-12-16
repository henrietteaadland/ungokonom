// Hent elementer
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formTitle = document.getElementById('formTitle');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');

// 1. Bytt mellom Login og Registrering
showRegisterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  formTitle.innerText = 'Opprett ny konto';
});

showLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
  formTitle.innerText = 'Logg inn for å fortsette';
});

// 2. Innlogging -> GÅR TIL FORSIDEN
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = loginForm.querySelector('.login-btn');
  const originalText = btn.innerText;
  
  btn.innerText = 'LOGGER INN...';
  btn.style.backgroundColor = '#00C1A3';
  
  setTimeout(() => {
    // SENDER DEG TIL HENRIETTES FORSIDE
    window.location.href = 'Smidig-Prosjekt/frontpage/front.html';
    
  }, 1000);
});

// 3. Registrering med Passord-sjekk
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  const errorMsg = document.getElementById('passError');
  
  errorMsg.style.display = 'none';

  if (password.length < 8 || !/[0-9]/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errorMsg.style.display = 'block';
    errorMsg.innerText = 'Passordet må ha minst 8 tegn, tall, stor og liten bokstav.';
    return;
  }
  
  if (password !== confirmPassword) {
    errorMsg.style.display = 'block';
    errorMsg.innerText = 'Passordene er ikke like.';
    return;
  }

  // Registrering OK
  const btn = registerForm.querySelector('.login-btn');
  btn.innerText = 'REGISTRERER...';
  
  setTimeout(() => {
    alert('Konto opprettet!');
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.innerText = 'Logg inn for å fortsette';
    registerForm.reset();
    btn.innerText = 'REGISTRER DEG';
  }, 1000);
});