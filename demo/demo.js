var demoApp = angular.module('demoApp',['ml-utils','hljs']);

demoApp.controller('DemoCtrl', [ 'mlMapService', '$scope', function(mlMapService,$scope) {
  var demoControl = this;
  demoControl.maps = {}; // store map names that we know
  demoControl.nextMap = { inclCtrl: true };
  demoControl.hideMaps = false;
  demoControl.hasOtherMaps = false;
  demoControl.kml = { url: 'http://web-apprentice-demo.craic.com/assets/maps/fremont.kml' };
  demoControl.layers = {
    map: 'main',
    traffic: false,
    transit: false
  }

  $scope.$watchCollection('demoControl.layers',function(newVal,oldVal) {
    console.log('layers object changed',newVal);
    var map = newVal.map || 'main';
    if (newVal) {
      if (demoControl.layers.traffic) {
        mlMapService.showTraffic(map);
      } else {
        mlMapService.hideTraffic(map);
      }
      if (demoControl.layers.transit) {
        mlMapService.showTransit(map);
      } else {
        mlMapService.hideTransit(map);
      }
    }
  });

  this.toggleTransit = function(mapName,flag) {
    console.log('toggleTransit',mapName,flag);
    if (flag) {
      mlMapService.showTransit(mapName);
    } else {
      mlMapService.hideTransit(mapName);
    }
  }

  this.toggleTraffic = function(mapName,flag) {
    console.log('toggleTraffi',mapName,flag);
    if (flag) {
      mlMapService.showTraffic(mapName);
    } else {
      mlMapService.hideTraffic(mapName);
    }
  }


  this.addMap = function() {
    if (!demoControl.nextMap.name) {
      alert('Please give your map a name');
      return;
    }
    if (demoControl.nextMap.name === 'main' || demoControl.maps.hasOwnProperty(demoControl.nextMap.name)) {
      alert('A map by that name already exists');
      demoControl.nextMap.name = '';
      return;
    }
    demoControl.hasOtherMaps = true;
    console.log('adding map',demoControl.nextMap.name);
    demoControl.maps[demoControl.nextMap.name] = { controls: demoControl.nextMap.inclCtrl ? 'on' : 'off' }
    demoControl.nextMap.name = '';
  }

  demoControl.addKml = function() {
    console.log('addKml()');
    if (!demoControl.kml.url) {
      alert('Please enter a URL for the KML data');
      return;
    }
    console.log('calling loadKML', demoControl.kml.mapname, demoControl.kml.url);
    mlMapService.loadKML(demoControl.kml.mapname || 'main',demoControl.kml.url);
  }
}]);

angular.bootstrap(document,['demoApp']);