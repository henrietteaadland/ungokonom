// --- HENT ELEMENTER FRA HTML ---
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formTitle = document.getElementById('formTitle');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');

// --- BYTT MELLOM LOGIN OG REGISTRERING ---

// Vis registreringsskjema
showRegisterBtn.addEventListener('click', function(e) {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  formTitle.innerText = 'Opprett ny konto';
});

// Vis innloggingsskjema
showLoginBtn.addEventListener('click', function(e) {
  e.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
  formTitle.innerText = 'Logg inn for å fortsette';
});

// --- INNLOGGING FUNKSJON (Simulert) ---
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const btn = loginForm.querySelector('.login-btn');
  const originalText = btn.innerText;
  
  // Vis "laster..." effekt
  btn.innerText = 'LOGGER INN...';
  btn.style.backgroundColor = '#00C1A3'; // Teal
  
  setTimeout(() => {
    alert(`Velkommen tilbake, ${email}!`);
    btn.innerText = originalText;
    btn.style.backgroundColor = '';
    // Her ville vi normalt sendt brukeren videre
  }, 1000);
});

// --- REGISTRERING FUNKSJON (Med Passord Sjekk) ---
registerForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  const errorMsg = document.getElementById('passError');
  const btn = registerForm.querySelector('.login-btn');
  
  // Nullstill feilmelding først
  errorMsg.style.display = 'none';
  errorMsg.innerText = '';

  // 1. Sjekk lengde (minst 8 tegn)
  if (password.length < 8) {
    errorMsg.style.display = 'block';
    errorMsg.innerText = 'Passordet må være minst 8 tegn langt.';
    return;
  }

  // 2. Sjekk om det er tall
  if (!/[0-9]/.test(password)) {
    errorMsg.style.display = 'block';
    errorMsg.innerText = 'Passordet må inneholde minst ett tall.';
    return;
  }

  // 3. Sjekk store og små bokstaver
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errorMsg.style.display = 'block';
    errorMsg.innerText = 'Passordet må ha både store og små bokstaver.';
    return;
  }

  // 4. Sjekk at passordene er like
  if (password !== confirmPassword) {
    errorMsg.style.display = 'block';
    errorMsg.innerText = 'Passordene er ikke like.';
    return;
  }

  // HVIS ALT ER OK:
  const originalText = btn.innerText;
  btn.innerText = 'REGISTRERER...';
  
  setTimeout(() => {
    alert('Konto opprettet! Du kan nå logge inn.');
    
    // Bytt tilbake til innlogging automatisk
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.innerText = 'Logg inn for å fortsette';
    
    // Nullstill skjemaet og knappen
    registerForm.reset();
    btn.innerText = originalText;
  }, 1000);
});
