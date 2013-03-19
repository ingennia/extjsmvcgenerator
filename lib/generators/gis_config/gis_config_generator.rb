class GisConfigGenerator < Rails::Generators::Base
  source_root File.expand_path('../templates', __FILE__)
  argument :app_name, :type => :string, :default => Rails.application.class.parent_name.underscore
  argument :port, :type => :string, :default => ENV['PGPORT'] || "5432"
  argument :encoding, :type => :string, :default => ENV['PGENCODING'] || 'UTF-8'
  argument :username, :type => :string, :default => ENV['PGUSER'] || 'postgres'
  argument :password, :type => :string, :default => ENV['PGPASSWORD'] || 'admin'
  argument :template_postgis, :type => :string, :default => ENV['POSTGISTEMPLATE'] || 'template_postgis'
  argument :postgis_path, :type => :string, :default => "#{ENV['POSTGRES']}/share/postgresql/contrib/postgis-1.5" || '/Library/PostgreSQL/9.1/share/postgresql/contrib/postgis-1.5'

  def generate_postgis
    gem 'openlayers-rails'
    append_file "app/assets/javascripts/application.js", "//= require openlayers-rails"

    gem 'activerecord-postgis-adapter'
    gem 'rgeo'
    gem 'rgeo-activerecord'
    run 'bundle install'

    template "database.yml", "config/database.yml", :force => true
    inject_into_file 'config/application.rb', "\nrequire 'active_record/connection_adapters/postgis_adapter/railtie'", :after => "require 'rails/all'"
  end

  def generate_openlayers
    gem 'openlayers-rails'
    append_file "app/assets/javascripts/application.js", "//= require openlayers-rails"
  end
end
