/*
----------------------------------------------------------------------
Tegner graf i steg 4: baseline + scenario (år-for-år)
- Viser gjenstående lånesaldo over tid
- Baseline-linje vises alltid
- Scenario-linje vises kun når bruker har gjort endring
----------------------------------------------------------------------

@param {{years:number}} base_input
@param {{balances:number[]}} base_series
@param {{balances:number[]}|null} scenario_series
*/
function render_step4_chart(base_input, base_series, scenario_series) {
  var canvas = document.getElementById("step4Chart");
  if (!canvas || !base_input || !base_series || !base_series.balances) {
    return;
  }

  var context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  var years = Number(base_input.years) || 0;
  if (years <= 0) {
    return;
  }

  var labels = [];
  var i = 0;
  for (i = 0; i <= years; i += 1) {
    labels.push("År " + i);
  }

  var show_scenario = false;
  var scenario_data = [];
  if (scenario_series && scenario_series.balances && scenario_series.balances.length === base_series.balances.length) {
    show_scenario = true;
    scenario_data = scenario_series.balances;
  }

  if (step4_chart !== null) {
    step4_chart.destroy();
    step4_chart = null;
  }

  step4_chart = new Chart(context, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Originalt lån",
          data: base_series.balances,
          tension: 0.25,
          pointRadius: 0
        },
        {
          label: "Etter endring",
          data: scenario_data,
          tension: 0.25,
          pointRadius: 0,
          hidden: !show_scenario
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      scales: {
        y: {
          ticks: {
            callback: function (value) {
              return format_number(value) + " kr";
            }
          }
        }
      },
      plugins: {
        legend: {
          position: "bottom"
        },
        tooltip: {
          callbacks: {
            label: function (tooltip_item) {
              var value = tooltip_item.parsed.y || 0;
              return tooltip_item.dataset.label + ": " + format_currency(value);
            }
          }
        }
      }
    }
  });
}
