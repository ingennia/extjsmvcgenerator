Ext.define('<%= app_name %>.view.<%= model_name %>.Form', {
	extend: 'Ext.form.Panel',
	alias: 'widget.form<%= model_name %>',
	autoscroll: true,
	defaultType: 'textfield',


	initComponent: function() {

		this.items = [ <% @model_attributes.each  do |attrib| %>
		{
			name: '<%= attrib %>',
			xtype: '<%= extjs_form_field attrib %>',
			fieldLabel: '<%= attrib %>'
			editable: '<%= (attrib == 'id') ? true : false >'
		} <%= "," if attrib != @model_attributes.last %> <% end %>
		];


		this.callParent(arguments);
	}
});
