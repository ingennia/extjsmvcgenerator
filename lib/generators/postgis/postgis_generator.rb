class PostgisGenerator < Rails::Generators::Base
  source_root File.expand_path('../templates', __FILE__)
  argument :app_name, :type => :string, :default => 'app'
  argument :port, :type => :string, :default => "5432"
  argument :encoding, :type => :string, :default => 'UTF-8'
  argument :username, :type => :string, :default => 'postgres'
  argument :password, :type => :string, :default => 'admin'
  argument :template, :type => :string, :default => 'template_postgis'

  def generate_app
    template "database.yml", "config/database.yml", :force => true
    inject_into_file 'config/application.rb', "\nrequire 'active_record/connection_adapters/postgis_adapter/railtie'", :after => "require 'rails/all'"
  end

end
