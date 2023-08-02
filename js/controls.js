var colors = ["#472d3c", "#5e3643", "#7a444a", "#a05b53", "#bf7958", "#eea160", "#f4cca1", "#b6d53c", "#71aa34", "#397b44", "#3c5956", "#302c2e", "#5a5353", "#7d7071", "#a0938e", "#cfc6b8", "#dff6f5", "#8aebf1", "#28ccdf", "#3978a8", "#394778", "#39314b", "#564064", "#8e478c", "#cd6093", "#ffaeb6", "#f4b41b", "#f47e1b", "#e6482e", "#a93b3b", "#827094", "#4f546b"];
var colorSwatches = document.getElementById('colorSwatches');

let loaded = false

colors.forEach((color) => {
	var button = document.createElement('button');
	button.style.backgroundColor = color;
	button.addEventListener('click', () => {
		doc_settings.pen_color = color;
	});
	colorSwatches.appendChild(button);
});

document.getElementById('penSize').addEventListener('input', (event) => {
    doc_settings.pen_size = event.target.value;
});

// tool selectors
document.getElementById('pen').addEventListener('click', function() {
    main_api.setActiveTool('drawing');
});

document.getElementById('eraser').addEventListener('click', function() {
    main_api.setActiveTool('eraser');
});
  
document.getElementById('pan').addEventListener('click', function() {
    main_api.setActiveTool('panning');
});

document.getElementById('zoomInButton').addEventListener('click', function() {
    main_api.zoom(1.2); // Zoom in by 20%
});

document.getElementById('zoomOutButton').addEventListener('click', function() {
    main_api.zoom(1/1.2); // Zoom out by 20%
});

document.getElementById('zoomFulltButton').addEventListener('click', function() {
    main_api.fitToWidth(); // Zoom to page
});

document.addEventListener('paperjs-loaded', (event) => {
    loaded = true
    main_api.load_new_doc();
});




