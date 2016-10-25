# app/controllers/concerns/ws_broadcast.rb
module WsBroadcast
  extend ActiveSupport::Concern
  # *** Old !WO ***
  def ws_broadcast_order(id)
    WebsocketRails.users['dispatcher'].each do |user|
      user.send_message('get_orders', 'id' => id)
    end
  end

  def ws_broadcast_driver(id)
    WebsocketRails.users['dispatcher'].each do |user|
      user.send_message('get_drivers', 'id' => id)
    end
  end

  def ws_new_order(id)
    msg = { 'message' => 'You have a new order' }
    WebsocketRails.users['driver'][id].send_message('get_new_order', msg)
  end

  # *** New !WN ***
  def ws_message(role, id, event, object)
    return unless WebsocketRails.users[role].users[id.to_s]
    WebsocketRails.users[role][id].send_message(event, object.as_json)
  end

  def broadcast(role, event, object)
    WebsocketRails.users[role].each do |user|
      user.send_message(event, object.as_json)
    end
  end
end
