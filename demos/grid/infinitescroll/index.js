Smart('#grid', class {
    get properties() {
        return {
            sortMode: 'one',
			scrollMode: 'infinite',
			dataSource: new Smart.DataAdapter(
			{
			    dataSource: generateData(30),
				virtualDataSource: function(resultCallbackFunction){
						setTimeout(function() {
							resultCallbackFunction(
								{
								    dataSource: generateData(30)
								}
							);			
						}, 1000);					
				},
				dataFields:
                    [
                        'id: number',
                        'firstName: string',
                        'lastName: string',
                        'productName: string',
                        'quantity: number',
                        'price: number',
                        'total: number'
                    ]
			}),
			columns: [
                'id',
                {
                    label: 'First Name', dataField: 'firstName'
                },
                { label: 'Last Name', dataField: 'lastName' },
                { label: 'Product', dataField: 'productName' },
                { label: 'Quantity', dataField: 'quantity', align: 'right', cellsAlign: 'right',},
                { label: 'Unit Price', dataField: 'price', align: 'right', cellsAlign: 'right', cellsFormat: 'c2' },
                { label: 'Total', dataField: 'total', align: 'right', cellsAlign: 'right', cellsFormat: 'c2' }
			]
        }
    }
});