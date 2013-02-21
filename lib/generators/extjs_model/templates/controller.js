Ext.define('<%= app_name %>.controller.<%= controller_name %>', {
	extend: 'Ext.app.Controller',

	stores: ['<%= store_name %>'],
	models: ['<%= model_name %>'],

	views: [
		'<%= model_name %>.List'
	],

	init: function(){
		this.control({
//			'ListPanel > toolbar #delete': {
//				click: function(button){ console.log("Delete"); }
//			}
		});
		
	}
});
