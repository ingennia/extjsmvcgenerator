Ext.define('<%= app_name %>.model.<%= model_name %>', {
	extend: 'Ext.data.Model',
	fields:  [ <% @model_attributes.each do |attrib| %>
	{
		name: '<%= attrib %>',
		type: '<%= attribute_type attrib %>'
		//defaultValue: '<%= attribute_default attrib %>'
	}<%="," if attrib != @model_attributes.last %> <% end %>
	],
	
	proxy: {
		type: 'rest',
		url: '/<%= default_model_controller model_name %>', // default model controller route convention
		format: 'json',

		reader: {
			type: 'json'
		}, 
		writer:{
			type: 'json'
	}
},
});
