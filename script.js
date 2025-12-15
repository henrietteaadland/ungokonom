

//skifter mellom login og register
function showRegister () {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.add("active");
}

function showLogin () {
    document.getElementById("registerForm").classList.remove("active");
    document.getElementById("loginForm").classList.add("active");
}









// Registrer bruker (DB via backend)
async function register() {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!username || !password) {
        alert("Vennligst fyll inn alle felt.");
        return;
    }

    try {
        const res = await fetch("http://127.0.0.1:3000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Noe gikk galt.");
            return;
        }

        alert("Bruker opprettet! Du kan nå logge inn.");
        showLogin();
    } catch (e) {
        alert("Fikk ikke kontakt med serveren. Sjekk at backend kjører.");
    }
}

// Logg inn (DB via backend)
async function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
        alert("Vennligst fyll inn alle felt.");
        return;
    }

    try {
        const res = await fetch("http://127.0.0.1:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Noe gikk galt.");
            return;
        }

        alert("Logget inn som: " + username);
        // window.location.href = "dashboard.html";
    } catch (e) {
        alert("Fikk ikke kontakt med serveren. Sjekk at backend kjører.");
    }
}
