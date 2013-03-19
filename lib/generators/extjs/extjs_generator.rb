class ExtjsGenerator < Rails::Generators::Base
  source_root File.expand_path('../templates', __FILE__)
  argument :app_name, :type => :string, :default => Rails.application.class.parent_name.underscore

  def generate_app
    gem 'extjs-rails'
    gem 'compass-rails'
    run 'bundle install'

    append_file "app/assets/javascripts/application.js", "//= require extjs-rails"
    inject_into_file "app/assets/stylesheets/application.css", "*= require extjs-rails", :before => "*/"

    directory "app", "app/assets/javascripts/#{app_name}"
    template "app.js", "app/assets/javascripts/#{app_name}/app.js"
    template "Viewport.js", "app/assets/javascripts/#{app_name}/view/Viewport.js"

    extjs = <<-JAVASCRIPT
//= require_tree ./#{app_name}/model
//= require_tree ./#{app_name}/store
//= require_tree ./#{app_name}/view
//= require_tree ./#{app_name}/controller
//= require #{app_name}/app
    JAVASCRIPT

    append_file 'app/assets/javascripts/application.js', extjs
  end

  private
  def extjs_app_name
    file_name.camelcase
  end

  def file_name
    layout_name.underscore
  end
end
