class MobileUserGenerator < Rails::Generators::Base
  source_root File.expand_path('../templates', __FILE__)


  def generate_m
    gem 'apn_on_rails'
    gem 'gcm_on_rails'
    run 'bundle install'

    generate 'gcm_migrations'
    generate 'apn_on_rails:install'


    # SCAFFOLD OF MOBILE USER
    generate "scaffold MobileUser --no-javascripts --no-stylesheets"
    generate 'scaffold ApnDevice mobile_user:references --migration=false --no-javascripts --no-stylesheets'
    generate 'scaffold GcmDevice mobile_user:references --migration=false --no-javascripts --no-stylesheets'
    

    # ADD DEPENDENCY
    generate 'migration AddParentToApnDevice mobile_user_id:integer'
    generate 'migration AddPositionToApnDevice the_geom:point'

    generate 'migration AddParentToGcmDevice mobile_user_id:integer'
    generate 'migration AddPositionToGcmDevice the_geom:point'


    rake 'db:migrate'
    # SET RGEO FACTORIES FOR SIG COLUMNS
    generate 'geo_factory_for GcmDevice the_geom 4326'
    generate 'geo_factory_for ApnDevice the_geom 4326'
    
    # ADD PARENT DEPENDENCY
    inject_into_class "app/models/mobile_user.rb", MobileUser do 
	    "has_many :gcm_devices, :dependent => :delete_all"
	    "has_many :apn_devices, :dependent => :delete_all"
    end

  end
end
