    define([], function() {
      return {
        // Feature Service 
        citizenRequestLayerUrl: 'http://services5.arcgis.com/qfyMgDMPesqltCji/arcgis/rest/services/event_team/FeatureServer/0',
        // infoTemplate for reporting.
        infoTemplate: {
                  title: '<b>${objectid}</b>',
                  content: '<span class="infoTemplateContentRowLabel">Publish Date: </span>' +
                      '<span class="infoTemplateContentRowItem">${requestdate:DateFormat}</span><br><span class="infoTemplateContentRowLabel">Address: </span>' +
                      '<span class="infoTemplateContentRowItem">${address}</span><br><span class="infoTemplateContentRowLabel">Name: </span>' +
                      '<span class="infoTemplateContentRowItem">${name}</span><br><span class="infoTemplateContentRowLabel">Type: </span>' +
                      '<span class="infoTemplateContentRowItem">${severity:severityDomainLookup}</span><br><span class="infoTemplateContentRowLabel">Description: </span>' +
                      '<span class="infoTemplateContentRowItem">${description}</span><br>'+
                      '<span class="infoTemplateContentRowLabel">Start Time: </span><span class="infoTemplateContentRowItem">${start_time}</span><br>'+
                      '<span class="infoTemplateContentRowLabel">End Time: </span><span class="infoTemplateContentRowItem">${end_time}</span><br>'+
                      '<span class="infoTemplateContentRowLabel">Attend Number: </span><span class="infoTemplateContentRowItem">2</span><br>'+
                      '<span class="infoTemplateContentRowLabel">Xueying Gu </span><span class="infoTemplateContentRowItem"><img src="http://graph.facebook.com/100001446274351/picture?type=small"></span><br>'+
                      '<span class="infoTemplateContentRowLabel">Brianna Tu </span><span class="infoTemplateContentRowItem"><img src="http://graph.facebook.com/720796341/picture?type=small"></span><br>'+
                      '<button type="button">Attend</button>'     

                  },
        //Severity Field Domain Value Dictionary        
        severityFieldDomainCodedValuesDict: 
                 {   
                  '0': 'Educational',
                  '1': 'Entertainment',
                  '2': 'Food and Drink',
                  '3': 'Outdoors',
                  '4': 'Special Events'
                 },
        //Request Type Domain Code Value Dictionary
        requestTypeFieldDomainCodedValuesDict:
                 {
                  '0': 'Educational',
                  '1': 'Entertainment',
                  '2': 'Food and Drink',
                  '3': 'Outdoors',
                  '4': 'Special Events'
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
                autoComplete: true,
                arcgisGeocoder: {
                    placeholder: 'Address or Location'
                      },
               'class': 'geocoder'
              },
        //Legend Options      
        legendOptions:
              {
              },
        //locate button options      
        locateButtonOptions:
              {
              }     
      };

    });