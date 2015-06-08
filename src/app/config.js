define(['esri/InfoTemplate'], function(InfoTemplate) {
  return {
    // Feature Service 
    citizenRequestLayerUrl: 'http://sampleserver5.arcgisonline.com/ArcGIS/rest/services/LocalGovernment/CitizenRequests/FeatureServer/0',
    // infoTemplate for reporting.
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
    //Severity Field Domain Value Dictionary        
    severityFieldDomainCodedValuesDict: 
             {   
              '0': 'General Nuisance',
              '1': 'Important To Resolve Soon',
              '2': 'Critical Issue'
             },
    //Request Type Domain Code Value Dictionary
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

  //Map Options
    mapOptions:
          {
            basemap:'topo',
            center:[-117.1825, 34.0547],
            zoom:14,
            sliderPosition:null
          },
  //Geocoder Options
    geocoderOptions:
          {
            map: null,
            autoComplete: true,
            arcgisGeocoder: {
                placeholder: 'Address or Location'
                  },
           'class': 'geocoder'
          },
    //Legend Options      
    legendOptions:
          {
            map: null
          },
    //locate button options      
    locateButtonOptions:
          {
            map: null
          }     
  };

});