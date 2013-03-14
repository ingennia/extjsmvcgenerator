class PostgisGenerator < Rails::Generators::Base
  source_root File.expand_path('../templates', __FILE__)
  argument :app_name, :type => :string, :default => 'app'
  argument :port, :type => :string, :default => "5432"
  argument :encoding, :type => :string, :default => 'UTF-8'
  argument :username, :type => :string, :default => 'postgres'
  argument :password, :type => :string, :default => 'admin'

  def generate_app
    template "database.yml", "config/database.yml"
  end

end
