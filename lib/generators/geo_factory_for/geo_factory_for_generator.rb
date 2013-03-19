class GeoFactoryForGenerator < Rails::Generators::NamedBase
	source_root File.expand_path('../templates', __FILE__)
	argument :model, :type => :string, :required => true
	argument :column, :type => :string, :required => true
	argument :srid, :type => :string, :default => 4326

	def generate_postgis
		factory = "  set_rgeo_factory_for_column(:%s, RGeo::Geographic.spherical_factory(:srid => %s))\n" % [column, srid]
		inject_into_class "app/models/#{model.underscore}.rb", model.constantize do
			"#{factory}"
		end
	end
end
