fetch('json/nycPropSales.json')
    .then((response) => {
        // Konversi teks menjadi objek JSON
        return response.json();
    })
    .then((data) => {
        window.propertyData = data;
        
        // Hitung total harga jual
        const totalSalePrice = data.reduce((sum, property) => sum + parseFloat(property.SALE_PRICE || 0), 0);
        document.getElementById('total-sale-price').innerText = totalSalePrice.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        
        // Tambahkan event listener setelah data dimuat
        document.getElementById('boroughSelect').addEventListener('change', (event) => {
            event.preventDefault();
            var selectElement = event.target;
            var id = selectElement.value; // Mengambil nilai seleksi borough

            var arrayFiltered;

            if (id === 'all') {
                arrayFiltered = window.propertyData; // Jika semua borough, maka tidak perlu filter
            } else {
                arrayFiltered = window.propertyData.filter(property => property.BOROUGH_ID == id);
            }

            // Hitung total harga jual untuk borough yang dipilih
            const totalBoroughSalePrice = arrayFiltered.reduce((sum, property) => sum + parseFloat(property.SALE_PRICE || 0), 0);
            document.getElementById('total-sale-price').innerText = totalBoroughSalePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        });
    })
    .catch((error) => {
        console.error('Error fetching the property data:', error);
    });
