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
DEL 1: Hjelpefunksjon for å vise riktig steg
------------------------------------------------------------
*/
function show_step(step_number) {
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
  ----------------------------
  Oppdater prikkene i stepper
  ----------------------------
  */
  const dots = document.querySelectorAll(".stepper_dot");

  dots.forEach(function (dot, index) {
    /*
    ------------------------------------------------------------
    index starter på 0, så vi sammenligner med step_number - 1
    ------------------------------------------------------------
    */
    if (index === step_number - 1) {
      dot.classList.add("stepper_dot_active");
    } else {
      dot.classList.remove("stepper_dot_active");
    }
  });
}

/*
------------------------------------------------------------
DEL 2: Koble knapper til navigasjon
------------------------------------------------------------
*/
function setup_navigation() {
  const btn_next_3 = document.getElementById("btn_next_step_3");

  const btn_back_2 = document.getElementById("btn_back_step_2");
  const btn_back_3 = document.getElementById("btn_back_step_3");
  const btn_back_step_4 = document.getElementById("btn_back_step_4");

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

  if (btn_back_step_4) {
    btn_back_step_4.addEventListener("click", function () {
      show_step(3);
    });
  }

  if (btn_next_3) {
    btn_next_3.addEventListener("click", function () {
      if (!current_loan) {
        alert("Du må først fylle inn tallene i steg 2 og beregne lånet.");
        return;
      }

      if (!step4_initialized) {
        init_step4({
          loan_amount: current_loan.loan_amount,
          interest_rate: current_loan.interest_rate,
          years: current_loan.years,
          equity: current_loan.equity
        });
        step4_initialized = true;
      }

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

  /*
  ----------------------
  Start på steg 1
  ----------------------
  */

  setup_step1();

  /*
  ----------------------
  Valg av lånetype (calculator.js)
  ----------------------
  */

  setup_step2();

  /*
  ----------------------
  Skjemaet med tall (calculator.js)
  ----------------------
  */

  setup_navigation();

  /*
  ----------------------
  Denne filen
  ----------------------
  */
});
