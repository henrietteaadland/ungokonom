const deactivateButton = document.getElementById("deactivateButton");
const deleteButton = document.getElementById("deleteButton");

deactivateButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const password = document.getElementById("password").value;

    if(confirm("Er du sikker på at du vil deaktivere kontoen din?")) {
        const res = await fetch("/api/deactivateAccount", { 
            method: "POST", headers: {"Content-Type": "application/json" }, body: JSON.stringify({ password }) 
        });
        alert(await res.text());
    }
});

deleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const passowrd = document.getElementById("password").value;

    if(confirm("Er du sikker på at du vil permanent slette kontoen din?")) {
        const res = await fetch("/api/deleteAccount", { 
            method: "POST", headers: {"Content-Type": "application/json" }, body: JSON.stringify({ password }) 
        });
        alert(await res.text());
    }
});

