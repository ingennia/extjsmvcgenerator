Ext.define('<%= app_name %>.controller.<%= model_name %>', {
	extend: 'Ext.<%= app_name %>.Controller',

	stores: [],
	models: ['<%= model_name %>'],

	views: [
		'<%= model_name %>.Panel',
	],

	init: function(){
		this.control({
			'panel<%= model_name %>': {
				afterrender: this.afterrenderPanel
			},

			'panel<%= model_name %> > toolbar #select': {
				click: this.selectfeature
			},

			'panel<%= model_name %> > toolbar #new': {
				click: this.newfeature
			},

			'panel<%= model_name %> > toolbar #rotate': {
				click:  this.rotatefeature
			},
			'panel<%= model_name %> > toolbar #move': {
				click:  this.movefeature
			},

			'panel<%= model_name %> > toolbar #delete': {
				click:  this.deletefeature
			},

			'panel<%= model_name %> > toolbar #layerCombo': {
				select:  this.layerselect
			},

			'panel<%= model_name %> > toolbar #logout': {
				click:  this.logout
			},

			'#pan': {
				click: function(btn){
					<%= app_name %>.model.<%= model_name %>.activateSingleControl(null);
				}
			},
			'#undo': {
				click: function(btn){
					 <%= app_name %>.model.<%= model_name %>.activateSingleControl('undoredo');
					 <%= app_name %>.model.<%= model_name %>.getControl('undoredo').previousTrigger();
				}
			},
			'#redo': {
				click: function(btn){
					 <%= app_name %>.model.<%= model_name %>.activateSingleControl('undoredo');
					 <%= app_name %>.model.<%= model_name %>.getControl('undoredo').nextTrigger();
				}
			},
			'#boxin': {
				click: function(btn){
					<%= app_name %>.model.<%= model_name %>.activateSingleControl('boxin');
				}
			},
			'#boxout': {
				click: function(btn){
					<%= app_name %>.model.<%= model_name %>.activateSingleControl('boxout');
				}
			}

		});
	},

	afterrenderPanel: function(panel){
		var geographic = new OpenLayers.Projection("EPSG:4326");
		var mercator = new OpenLayers.Projection("EPSG:900913");

		var options = {
			projection: mercator,
			displayProjection: geographic
		};

		var map = new OpenLayers.Map(panel.body.dom, options);
		<%= app_name %>.model.<%= model_name %>.setMap(map);

		// open street <%= model_name %>
		var mapnik  = new OpenLayers.Layer.OSM();

		<%= app_name %>.model.<%= model_name %>.addLayers({
			osm: mapnik
		});


		// Navigation Controls
		var layerSwitcher = new OpenLayers.Control.LayerSwitcher();
		var mousePosition = new OpenLayers.Control.MousePosition();
		var undoredo = new OpenLayers.Control.NavigationHistory();
		var boxin =  new OpenLayers.Control.ZoomBox({
				alwaysZoom:true
		});


		var boxout =  new OpenLayers.Control.ZoomBox({
			alwaysZoom : true, 
			out: true 
		});


		<%= app_name %>.model.<%= model_name %>.addControls({
			layerSwitcher: layerSwitcher,
			mousePosition: mousePosition,
			undoredo: undoredo,
			boxin: boxin,
			boxout: boxout
		});



		var lonlat = new OpenLayers.LonLat(-70.591961, -33.415156);
		var center =lonlat.transform(geographic, map.getProjectionObject());
		var initZoomLevel = 10

		map.setCenter(center, initZoomLevel);

		panel.on("resize", function(){
			map.updateSize()
		});


	},

	singleClick: function(){
		//nothing
	}


});
