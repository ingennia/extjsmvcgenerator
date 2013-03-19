Ext.define('<%= app_name %>.model.<%= model_name %>', {

	extend: 'Ext.util.Observable',
	singleton: true, // this class is a singleton instance
	map: null,
	baseLayer: null,
	initialized: false,
	controls: null,
	layers: null,
	format: 'image/png',
	currentLayerName: null,
	selectedFeatures: [],
	baseLayers: null,

	constructor: function(cfg){
		this.addEvents("mapready");
		this.callParent(arguments);
	},


	setMap: function(map){
		this.map = map; 
	},

	notifyMapReady: function(){
		this.fireEvent("mapready", this);
	},
	activateSingleControl: function(control){
       for(var key in this.controls){
	       if(key=='selectFeatures'){
		       this.controls[key].unselectAll();
	       }
	       this.controls[key].deactivate();

       }

       this.controls['mousePosition'].activate();
       //this.controls['navigation'].activate();
       if(control != null && this.controls[control]){
	       this.controls[control].activate();
       }

    },

	reloadActiveControls: function(){
		for(var key in this.controls){
			if (this.controls[key].active){
				this.controls[key].deactivate();
				this.controls[key].activate();
			}
		}
	},

	activateSingleControlWithSelection: function(control){
		for(var key in this.controls){
			if (key != ('selectFeatures' || 'mousePosition')) {
				this.controls[key].deactivate();
			}
		}

		this.controls[control].activate();
	},

	getCurrentLayer: function(){
		var currentLayer = this.layers[this.currentLayerName];
		var firstLayer;

		for(var key in this.layers){
		 	firstLayer = this.layers[key];
		 	break;
		}

		return (currentLayer != undefined) ? currentLayer :  firstLayer ;
	},

	setBaseLayer: function(layer){
		if(this.map != null){
			this.map.addLayer(layer);
		}
	},

	setCenter: function(lonlat, zoom){
		var proj = new OpenLayers.Projection("EPSG:7203");
		lonlat.transform(proj, this.map.getProjectionObject());
		this.map.setCenter(lonlat,zoom);
	},

	setOpacity: function(opacityLevel){
		var baselayer = this.map.baseLayer;
		baselayer.setOpacity(opacityLevel/100);
	},

	panTo: function(lonlat){
		var proj = new OpenLayers.Projection("EPSG:7203");
		lonlat.transform(proj, this.map.getProjectionObject());
		this.map.panTo(lonlat);
	},

	setDefaultControls: function(){
		this.addControls(this.defaultControls);
	},

	addControls: function(controls){
		this.controls = this.controls ||  {};
		if(this.map == null) return;

		for(var key in controls){

			if(this.controls[key] != null){
				this.map.removeControl(controls[key]);
				delete this.controls[key];
			}

			this.map.addControl(controls[key]);
			this.controls[key] = controls[key];
		}
	},

	displaySingleLayers: function(layers){
		this.hideAllLayers();

		for(var key in this.layers){
			var layer = this.layers[key];
			layer.display = true;
		}
	},

	hideAllLayers: function(){
		for(var key in this.layers){
			var layer = this.layers[key];
			layer.setVisibility(false);
		}

		this.baseLayers['planification'].setVisibility(false);
	},

	getControls: function(){
		return this.controls;

	},

	getControl: function(key){
		return this.controls[key];
	},

	getLayer: function(key){
		return this.layers[key];
	},

	getLayers: function(){
		return this.layers;
	},

	getWFSLayers: function(){
		return this.map.getLayersByClass(OpenLayers.Layer.WFS);
	},

	getBaseLayer: function(key){
		return this.baseLayers[key];
	},

	getSelected: function(){
		return this.selectedFeatures;
	},

	getLayersArray: function(){
		var layers = this.layers;
		return Object.keys(layers).map(function(key){
			return layers[key]
		});
	},

	addLayers: function(layers){
		this.layers = this.layers ||  {};

		if(this.map == null) return;

		for(var key in layers){
			if(this.layers[key] == null){
				this.map.addLayers([layers[key]]);
				this.layers[key] = layers[key];
			}
		}
		
	},

	addBaseLayers: function(layers){
		this.baseLayers = this.baseLayers ||  {};

		if(this.map == null) return;

		for(var key in layers){
			if(this.baseLayers[key] == null){
				this.map.addLayers([layers[key]]);
				this.baseLayers[key] = layers[key];
			}
		}
	},

	removeLayer: function(layer){
		var match = this.map.getLayersByName(layer.name)[0];

		if(this.map != null & match != null){
			this.map.removeLayer(match);
		}
	},

	getResolution: function(){
		return this.map.getResolution();
	},

	getMap: function(){
		return this.map;
	}
});
