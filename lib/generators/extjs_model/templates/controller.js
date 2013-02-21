Ext.define('<%= app_name %>.controller.<%= controller_name %>', {
	extend: 'Ext.app.Controller',

	stores: ['<%= store_name %>'],
	models: ['<%= model_name %>'],

	views: [
		'<%= model_name %>.Form',
		'<%= model_name %>.List',
		'<%= model_name %>.Edit',
		'<%= model_name %>.New'
	],

	init: function(){
		this.control({

			'list<%= model_name %>': {
				itemdblclick: this.edit<%= model_name %>
			},

			'list<%= model_name %> > toolbar #add ': {
				click: this.showCreate<%= model_name %>
			},

			'list<%= model_name %> > toolbar #edit ': {
				click: this.edit<%= model_name %>
			},

			'list<%= model_name %> > toolbar #delete ': {
				click: this.delete<%= model_name %>
			},

			'edit<%= model_name %> button[action=save]': {
				click: this.update<%= model_name %>
			},

			'new<%= model_name %> button[action=save]' : {
				click: this.add<%= model_name %>
			}


		});
		
	}, 

	showCreate<%= model_name %>: function(button){
		Ext.widget('new<%= model_name %>').show();
	},

	add<%= model_name%>: function (button) {
		var win = button.up('window'),
		form = win.down('form'),
		record = form.getRecord(),
		value = form.getValues();

		this.get<%= store_name %>Store().insert(0, value);
		win.close();
	},

	delete<%= model_name%>: function(button){
		var grid = Ext.ComponentQuery.query('list<%= model_name %>');
		var record = grid[0].getSelectionModel().getSelection()[0];

		if (record){
			this.get<%= store_name %>Store().remove(record);
		}
	},

	edit<%= model_name%>: function(button)
		var grid = Ext.ComponentQuery.query('list<%= model_name %>');
		var record = grid[0].getSelectionModel().getSelection()[0];
		var view  = Ext.widget('edit<%= model_name %>');
		view.down('form').loadRecord(record);
		view.show();
		
	},

	update<%= %>: function(button){
		var win = button.up('window'),
		form = win.down('form'),
		record = form.getRecord(),
		value = form.getValues();

		record.set(value);

		this.get<%= store_name %>Store().sync(record);
		win.close();

	}
});
