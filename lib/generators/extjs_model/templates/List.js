Ext.define('<%= app_name %>.view.<%= model_name %>.List', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.list<%= model_name %>',
	store: '<%= store_name %>',
	title: '<%= model_name.pluralize %>',

	initComponent: function() {

		this.columns = [<% @model_attributes.each do |attrib| %>
		{
			header: '<%= attrib.capitalize %>',
			dataIndex: '<%= attrib %>'
			// flex: 1
		}<%="," if attrib != @model_attributes.last %> <% end %>
		]
	
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');

		//this.plugins = [rowEditing];

		this.dockedItems = [{
			xtype: 'toolbar',
			items: [{
				itemId: 'add', 
				text: 'Add',
			},'-',
			{
				itemId: 'delete',
				text: 'Delete',
			}, '-',
			{
				itemId: 'edit',
				text: 'Edit'
			}
			]
		}];


		this.callParent(arguments);
	}  
});
