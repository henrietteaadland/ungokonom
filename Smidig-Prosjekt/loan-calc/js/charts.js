/*
----------------------------------------------------------------------
Tegner graf i steg 4: baseline + scenario (år-for-år)
- Viser gjenstående lånesaldo over tid (restgjeld)
- Baseline-linje vises alltid
- Scenario-linje vises kun når bruker har gjort endring
----------------------------------------------------------------------

@param {{years:number}} base_input
@param {{balances:number[]}} base_series
@param {{balances:number[]}|null} scenario_series
*/

/*
------------------------------------------------------------
DEL 1: Intern grafreferanse (Chart.js)
------------------------------------------------------------
*/
var step4_chart = null;

function render_step4_chart(base_input, base_series, scenario_series) {
  /*
  ------------------------------------------------------------
  canvas-id step4_chart_canvas
  ------------------------------------------------------------
  */
  var canvas = document.getElementById("step4_chart_canvas");
  if (!canvas || typeof Chart === "undefined" || !base_input || !base_series || !base_series.balances) {
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

  /*
  ----------------------
  Labels: År 0..År N
  ----------------------
  */
  var labels = [];
  var i = 0;
  for (i = 0; i <= years; i += 1) {
    labels.push("År " + i);
  }

  /*
  ------------------------------------------------
  Scenario: vis kun hvis lengden matcher baseline
  ------------------------------------------------
  */
  var show_scenario = false;
  var scenario_data = [];
  if (
    scenario_series &&
    scenario_series.balances &&
    scenario_series.balances.length === base_series.balances.length
  ) {
    show_scenario = true;
    scenario_data = scenario_series.balances;
  }

  /*
  ----------------------
  Tegning av graf og hvordan det ser ut
  ----------------------
  */
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
    label: "Originalt lån (restgjeld)",
    data: base_series.balances,
    tension: 0.25,
    borderWidth: 2,
    borderDash: [6, 4],
    pointRadius: function (ctx) {
      const i = ctx.dataIndex;
      const last = ctx.dataset.data.length - 1;
      return (i === 0 || i === last) ? 4 : 0;
    }
  },
  {
    label: "Etter endring (restgjeld)",
    data: scenario_data,
    tension: 0.25,
    borderWidth: 3,
    hidden: !show_scenario,
    pointRadius: function (ctx) {
      const i = ctx.dataIndex;
      const last = ctx.dataset.data.length - 1;
      return (i === 0 || i === last) ? 5 : 0;
    }
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
            stepSize: 100000,
            padding: 10,
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
              return tooltip_item.dataset.label + ": " + format_currency(value) + " kr";
            }
          }
        }
      }
    }
  });
}

/*
------------------------------------------------------------
Tegner graf i steg 5: Bilkostnader per måned
- Doughnut: fordeling av kostnader
------------------------------------------------------------
*/

var step5_car_chart = null;

function render_car_costs_chart(breakdown) {
  var canvas = document.getElementById("car_costs_chart_canvas");
  if (!canvas || typeof Chart === "undefined" || !breakdown) {
    return;
  }

  var ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  if (step5_car_chart !== null) {
    step5_car_chart.destroy();
    step5_car_chart = null;
  }

  step5_car_chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [
        "Verditap",
        "Drivstoff / strøm",
        "Forsikring",
        "Vedlikehold"
      ],
      datasets: [
        {
          data: [
            breakdown.depreciation,
            breakdown.energy,
            breakdown.insurance,
            breakdown.maintenance
          ]
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
            label: function (ctx) {
              return ctx.label + ": " + format_currency(ctx.parsed) + " kr / mnd";
            }
          }
        }
      }
    }
  });
}