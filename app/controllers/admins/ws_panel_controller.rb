class Admins::WsPanelController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def disable_admin
    @admin = Admin.find_for_authentication(:id => message[:id])
    @admin.active = false
    if current_admin.id != @admin.id && @admin.save
      send_message :xnotice, { 'message' => 'Status: Inactive - success.' }
    else
      send_message :xnotice, { 'message' => 'Status: Inactive - ERROR' }
    end
  end

  def enable_admin
    @admin = Admin.find_for_authentication(:id => message[:id])
    @admin.active = true
    if @admin.save
      send_message :xnotice, { 'message' => 'Status: Active - success.' }
    else
      send_message :xnotice, { 'message' => 'Status: Active - ERROR' }
    end
  end

  def disable_dispatcher
    @dispatcher = Dispatcher.find_for_authentication(:id => message[:id])
    @dispatcher.active = false
    if @dispatcher.save
      send_message :xnotice, { 'message' => 'Status: Inactive - success.' }
    else
      send_message :xnotice, { 'message' => 'Status: Inactive - ERROR' }
    end
  end

  def enable_dispatcher
    @dispatcher = Dispatcher.find_for_authentication(:id => message[:id])
    @dispatcher.active = true
    if @dispatcher.save
      send_message :xnotice, { 'message' => 'Status: Active - success.' }
    else
      send_message :xnotice, { 'message' => 'Status: Active - ERROR' }
    end
  end

  def disable_driver
    @driver = Driver.find_for_authentication(:id => message[:id])
    @driver.active = false
    if @driver.save
      send_message :xnotice, { 'message' => 'Status: Inactive - success.' }
    else
      send_message :xnotice, { 'message' => 'Status: Inactive - ERROR' }
    end
  end

  def enable_driver
    @driver = Driver.find_for_authentication(:id => message[:id])
    @driver.active = true
    if @driver.save
      send_message :xnotice, { 'message' => 'Status: Active - success.' }
    else
      send_message :xnotice, { 'message' => 'Status: Active - ERROR' }
    end
  end

end
