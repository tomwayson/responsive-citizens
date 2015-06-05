define([
	'esri/layers/FeatureLayer',

	'bootstrap-map-js/js/bootstrapmap',

	'esri/InfoTemplate',
	'esri/dijit/Geocoder',
	'esri/dijit/Legend',
	'esri/dijit/LocateButton'
], function(FeatureLayer, BootstrapMap, InfoTemplate, Geocoder, Legend, LocateButton){
		  return{
		  		config: {
				    mapOptions: {
				      basemap:'topo',
				      center:[-117.1825, 34.0547],
				      zoom:14,
				      sliderPosition: 'bottom-right'
				    },
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
				    }
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
		  			var citizenRequestLayer = new FeatureLayer(this.config.citizenRequestLayerUrl, {
                    mode: FeatureLayer.MODE_ONEDEMAND,
                    infoTemplate: new InfoTemplate(this.config.infoTemplate),
                    outFields: ['*']
                });
		  			return citizenRequestLayer;
		  		},	
		  		addLegend: function(app){
			  			  var legend = new Legend({
						        map: app.map,
						        layerInfos: [{
						        title: 'Citizen Requests',
						        layer: app.citizenRequestLayer
						      }]
						    }, 'legend');
			  			return legend;
		  		},
		  		addGeocoder:function(app){
		  			var geocoder =  new Geocoder({
						      map: app.map,
						      autoComplete: true,
						      arcgisGeocoder: {
						        placeholder: 'Address or Location'
						      },
						      'class': 'geocoder'
						    }, 'geocoder');
		  				return geocoder;
		  		},
		  		addLocationButton:function(app){
		  			var locateButton = new LocateButton({
      						map: app.map
    						}, 'locateButton');
		  			return locateButton;
		  		}
		  	};
});