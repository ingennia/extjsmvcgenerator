Ext.require("Ext.panel.Panel");

Ext.define("<%= app_name %>.view.<%= model_name %>.Panel", {
  extend: 'Ext.panel.Panel',
  alias: 'widget.panel<%= model_name %>',
  width: 100,
  height: 100, 

  initComponent: function(){
    this.callParent(arguments);
  }

});
