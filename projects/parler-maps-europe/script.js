// Function to display a random map initially
function displayRandomMap() {
    const mapSelector = document.getElementById("map-selector");
    const randomIndex = Math.floor(Math.random() * mapSelector.options.length);
    const randomMapValue = mapSelector.options[randomIndex].value;
    displayMap(randomMapValue);
}

// Call the displayRandomMap function when the page loads
window.addEventListener("load", displayRandomMap);


function displayMap(mapName) {
    // Update the src attribute of the <img> element to display the selected map
    const mapImage = document.getElementById("map-image");
    //mapImage.src = `https://raw.githubusercontent.com/alexpcapp/parler-maps-europe/main/maps/${mapName}.png?raw=true`;
    mapImage.src = `maps/${mapName}.png`;

}

const mapSelector = document.getElementById("map-selector");


mapSelector.addEventListener("change", function () {
    const selectedMap = mapSelector.value;
    displayMap(selectedMap);
});

