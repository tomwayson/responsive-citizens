define([
  'dojo/query',
  'dojo/dom',
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/dom-attr',

  'esri/graphic',

  'bootstrap-map-js/js/bootstrapmap',

  './map',

  'dojo-bootstrap/Collapse',
  'dojo-bootstrap/Dropdown',
  'dojo-bootstrap/Modal',
  'dojo-bootstrap/Alert',
  'dojo/domReady!'
], function(
  query, dom, domClass, domStyle, domAttr,
  Graphic,
  BootstrapMap,
  mapUtils
) {
  'use strict';

  // app globals
  var app = {};
  // feature
  app.citizenRequestLayer = mapUtils.addFeatureLayer();
  app.collapseMenuToggleButton = dom.byId('collapseToggleButton');
  app.startEditAlert = dom.byId('startEditAlert');
  app.sidebar = dom.byId('sidebar');
  app.attributesModal = query('#attributesModal');
  app.requestTypeSelect = query('#attributesModal [name="requesttype"]')[0];
  // TODO: get these from the feature layer on load
  app.severityFieldDomainCodedValuesDict = mapUtils.severityFieldDomainCodedValuesDict;
  app.requestTypeFieldDomainCodedValuesDict = mapUtils.requestTypeFieldDomainCodedValuesDict;

  // NOTE: popup formatting functions must be globals
  window.severityDomainLookup = function (value, key, data){
    return app.severityFieldDomainCodedValuesDict[value];
  };
  window.requestTypeDomainLookup = function (value, key, data){
    return app.requestTypeFieldDomainCodedValuesDict[value];
  };
  window.formatPhoneNumber = function (value, key, data){
    return value ? '<a href=\'tel:' + value + '\'>' + value + '</a>' : '';
  };

  // initialize the request type drop down
  var initAttributeForm = function() {
    var options = [];
    for (var key in app.requestTypeFieldDomainCodedValuesDict) {
      if (app.requestTypeFieldDomainCodedValuesDict.hasOwnProperty(key)) {
        options.push('<option value="' + key + '">' + app.requestTypeFieldDomainCodedValuesDict[key] + '</option>');
      }
    }
    app.requestTypeSelect.innerHTML = options.join('');
  };

  // hide nav dropdown on mobile
  var hideDropdownNav = function(e) {
    if (query('.navbar-collapse.in').length > 0) {
      e.stopPropagation();
      app.collapseMenuToggleButton.click();
    }
  };

  // temporarily show alert when starting edits
  // and then start listening for a map click
  var startCaptureRequest = function(severity) {
    var listener;
    // NOTE: once user has clicked 'x' to dismiss
    // this alert, it will no longer show up
    domStyle.set(app.startEditAlert, 'display', '');
    setTimeout(function() {
      domStyle.set(app.startEditAlert, 'display', 'none');
    }, 3000);
    // save map point in app global and
    app.currentSeverity = severity;
    listener = app.map.on('click', function(e) {
      listener.remove();
      // save map point in app global and
      // show form to collect incident report
      app.currentGeometry = e.mapPoint;
      app.attributesModal.modal('show');
    });
  };

  var stopCaptureRequest = function() {
    app.currentSeverity = null;
    app.currentGeometry = null;
  };

  // get attributes from form and submit
  var submitIncidentReport = function() {
    var attributes = {
      // TODO: not sure if this is needed
      requestreceived: null
    };
    var currentDate = new Date();
    var graphic;
    if  (!app.currentSeverity || !app.currentGeometry) {
      return;
    }
    graphic = new Graphic(app.currentGeometry);
    attributes.severity = parseInt(app.currentSeverity, 10);
    query('#attributesModal input, #attributesModal select, #attributesModal textarea').forEach(function (formInput) {
      attributes[formInput.name] = formInput.value;
    });
    attributes.requesttype = parseInt(attributes.requesttype, 10);
    attributes.requestdate = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(),
    currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(),
    currentDate.getUTCSeconds(), 0);
    graphic.setAttributes(attributes);
    stopCaptureRequest();
    // console.log(attributes);
    app.citizenRequestLayer.applyEdits([graphic], null, null).then(function(response) {
      console.log(response);
    });
  };

  // wire up the DOM events
  var initEvents = function() {
    // listen for map clicks once severity is chosen
    query('.report-btn-group .dropdown-menu a').on('click', function(e) {
      e.preventDefault();
      startCaptureRequest(domAttr.get(e.target, 'data-value'));
    });

    // TODO show the feedback modal
    query('a[href="#feedback"]').on('click', function(e) {
      e.preventDefault();
      query('#feedbackModal').modal('show');
    });

    // hide drop down nav after clicking on a link
    query('.navbar-collapse a').on('click', function(e) {
      hideDropdownNav(e);
    });

    // change the basemap
    query('#basemapDropdown a').on('click', function(e) {
      var basemapName = domAttr.get(e.target, 'data-name');
      if (basemapName && app.map) {
        app.map.setBasemap(basemapName);
      }
    });

    // toggle the sidebar
    query('#sidebarToggleButton').on('click', function(e) {
      // make sure sidebar is same height as the map
      if (app.map.height) {
        domStyle.set(app.sidebar, 'height', app.map.height + 'px');
      }
      domClass.toggle(window.document.body, 'sidebar-open');
      hideDropdownNav(e);
    });

    // submit or cancel request and hide modal
    query('#attributesModal .btn').on('click', function(e) {
      var target = e.target;
      if (target.innerText === 'Submit') {
        submitIncidentReport();
      }
      app.attributesModal.modal('hide');
    });


    // submit or cancel request and hide modal
    query('#feedbackModal .btn').on('click', function(e) {
      // NOTE: this is not implemented in sample app
      query('#feedbackModal').modal('hide');
    });

    // clear current edit session globals
    app.attributesModal.on('hidden.bs.modal', stopCaptureRequest);
  };

  // finally, start up the app!
  //init Map;
  app.map = BootstrapMap.create('map', mapUtils.config.mapOptions);
  app.map.addLayer(app.citizenRequestLayer);
  //add legend
  app.legend = mapUtils.addLegend(app);
  //add geocoder
  app.geocoder = mapUtils.addGeocoder(app);
  //add locationButton
  app.locationButton = mapUtils.addLocationButton(app);

  initAttributeForm();
  //map_dojo.initMap();
  
  //alert(map_dojo.text);
  initEvents();

  return app;
});
