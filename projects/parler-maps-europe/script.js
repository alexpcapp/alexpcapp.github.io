// Function to display a random map initially
function displayRandomMap() {
    const mapSelector = document.getElementById("map-selector");
    const randomIndex = Math.floor(Math.random() * mapSelector.options.length);
    const randomMapValue = mapSelector.options[randomIndex].value;

    // Set the selected option in the dropdown
    mapSelector.value = randomMapValue;

    // Call the displayMap function to display the random map
    displayMap(randomMapValue);
}

// Call the displayRandomMap function when the page loads
window.addEventListener("load", displayRandomMap);

// Function to display the selected map
function displayMap(mapName) {
    const mapImage = document.getElementById("map-image");
    mapImage.src = `maps/${mapName}.png`;
}

const mapSelector = document.getElementById("map-selector");


mapSelector.addEventListener("change", function () {
    const selectedMap = mapSelector.value;
    displayMap(selectedMap);
});

