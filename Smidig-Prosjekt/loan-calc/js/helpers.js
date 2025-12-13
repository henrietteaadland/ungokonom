/*
============================================================
FIL: helpers.js
Felles hjelpefunksjoner for lånesiden
------------------------------------------------------------
Brukes av:
- calculator.js (lese/formatere tall)
- scenarios.js (vise resultater i steg 4)
- navigation.js (oppdatere tekster der det trengs)
============================================================
*/

/*
---------------------------------------------------------------------
DEL 1: Formatering av tall mens brukeren skriver
- Brukes på kjøpesum og egenkapital i steg 2
- Viser tall med norske tusenskiller (f.eks. 1000000 -> 1 000 000)
---------------------------------------------------------------------
*/
function setup_currency_formatting(input_element) {
  if (!input_element) {
    return;
  }

  input_element.addEventListener("input", function () {
    const raw_value = input_element.value;

    const digits_only = raw_value.replace(/\D/g, "");

    if (!digits_only) {
      input_element.value = "";
      return;
    }

    const number_value = Number(digits_only);

    if (isNaN(number_value)) {
      return;
    }

    input_element.value = number_value.toLocaleString("nb-NO");
  });
}

/*
------------------------------------------------------------
DEL 2: Felles oppsett for alle valuta-feltene i steg 2
------------------------------------------------------------
*/
function setup_step2_currency_inputs() {
  const purchase_price_input = document.getElementById("purchase_price_input");
  const equity_input = document.getElementById("equity_input");

  setup_currency_formatting(purchase_price_input);
  setup_currency_formatting(equity_input);
}

/*
----------------------------------------------------------------
DEL 3: Parsing av tall fra input-felt
- Fjerner mellomrom og andre tegn, og forsøker å tolke som tall
----------------------------------------------------------------
*/
function parse_currency_input(input_element) {
  if (!input_element) {
    return 0;
  }

  const raw_value = String(input_element.value || "");

  const digits_only = raw_value
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");

  if (!digits_only) {
    return 0;
  }

  const parsed = Number(digits_only);
  if (isNaN(parsed)) {
    return 0;
  }

  return parsed;
}

/*
------------------------------------------------------------
DEL 3B: Hjelpefunksjon for å sette tekstinnhold
------------------------------------------------------------
*/
function set_text(element_id, text_value) {
  const element = document.getElementById(element_id);
  if (!element) {
    return;
  }

  element.textContent = text_value;
}

/*
------------------------------------------------------------
DEL 4: Formatering av beløp
- Runder av til nærmeste heltall og viser med norsk tusenskille
------------------------------------------------------------
*/
function format_currency(value) {
  const rounded = Math.round(Number(value) || 0);
  return rounded.toLocaleString("nb-NO");
}
