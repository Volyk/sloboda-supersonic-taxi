# Manage the connections
class WsConnectionController < WebsocketRails::BaseController
  def initialize_session
    WebsocketRails.users.users['admin'] = WebsocketRails::UserManager.new
    WebsocketRails.users.users['driver'] = WebsocketRails::UserManager.new
    WebsocketRails.users.users['dispatcher'] = WebsocketRails::UserManager.new
  end

  def client_connected
    handle(current_admin, 'admin', true) if current_admin
    handle(current_driver, 'driver', true) if current_driver
    handle(current_dispatcher, 'dispatcher', true) if current_dispatcher
  end

  def delete_user
    handle(current_admin, 'admin', false) if current_admin
    handle(current_driver, 'driver', false) if current_driver
    handle(current_dispatcher, 'dispatcher', false) if current_dispatcher
  end

  private

  def handle(user, role, state)
    manager = WebsocketRails.users[role]
    if state
      manager[user.id] = connection
    elsif manager.users[user.id.to_s]
      manager[user.id].connections.delete(connection)
      manager.users.delete(user.id.to_s) if manager[user.id].connections.empty?
    end
    arbitrary_actions(user, role, state)
  end

  def arbitrary_actions(user, role, state)
    broadcast_message :ws_connection, 'id' => user.id, 'role' => role,
                                      'state' => state
    update_driver_status(user.id, state) if role == 'driver'
  end

  def update_driver_status(id, state)
    if state
      orders_present = Order.on_driver.where(driver_id: id).present?
      Driver.find(id).update status: orders_present ? 'busy' : 'available'
    else
      Driver.find(id).update status: 'offline'
    end
    broadcast_message :get_drivers, 'message' => id
  end
end
