fetch('json/nycPropSales.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        window.propertyData = data;

        // Hitung total properti
        const totalProperties = data.length;
        document.getElementById('total-property').innerText = totalProperties.toLocaleString('en-US');
    })
    .catch((error) => {
        console.error('Error fetching the property data:', error);
    });

// Tangani seleksi borough
document.getElementById('borough-select').addEventListener('change', (event) => {
    var id = event.target.value; // Mengambil value dari option yang dipilih
    if (!id) {
        // Jika tidak ada borough yang dipilih, tampilkan total keseluruhan
        const totalProperties = window.propertyData.length;
        document.getElementById('total-property').innerText = totalProperties.toLocaleString('en-US');
        return;
    }
    var arrayFiltered = window.propertyData.filter((property) => property.BOROUGH == id);

    // Hitung total properti untuk borough yang dipilih
    const totalBoroughProperties = arrayFiltered.length;
    document.getElementById('total-property').innerText = totalBoroughProperties.toLocaleString('en-US');
});