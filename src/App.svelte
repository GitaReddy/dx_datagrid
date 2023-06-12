<script>
	import { onMount } from "svelte";
	import js from 'jquery';

	// Sample data
	let jsonData = [];
	let data = [];
	let showModal = false;

	onMount(async () => {
		const response = await fetch(
			"https://api.recruitly.io/api/candidate?apiKey=TEST9349C0221517DA4942E39B5DF18C68CDA154"
		);
		const responseData = await response.json();
		jsonData = responseData.data;
		console.log(jsonData, "json");
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


		{
  dataField: "name",
  caption: "Name",
  cellTemplate: function (container, options) {
    var link = js("<a>")
      .addClass("name-link")
      .text(options.data.name)
      .on("click", function () {
        showPopup(options.data); // Call the function to show the popup with the corresponding data
      });
    js(container).append(link);


	
  },
  
},



    //     { dataField: 'name', caption: 'Name', 
	// 	cellTemplate: function (container, options) {
    //     // Creating a link element
    //     var link = document.createElement('a');
    //     // link.href = options.data.url; // Setting the URL

    //     // Setting the name as the link text
    //     link.innerText = options.data.name;

    //     // Appending the link to the container
    //     container.appendChild(link);
    //   }},
		{ dataField: 'email', caption: 'Email' },
		{ dataField: 'phone', caption: 'Mobile' },
        // Define other columns as needed
      ],

		
		showBorders: true,
		filterRow: {
			visible: true,
		},
		// editing: {
			
		// 	allowUpdating: true,
		// 	allowDeleting: true,
		// 	allowAdding: true,
		// },


		editing: {
			allowDeleting: true,
			allowAdding: true,
            allowUpdating: true,
            mode: "popup",
            form: {
                labelLocation: "top"
            },
            popup: {
                showTitle: true,
                title: "Row in the editing state"
            }
        },
		paging: {
			pageSize: 10,
		},
		// pagination:true,
		pager: {
			showPageSizeSelector: true,
			allowedPageSizes: [5, 10, 20],
			showInfo: true,
		},
	});
	});

	function showPopup(data) {
  alert("Clicked on " + data.name);
showModal = true;

}

	// dataGrid.render();
	// });
</script>


<main>
	
</main>
<div id="dataGrid"></div>