fetch('json/nycPropSales.json')
   .then((response) => {
        // Konversi teks menjadi objek JSON
        return response.json();
    })
   .then((data) => {
        window.propertyData = data;
        
        // Hitung total harga jual
        // const totalSalePrice = data.reduce((sum, property) => sum + parseFloat(property.SALE_PRICE || 0), 0);
        // document.getElementById('total-sale-price').innerText = totalSalePrice.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

        scoreCardUpdate(); // Panggil fungsi scoreCardUpdate setelah data dimuat
    })
   .catch((error) => {
        console.error('Error fetching the property data:', error);
    });

function scoreCardUpdate(){
    // Tambahkan event listener setelah data dimuat
    var select = document.getElementById('boroughSelect');
    var selectValue = select.options[select.selectedIndex].value; // Mengambil nilai seleksi borough
    // var selectElement = select.options[select.selectedIndex].text;

    var arrayFiltered;

    if (selectValue === 'all') {
        arrayFiltered = window.propertyData; // Jika semua borough, maka tidak perlu filter
    } else {
        arrayFiltered = window.propertyData.selectValue;
        document.getElementById('total-sale-price').innerText = totalBoroughSalePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    // Hitung total harga jual untuk borough yang dipilih
    const totalBoroughSalePrice = arrayFiltered.reduce((sum, property) => sum + parseFloat(property.SALE_PRICE || 0), 0);
    document.getElementById('total-sale-price').innerText = totalBoroughSalePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}