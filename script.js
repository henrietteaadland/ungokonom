// PAGE SWITCHING
const buttons = document.querySelectorAll(".menu-btn");
const pages = document.querySelectorAll(".page");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const pageId = btn.getAttribute("data-page");

        pages.forEach(p => p.classList.remove("active"));
        document.getElementById(pageId).classList.add("active");
    });
});

// THEME SWITCHING
const lightBtn = document.getElementById("light");
const darkBtn = document.getElementById("dark");

lightBtn.addEventListener("click", () => {
    document.body.classList.remove("dark-mode");
});

darkBtn.addEventListener("click", () => {
    document.body.classList.add("dark-mode");
});

// LOGG UT AV ALLE ENHETER
const logoutButtons = document.querySelectorAll(".logout-everywhere");

logoutButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        const confirmLogout = confirm("Er du sikker på at du vil logge ut av alle enheter?");

        if (confirmLogout) {

            // Simulerer utlogging
            localStorage.clear();
            sessionStorage.clear();

            alert("Du er nå logget ut av alle enheter.");

            // Returner til forsiden
            pages.forEach(p => p.classList.remove("active"));
            document.getElementById("home").classList.add("active");
        }
    });
});
