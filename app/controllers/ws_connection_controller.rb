# Manage the connections
class WsConnectionController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def client_connected
    if current_dispatcher
      WebsocketRails.users["disp#{current_dispatcher.id}"] = connection
    elsif current_driver
      driver_id = current_driver.id
      WebsocketRails.users[driver_id] = connection
      update_driver_status(driver_id)
      broadcast_message :get_drivers, 'id' => driver_id
    end
  end

  def delete_user
    return if current_driver.nil?
    current_driver.status = 'offline'
    current_driver.save
    broadcast_message :get_drivers, 'id' => current_driver.id
  end

  private

  def update_driver_status(driver_id)
    orders_present = Order.on_driver.where(driver_id: driver_id).present?
    Driver.find(driver_id).update status: orders_present ? 'busy' : 'available'
  end
end
