var demoApp = angular.module('demoApp',['ml-utils','hljs']);

demoApp.controller('DemoCtrl', function() {
  var demoControl = this;
  demoControl.maps = {}; // store map names that we know
  demoControl.nextMap = {};
  demoControl.hideMaps = false;
  demoControl.hasOtherMaps = false;

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
    demoControl.maps[demoControl.nextMap.name] = { controls: demoControl.nextMap.hideCtrl ? 'off' : 'on' }
    demoControl.nextMap = {};
  }
})

angular.bootstrap(document,['demoApp']);