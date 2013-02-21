Ext.define('<%= app_name %>.store.<%= store_name %>', {
	extend: 'Ext.data.Store',
	model: '<%= app_name %>.model.<%= model_name %>',
	autoLoad: true,
	autoSync: true

/*
proxy: {
        type: 'rest',
        url: '/subcategories',
				
        reader: {
            type: 'json'
        }, 
        writer:{
            type: 'json'
        }
    },	
	// Relation
	belongsTo: {
		model: 'APP.model.Subcategory',
		name: 'subcategories'
	},
	
	hasMany: {
		model: 'APP.model.Media',
		name: 'photos'
	}
*/
});
