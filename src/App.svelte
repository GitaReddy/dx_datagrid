<!-- <script>
	import { onMount } from 'svelte';
	import {Grid} from 'gridjs';
	let jsonData =[];
  
	
	
	
	let table;


	onMount(async () => {
    const response = await fetch("https://api.recruitly.io/api/job?apiKey=TEST64518616D4CF145D4E20BD47169EA7229BA3");
    const responseData = await response.json();
    jsonData = responseData.data;
	console.log(jsonData,"jsonfdara");
	renderGrid();
  });
  
</script>
		
<main>
			function renderGrid() {
				console.log(jsonData,"jsonfdara12");
			console.log("onmount coming")
	  table = new Grid({
		columns: ['Name', 'Email', 'Actions'],
		data: [
        ["John Doe", 25, "<button>Edit</button> <button>Delete</button>"],
        ["Jane Smith", 30, "<button>Edit</button> <button>Delete</button>"],
        // Add more rows here
      ],
	  }).render(document.getElementById('grid'));
	};
	

  
  <div id="grid"></div>
</main>
	
   -->




   <script>
	import { onMount } from 'svelte';
	import {Grid} from 'gridjs';
  
	let grid;
	let jsonData = [];
  
	onMount(async() => {
		
    const response = await fetch("https://api.recruitly.io/api/candidate?apiKey=TEST9349C0221517DA4942E39B5DF18C68CDA154");
    const responseData = await response.json();
    jsonData = responseData.data;
	console.log(jsonData,"jsonDr");

	  grid = new Grid({
		columns: ['name', 'Actions'],
		data: jsonData.map((item) => [
        // item.title,
        item.fullName,
        // item.email,
        createActionsCell(item.fullName),
      ]),
		// sort: true,
		// pagination: {
		//   enabled: true,
		//   limit: 10,
		// },
		className: {
		  table: 'gridjs-table',
		  th: 'gridjs-th',
		  td: 'gridjs-td',
		},
	  }).render(document.getElementById('grid-container'));
	});
  
	function createActionsCell(name) {
	  const editButton = document.createElement('button');
	  editButton.innerHTML = 'Edit';
	  editButton.addEventListener('click', () => {handleEdit(id)
		// Handle edit logic here
		console.log(`Editing ${name}`);
	  });
  
	  const deleteButton = document.createElement('button');
	  deleteButton.innerHTML = 'Delete';
	  deleteButton.addEventListener('click', () => {
		name.splice(name);
		// Handle delete logic here
		console.log(`Deleting ${name}`);
	  });

	//   applicants[applicantIndex].names.splice(nameIndex, 1);
    // applicants = [...applicants];
  
	  const cell = document.createElement('div');
	  cell.appendChild(editButton);
	  cell.appendChild(deleteButton);
  
	  return cell;
	  
	  
	}
  </script>
  
  <div id="grid-container"></div>
  