(function($){
	let map,marker,customMapType,marker_create=[];
	let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
	let style=[
  {
    featureType: "all",
    stylers: [
      { saturation: -80 }
    ]
  },{
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { hue: "#00ffee" },
      { saturation: 50 }
    ]
  },{
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];
	let mapdiv=document.getElementById('map');
	let mylatlng=new google.maps.LatLng(23.8103,90.4125);
	// responsible for create map
	function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: mylatlng,
      zoom: 10,
      styles: style
    });
    marker=new google.maps.Marker({
    	position: mylatlng,
    	map: map,
    	title:'first step'
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
  		let item=createMarkers(markers[i]);
  		marker_create.push(createMarkers);
  	}
  }
  function	createMarkers(pos){
  	let newmarker=new google.maps.Marker({
    	position: pos,
    	map: map,
    });
    newmarker.addListener('click',function(){
  		calculateAndDisplayRoute(pos)
  	});
  }
  // console.log(marker.getPositiion());
  function calculateAndDisplayRoute(pos) {
  	directionsDisplay.setMap(map);
        directionsService.route({
          origin: marker.getPosition(),
          destination: pos,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            console.log(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
  initMap();
  geolocation();
  getNewMarker();
})(jQuery);