<script>
	import { onMount } from "svelte";
	import "bootstrap/dist/css/bootstrap.min.css";
	import DevExpress from "devextreme";
  
	let jsonData = [];
	let gridData = [];
  
	onMount(async () => {
	  const response = await fetch(
		"https://api.recruitly.io/api/candidate?apiKey=TEST9349C0221517DA4942E39B5DF18C68CDA154"
	  );
	  const responseData = await response.json();
	  jsonData = responseData.data;
  
	  gridData = jsonData.map((item) => ({
		id: item.id,
		reference: item.reference,
		
		firstName: item.firstName,
		surname:item.surname,
		email: item.email,
		mobile: item.mobile,
	  }));
  
	  const dataGrid = new DevExpress.ui.dxDataGrid(document.getElementById("dataGrid"), {
		dataSource: gridData,
		columns: [
		  { dataField: "reference", caption: "Reference"},
		  { dataField: "firstName", caption: "firstName" },
		  { dataField: "surname", caption: "surname"},
		  { dataField: "email", caption: "Email"},
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
			title: "Row Add/Edit Data",
		  },
		  
		},
		paging: {
		  pageSize: 20,
		},
		onRowInserting: async (e) => {
			
			try {
			  const response = await fetch(
				"https://api.recruitly.io/api/candidate?apiKey=TEST27306FA00E70A0F94569923CD689CA9BE6CA",
				{
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify(e.data),
				}
			  );
  
			  const responseData = await response.json();
			  if (response.ok) {
				
				e.data.firstName=responseData.fistName;
				gridData.push(e.data);
				
			  } 
			} catch (error) {
			  console.error("Failed to add record:", error);
			}
		  },
		onRowUpdating: async (e) => {
		try {
	  console.log(e);
	
var newData = {
id : e.key.id,
firstName : e.newData.firstName === undefined ? e.oldData.firstName : e.newData.firstName ,
surname : e.newData.surname=== undefined ? e.oldData.surname : e.newData.surname ,
email : e.newData.email === undefined ? e.oldData.email : e.newData.email,
mobile : e.newData.mobile === undefined ? e.oldData.mobile :e.mobile.email,
}


console.log(newData)
	  const response = await fetch(
		`https://api.recruitly.io/api/candidate?apiKey=TEST9349C0221517DA4942E39B5DF18C68CDA154`,
		{
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(newData),
		}
	  );
	  const responseData = await response.json();
	  if (response.ok) {
		const updatedItemIndex = gridData.findIndex((item) => item.id === e.key);
		gridData.push(e.newData);
		gridData[updatedItemIndex] = e.newData;
		
	  } 
	} catch (error) {
	  console.error("Failed to update record:", error);
	}
  },
  
		onRowRemoving: async (e) => {
			  console.log("Data being sent to API:", e.data);
			  try {
			  const response = await fetch(
				`https://api.recruitly.io/api/candidate/${e.data.id}?apiKey=TEST27306FA00E70A0F94569923CD689CA9BE6CA`,
				{
				  method: "DELETE",
				}
			  );
			  if (response.ok) {
				const removedItemIndex = gridData.findIndex((item) => item.id === e.key);
				if (removedItemIndex > -1) {
				  gridData.splice(removedItemIndex, 1);
				 
				}
			  } 
			} catch (error) {
			  console.error("Failed to delete record:", error);
			}
		  },
		
	  });
	});
  </script>
  
  <div id="dataGrid"></div>
   
  