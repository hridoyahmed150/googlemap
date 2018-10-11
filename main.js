(function($){
	let map,marker,customMapType,marker_create=[];
	let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  let service = new google.maps.DistanceMatrixService();
	let style=[
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#10f900"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c7ead4"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "60"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#aaafe4"
            },
            {
                "saturation": "88"
            }
        ]
    }
];
	let mapdiv=document.getElementById('map');
	let mylatlng=new google.maps.LatLng(23.8103,90.4125);
	// responsible for create map
	function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: mylatlng,
      zoom: 12,
      styles: style
    });
    
    marker=new google.maps.Marker({
    	position: mylatlng,
    	map: map,
    	title:'first step',
      icon: {
          url:'marker/bluemapicon.png',
          scaledSize: new google.maps.Size(35, 50)
        }
    })

  }
  // responsible for geolocation
  function geolocation(){
  	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        marker.setPosition(pos);
      });
      }else{
      	alert ('location don')
      }
  }
  // responsible for create marker in different place
  let markers=[
  {"lat":23.6237965,"lng":90.4999266},
  {"lat":23.7340085,"lng":90.3928041},
  {"lat":23.7380961,"lng":90.3721071},
  {"lat":23.7777569,"lng":90.3803028},
  {"lat":23.7947914,"lng":90.414198}
  ];
  function getNewMarker(){
  	for (var i = markers.length - 1; i >= 0; i--) {
  		createMarkers(markers[i]);
  		marker_create.push(createMarkers);
  	}
  }
  function	createMarkers(pos){
  	let newmarker=new google.maps.Marker({
    	position: pos,
    	map: map,
    });
    newmarker.addListener('click',function(){
  		calculateAndDisplayRoute(pos);
  	});
  }
  // console.log(marker.getPositiion());
  function calculateAndDisplayRoute(pos) {
    let position=pos;
  	directionsDisplay.setMap(map);
        directionsService.route({
          origin: marker.getPosition(),
          destination: position,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            service.getDistanceMatrix(
            {
              origins: [marker.getPosition()],
              destinations: [pos],
              travelMode: 'DRIVING',
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: false
            }, callback);

          function callback(response, status) {
            if (status=='OK') {
              var infowindow = new google.maps.InfoWindow();
              infowindow.setContent("<div class='informationbox'><h2>"+ response.destinationAddresses+"</h2>"+
                "<p>distance : <strong>"+ response.rows[0].elements[0].distance.text+"</strong></p>"+
                "<p>duration : <strong>"+ response.rows[0].elements[0].duration.text+"</strong></p>"+
                "</div>"
                );
                infowindow.setPosition(pos);
                infowindow.open(map); 
                google.maps.event.addListener(map, 'click', function() {
                    infowindow.close();
                    marker.open = false;
                });      
              } 
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
  initMap();
  geolocation();
  getNewMarker();
})(jQuery);