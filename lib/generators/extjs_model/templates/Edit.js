Ext.define('<%= app_name %>.view.<%= model_name%>.Edit', {
	extend: 'Ext.window.Window',
	alias: 'widget.edit<%= model_name %>',

	tile: 'Edit <%= model_name %>',
	layout: 'fit',

	autoshow: true,

	initComponent: function() {
		var editForm = Ext.widget("form<%= model_name %>");
		this.items = [ editForm ];

		this.buttons = [
		{
			text: 'Update',
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
