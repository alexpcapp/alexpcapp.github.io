function displayMap(mapName) {
    // Update the src attribute of the <img> element to display the selected map
    const mapImage = document.getElementById("map-image");
    mapImage.src = `https://github.com/alexpcapp/parler-maps-europe/tree/main/maps${mapName}.png`;
}

mapSelector.addEventListener("change", function () {
    const selectedMap = mapSelector.value;
    displayMap(selectedMap);
});
