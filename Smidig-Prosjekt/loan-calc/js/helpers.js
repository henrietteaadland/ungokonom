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

/*
------------------------------------------------------------
DEL 4B: format_number (brukes av chart-ticks)
- Holder samme stil som format_currency
------------------------------------------------------------
*/
function format_number(value) {
  return format_currency(value);
}

/*
------------------------------------------------------------
DEL 5: Bygg restgjeld-serie (År 0..År N)
- Returnerer { balances: [P, ..., 0-ish] }
- Brukes av charts.js for steg 4
------------------------------------------------------------

@param {number} loan_amount
@param {number} interest_rate_percent
@param {number} years
@return {{balances:number[]}}
*/
function build_balance_series(loan_amount, interest_rate_percent, years) {
  var P = Number(loan_amount) || 0;
  var y = Number(years) || 0;

  var yearly_rate = (Number(interest_rate_percent) || 0) / 100;
  var r = yearly_rate / 12;         /* månedlig rente */
  var n = y * 12;                   /* antall måneder */

  var balances = [];
  var i = 0;

  if (P <= 0 || y <= 0 || n <= 0) {
    return { balances: [0] };
  }

  /*
  ------------------------------------------------------------
  Månedlig betaling (samme logikk som calculate_loan, men lokalt)
  ------------------------------------------------------------
  */
  var M = 0;

  if (r === 0) {
    M = P / n;
  } else {
    var factor = Math.pow(1 + r, n);
    M = P * (r * factor) / (factor - 1);
  }

  /*
  ------------------------------------------------------------
  Restgjeld etter k betalinger:
  B_k = P*(1+r)^k - M*((1+r)^k - 1)/r
  - Vi sampler ved k = 12*i (år)
  ------------------------------------------------------------
  */
  balances.push(P);

  for (i = 1; i <= y; i += 1) {
    var k = i * 12;

    var Bk = 0;

    if (r === 0) {
      Bk = Math.max(0, P - (M * k));
    } else {
      var pow = Math.pow(1 + r, k);
      Bk = P * pow - M * ((pow - 1) / r);
      if (Bk < 0) {
        Bk = 0;
      }
    }

    balances.push(Bk);
  }

  return { balances: balances };
}
