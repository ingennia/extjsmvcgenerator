// Ext Application
Ext.application({
	name: '<%= app_name %>',
	appFolder: './<%= app_name %>',
	models: [], // put here your models
	stores: [], // put here your data stores (in plural)
	requires : ['Ext.view.View'],
	controllers: [], // put here yout app controllers (in plural)

	autoCreateViewport: true
});
