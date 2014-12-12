// Set up the Angular app
var blotterApp = angular.module('blotterApp', ['ngResource']);

blotterApp.controller('BlotterCtrl', function($scope, $resource) {
  var Incident = $resource('/incidents');
  var Aggregate = $resource ('/aggregates');

  // Set up the map
  var layer = new L.StamenTileLayer("terrain");
  var map = new L.Map("map", {
    center: new L.LatLng(40.4417, -80.0000),
    zoom: 13,
    minZoom: 12,
    zoomControl: false
  });
  map.addLayer(layer);
  new L.control.zoom({position: "bottomright"}).addTo(map);
  var markers = L.markerClusterGroup();
  map.addLayer(markers);

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  //$scope.startDate = yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + yesterday.getDate();
  $scope.startDate = yesterday;
  $scope.endDate = $scope.startDate;
  $scope.startTime = "00:00";
  $scope.endTime = "23:59";

  $scope.showSearch = false;
  $scope.showAbout = false;

  $scope.updateData = function() {
    $scope.incidents = Incident.query({
      startDate: $scope.startDate,
      endDate:   $scope.endDate,
      startTime: $scope.startTime,
      endTime:   $scope.endTime
    }, function(incidents) {
      markers.clearLayers();
      angular.forEach(incidents, function(incident) {
        var marker = L.marker([incident.lat, incident.lng]);
        markers.addLayer(marker);
      })
    });
    $scope.aggregates = Aggregate.query({
      startDate: $scope.startDate,
      endDate:   $scope.endDate,
      startTime: $scope.startTime,
      endTime:   $scope.endTime
    });
  };

  $scope.updateData();
});


$(window).load(function() {


		//$.each(data, function(i, incident) {
      //// Add info module
      //var info = $("<div class='info'></div>").appendTo(newIncident);
      //
      //if (incident["type"] == "ARREST") {
      //  var gender = (incident.gender == "M" || incident.gender == "F" ?
      //    (incident.gender == "M" ? "man" : "woman") : "person of unknown gender");
      //  info.find("tr").after("<tr><td><i class='fa fa-user'></i></td><td><h2>" + incident.age +
      //    "-year-old " + gender + "</h2></td></tr>");
      //}
			
		//	// Add marker
		//	var marker = L.marker([incident.lat, incident.lng]);
		//
		//	// Scroll to and highlight incident on marker click
		//	marker.on("click", function() {
		//		// Check if list is hidden; act accordingly
     //   var content = $("#content");
		//		content.removeClass("hidden");
		//		content.scrollTo(newIncident, 250, {offset: -50});
		//		$(".incident").removeClass("selected");
		//		newIncident.addClass("selected");
		//	});
		//
		//	// "Hover" highlight incident on marker mouseover
		//	marker.on("mouseover", function() {
		//		newIncident.addClass("hover");
		//	});
		//
		//	marker.on("mouseout", function() {
		//		newIncident.removeClass("hover");
		//	});
		//
		//	// Add marker to markers group
		//	markers.addLayer(marker);
		//
		//	// Zoom to marker on incident click
		//	newIncident.click(function() {
		//		map.setView([incident.lat, incident.lng], 17, {animate: true});
		//		$(".incident").removeClass("selected");
		//		newIncident.addClass("selected");
		//	});
		//});

	//});

});
