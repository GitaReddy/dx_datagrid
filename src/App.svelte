<script>
	import { onMount } from "svelte";
	// Sample data
	let jsonData = [];
	let data = [];

	onMount(async () => {
		const response = await fetch(
			"https://api.recruitly.io/api/candidate?apiKey=TEST9349C0221517DA4942E39B5DF18C68CDA154"
		);
		const responseData = await response.json();
		jsonData = responseData.data;
		console.log(jsonData, "jsonsdsfs");
		const gridData = jsonData.map(item => ({
    //   id: item.id,
	reference:item.reference,
      name: item.fullName,
	  email:item.email,
	  phone:item.mobile,


      // map other properties accordingly
    }));
console.log(gridData,"griddata");
	// });

	var dataGrid = new DevExpress.ui.dxDataGrid("#dataGrid", {
		dataSource: gridData,
		columns: [
        { dataField: 'reference', caption: 'ID' },
        { dataField: 'name', caption: 'Name' },
		{ dataField: 'email', caption: 'Email' },
		{ dataField: 'phone', caption: 'Mobile' },
        // Define other columns as needed
      ],

		
		showBorders: true,
		filterRow: {
			visible: true,
		},
		editing: {
			
			allowUpdating: true,
			allowDeleting: true,
			allowAdding: true,
		},
		paging: {
			pageSize: 10,
		},
		pager: {
			showPageSizeSelector: true,
			allowedPageSizes: [5, 10, 20],
			showInfo: true,
		},
	});
	});
	// dataGrid.render();
	// });
</script>
