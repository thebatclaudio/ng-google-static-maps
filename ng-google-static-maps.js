/*!
 * ng-google-static-maps <%= pkg.version %>
 * Claudio La Barbera, https://claudiolabarbera.com
 * License: MIT
 */
(function () {
  'use strict';

  angular.module('tbc.ngGoogleStaticMaps', [])
    .controller('StaticGoogleMapCtrl', function () {
      var BASE_URL = '//maps.googleapis.com/maps/api/staticmap?';
      var STYLE_ATTRS = ['color', 'label', 'size', 'icon'];

      this.makeMarkerStrings = function makeMarkerStrings(markers) {
        return markers.map(function (marker) {
          var str = Object.keys(marker).map(function (key) {
            if (STYLE_ATTRS.indexOf(key) > -1) {
              return key + ':' + marker[key] + '|';
            }
          }).join('');

          return str + marker.coords.join(',');
        });
      };

      this.makeSrcString = function makeSrcString(attrs, markers) {
        var markerStrings;

        if (markers) {
          if (!angular.isArray(markers)) {
            markers = [markers];
          }
          markerStrings = this.makeMarkerStrings(markers);
        }

        var params = Object.keys(attrs).map(function (attr) {
          if (attr === 'markers' && markerStrings) {
            return Object.keys(markerStrings).map(function (key) {
              return 'markers=' + encodeURIComponent(markerStrings[key]);
            }).join('&');
          }

          if (attr[0] !== '$' && attr !== 'alt') {
            return encodeURIComponent(attr) + '=' + encodeURIComponent(attrs[attr]);
          }
        });

        return BASE_URL + params.reduce(function (a, b) {
          if (!a) {
            return b;
          }

          if (b !== undefined) {
            return a + '&' + b;
          }

          return a;
        }, '');
      };
    })
    .directive('static-google-map', function ($parse) {
      return {
        template: '<img alt="Google Map">',
        replace: true,
        restrict: 'E',
        controller: 'StaticGoogleMapsCtrl',
        scope: true,

        link: function postLink(scope, elements, attrs, ctrl) {
          var element = elements[0];
          var markers = $parse(attrs.markers)(scope);

          if (!attrs.sensor) {
            throw new Error('The `sensor` attribute is required.');
          }

          if (!attrs.size) {
            throw new Error('The `size` attribute is required.');
          }

          var sizeBits = attrs.size.split('x');
          if (sizeBits.length !== 2) {
            throw new Error('Size format must be `WIDTHxHEIGHT`.');
          }

          element.width = parseInt(sizeBits[0], 10);
          element.height = parseInt(sizeBits[1], 10);
          element.src = ctrl.makeSrcString(attrs, markers);
          
          scope.$watch(attrs.markers, function (newMarkers) {
            element.src = ctrl.makeSrcString(attrs, newMarkers);
          });
        }
      };
    });
}());