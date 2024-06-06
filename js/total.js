fetch('json/nycPropSales.json')
.then((response) => response.json())
.then((data) => {
    window.propertyData = data;

    // Ambil semua tahun dari data
    const years = [...new Set(data.map(property => new Date(property.SALE_DATE).getFullYear()))];
    const yearSelect = document.getElementById('yearSelect');

    // Tambahkan opsi tahun ke dropdown
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        yearSelect.add(option);
    });

    // Fungsi untuk memperbarui chart berdasarkan tahun yang dipilih
    window.updateChartByYear = function() {
        const selectedYear = yearSelect.value;
        let filteredData;
        let validMonths;

        if (selectedYear === 'all') {
            filteredData = data;
            validMonths = Array.from({ length: 12 }, (_, i) => i); // All months [0-11]
        } else {
            const year = parseInt(selectedYear);
            filteredData = data.filter(property => new Date(property.SALE_DATE).getFullYear() === year);
            
            if (year === 2016) {
                validMonths = [8, 9, 10, 11]; // August to December (0-based index)
            } else if (year === 2017) {
                validMonths = [0, 1, 2, 3, 4, 5, 6, 7]; // January to August
            } else {
                validMonths = Array.from({ length: 12 }, (_, i) => i); // All months [0-11] for other years
            }
        }

        // Inisialisasi penjualan per bulan untuk setiap borough
        const boroughs = ['Manhattan', 'Bronx', 'Brooklyn', 'Queens', 'Staten Island'];
        const salesPerMonth = boroughs.map(() => Array(12).fill(0));

        // Hitung total properti per bulan untuk setiap borough
        filteredData.forEach((property) => {
            const saleDate = new Date(property.SALE_DATE);
            const month = saleDate.getMonth(); // Mendapatkan bulan (0 - 11)
            const boroughIndex = property.BOROUGH - 1; // Asumsikan BOROUGH adalah 1 untuk Manhattan, 2 untuk Bronx, dst.
            salesPerMonth[boroughIndex][month] += 1; // Increment total properti di bulan dan borough ini
        });

        // Buat dataset hanya untuk bulan yang valid
        const filteredSalesPerMonth = salesPerMonth.map(monthData => 
            validMonths.map(month => monthData[month])
        );

        // Debug log untuk memastikan data yang diproses benar
        console.log("Updating chart for year:", selectedYear);
        console.log("Sales per month data:", filteredSalesPerMonth);

        // Perbarui chart dengan data yang difilter
        propertySalesChart.data.labels = validMonths.map(month => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]);
        propertySalesChart.data.datasets.forEach((dataset, index) => {
            dataset.data = filteredSalesPerMonth[index];
        });
        propertySalesChart.update();
    };

    // Buat grafik garis menggunakan Chart.js
    const ctx = document.getElementById('propertySalesChart').getContext('2d');
    ctx.canvas.height = 255;

    const propertySalesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Manhattan',
                    data: Array(12).fill(0),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Bronx',
                    data: Array(12).fill(0),
                    borderColor: 'rgba(115, 162, 132, 1)',
                    backgroundColor: 'rgba(115, 162, 132, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Brooklyn',
                    data: Array(12).fill(0),
                    borderColor: 'rgba(155, 132, 112, 1)',
                    backgroundColor: 'rgba(155, 132, 112, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Queens',
                    data: Array(12).fill(0),
                    borderColor: 'rgba(195, 102, 92, 1)',
                    backgroundColor: 'rgba(195, 102, 92, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Staten Island',
                    data: Array(12).fill(0),
                    borderColor: 'rgba(235, 72, 52, 1)',
                    backgroundColor: 'rgba(235, 72, 52, 0.2)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        }
    });

    // Panggil fungsi untuk memuat chart pertama kali dengan opsi "All Years"
    yearSelect.value = 'all';
    updateChartByYear();
})
.catch((error) => {
    console.error('Error fetching the property data:', error);
});
