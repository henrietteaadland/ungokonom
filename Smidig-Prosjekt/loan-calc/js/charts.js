/*
----------------------
Håndtering av grafer for steg 3 og steg 4
----------------------

*/
var step3_chart = null;
var step4_chart = null;

/*
----------------------
Tegner graf for hovedlånet i steg 3
- Viser fordeling mellom lånebeløp og totale renter
----------------------

@param {{loan_amount:number,total_interest:number,total_cost:number,monthly_payment:number}} loan_result
*/
function render_step3_chart(loan_result) {
  /*
  -----------------------------------------------------
  Dersom vi ikke har et gyldig resultat eller canvas,
  skal vi ikke prøve å tegne grafen.
  -----------------------------------------------------

  */
  var canvas = document.getElementById("step3Chart");

  if (!canvas || !loan_result) {
    return;
  }

  var context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  /*
  ----------------------------------------------------
  Unngår å opprette nye grafer oppå hverandre ved å
  destruere eksisterende instans før vi lager en ny.
  ----------------------------------------------------

  */
  if (step3_chart !== null) {
    step3_chart.destroy();
    step3_chart = null;
  }

  var principal_value = loan_result.loan_amount || 0;
  var interest_value = loan_result.total_interest || 0;

  step3_chart = new Chart(context, {
    type: "doughnut",
    data: {
      labels: ["Lånebeløp", "Totale renter"],
      datasets: [
        {
          data: [principal_value, interest_value]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom"
        },
        tooltip: {
          callbacks: {
            label: function (tooltip_item) {
              /*
              ---------------------------------------------
              Viser verdier i kroner i verktøytips slik at
              brukeren forstår størrelsesforholdet.
              ---------------------------------------------

              */
              var value = tooltip_item.parsed || 0;
              return tooltip_item.label + ": " + format_currency(value);
            }
          }
        }
      }
    }
  });
}

/*
----------------------------------------------------------------------
Tegner graf i steg 4 som sammenligner månedskostnad mellom scenarier
----------------------------------------------------------------------

@param {{monthly_payment:number}} base_result
@param {{more_equity:{monthly_payment:number},lower_rate:{monthly_payment:number},higher_rate:{monthly_payment:number}}} scenario_results
*/
function render_step4_chart(base_result, scenario_results) {
  /*
  -----------------------------------------------------
  Sjekker at vi har både basisresultat og scenarioer.
  Hvis noe mangler, hopper vi over grafen.
  -----------------------------------------------------

  */
  var canvas = document.getElementById("step4Chart");

  if (!canvas || !base_result || !scenario_results) {
    return;
  }

  var context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  /*
  ---------------------------------------------------
  Unngår å opprette nye grafer oppå hverandre ved å
  destruere eksisterende instans før vi lager en ny.
  ---------------------------------------------------

  */
  if (step4_chart !== null) {
    step4_chart.destroy();
    step4_chart = null;
  }

  var base_monthly = base_result.monthly_payment || 0;
  var more_equity_monthly = scenario_results.more_equity && scenario_results.more_equity.monthly_payment
    ? scenario_results.more_equity.monthly_payment
    : 0;
  var lower_rate_monthly = scenario_results.lower_rate && scenario_results.lower_rate.monthly_payment
    ? scenario_results.lower_rate.monthly_payment
    : 0;
  var higher_rate_monthly = scenario_results.higher_rate && scenario_results.higher_rate.monthly_payment
    ? scenario_results.higher_rate.monthly_payment
    : 0;

  var labels = [
    "Basislån",
    "Mer egenkapital",
    "Lavere rente",
    "Høyere rente"
  ];

  var values = [
    base_monthly,
    more_equity_monthly,
    lower_rate_monthly,
    higher_rate_monthly
  ];

  step4_chart = new Chart(context, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Månedlig kostnad (kr)",
          data: values
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              /*
              ------------------------------------------------  
              Viser y-aksen som avrundede kroner for å gjøre
              grafen lesbar.
              ------------------------------------------------

              */
              return format_number(value) + " kr";
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function (tooltip_item) {
              var value = tooltip_item.parsed.y || 0;
              return "Månedlig kostnad: " + format_currency(value);
            }
          }
        }
      }
    }
  });
}
