Figaro.load
require_relative 'boot'
require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SlobodaTeam
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

     config.action_mailer.raise_delivery_errors = false
     config.action_mailer.delivery_method = :smtp
     config.action_mailer.smtp_settings = {
        address:              'smtp.gmail.com',
        port:                 587,
        user_name:            ENV['gmail_username'],
        password:             ENV['gmail_password'],
        authentication:       'plain',
        enable_starttls_auto: true
    }

    config.assets.paths << Rails.root.join("vendor","assets","bower_components")
    config.assets.paths << Rails.root.join("vendor","assets","bower_components","bootstrap-sass-official","assets","fonts")
    config.assets.precompile << %r(.*.(?:eot|svg|ttf|woff|woff2)$)
    config.assets.paths << Rails.root.join("vendor","assets","bower_components","bootstrap-sass-official","assets","fonts")

    config.generators do |g|
      g.test_framework :rspec,
        fixtures: true,
        view_specs: false,
        helper_specs: false,
        routing_specs: false,
        controller_specs: true,
        request_specs: false
      g.fixture_replacement :factory_girl, dir: "spec/factories"
    end

    config.middleware.delete Rack::Lock

  end
end
