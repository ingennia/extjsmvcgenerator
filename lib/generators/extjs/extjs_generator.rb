class ExtjsGenerator < Rails::Generators::Base
  source_root File.expand_path('../templates', __FILE__)
  argument :app_name, :type => :string, :default => 'app'

  def generate_app
    directory "app", "app/assets/javascripts/#{app_name}"
    template "app.js", "app/assets/javascripts/#{app_name}/app.js"
    template "Viewport.js", "app/assets/javascripts/#{app_name}/view/Viewport.js"
  end

  private
  def extjs_app_name
    file_name.camelcase
  end

  def file_name
    layout_name.underscore
  end
end
