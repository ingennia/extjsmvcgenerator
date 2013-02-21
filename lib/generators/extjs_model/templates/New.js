Ext.define('<%= app_name %>.view.<%= model_name%>.New', {
	extend: 'Ext.window.Window',
	alias: 'widget.new<%= model_name %>',

	tile: 'New <%= model_name %>',
	layout: 'fit',

	autoshow: true,

	initComponent: function() {

		var editForm = Ext.widget("form<%= model_name %>");
		this.items = [ editForm ];

		this.buttons = [
		{
			text: 'Create',
			action: 'save'
		},
		{
			text: 'Cancel',
			scope: this,
			handler: this.close
		}
		];


		this.callParent(arguments);
	}
	
});
