# Manage the connections
class WsConnectionController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def client_connected
    if !current_dispatcher.nil?
      @name = 'disp' + current_dispatcher.id.to_s
      WebsocketRails.users[@name] = connection
    elsif !current_driver.nil?
      WebsocketRails.users[current_driver.id] = connection
      @orders = Order.where(status: %w(waiting arrived accepted)) \
                     .where(driver_id: current_driver.id)
      current_driver.status = @orders.empty? ? 'available' : 'busy'
      current_driver.save
      broadcast_message :get_drivers, 'id' => current_driver.id
    end
  end

  def delete_user
    return if current_driver.nil?
    current_driver.status = 'offline'
    current_driver.save
    broadcast_message :get_drivers, 'id' => current_driver.id
  end
end
