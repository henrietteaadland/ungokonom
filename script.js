// Skift mellom login og register
function showRegister() {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.add("active");
}

function showLogin() {
    document.getElementById("registerForm").classList.remove("active");
    document.getElementById("loginForm").classList.add("active");
}

// Registrer bruker
function register() {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!username || !password) {
        alert("Vennligst fyll inn alle felt.");
        return;
    }

    // Sjekk om bruker finnes allerede
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.username === username);

    if (exists) {
        alert("Brukernavnet er allerede tatt.");
        return;
    }

    // Lagre bruker
    users.push({
        username: username,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Bruker opprettet! Du kan nå logge inn.");
    showLogin();
}

// Logg inn
function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        alert("Feil brukernavn eller passord.");
        return;
    }

    alert("Logget inn som: " + username);

    // Her kan du sende brukeren til en ny side:
    // window.location.href = "dashboard.html";
}
