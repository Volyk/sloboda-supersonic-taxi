class WebsocketTestController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def ping
    new_message = {'message' => 'Connection success!'}
    send_message :pong, new_message
  end
end
