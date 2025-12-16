// Hent elementer
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formTitle = document.getElementById('formTitle');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');

// Bytt mellom Login og Registrering
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

// Innlogging (via backend) videresender til forsiden/landing page
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const btn = loginForm.querySelector('.login-btn');
  const originalText = btn.innerText;
  btn.innerText = 'LOGGER INN...';

  try {
    const res = await fetch("http://127.0.0.1:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Feil e-post eller passord.");
      btn.innerText = originalText;
      return;
    }

    window.location.href = 'Smidig-Prosjekt/frontpage/front.html';
  } catch (err) {
    alert("Fikk ikke kontakt med serveren. Sjekk at backend kjører.");
    btn.innerText = originalText;
  }
});

// Registreringen skjer gjennom backend + passordsjekk beholdes
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('regName').value.trim(); // brukes ikke i DB ennå
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  const errorMsg = document.getElementById('passError');

  errorMsg.style.display = 'none';

  if (!name || !email) {
    errorMsg.style.display = 'block';
    errorMsg.innerText = 'Fyll inn navn og e-post.';
    return;
  }

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

  const btn = registerForm.querySelector('.login-btn');
  const originalText = btn.innerText;
  btn.innerText = 'REGISTRERER...';

  try {
    const res = await fetch("http://127.0.0.1:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorMsg.style.display = 'block';
      errorMsg.innerText = data.error || "Noe gikk galt.";
      btn.innerText = originalText;
      return;
    }

    alert('Konto opprettet!');
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.innerText = 'Logg inn for å fortsette';
    registerForm.reset();
    btn.innerText = originalText;
  } catch (err) {
    alert("Fikk ikke kontakt med serveren. Har du sjekket om backend/docker kjører");
    btn.innerText = originalText;
  }
});
