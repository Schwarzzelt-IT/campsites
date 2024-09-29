/*
 * Marker definitions.
 */
var TentMarker = L.ExtraMarkers.icon({
	icon: 'fa-campground',
	markerColor: 'blue',
	shape: 'circle',
	prefix: 'fas'
});

var HouseMarker = L.ExtraMarkers.icon({
	icon: 'fa-home',
	markerColor: 'blue',
	shape: 'circle',
	prefix: 'fas'
});

var CampsiteHouseMarker = L.ExtraMarkers.icon({
	icon: 'fa-campground-home',
	markerColor: 'blue',
	shape: 'circle',
	prefix: 'fas'
});

/*
 * Layer definitions.
 */
var osm = new L.TileLayer(
    'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png',
    {
        minZoom: 3,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: 'Kartendaten: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
);

var osmOpenTopoMap = new L.TileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    {
        minZoom: 3,
        maxZoom: 20,
        maxNativeZoom: 17,
        attribution: 'Kartendaten: &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, <a href="http://viewfinderpanoramas.org">SRTM</a> | Kartendarstellung: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }
);

/*
 * GeoJSON Layer with only campsites
 */
var campsites = new L.GeoJSON.AJAX(["geojsonFeatures.json"],{
	filter: function(feature, layer) {
		return Object.values(feature.properties.category).includes("campsite");
    },
	pointToLayer: function (feature, latlng) {
	if(Object.values(feature.properties.category).includes("campsite") && Object.values(feature.properties.category).includes("house"))
	{
		return L.marker(latlng, {icon: CampsiteHouseMarker});
	}
	return L.marker(latlng, {icon: TentMarker});
	},
	onEachFeature: function (feature, layer) {
		return layer.bindPopup("<b>" + feature.properties.name + '</b></br> <a href="'+ feature.properties.url +'" target="_blank">'+ feature.properties.url + "</a>");
	}
})

/*
 * GeoJSON Layer with only houses
 */
var houses  = new L.GeoJSON.AJAX(["geojsonFeatures.json"],{
	filter: function(feature, layer) {
		return Object.values(feature.properties.category).includes("house");
    },
	pointToLayer: function (feature, latlng) {
		if(Object.values(feature.properties.category).includes("campsite") && Object.values(feature.properties.category).includes("house"))
		{
			return L.marker(latlng, {icon: CampsiteHouseMarker});
		}
		return L.marker(latlng, {icon: HouseMarker});
	},
	onEachFeature: function (feature, layer) {
		return layer.bindPopup("<b>" + feature.properties.name + '</b></br> <a href="'+ feature.properties.url +'" target="_blank">'+ feature.properties.url + "</a>");
	}
})

/*
 * Collect base and overlay layers
 */
var baseLayers = {
    "OpenStreetMap": osm,
    "OpenTopoMap": osmOpenTopoMap,
};

var overlayLayers = {
    "Zeltplätze": campsites,
	"Häuser": houses
};

/*
 * Configure Map.
 * Center is 51°09'48.1"N 10°26'51.7"E 51.163361, 10.447683
 * Add Attribution
 * Default layer is osm
 */
const map = L.map('map').setView([51.163361, 10.447683], 5);
map.attributionControl.addAttribution('Einträge gesammmelt von <a href="https://www.schwarzzelt-it.de">Schwarzzelt IT</a>');
osm.addTo(map)

/*
 * Add both layer as default
 */
map.addLayer(campsites);
map.addLayer(houses);


/*
 * Layer selector with base and overlay layers.
 */
let layercontrol = L.control.layers(baseLayers, overlayLayers).addTo(map);

/*
 * A nice scale in the bottom left corner.
 */
L.control.scale().addTo(map);

/*
* Custom Controls
*/
var github = L.control({position: 'bottomright'});
    github.onAdd = function(mymap){
        var div = L.DomUtil.create('div', 'github');
        div.innerHTML = `
			<!--<a class="fa-stack fa-2x" href="#" style="padding-bottom: 40px;padding-right: 40px;">
				<i class="fas fa-circle fa-stack-2x"style="color: #fff;"></i>
				<i class="fas fa-info fa-stack-1x" style="color: #000;"></i>
			</a>--->
			<div class="leaflet-control-layers leaflet-bar"" style="">
				<a class="leaflet-control-layers-toggle" href="https://github.com/Schwarzzelt-IT/campsites" target="_blank" style="background-image: none">
					<i class="fab fa-github"></i>
				</a>
			</div>
			`
        return div;
    };
github.addTo(map);

const info = L.control({ position: "topright" });
info.onAdd = function(map){
	var container = L.DomUtil.create('div', 'leaflet-control-info');
	L.DomEvent.disableClickPropagation(container);
	var toogle = L.DomUtil.create('a', 'leaflet-control-info-toggle', container);
	toogle.innerHTML = '<i class="fas fa-info"></i>'
	
	var content = L.DomUtil.create('section', 'leaflet-control-info-text', container);
	content.innerHTML = `
		<span>
		<b>Campsite Map by Schwarzzelt IT</b>
		<p>Fast jede Aktion beginnt mit der Suche nach einer großartigen Unterkunft oder einem coolen Zeltplatz. Diese Karte ist eine Übersicht von Gruppenhäusern und Zeltplätzen für Pfadfinder und soll euch bei der Suche unterstützen.</p>
		<p>Jeder ist herzlich eingeladen an diesem Projekt mitzuarbeiten und die Karte zu ergänzen. Wenn du ein Haus/einen Zeltplatz ergänzen möchtest oder einen Fehler gefunden hast, melde ich gerne unter <a href="mailto:campsites@schwarzzelt-it.de">campsites@schwarzzelt-it.de</a> bei uns oder eröffne einen Issue bzw. Pull-Request bei <a href="https://github.com/Schwarzzelt-IT/campsites" target="_blank">GitHub</a>.</p>
		<p>Diese Karte wird bereitgestellt von ehrenamtlichen Projekt <a href="https://www.schwarzzelt-it.de" target="_blank">Schwarzzelt IT</a>.</p>
		</span>
		`
	L.DomEvent.on(
		container,
		'mouseover', // String with event names
		function(ev) { 
			document.getElementsByClassName("leaflet-control-info")[0].classList.add("leaflet-control-info-expanded");
		 } // Handler function
	);
	L.DomEvent.on(
		container,
		'mouseout', // String with event names
		function(ev) { 
			document.getElementsByClassName("leaflet-control-info")[0].classList.remove("leaflet-control-info-expanded");
		 } // Handler function
	);

	return container;
};
info.addTo(map);
