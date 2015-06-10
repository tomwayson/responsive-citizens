define([
	'esri/layers/FeatureLayer',
	'esri/InfoTemplate',
	'esri/dijit/Geocoder',
	'esri/dijit/Legend',
	'esri/dijit/LocateButton',
	
	'bootstrap-map-js/js/bootstrapmap',

	'./config',

	'dojo/_base/lang'
], function(FeatureLayer, InfoTemplate, Geocoder, Legend, LocateButton,
			BootstrapMap, config, lang){
		  return{
		  		addFeatureLayer: function(){
		  			var citizenRequestLayer = new FeatureLayer(config.citizenRequestLayerUrl, {
                    mode: FeatureLayer.MODE_ONEDEMAND,
                    infoTemplate: new InfoTemplate(config.infoTemplate),
                    outFields: ['*']
                });
		  			return citizenRequestLayer;
		  		},	
		  		addLegend: function(map, location){
		  			var opt = lang.mixin(config.legendOptions, {map: map});
		  			location = typeof location !== 'undefined' ? location : 'legend';
			  		var legend = new Legend(opt, location);
			  		legend.startup();  	
			  		return legend;
		  		},
		  		addGeocoder:function(map, location){
		  			var opt = lang.mixin(config.geocoderOptions, {map: map});
		  			location = typeof location !== 'undefined' ? location : 'geocoder';
		  			config.geocoderOptions.map = map;
		  			var geocoder =  new Geocoder(opt, location);
		  			geocoder.startup();
		  			return geocoder;
		  		},
		  		addLocationButton:function(map, location){
		  			var opt = lang.mixin(config.locateButtonOptions, {map: map});
		  			location = typeof location !== 'undefined' ? location : 'locateButton';
		  			var locateButton = new LocateButton(opt, location);
		  			locateButton.startup();
		  			return locateButton;
		  		},
		  		createMap: function(location, sliderPosition){
		  			location = typeof location !== 'undefined' ? location : 'map';
		  			config.mapOptions.sliderPosition = sliderPosition;
		  			var newMap = BootstrapMap.create(location, config.mapOptions);
		  			return newMap;
		  		}

		  	};
});