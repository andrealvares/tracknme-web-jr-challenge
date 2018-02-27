var map;
var idInfoBoxAberto;
var infoBox = [];
var markers = [];
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer;


function initialize() {
  var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);

  var options = {
    zoom: 5,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("mapa"), options);
  directionsDisplay.setMap(map);
}

initialize();

function abrirInfoBox(id, marker) {
  if (typeof(idInfoBoxAberto) == 'number' && typeof(infoBox[idInfoBoxAberto]) == 'object') {
    infoBox[idInfoBoxAberto].close();
  }

  infoBox[id].open(map, marker);
  idInfoBoxAberto = id;
}

function carregarPontos() {
  $.getJSON('js/api-massuka.json', function(pontos) {

    var latlngbounds = new google.maps.LatLngBounds();

    $.each(pontos, function(index, ponto) {

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(ponto.latitude, ponto.longitude),
        animation: google.maps.Animation.DROP,
        title: "Meu ponto personalizado! :-D",
        icon: 'img/marcador.png'
      });

      var myOptions = {
        content: "<p>" + ponto.dateTime + "</p><p> Latitude: " + ponto.latitude + " <br />Longitude: " + ponto.longitude + "</p>",
        pixelOffset: new google.maps.Size(-150, 0),
        infoBoxClearance: new google.maps.Size(1, 1)
      };

      infoBox[ponto.Id] = new InfoBox(myOptions);
      infoBox[ponto.Id].marker = marker;

      infoBox[ponto.Id].listener = google.maps.event.addListener(marker, 'click', function(e) {
        abrirInfoBox(ponto.Id, marker);
      });

      markers.push(marker);


      latlngbounds.extend(marker.position);

    });

    var markerCluster = new MarkerClusterer(map, markers);

    map.fitBounds(latlngbounds);

    // Converte latitude e longitude em endereço escrito
    var latlngInicio = {
      lat: parseFloat(pontos[0].latitude),
      lng: parseFloat(pontos[0].longitude)
    };
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({
      'location': latlngInicio
    }, function(results, status) {
      if (status === 'OK') {
        //var endInicio = results[1].formatted_address;
        console.log(results[1].formatted_address);
      }
    });
    console.log(latlngInicio);

    // Converte latitude e longitude em endereço escrito
    var latlngFim = {
      lat: parseFloat(pontos[pontos.length - 1].latitude),
      lng: parseFloat(pontos[pontos.length - 1].longitude)
    };
    geocoder.geocode({
      'location': latlngFim
    }, function(results, status) {
      if (status === 'OK') {
        //var endFim = results[1].formatted_address;
        console.log(results[1].formatted_address);
      }
    });
    console.log(latlngFim);

    // Rota
    var request = {
      origin: "Edifício Ana Rosa - Av. Dino Bueno, 23 - Ponta da Praia, Santos - SP, Brasil",
      destination: "Condomínio Edifício Residencial Fukuchi - Av. dos Bancários, 53 - Ponta da Praia, Santos - SP, 11030-301, Brasil",
      //waypoints: waypts,
      //optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    };

    // Rota no Maps
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });

  });

}

carregarPontos();