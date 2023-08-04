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

document.getElementById('zoomFullButton').addEventListener('click', function() {
    main_api.fitToWidth(); // Zoom to page
});

document.getElementById('newPage').addEventListener('click', function() {
    main_api.add_page(); 
});




// hamburger menu

document.getElementById('mainMenu').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('hamburgerMenu').style.display = 'flex'; // Change this to 'block' to display the menu
});

document.getElementById('mainMenuClose').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('hamburgerMenu').style.display = 'none';
});


// settings

document.getElementById('settings').addEventListener('click', function() {
    document.getElementById('settingsPage').style.display = 'block';
});

document.getElementById('settingsClose').addEventListener('click', function() {
    document.getElementById('settingsPage').style.display = 'none';
});

// document.getElementById('pageSize').addEventListener('change', function() {
//     if (this.value === 'custom') {
//         document.getElementById('customSize').style.display = 'block';
//     } else {
//         document.getElementById('customSize').style.display = 'none';
//     }
// });





// scrollbar
main_api.refreshScrollbar = function() {
	var docHeight = main_api.getDocumentHeight();
    var viewHeight = main_api.getCurrentViewHeight();
    var heightPercent = viewHeight/docHeight * 100;
    var viewTop = main_api.getViewTopHeight();
    var viewTopPercent = viewTop / docHeight * 100;
    // reset scrollbar
    document.getElementById('scrollbar').style.height = heightPercent.toString() + '%'; 
    document.getElementById('scrollbar').style.top = viewTopPercent.toString() + '%'; 
    // console.log(document.getElementById('scrollbar').style.top)
};


var scrollbar = document.getElementById('scrollbar');
var scrollbarContainer = document.getElementById('scrollbarContainer'); // Assuming the container has this ID

scrollbar.addEventListener('mousedown', function(event) {
    var initialMouseY = event.clientY;
    var initialTop = parseFloat(scrollbar.style.top || 0);

    function onMouseMove(event) {
        var deltaY = event.clientY - initialMouseY;
        var newTop = initialTop + deltaY / scrollbarContainer.offsetHeight * 100;
        newTop = Math.max(0, Math.min(100, newTop)); // Clamp between 0 and 100
        main_api.setCenterByPercent(newTop);
        // Set the scrollbar's top position
        main_api.refreshScrollbar()
        // Call the function in main_api to update the view center
        

    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});




document.addEventListener('paperjs-loaded', (event) => {
    loaded = true
    main_api.load_new_doc();
    main_api.refreshScrollbar()
});
