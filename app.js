angular.module('testApp', ['tbc.ngGoogleStaticMaps'])
	.controller('AppCtrl', function($scope) {
		$scope.markers = [{
	    		color: 'blue',
	    		label: 'S',
	    		coords: [38.1404022, 13.2172042]
		}];
	});
