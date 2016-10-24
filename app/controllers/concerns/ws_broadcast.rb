# app/controllers/concerns/ws_broadcast.rb
module WsBroadcast
  extend ActiveSupport::Concern

  def ws_broadcast_order(id)
    WebsocketRails.users.each do |user|
      user.send_message('get_orders', 'id' => id)
    end
  end

  def ws_broadcast_driver(id)
    WebsocketRails.users.each do |user|
      user.send_message('get_drivers', 'id' => id)
    end
  end

  def ws_new_order(id)
    WebsocketRails.users[id].send_message('get_new_order', 'msg' => 'new')
  end
end
