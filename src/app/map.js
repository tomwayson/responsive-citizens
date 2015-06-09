define([
	'esri/layers/FeatureLayer',
	'esri/InfoTemplate',
	'esri/dijit/Geocoder',
	'esri/dijit/Legend',
	'esri/dijit/LocateButton',
	
	'bootstrap-map-js/js/bootstrapmap',

	'./config'
], function(FeatureLayer, InfoTemplate, Geocoder, Legend, LocateButton,
			BootstrapMap, config){
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
		  			config.legendOptions.map = typeof map !== 'undefined' ? map : null;
		  			location = typeof location !== 'undefined' ? location : 'legend';
			  		var legend = new Legend(config.legendOptions, location);
			  		legend.startup();  	
			  		return legend;
		  		},
		  		addGeocoder:function(map, location){
		  			config.geocoderOptions.map = typeof map !== 'undefined' ? map : null;
		  			location = typeof location !== 'undefined' ? location : 'geocoder';
		  			config.geocoderOptions.map = map;
		  			var geocoder =  new Geocoder(config.geocoderOptions, location);
		  			geocoder.startup();
		  			return geocoder;
		  		},
		  		addLocationButton:function(map, location){
		  			config.locateButtonOptions.map = typeof map !== 'undefined' ? map : null;
		  			location = typeof location !== 'undefined' ? location : 'locateButton';
		  			var locateButton = new LocateButton(config.locateButtonOptions, location);
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