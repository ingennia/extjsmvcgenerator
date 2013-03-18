class PostgisGenerator < Rails::Generators::Base
  source_root File.expand_path('../templates', __FILE__)
  argument :app_name, :type => :string, :default => 'app'
  argument :port, :type => :string, :default => ENV['PGPORT'] || "5432"
  argument :encoding, :type => :string, :default => 'UTF-8'
  argument :username, :type => :string, :default => ENV['PGUSER'] || 'postgres'
  argument :password, :type => :string, :default => ENV['PGPASSWORD'] || 'admin'
  argument :template_postgis, :type => :string, :default => 'template_postgis'
  argument :pg_path, :type => :string, :default => "#{ENV['POSTGRES']}/share/postgresql/contrib/postgis-1.5"

  def generate_postgis
    gem 'activerecord-postgis-adapter'
    gem 'rgeo'
    gem 'rgeo-activerecord'

    template "database.yml", "config/database.yml", :force => true
    inject_into_file 'config/application.rb', "\nrequire 'active_record/connection_adapters/postgis_adapter/railtie'", :after => "require 'rails/all'"
  end

end
