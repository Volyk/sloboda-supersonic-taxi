# Manage relations between models
class WsCoreController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def update_order
    broadcast_message :get_orders, 'id' => message[:id]
  end
end
