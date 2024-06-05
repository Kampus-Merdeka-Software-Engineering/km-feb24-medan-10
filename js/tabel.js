fetch('json/forTable.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        window.propertyData = data;
        let table = new DataTable('#data-tabel', {
            data : window.propertyData,
            scrollCollapse: true,
            scrollY: '600px',
            columnDefs: [{targets: 0,
                defaultContent: "",
                width: "150px" 
            },],
            pageLength:"15",
            lengthMenu: [15, 20, 50, 100],
            deferLoading: "coutnt", 
            columns : [
                { data: 'BOROUGH' },
                { data: 'NEIGHBORHOOD' },
                { data: 'YEAR_BUILT' },
                { data: 'BUILDING_CLASS_CATEGORY' },
                { data: 'SALE_PRICE' }
            ]
        });
    });

