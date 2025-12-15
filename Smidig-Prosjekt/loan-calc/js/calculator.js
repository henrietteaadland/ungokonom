/*
============================================================
FIL: calculator.js
Hovedlogikk for lånekalkulatoren (steg 1–3)
------------------------------------------------------------
Ansvar:
- Steg 1: velge lånetype (bolig / bil)
- Steg 2: lese inn tall (kjøpesum, egenkapital, rente, år)
- Beregne månedskostnad og totale kostnader
- Lagrer resultatet i current_loan (deles med andre filer)
- Fyller ut oppsummeringen i steg 3

Samspill med andre filer:
- Bruker helpers.js for formatering og parsing av tall
- Bruker navigation.js for å bytte mellom steg (show_step)
- Brukes av navigation.js (current_loan leses i steg 3 og 4)
- Brukes indirekte av scenarios.js via calculate_loan()
============================================================
*/

/*
------------------------------------------------------------
DEL 1: Globale variabler
------------------------------------------------------------
*/
let selected_loan_type = null;
let current_loan = null;

/*
------------------------------------------------------------
DEL 2: Steg 1 – velge lånetype
------------------------------------------------------------
*/
function setup_step1() {
  const housing_card = document.getElementById("loan_type_housing_card");
  const car_card = document.getElementById("loan_type_car_card");
  const btn_next_1 = document.getElementById("btn_next_step_1");

  if (housing_card) {
    housing_card.addEventListener("click", function () {
      selected_loan_type = "housing";

      /*
      ----------------------
      Marker valgt kort
      ----------------------

      */
      housing_card.classList.add("selected");
      if (car_card) {
        car_card.classList.remove("selected");
      }
    });
  }

  if (car_card) {
    car_card.addEventListener("click", function () {
      selected_loan_type = "car";

      /*
      ----------------------
      Marker valgt kort
      ----------------------

      */
      car_card.classList.add("selected");
      if (housing_card) {
        housing_card.classList.remove("selected");
      }
    });
  }

  if (btn_next_1) {
    btn_next_1.addEventListener("click", function () {
      if (!selected_loan_type) {
        alert("Velg først om du vil låne til bolig eller bil.");
        return;
      }

      /*
      ----------------------
      Her går vi bare videre til steg 2 dersom lånetype er valgt
      ----------------------

      */
      show_step(2);
    });
  }
}

/*
------------------------------------------------------------
DEL 3: Selve låneberegningen
------------------------------------------------------------
*/
function calculate_loan(loan_amount, interest_rate_percent, years) {
  const yearly_rate = Number(interest_rate_percent) / 100;
  const monthly_rate = yearly_rate / 12;
  const total_months = years * 12;

  if (total_months <= 0) {
    return {
      monthly: 0,
      total_paid: 0,
      total_interest: 0
    };
  }

  if (monthly_rate === 0) {
    const monthly = loan_amount / total_months;
    const total_paid = monthly * total_months;
    const total_interest = total_paid - loan_amount;

    return {
      monthly: monthly,
      total_paid: total_paid,
      total_interest: total_interest
    };
  }

  const factor = Math.pow(1 + monthly_rate, total_months);
  const monthly = loan_amount * (monthly_rate * factor) / (factor - 1);
  const total_paid = monthly * total_months;
  const total_interest = total_paid - loan_amount;

  return {
    monthly: monthly,
    total_paid: total_paid,
    total_interest: total_interest
  };
}

/*
------------------------------------------------------------
DEL 4: Steg 2 – lese inn tall og beregne
------------------------------------------------------------
*/
function setup_step2() {
  const purchase_input = document.getElementById("purchase_price_input");
  const equity_input = document.getElementById("equity_input");
  const interest_input = document.getElementById("interest_input");
  const years_input = document.getElementById("years_input");
  const btn_next_2 = document.getElementById("btn_next_step_2");

  /*
  ----------------------
  Formatering av kjøpesum og egenkapital mens brukeren skriver
  ----------------------

  */
  setup_currency_formatting(purchase_input);
  setup_currency_formatting(equity_input);

  if (!btn_next_2) {
    return;
  }

  btn_next_2.addEventListener("click", function () {
    /*
    ----------------------
    Leser verdier fra feltene
    ----------------------

    */
    const purchase_price = parse_currency_input(purchase_input);
    const equity = parse_currency_input(equity_input);

    const interest_rate = Number(
      String(interest_input.value || "").replace(",", ".")
    );
    const years = Number(String(years_input.value || "").trim());

    /*
    -------------------------------
    Enkel validering av input
    ----------------------------------

    */
    if (isNaN(purchase_price) || purchase_price <= 10_000 || purchase_price > 50_000_000) {
      alert("Kjøpesum må være mellom 10 000 kr og 50 000 000 kr.");
      return;
    }

    if (equity < 0 || equity >= purchase_price) {
      alert("Egenkapital må være større eller lik 0, og mindre enn kjøpesummen.");
      return;
    }

    if (isNaN(interest_rate) || interest_rate <= 0 || interest_rate > 25) {
      alert("Maks tillatt rente er 25%.");
      return;
    }

    if (isNaN(years) || years <= 0 || years > 50) {
      alert("Maks tillatt nedbetalingstid er 50 år.");
      return;
    }

    /*
    ----------------------
    Beregner selve lånet
    ----------------------

    */
    const loan_amount = purchase_price - equity;
    const result = calculate_loan(loan_amount, interest_rate, years);

    current_loan = {
      loan_type: selected_loan_type,
      purchase_price: purchase_price,
      equity: equity,
      loan_amount: loan_amount,
      interest_rate: interest_rate,
      years: years,
      result: result
    };

    show_step(3);

    requestAnimationFrame(function () {
      update_step3();
    });
  });
}


/*
------------------------------------------------------------
DEL 5B: Grafisk visning for steg 3 (hovedlån)
------------------------------------------------------------
*/
let step3_chart = null;

function update_step3_chart(loan_amount, total_interest) {
  const canvas = document.getElementById("step3_chart_canvas");
  if (!canvas || typeof Chart === "undefined") {
    return;
  }

  const context = canvas.getContext("2d");
  const principal = loan_amount;
  const interest = total_interest;
  const data_values = [principal, interest];

  if (!step3_chart) {
    step3_chart = new Chart(context, {
      type: "doughnut",
      data: {
        labels: ["Nedbetaling (lån)", "Renter"],
        datasets: [
          {
            data: data_values
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });
  } else {
    step3_chart.data.datasets[0].data = data_values;
    step3_chart.update();
  }
}

/*
------------------------------------------------------------
DEL 5: Steg 3 – oppsummering
------------------------------------------------------------
*/
function update_step3() {
  if (!current_loan) {
    return;
  }

  const loan_amount = current_loan.loan_amount;
  const result = current_loan.result;

  set_text("step3_loan_amount", format_currency(loan_amount) + " kr");
  set_text("step3_monthly", format_currency(result.monthly) + " kr");
  set_text("step3_total_paid", format_currency(result.total_paid) + " kr");
  set_text("step3_total_interest", format_currency(result.total_interest) + " kr");

  update_step3_chart(loan_amount, result.total_interest);
}
