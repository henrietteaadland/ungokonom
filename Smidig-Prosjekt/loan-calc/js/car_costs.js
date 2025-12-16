/*
============================================================
FIL: car_costs.js
Bergne bilkostnad elbil kontra fossilbil
------------------------------------------------------------
Ansvar:
- Vise/skjule riktige felter basert på biltype
- Beregne drivstoff/strømkostnader per mnd basert på km kjørt
- Summere kostandene
------------------------------------------------------------
Samspill med andre filer:
- Lese verdier fra HTML-input-felter
============================================================
*/

/*
----------------------------------------------------------------------
DEL 1: Oppsett og dom-event lyttere
----------------------------------------------------------------------
*/

function get_el(id) {
  return document.getElementById(id);
}

function set_hidden(el, should_hide) {
  if (!el) {
    return;
  }
  if (should_hide) {
    el.classList.add("is_hidden");
  } else {
    el.classList.remove("is_hidden");
  }
}

/*
----------------------------------------------------------
Sette standard-verdier uten å overskrive bruker input
----------------------------------------------------------
*/

function set_value_if_empty(input_el, value_string) {
  if (!input_el) {
    return;
  }

  if (String(input_el.value || "").trim() === "") {
    input_el.value = value_string;
  }
}

/*
------------------------------------------------------------
DEL 2: Vis/skjul felter basert på biltype
------------------------------------------------------------
*/

function update_car_type_ui() {
  var type_select = get_el("car_type_select");

  var electric_consumption_wrap = get_el("car_electric_consumption_wrap");
  var fossil_consumption_wrap = get_el("car_fossil_consumption_wrap");

  var electric_price_wrap = get_el("car_electric_price_wrap");
  var fossil_price_wrap = get_el("car_fossil_price_wrap");

  var selected_value = type_select ? type_select.value : "fossil";
  var is_electric = selected_value === "electric";
  var is_fossil = selected_value === "fossil";

  /*
  ---------------------------------
  Vis/skjul riktig input-grupper
  ---------------------------------
  */
  set_hidden(electric_consumption_wrap, !is_electric);
  set_hidden(electric_price_wrap, !is_electric);

  set_hidden(fossil_consumption_wrap, !is_fossil);
  set_hidden(fossil_price_wrap, !is_fossil);

  /*
  -------------------------------------
  Standard-estimater for valgt biltype
  (kun hvis feltet er tomt)
  -------------------------------------
  */
  if (is_electric) {
    set_value_if_empty(get_el("car_electric_consumption_input"), "15.0");
    set_value_if_empty(get_el("car_electric_price_input"), "1.5");
  }

  if (is_fossil) {
    set_value_if_empty(get_el("car_fossil_consumption_input"), "7.5");
    set_value_if_empty(get_el("car_fossil_price_input"), "22.0");
  }
}

/*
----------------------------------------------------------------------
DEL 3: Koble sammen eventsene
----------------------------------------------------------------------
*/

function setup_car_costs() {
  var type_select = get_el("car_type_select");

  if (type_select) {
    type_select.addEventListener("change", update_car_type_ui);
  }

  update_car_type_ui();
}

document.addEventListener("DOMContentLoaded", setup_car_costs);

/*
------------------------------------------------------------
Oppsummering + kobling til graf (steg 5)
------------------------------------------------------------
*/
function calculate_car_costs_breakdown() {
  var km_year_el = get_el("car_km_year");
  var type_select = get_el("car_type_select");

  var depreciation_el = get_el("car_depreciation");
  var insurance_el = get_el("car_insurance_monthly");
  var maintenance_el = get_el("car_maintenance_monthly");

  var km_year = Number(km_year_el ? km_year_el.value : 0) || 0;
  var km_month = km_year / 12;

  var depreciation = Number(depreciation_el ? depreciation_el.value : 0) || 0;
  var insurance = Number(insurance_el ? insurance_el.value : 0) || 0;
  var maintenance = Number(maintenance_el ? maintenance_el.value : 0) || 0;

  var selected_value = type_select ? type_select.value : "fossil";
  var is_electric = selected_value === "electric";

  var energy = 0;

  if (is_electric) {
    var kwh_per_100 = Number(get_el("car_electric_consumption_input") ? get_el("car_electric_consumption_input").value : 0) || 0;
    var price_kwh = Number(get_el("car_electric_price_input") ? get_el("car_electric_price_input").value : 0) || 0;

    var kwh_per_km = kwh_per_100 / 100;
    energy = km_month * kwh_per_km * price_kwh;
  } else {
    var l_per_100 = Number(get_el("car_fossil_consumption_input") ? get_el("car_fossil_consumption_input").value : 0) || 0;
    var price_l = Number(get_el("car_fossil_price_input") ? get_el("car_fossil_price_input").value : 0) || 0;

    var l_per_km = l_per_100 / 100;
    energy = km_month * l_per_km * price_l;
  }

  var total = depreciation + energy + insurance + maintenance;

  return {
    depreciation: depreciation,
    energy: energy,
    insurance: insurance,
    maintenance: maintenance,
    total: total
  };
}

function render_car_costs_summary() {
  var monthly_el = get_el("car_total_monthly");
  var yearly_el = get_el("car_total_yearly");

  if (!monthly_el || !yearly_el) {
    return;
  }

  var breakdown = calculate_car_costs_breakdown();

  monthly_el.textContent = format_number(Math.round(breakdown.total));
  yearly_el.textContent = format_number(Math.round(breakdown.total * 12));

  if (typeof render_car_costs_chart === "function") {
    render_car_costs_chart(breakdown);
  }
}

function setup_car_costs_summary_events() {
  var section = get_el("car_costs_section");
  if (!section) {
    return;
  }

  var inputs = section.querySelectorAll("input, select");
  var i = 0;

  for (i = 0; i < inputs.length; i += 1) {
    inputs[i].addEventListener("input", render_car_costs_summary);
    inputs[i].addEventListener("change", render_car_costs_summary);
  }

  render_car_costs_summary();
}

document.addEventListener("DOMContentLoaded", setup_car_costs_summary_events);