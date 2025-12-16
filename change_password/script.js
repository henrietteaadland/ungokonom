const changePasswordButton = document.getElementById("changePasswordButton");
changePasswordButton.addEventListener("click" = async (event) => {
  event.preventDefault();
  const oldPassword = document.getElementById('oldPassword').value;
  const newPassword = document.getElementById('newPassword').value;

  if(confirm("Er du sikker på at du vil endre passordet ditt?")) {
    const res = await fetch ("/api/changePassword", {
      method: "POST", headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ oldPassword, newPassword })
    });
    alert(await res.text());
  }
});    