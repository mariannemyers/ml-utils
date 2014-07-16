var demoApp = angular.module('demoApp',['ml-utils','hljs']);

demoApp.controller('DemoCtrl', function() {
  var demoControl = this;
  demoControl.mapNames = []; // store map names that we know
  demoControl.nextMap = {};
  demoControl.hideMaps = false;

  this.addMap = function() {
    if (!demoControl.nextMap.name) {
      alert('Please give your map a name');
      return;
    }
    if (demoControl.nextMap.name === 'main' || demoControl.mapNames.indexOf(demoControl.nextMap.name) > -1) {
      alert('A map by that name already exists');
      demoControl.nextMap.name = '';
      return;
    }
    console.log('adding map',demoControl.nextMap.name);
    demoControl.mapNames.push(demoControl.nextMap.name);
    demoControl.nextMap = {};
  }
})

angular.bootstrap(document,['demoApp']);