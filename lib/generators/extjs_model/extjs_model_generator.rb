class ExtjsModelGenerator < Rails::Generators::Base

  source_root File.expand_path('../templates', __FILE__)
  argument :app_name, :type => :string, :required => true
  argument :model_name, :type => :string
  @model_attributes = []

  def initalizer *args, &block
    @model_attributes = model_name.constantize.column_names
  end

  def generate_model
    directory 'view', "public/#{app_name}/view/#{model_name}"
    template "model.js", "public/#{app_name}/model/#{model_name}.js"
    template "store.js", "public/#{app_name}/store/#{store_name}.js"
    template "controller.js", "public/#{app_name}/controller/#{controller_name}.js" 
  
    template "List.js", "public/#{app_name}/view/#{model_name}/List.js"

  end

  private

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

  def store_name
    model_name.pluralize
  end

end
