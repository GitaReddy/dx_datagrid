import App from './App.svelte';
// const moduleName = require('module-name');


const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;