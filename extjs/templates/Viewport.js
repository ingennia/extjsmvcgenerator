Ext.require("Ext.container.Viewport")
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
*/
Ext.define("<%= app_name %>.view.Viewport", {
	extend: 'Ext.container.Viewport',
	alias: 'widget.viewport',
	layout: {
		type: 'border'
	},

	initComponent: function(){


		/*
		var centerPanel = Ext.widget('mainpanelmap', {
			region: 'center',
			margins: '5 5 5 1',
			flex: 3
		});
		*/

		//this.items = [ headPanel, leftPanel, centerPanel ];

		this.callParent(arguments);
	}

});
