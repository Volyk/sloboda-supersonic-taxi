# Manage the connections
class WsConnectionController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def client_connected
    return if current_driver.nil?
    WebsocketRails.users[current_driver.id] = connection
    @orders = Order.where(status: %w(waiting arrived accepted))
    @status = 'available'
    @orders.each do |order|
      @status = 'busy' if current_driver.id == order.driver_id
    end
    current_driver.status = @status
    current_driver.save
  end

  def delete_user
    return if current_driver.nil?
    current_driver.status = 'offline'
    current_driver.save
  end
end
