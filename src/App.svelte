<script>
	import { onMount } from "svelte";
	import "bootstrap/dist/css/bootstrap.min.css";
	import js from 'jquery'
	
	let jsonData = [];
	let gridData = [];
	let data = [];
	onMount(async () => {
		const response = await fetch(
			"https://api.recruitly.io/api/candidate?apiKey=TEST9349C0221517DA4942E39B5DF18C68CDA154"
		);
		const responseData = await response.json();
		jsonData = responseData.data;

		gridData = jsonData.map((item) => ({
			id: item.reference,
			fullName: item.fullName,
			
			email: item.email,
			mobile: item.mobile,
		}));

		const dataGrid = new DevExpress.ui.dxDataGrid("#dataGrid", 
			{
				dataSource: gridData,
				columns: [
					{ dataField: "id", caption: "ID"},
					{
						dataField: "fullName",
						caption: "Name",
						cellTemplate: function (container, options) {
    var link = js("<a>")
      .addClass("name-link")
      .text(options.data.fullName)
      .on("click", function () {
        showPopup(options.data); // Call the function to show the popup with the corresponding data
      });
    js(container).append(link);
  }
						
					},
					
					{ dataField: "email", caption: "Email" },
					{ dataField: "mobile", caption: "mobile"},
					// Define other columns as needed
				],
				showBorders: true,
				filterRow: {
					visible: true,
				},
				editing: {
					allowDeleting: true,
					allowAdding: true,
					allowUpdating: true,
					mode: "popup",
					form: {
						labelLocation: "top",
					},
					popup: {
						showTitle: true,
						title: "Add/Edit Record.",
					},
					
				},
				paging: {
					pageSize: 20,
				},
				onRowInserting: async (event) => {
					
					try {
						const response = await fetch(
							"https://api.recruitly.io/api/candidate?apiKey=TEST27306FA00E70A0F94569923CD689CA9BE6CA",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify(event.data),
							}
						);

						const responseData = await response.json();
						if (response.ok) {
							event.data.fullName = responseData.fistName;
							gridData.push(event.data);
							
						} 
					} catch (error) {
						console.error("Failed to add record:", error);
					}
				},
				onRowUpdating: async (e) => {
					try {
						

						var editedData = {
							id: e.key.id,
							fullName:
								e.newData.fullName === undefined
									? e.oldData.fullName
									: e.newData.fullName,
							
							email:
								e.newData.email === undefined
									? e.oldData.email
									: e.newData.email,
							mobile:
								e.newData.mobile === undefined
									? e.oldData.mobile
									: e.newData.mobile,
						};

						
						const response = await fetch(
							`https://api.recruitly.io/api/candidate?apiKey=TEST9349C0221517DA4942E39B5DF18C68CDA154`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify(editedData),
							}
						);
						const responseData = await response.json();
						console.log(responseData,"resp");
						if (response.ok) {
							const updatedData = gridData.findIndex(
								(item) => 
								
								item.id === e.key
							);
							gridData.push(e.editedData);
							gridData[updatedData] = e.editedData;
							
						} 
						
					} catch (error) {
						console.error("Failed to update record:", error);
					}
				},

				onRowRemoving: async (event) => {
					
					try {
						const response = await fetch(
							`https://api.recruitly.io/api/candidate/${event.data.id}?apiKey=TEST27306FA00E70A0F94569923CD689CA9BE6CA`,
							{
								method: "DELETE",
							}
						);
						if (response.ok) {
							const removedData = gridData.findIndex(
								(item) => item.id === event.key
							);
							if (removedData > -1) {
								gridData.splice(removedData, 1);
								
							}
						} 
					} catch (error) {
						console.error("Failed to delete record:", error);
					}
				},
				
			}
		);
	});
	function showPopup(data) {
  alert("Clicked on " + data.fullName);
}
</script>

<div id="dataGrid" />

