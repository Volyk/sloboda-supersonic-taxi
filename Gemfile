source 'https://rubygems.org'

gem 'devise'
gem 'angularjs-rails'
gem 'angular-ui-bootstrap-rails'
gem 'bootstrap-sass'

source 'https://rails-assets.org' do
  gem 'rails-assets-angular-devise'
end

gem 'turbolinks'

gem 'pry-rails', group: :development

gem 'kaminari'
gem 'paperclip'
gem 'bootstrap-kaminari-views'

gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
gem 'puma', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'therubyracer'
gem 'sprockets', '~> 3.0'

gem 'jquery-rails'

gem 'jbuilder', '~> 2.5'

gem 'pg'

gem 'faye-websocket', '0.10.0'

gem 'websocket-rails', github: 'moaa/websocket-rails',
                       branch: 'threadsocket-rails'
gem 'websocket-rails-js', github: 'websocket-rails/websocket-rails-js',
                          branch: 'sub_protocols'

group :development, :test do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
end

group :test do
  gem 'faker'
  gem 'capybara'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'selenium-webdriver'
end

group :development, :test do
  gem 'byebug', platform: :mri
end

group :development do
  gem 'web-console'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
