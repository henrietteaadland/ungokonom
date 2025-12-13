/*
============================================================
FIL: scenarios.js
Scenarier i steg 4 (mer egenkapital + endret rente)
------------------------------------------------------------
Ansvar:
- Tar utgangspunkt i basislånet som er beregnet i calculator.js
- Viser hvordan små endringer påvirker månedskostnad og renter
- Holder slider og kr-input i sync
- Holder rente-slider og rente-input i sync (0 i midten)
- Oppdaterer linjediagrammet (Chart.js) uten å re-initialisere
============================================================
*/

/*
------------------------------------------------------------
DEL 1: Global flagg for om steg 4 allerede er satt opp
------------------------------------------------------------
*/
let step4_initialized = false;

/*
------------------------------------------------------------
DEL 2: Interne verdier for basislånet
------------------------------------------------------------
*/
let base_loan_amount = 0;
let base_interest_rate = 0;
let base_years = 0;
let base_equity = 0;

let base_result = {
  monthly: 0,
  total_paid: 0,
  total_interest: 0
};

/*
------------------------------------------------------------
DEL 3: Graf (Chart.js) for steg 4
- Initieres kun én gang, og oppdateres deretter
------------------------------------------------------------
*/
let step4_chart = null;

function format_kr_for_tooltip(value) {
  return format_currency(value) + " kr";
}

function update_step4_chart(base_monthly, more_equity_monthly, interest_change_monthly) {
  const canvas = document.getElementById("step4_chart_canvas");
  if (!canvas || typeof Chart === "undefined") {
    return;
  }

  const context = canvas.getContext("2d");

  const labels = ["Standardlån", "Mer egenkapital", "Endret rente"];
  const data_values = [
    Number(base_monthly) || 0,
    Number(more_equity_monthly) || 0,
    Number(interest_change_monthly) || 0
  ];

  if (!step4_chart) {
    step4_chart = new Chart(context, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Månedskostnad",
            data: data_values,
            tension: 0.25,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                const y = ctx.parsed.y;
                return "Månedskostnad: " + format_kr_for_tooltip(y);
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Scenario"
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Månedskostnad (kr)"
            },
            ticks: {
              callback: function (value) {
                return format_currency(value);
              }
            }
          }
        }
      }
    });
  } else {
    step4_chart.data.labels = labels;
    step4_chart.data.datasets[0].data = data_values;
    step4_chart.update();
  }
}

/*
------------------------------------------------------------
DEL 4: Hjelpefunksjoner for scenario-beregninger
------------------------------------------------------------
*/
function clamp_number(value, min_value, max_value) {
  const n = Number(value);
  if (isNaN(n)) {
    return min_value;
  }
  return Math.min(max_value, Math.max(min_value, n));
}

function round_to_step(value, step) {
  const n = Number(value);
  const s = Number(step);

  if (isNaN(n) || isNaN(s) || s <= 0) {
    return 0;
  }

  return Math.round(n / s) * s;
}

function format_pp_label(value_pp) {
  const n = Number(value_pp);
  if (isNaN(n)) {
    return "0,0";
  }
  return n.toFixed(1).replace(".", ",");
}

function calculate_more_equity_result(extra_equity_amount) {
  const extra_equity = Math.max(0, Number(extra_equity_amount) || 0);

  /*
  ----------------------
  Kan ikke redusere lånet under 0
  ----------------------
  */
  const adjusted_loan_amount = Math.max(0, base_loan_amount - extra_equity);

  return calculate_loan(
    adjusted_loan_amount,
    base_interest_rate,
    base_years
  );
}

function calculate_interest_change_result(interest_change_pp) {
  const change = Number(String(interest_change_pp || "").replace(",", "."));
  const effective_change = isNaN(change) ? 0 : change;

  const new_rate = Math.max(0, base_interest_rate + effective_change);

  return calculate_loan(
    base_loan_amount,
    new_rate,
    base_years
  );
}

/*
------------------------------------------------------------
DEL 5: Oppdatering av UI for scenario "Mer egenkapital"
------------------------------------------------------------
*/
function setup_more_equity_controls() {
  const extra_equity_input = document.getElementById("extra_equity_input");
  const extra_equity_percent_range = document.getElementById("extra_equity_percent_range");
  const extra_equity_percent_label = document.getElementById("extra_equity_percent_label");

  const more_equity_monthly_el = document.querySelector('[data-scenario="more_equity_monthly"]');
  const more_equity_interest_el = document.querySelector('[data-scenario="more_equity_interest"]');
  const more_equity_savings_el = document.querySelector('[data-scenario="more_equity_savings"]');

  if (extra_equity_input) {
    setup_currency_formatting(extra_equity_input);
  }

  function set_percent_label(percent_value) {
    if (!extra_equity_percent_label) {
      return;
    }

    extra_equity_percent_label.textContent = String(Math.round(Number(percent_value) || 0));
  }

  function render_more_equity(extra_equity_amount) {
    const new_result = calculate_more_equity_result(extra_equity_amount);

    const interest_difference = base_result.total_interest - new_result.total_interest;

    if (more_equity_monthly_el) {
      more_equity_monthly_el.textContent = format_currency(new_result.monthly);
    }

    if (more_equity_interest_el) {
      more_equity_interest_el.textContent = format_currency(new_result.total_interest);
    }

    if (more_equity_savings_el) {
      more_equity_savings_el.textContent = format_currency(interest_difference);
    }

    /*
    ----------------------
    Oppdater grafen
    ----------------------
    */
    const current_interest_change_monthly = get_interest_change_monthly_for_chart();
    update_step4_chart(base_result.monthly, new_result.monthly, current_interest_change_monthly);
  }

  function update_from_slider() {
    if (!extra_equity_percent_range) {
      return;
    }

    const percent = clamp_number(extra_equity_percent_range.value, 0, 30);
    set_percent_label(percent);

    /*
    --------------------------------------
    X % av egenkapitalen fra steg 2
    --------------------------------------
    */
    const calculated_amount = base_equity > 0
      ? Math.round(base_equity * (percent / 100))
      : 0;

    if (extra_equity_input) {
      extra_equity_input.value = format_currency(calculated_amount);
    }

    render_more_equity(calculated_amount);
  }

  function update_from_input() {
    if (!extra_equity_input) {
      return;
    }

    const extra_amount = parse_currency_input(extra_equity_input);

    let percent = 0;
    if (base_equity > 0) {
      percent = (extra_amount / base_equity) * 100;
    }

    const clamped_percent = clamp_number(percent, 0, 30);

    if (extra_equity_percent_range) {
      extra_equity_percent_range.value = String(Math.round(clamped_percent));
    }

    set_percent_label(clamped_percent);

    render_more_equity(extra_amount);
  }

  /*
  --------------------------------------------------------
  Event listeners
  --------------------------------------------------------
  */
  if (extra_equity_percent_range) {
    extra_equity_percent_range.addEventListener("input", update_from_slider);
  }

  if (extra_equity_input) {
    extra_equity_input.addEventListener("input", update_from_input);
  }

  /*
  ----------------------
  Startverdier
  ----------------------
  */
  if (extra_equity_percent_range) {
    extra_equity_percent_range.value = "0";
  }
  if (extra_equity_input) {
    extra_equity_input.value = "0";
  }
  set_percent_label(0);
  render_more_equity(0);
}

/*
------------------------------------------------------------
DEL 6: Oppdatering av UI for scenario "Endre rente"
- Input + slider er alltid i sync
- Slideren har 0 i midten
------------------------------------------------------------
*/
function get_interest_change_monthly_for_chart() {
  const interest_change_monthly_el = document.querySelector('[data-scenario="interest_change_monthly"]');
  if (!interest_change_monthly_el) {
    return base_result.monthly;
  }

  const parsed = Number(String(interest_change_monthly_el.textContent || "").replace(/\s/g, ""));
  if (isNaN(parsed)) {
    return base_result.monthly;
  }

  return parsed;
}

function setup_interest_change_controls() {
  const interest_change_input = document.getElementById("interest_change_input");
  const interest_change_range = document.getElementById("interest_change_range");
  const interest_change_label = document.getElementById("interest_change_label");

  const interest_change_monthly_el = document.querySelector('[data-scenario="interest_change_monthly"]');
  const interest_change_interest_el = document.querySelector('[data-scenario="interest_change_interest"]');
  const interest_change_diff_el = document.querySelector('[data-scenario="interest_change_diff"]');
  const interest_change_diff_word = document.getElementById("interest_change_diff_word");

  function get_range_settings() {
    const min_value = interest_change_range ? Number(interest_change_range.min) : -3;
    const max_value = interest_change_range ? Number(interest_change_range.max) : 3;
    const step_value = interest_change_range ? Number(interest_change_range.step) : 0.1;

    return {
      min_value: isNaN(min_value) ? -3 : min_value,
      max_value: isNaN(max_value) ? 3 : max_value,
      step_value: isNaN(step_value) || step_value <= 0 ? 0.1 : step_value
    };
  }

  function set_interest_label(value_pp) {
    if (!interest_change_label) {
      return;
    }
    interest_change_label.textContent = format_pp_label(value_pp);
  }

  function render_interest_change(value_pp) {
    const new_result = calculate_interest_change_result(value_pp);

    const diff_interest = new_result.total_interest - base_result.total_interest;
    const abs_diff = Math.abs(diff_interest);

    if (interest_change_monthly_el) {
      interest_change_monthly_el.textContent = format_currency(new_result.monthly);
    }

    if (interest_change_interest_el) {
      interest_change_interest_el.textContent = format_currency(new_result.total_interest);
    }

    if (interest_change_diff_el) {
      interest_change_diff_el.textContent = format_currency(abs_diff);
    }

    if (interest_change_diff_word) {
      interest_change_diff_word.textContent = diff_interest >= 0 ? "mer" : "mindre";
    }

    /*
    ----------------------
    Oppdater grafen
    ----------------------
    */
    const more_equity_monthly_el = document.querySelector('[data-scenario="more_equity_monthly"]');
    let more_equity_monthly = base_result.monthly;

    if (more_equity_monthly_el) {
      const parsed = Number(String(more_equity_monthly_el.textContent || "").replace(/\s/g, ""));
      if (!isNaN(parsed)) {
        more_equity_monthly = parsed;
      }
    }

    update_step4_chart(base_result.monthly, more_equity_monthly, new_result.monthly);
  }

  function update_from_slider() {
    if (!interest_change_range) {
      return;
    }

    const settings = get_range_settings();
    const raw_value = Number(interest_change_range.value);
    const clamped_value = clamp_number(raw_value, settings.min_value, settings.max_value);
    const stepped_value = round_to_step(clamped_value, settings.step_value);

    /*
    ---------------------------------------------------------------
    Hold slider stabil (så den ikke havner på 1.20000000002 osv.)
    ---------------------------------------------------------------
    */
    interest_change_range.value = String(stepped_value);

    if (interest_change_input) {
      interest_change_input.value = String(stepped_value);
    }

    set_interest_label(stepped_value);
    render_interest_change(stepped_value);
  }

  function update_from_input() {
    if (!interest_change_input) {
      return;
    }

    const settings = get_range_settings();

    const raw_value = Number(String(interest_change_input.value || "").replace(",", "."));
    const cleaned_value = isNaN(raw_value) ? 0 : raw_value;

    const clamped_value = clamp_number(cleaned_value, settings.min_value, settings.max_value);
    const stepped_value = round_to_step(clamped_value, settings.step_value);

    if (interest_change_input) {
      interest_change_input.value = String(stepped_value);
    }

    if (interest_change_range) {
      interest_change_range.value = String(stepped_value);
    }

    set_interest_label(stepped_value);
    render_interest_change(stepped_value);
  }

  /*
  --------------------------------------------------------
  Event listeners
  --------------------------------------------------------
  */
  if (interest_change_range) {
    interest_change_range.addEventListener("input", update_from_slider);
  }

  if (interest_change_input) {
    interest_change_input.addEventListener("input", update_from_input);
  }

  /*
  ----------------------
  Startverdier
  ----------------------
  */
  if (interest_change_input) {
    interest_change_input.value = "0";
  }
  if (interest_change_range) {
    interest_change_range.value = "0";
  }
  set_interest_label(0);
  render_interest_change(0);
}

/*
------------------------------------------------------------
DEL 7: Init for steg 4
------------------------------------------------------------
*/
function init_step4(loan_data) {
  if (!loan_data) {
    return;
  }

  base_loan_amount = Number(loan_data.loan_amount) || 0;
  base_interest_rate = Number(loan_data.interest_rate) || 0;
  base_years = Number(loan_data.years) || 0;
  base_equity = Number(loan_data.equity) || 0;

  base_result = calculate_loan(base_loan_amount, base_interest_rate, base_years);

  /*
  ---------------------------------------------------------
  Init grafen med basisverdier før vi regner på scenarier
  ---------------------------------------------------------
  */
  update_step4_chart(base_result.monthly, base_result.monthly, base_result.monthly);

  setup_more_equity_controls();
  setup_interest_change_controls();
}
