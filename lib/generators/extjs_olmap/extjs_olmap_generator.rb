  class ExtjsOlmapGenerator < Rails::Generators::Base

  source_root File.expand_path('../templates', __FILE__)
  argument :app_name, :type => :string, :required => true
  argument :model_name, :type => :string
  @model_attributes = []

  def generate_olmap
    template "model.js", "app/assets/javascripts/#{app_name}/model/#{model_name}.js"
    template "controller.js", "app/assets/javascripts/#{app_name}/controller/#{controller_name}.js" 
    template "view.js", "app/assets/javascripts/#{app_name}/controller/Map.js"

    match_model_section = /models: \[(.*?)\]/
    match_controller_section = /controllers: \[(.*?)\]/

    add_to_section match_model_section, model_name
    add_to_section match_controller_section, model_name.pluralize

    # Agregar al viewport la cosa
    listModel = "\n		var map#{model_name} = Ext.widget('map#{model_name}');"
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

  def default_model_controller model_name
    model_name.underscore.pluralize
  end

  def attribute_default attribute
    model_name.constantize.columns_hash[attribute].default
  end

  def controller_name
    model_name.pluralize
  end

  end
