class ExtjsGenerator < Rails::Generators::Base
  source_root File.expand_path('../templates', __FILE__)
  argument :app_name, :type => :string, :default => 'app'

  def generate_app
    directory "app", "public/#{app_name}"
    template "app.js", "public/#{app_name}/app.js"
    template "Viewport.js", "public/#{app_name}/view/Viewport.js"
  end

  private
  def extjs_app_name
    file_name.camelcase
  end

  def file_name
    layout_name.underscore
  end
end
