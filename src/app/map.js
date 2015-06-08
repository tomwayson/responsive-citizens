define([
	'esri/layers/FeatureLayer',
	'esri/InfoTemplate',
	'esri/dijit/Geocoder',
	'esri/dijit/Legend',
	'esri/dijit/LocateButton',
	'bootstrap-map-js/js/bootstrapmap'
], function(FeatureLayer,InfoTemplate, Geocoder, Legend, LocateButton,
			BootstrapMap){
		  return{
			    citizenRequestLayerUrl: 'http://sampleserver5.arcgisonline.com/ArcGIS/rest/services/LocalGovernment/CitizenRequests/FeatureServer/0',
				infoTemplate: {
				      title: '<b>Request ${objectid}</b>',
				      content: '<span class="infoTemplateContentRowLabel">Date: </span>' +
				          '<span class="infoTemplateContentRowItem">${requestdate:DateFormat}</span><br><span class="infoTemplateContentRowLabel">Phone: </span>' +
				          '<span class="infoTemplateContentRowItem">${phone:formatPhoneNumber}</span><br><span class="infoTemplateContentRowLabel">Name: </span>' +
				          '<span class="infoTemplateContentRowItem">${name}</span><br><span class="infoTemplateContentRowLabel">Severity: </span>' +
				          '<span class="infoTemplateContentRowItem">${severity:severityDomainLookup}</span><br><span class="infoTemplateContentRowLabel">Type: </span>' +
				          '<span class="infoTemplateContentRowItem">${requesttype:requestTypeDomainLookup}</span><br><span class="infoTemplateContentRowLabel">Comments: </span>' +
				          '<span class="infoTemplateContentRowItem">${comment}</span>'
				      },
		  		severityFieldDomainCodedValuesDict: 
		  			 {   
		  				'0': 'General Nuisance',
    				    '1': 'Important To Resolve Soon',
    					'2': 'Critical Issue'
		  			 },
		  		requestTypeFieldDomainCodedValuesDict:
		  			 {
		  			 	'0': 'Abandoned Vehicle',
					    '1': 'Animal Services',
					    '2': 'Driveway Infraction',
					    '3': 'Flooding',
					    '4': 'Graffiti Removal',
					    '5': 'Homeless Nuisance',
					    '6': 'Illegal Dumping',
					    '7': 'Parking Violation',
					    '8': 'Plant/Tree Complaint',
					    '9': 'Pothole Obstruction',
					    '10': 'Roadway Danger',
					    '11': 'Sidewalk Danger',
					    '12': 'Streetlight Broken',
					    '13': 'Street Sign Missing/Damaged',
					    '14': 'Trash Removal',
					    '15': 'Water Leak',
					    '16': 'Yard Waste Removal'
		  			},

		  		addFeatureLayer: function(){
		  			var citizenRequestLayer = new FeatureLayer(this.citizenRequestLayerUrl, {
                    mode: FeatureLayer.MODE_ONEDEMAND,
                    infoTemplate: new InfoTemplate(this.infoTemplate),
                    outFields: ['*']
                });
		  			return citizenRequestLayer;
		  		},	
		  		addLegend: function(map, location){
		  				  location = typeof location !== 'undefined' ? location : 'legend';
			  			  var legend = new Legend({
						        map: map.map,
						        layerInfos: [{
						        title: 'Citizen Requests',
						        layer: map.citizenRequestLayer
						      }]
						    }, location);
			  			legend.startup();  	
			  			return legend;
		  		},
		  		addGeocoder:function(map, location){
		  			location = typeof location !== 'undefined' ? location : 'geocoder';
		  			var geocoder =  new Geocoder({
						      map: map.map,
						      autoComplete: true,
						      arcgisGeocoder: {
						        placeholder: 'Address or Location'
						      },
						      'class': 'geocoder'
						    }, location);
		  				geocoder.startup();
		  				return geocoder;
		  		},

		  		addLocationButton:function(map, location){
		  			location = typeof location !== 'undefined' ? location : 'locateButton';
		  			var locateButton = new LocateButton({
      						map: map.map
    						}, location);
		  			locateButton.startup();
		  			return locateButton;
		  		},

		  		createMap: function(location, sliderPosition){
		  			location = typeof location !== 'undefined' ? location : 'map';
		  			var newMap = BootstrapMap.create(location, {
          									basemap:'topo',
              								center:[-117.1825, 34.0547],
              								zoom:14,
              								sliderPosition: sliderPosition
        									});
		  			return newMap;
		  		}

		  	};
});