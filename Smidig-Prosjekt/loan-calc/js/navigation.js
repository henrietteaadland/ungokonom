/*
============================================================
FIL: navigation.js
Styrer navigasjon mellom steg 1–4
------------------------------------------------------------
Ansvar:
- Viser riktig steg (CSS-klassen step_active)
- Kobler Neste/Tilbake-knapper
- Passer på at steg 4 blir initialisert riktig

Samspill med andre filer:
- Bruker show_step for å bytte steg
- Kaller setup_step1() og setup_step2() fra calculator.js
- Leser current_loan (global) fra calculator.js
- Kaller init_step4() fra scenarios.js og bruker step4_initialized
============================================================
*/

/*
------------------------------------------------------------
DEL 1A: Oppdater steg-meny på venstre siden av lånekalkuilatoren
------------------------------------------------------------
*/
function update_step_menu_active(step_number) {
  const all_menu_items = document.querySelectorAll(".step_menu_item");

  all_menu_items.forEach(function (menu_item) {
    menu_item.classList.remove("step_menu_item_active");
  });

  const active_menu_item = document.getElementById("menu_step_" + step_number);
  if (active_menu_item) {
    active_menu_item.classList.add("step_menu_item_active");
  }
}

/*
------------------------------------------------------------
DEL 1B: Hjelpefunksjon for å vise riktig steg
------------------------------------------------------------
*/
function show_step(step_number) {
  var loan_type = selected_loan_type;
  if (!loan_type && current_loan && current_loan.loan_type) {
    loan_type = current_loan.loan_type;
  }

  if (step_number === 5 && loan_type !== "car") {
    step_number = 4;
  }

  /*
  ----------------------
  Skjul alle steg
  ----------------------
  */
  const all_steps = document.querySelectorAll(".step");

  all_steps.forEach(function (step_element) {
    step_element.classList.remove("step_active");
  });

  /*
  ----------------------
  Vis valgt steg
  ----------------------
  */
  const active_step = document.getElementById("step_" + step_number);
  if (active_step) {
    active_step.classList.add("step_active");
  }

  /*
  ----------------------
  Oppdater venstre meny
  ----------------------
  */
  update_step_menu_active(step_number);

  if (step_number === 4) {
    update_step4_next_button();
  }


  /*
  ----------------------------
  Oppdater prikkene i stepper
  Kommentert ut for å teste/bruke en annen meny
  ----------------------------

  const dots = document.querySelectorAll(".stepper_dot");

  dots.forEach(function (dot, index) {
    // index starter på 0, så vi sammenligner med step_number - 1
    if (index === step_number - 1) {
      dot.classList.add("stepper_dot_active");
    } else {
      dot.classList.remove("stepper_dot_active");
    }
  });

  */
}

/*
------------------------------------------------------------
DEL 2A: Koble knapper til navigasjon
------------------------------------------------------------
*/

function update_step4_next_button() {
  var old_btn = document.getElementById("btn_next_step_4");
  if (!old_btn) {
    return;
  }


var btn = old_btn.cloneNode(true);
old_btn.parentNode.replaceChild(btn, old_btn);

var loan_type = selected_loan_type;
if (!loan_type && current_loan && current_loan.loan_type) {
  loan_type = current_loan.loan_type;
}

if (selected_loan_type === "car") {
  btn.textContent = "Neste";
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    show_step(5);
  });

} else {
  btn.textContent = "Start på nytt";
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    selected_loan_type = null;
    current_loan = null;
    show_step(1);
  });
  }
}





/*
------------------------------------------------------------
DEL 2B: Koble knapper til navigasjon
------------------------------------------------------------
*/
function setup_navigation() {
  const btn_next_3 = document.getElementById("btn_next_step_3");

  const btn_back_2 = document.getElementById("btn_back_step_2");
  const btn_back_3 = document.getElementById("btn_back_step_3");
  const btn_back_step_4 = document.getElementById("btn_back_step_4");

  const btn_next_step_4 = document.getElementById("btn_next_step_4");
  const btn_back_step_5 = document.getElementById("btn_back_step_5");

  const btn_restart = document.getElementById("btn_restart");

  if (btn_back_2) {
    btn_back_2.addEventListener("click", function () {
      show_step(1);
    });
  }

  if (btn_back_3) {
    btn_back_3.addEventListener("click", function () {
      show_step(2);
    });
  }

  if (btn_next_3) {
    btn_next_3.addEventListener("click", function () {
      if (!current_loan) {
        alert("Du må først fylle inn tallene i steg 2 og beregne lånet.");
        return;
      }

      show_step(4);
      update_step4_next_button();

      if (!step4_initialized) {
        requestAnimationFrame(function () {
          init_step4({
            loan_amount: current_loan.loan_amount,
            interest_rate: current_loan.interest_rate,
            years: current_loan.years,
            equity: current_loan.equity
          });
          step4_initialized = true;
        });
      }
    });
  }

  if (btn_back_step_5) {
    btn_back_step_5.addEventListener("click", function () {
      show_step(4);
    });
  }

  if (btn_restart) {
    btn_restart.addEventListener("click", function () {
      window.location.reload();
    });
  }
}

/*
------------------------------------------------------------
DEL 3: Init når siden er ferdig lastet
------------------------------------------------------------
*/
document.addEventListener("DOMContentLoaded", function () {
  show_step(1);
  setup_step1();
  setup_step2();
  setup_navigation();
});
