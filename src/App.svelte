
    

    

    <script>
		import { onMount } from 'svelte';
        // Sample data
		let jsonData = [];
		
		
		onMount(async () => {
    // try {
      const response = await fetch("https://api.recruitly.io/api/candidate?apiKey=TEST9349C0221517DA4942E39B5DF18C68CDA154");
      jsonData = await response.json();
	  console.log(jsonData,"jsonsdsfs");
    // } 
	// catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  
		
        // Initialize the data grid
        var dataGrid = new DevExpress.ui.dxDataGrid("#dataGrid", {
            dataSource: jsonData,
            columns: [
                // { dataField: 'ID', caption: 'ID' },
                { dataField: 'jsonData.firstName', caption: 'Name1' },
                // { dataField: 'Age', caption: 'Age' }
                // Add more columns as needed
            ],
            showBorders: true,
            filterRow: {
                visible: true
            },
            editing: {
                allowUpdating: true,
                allowDeleting: true,
                allowAdding: true
            },
            paging: {
                pageSize: 10
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 20],
                showInfo: true
            }
        });
	});
        // Render the data grid
        // dataGrid.render();
    </script>


