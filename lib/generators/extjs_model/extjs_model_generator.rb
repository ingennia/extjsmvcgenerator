class ExtjsModelGenerator < Rails::Generators::Base

  source_root File.expand_path('../templates', __FILE__)
  argument :app_name, :type => :string, :required => true
  argument :model_name, :type => :string
  @model_attributes = []

  def initalizer *args, &block
    @model_attributes = model_name.constantize.column_names
  end

  def generate_model
    directory 'view', "app/assets/javascripts/#{app_name}/view/#{model_name}"
    template "model.js", "app/assets/javascripts/#{app_name}/model/#{model_name}.js"
    template "store.js", "app/assets/javascripts/#{app_name}/store/#{store_name}.js"
    template "controller.js", "app/assets/javascripts/#{app_name}/controller/#{controller_name}.js"   
    template "List.js", "app/assets/javascripts/#{app_name}/view/#{model_name}/List.js"
    template "Edit.js", "app/assets/javascripts/#{app_name}/view/#{model_name}/Edit.js"
    template "New.js", "app/assets/javascripts/#{app_name}/view/#{model_name}/New.js"
    template "Form.js", "app/assets/javascripts/#{app_name}/view/#{model_name}/Form.js"

    match_model_section = /models: \[(.*?)\]/
    match_store_section = /stores: \[(.*?)\]/
    match_controller_section = /controllers: \[(.*?)\]/

    add_to_section match_model_section, model_name
    add_to_section match_store_section, model_name.pluralize
    add_to_section match_controller_section, model_name.pluralize

    # Agregar al viewport la cosa
    listModel = "\n		var list#{model_name} = Ext.widget('list#{model_name}');"
    inject_into_file "app/assets/javascripts/#{app_name}/view/Viewport.js", listModel, :after => "initComponent: function(){"
  end


  private

  def add_to_section regexp, model_name
     match_brackets = /\[|\]/
     match_brackets_with_content = /\[(.*?)\]/

     gsub_file "app/assets/javascripts/#{app_name}/app.js", regexp do |match|
	  match.gsub match_brackets_with_content do |mmatch|
	      mmatch.gsub!(match_brackets, "") 
	      (mmatch.split(",").length > 0) ? "[#{mmatch}, '#{model_name}']": "['#{model_name}']"
	  end
    end
  end

  def attribute_type attribute
    model_name.constantize.columns_hash[attribute].type.to_s
  end

  def extjs_form_field attribute
	  type = attribute_type attribute

	  if type == "string"
		  return 'textfield'
	  elsif type == "integer"
		  return 'numberfield'
	  elsif type == "datetime"
		  return 'datefield'
	  end
  end

  def default_model_controller model_name
    model_name.underscore.pluralize
  end

  def attribute_default attribute
    model_name.constantize.columns_hash[attribute].default
  end

  def controller_name
    model_name.pluralize
  end

  def store_name
    model_name.pluralize
  end

end
