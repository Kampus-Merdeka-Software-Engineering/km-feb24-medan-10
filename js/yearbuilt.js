fetch('json/nycPropSales.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        window.propertyData = data;
        createTotalPropertySalesByYearBuilt();
    });

function createTotalPropertySalesByYearBuilt(){
    const ctx = document.getElementById('bar-total-property-sales');
    var arrTotalPropSales = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
    var totalSales = 0;
    }

    console.log(arrTotalPropSales)

    var dataForChart = [];
    var dataForTooltip = [];

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['1920', '1930', '1925', '1910', '1950', '1940', '1955', '1931', '2015'],
          datasets: [{
            label: 'Total Property Sales based on Year Built',
            data: dataForChart,
            borderWidth: 1
          }]
        },
        options: {
            indexAxis: 'y',
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
              }
            },
            tooltip: {
              // callbacks: {
              //   label: function(context) {
              //     var label = context.label;
              //     var value = context.formattedValue;
              //     return label + ': ' + value;
              //   }
              // }
            }
          }
        }
      });
