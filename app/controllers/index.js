var Map = require('ti.map');
var ubicacion;
var mapview;

if (Ti.Geolocation.locationServicesEnabled) {
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (e.error) {
			Ti.API.error('Error: ' + e.error);
		} else {

			ubicacion = Map.createAnnotation({
				latitude : e.coords.latitude,
				longitude : e.coords.longitude,
				title : "Estas Aqui",
				pincolor : Map.ANNOTATION_RED,
				myid : 1, // Custom property to uniquely identify this annotation.
				draggable : true
			});

			mapview = Map.createView({
				mapType : Map.SATELLITE_TYPE,
				region : {
					latitude : e.coords.latitude,
					longitude : e.coords.longitude,
					zoom : 20
				},
				animate : true,
				regionFit : true,
				userLocation : false,
				annotations : [ubicacion]
			});

			$.view_map.add(mapview);

		}
	});
} else {
	alert('Please enable location services');
}

function conex(e) {
	var latitud = ubicacion.getLatitude();
	var longitud = ubicacion.getLongitude();
	alert('latitud = ' + latitud + " longitud: " + longitud);

	var url = "http://www.myhostingprj.esy.es/APIMapeo/index.php/Mapeo";
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(15000);
	xhr.onload = function(e) {
		alert(this.responseText);
	};
	xhr.onerror = function(e) {
		alert("Fallo la conexion");
	};
	xhr.open('POST', url);
	var jsonPush = {
		latitud : latitud,
		longitud : longitud
	};
	xhr.send(jsonPush);

}

function ubi() {
	if (Ti.Geolocation.locationServicesEnabled) {
		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
		Titanium.Geolocation.getCurrentPosition(function(e) {
			if (e.error) {
				Ti.API.error('Error: ' + e.error);
			} else {
				ubicacion = Map.createAnnotation({
					latitude : e.coords.latitude,
					longitude : e.coords.longitude,
					title : "Estas Aqui",
					pincolor : Map.ANNOTATION_RED,
					myid : 1,
					draggable : true
				});
				mapview.removeAllAnnotations();
				mapview.addAnnotation(ubicacion);
			}
		});
	}
}

$.index.open();
