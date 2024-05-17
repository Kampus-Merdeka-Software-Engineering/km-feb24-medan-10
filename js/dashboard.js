//Fetch digunakan untuk ambil text file di .json
fetch('json/nycPropSales.json')
    .then((response) => {
        //Dari text file dikonversi menjadi JSON Object (Parsing) : response.json()
        //Bisa juga cara lainnya adalah JSON.parse(response)
        return response.json();
    })
    .then((data) => {
        window.propertyData = data;
        document.getElementById('total-building').innerText = data.length;
        createTotalPropertySalesByBorough();
    });

function getTotalPropertyByBorough(id,boroughName){
    document.getElementById('dropbtn-borough').innerText = boroughName;
    var arrayFiltered = window.propertyData.filter((property) => property.BOROUGH == id.toString());
    document.getElementById('total-building').innerText = arrayFiltered.length;
}

function createTotalPropertySalesByBorough(){
    const ctx = document.getElementById('line-total-property-sales');
    var arrTotalSales = [];
    for(var i = 1; i <= 5; i++){
        var arrayFiltered = window.propertyData.filter((property) => property.BOROUGH == i.toString());
        var totalSales = arrayFiltered.reduce((total, property) => total + parseInt(property.SALE_PRICE), 0);
        arrTotalSales.push(totalSales);
    };
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Brooklyn','Bronx', 'Manhattan', 'Queens', 'Staten Island'],
          datasets: [{
            label: 'Total Sales each Borough',
            data: arrTotalSales,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}