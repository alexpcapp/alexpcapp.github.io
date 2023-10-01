function displayMap(mapName) {
    // Update the src attribute of the <img> element to display the selected map
    const mapImage = document.getElementById("map-image");
    mapImage.src = `https://raw.githubusercontent.com/username/other-repository/main/europe/maps/${mapName}.png`;
}

const mapSelector = document.getElementById("map-selector");


mapSelector.addEventListener("change", function () {
    const selectedMap = mapSelector.value;
    displayMap(selectedMap);
});
