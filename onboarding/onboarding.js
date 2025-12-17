const step = document.body.dataset.step;

document.querySelectorAll("[data-action]").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;

    if (action === "next") nextStep();
    if (action === "back") history.back();
    if (action === "skip") skip();
    if (action === "start") finish();
  });
});

function nextStep() {
  const next = Number(step) + 1;
  window.location.href = `onboard-${next}.html`;
}


function skip() {
  localStorage.setItem("onboard-completed", "true");
  window.location.href = "app.html";
}

function finish() {
  const save = document.getElementById("persist")?.checked;
  if (save) localStorage.setItem("prefs", "true");

  localStorage.setItem("onboard-completed", "true");
  window.location.href = "../login.html";
}
