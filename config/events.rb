WebsocketRails::EventMap.describe do
  # You can use this file to map incoming events to controller actions.
  # One event can be mapped to any number of controller actions. The
  # actions will be executed in the order they were subscribed.
  #
  # Uncomment and edit the next line to handle the client connected event:
  #   subscribe :client_connected, :to => Controller, :with_method => :method_name
  #
  # Here is an example of mapping namespaced events:
  #   namespace :product do
  #     subscribe :new, :to => ProductController, :with_method => :new_product
  #   end
  # The above will handle an event triggered on the client like `product.new`.

  # Test controller
  subscribe :ping, to: WebsocketTestController, with_method: :ping

  # Admin section
  subscribe :disable_admin, to: Admins::WsPanelController, with_method: :disable_admin
  subscribe :enable_admin, to: Admins::WsPanelController, with_method: :enable_admin
  subscribe :disable_dispatcher, to: Admins::WsPanelController, with_method: :disable_dispatcher
  subscribe :enable_dispatcher, to: Admins::WsPanelController, with_method: :enable_dispatcher
  subscribe :disable_driver, to: Admins::WsPanelController, with_method: :disable_driver
  subscribe :enable_driver, to: Admins::WsPanelController, with_method: :enable_driver


end
