// --- NAVIGASJON I INNSTILLINGER ---
const menuButtons = document.querySelectorAll(".sidebar .menu-btn:not(.danger-link)");
const pages = document.querySelectorAll(".page");

menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const pageId = btn.getAttribute("data-page");
        if(pageId) {
            pages.forEach(p => p.classList.remove("active"));
            document.getElementById(pageId).classList.add("active");
        }
    });
});

// --- LOGG UT ---
const logoutButtons = document.querySelectorAll(".logout-everywhere");
logoutButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (confirm("Er du sikker på at du vil logge ut av alle enheter?")) {
            window.location.href = "login.html";
        }
    });
});

// --- NAVIGASJON MELLOM SIDENE ---
const settingsView = document.getElementById('settings-view');
const criticalView = document.getElementById('critical-view');
const goToCriticalBtn = document.getElementById('goToCriticalBtn');
const goBackBtn = document.getElementById('goBackBtn');

goToCriticalBtn.addEventListener('click', () => {
    settingsView.style.display = 'none';
    criticalView.style.display = 'flex';
});

goBackBtn.addEventListener('click', (e) => {
    e.preventDefault();
    criticalView.style.display = 'none';
    settingsView.style.display = 'flex';
});

// --- KRITISKE VALG (BACKEND INTEGRASJON) ---
const deactivateButton = document.getElementById("deactivateButton");
const deleteButton = document.getElementById("deleteButton");

if(deactivateButton) {
    deactivateButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const password = document.getElementById("password").value;

        if(!password) {
            alert("Du må skrive inn passord!");
            return;
        }

        if(confirm("Er du sikker på at du vil deaktivere kontoen din?")) {
            try {
                const res = await fetch("/api/deactivateAccount", { 
                    method: "POST", 
                    headers: {"Content-Type": "application/json" }, 
                    body: JSON.stringify({ password }) 
                });
                
                if (res.ok) {
                    alert(await res.text());
                    window.location.href = "login.html";
                } else {
                    alert("Kunne ikke deaktivere konto. Sjekk passordet.");
                }
            } catch (error) {
                console.error("Feil under deaktivering:", error);
                alert("Noe gikk galt. Prøv igjen senere.");
            }
        }
    });
}

if(deleteButton) {
    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const password = document.getElementById("password").value;

        if(!password) {
            alert("Du må skrive inn passord!");
            return;
        }

        if(confirm("Er du sikker på at du vil permanent slette kontoen din?")) {
            try {
                const res = await fetch("/api/deleteAccount", { 
                    method: "POST", 
                    headers: {"Content-Type": "application/json" }, 
                    body: JSON.stringify({ password }) 
                });

                if (res.ok) {
                    alert(await res.text());
                    window.location.href = "login.html";
                } else {
                    alert("Kunne ikke slette konto. Sjekk passordet.");
                }
            } catch (error) {
                console.error("Feil under sletting:", error);
                alert("Noe gikk galt. Prøv igjen senere.");
            }
        }
    });
}