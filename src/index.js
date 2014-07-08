var app = angular.module('obp-services',[]);

require('./maps.js')(app);
require('./loader.js')(app);
require('./filters.js')(app);

exports.module = app;