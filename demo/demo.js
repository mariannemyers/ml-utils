var demoApp = angular.module('demoApp',['ml-utils','hljs']);

demoApp.controller('DemoCtrl', [ 'mlMapService', function(mlMapService) {
  var demoControl = this;
  demoControl.maps = {}; // store map names that we know
  demoControl.nextMap = { inclCtrl: true };
  demoControl.hideMaps = false;
  demoControl.hasOtherMaps = false;
  demoControl.kml = { url: 'http://web-apprentice-demo.craic.com/assets/maps/fremont.kml' };

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