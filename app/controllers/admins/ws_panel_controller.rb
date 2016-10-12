class Admins::WsPanelController < WebsocketRails::BaseController

  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def disable_admin
    if !current_admin.nil? && current_admin.active == true
      @admin = Admin.find_for_authentication(id: message[:id])
      @admin.active = false
      if current_admin.id != @admin.id && @admin.save
        send_message :xnotice, { 'message' => 'Status: Inactive - success.' }
      else
        send_message :xnotice, { 'message' => 'Status: Inactive - ERROR' }
      end
    end
  end

  def enable_admin
    if !current_admin.nil? && current_admin.active == true
      @admin = Admin.find_for_authentication(id: message[:id])
      @admin.active = true
      if @admin.save
        send_message :xnotice, { 'message' => 'Status: Active - success.' }
      else
        send_message :xnotice, { 'message' => 'Status: Active - ERROR' }
      end
    end
  end

  def disable_dispatcher
    if !current_admin.nil? && current_admin.active == true
      @dispatcher = Dispatcher.find_for_authentication(id: message[:id])
      @dispatcher.active = false
      if @dispatcher.save
        send_message :xnotice, { 'message' => 'Status: Inactive - success.' }
      else
        send_message :xnotice, { 'message' => 'Status: Inactive - ERROR' }
      end
    end
  end

  def enable_dispatcher
    if !current_admin.nil? && current_admin.active == true
      @dispatcher = Dispatcher.find_for_authentication(id: message[:id])
      @dispatcher.active = true
      if @dispatcher.save
        send_message :xnotice, { 'message' => 'Status: Active - success.' }
      else
        send_message :xnotice, { 'message' => 'Status: Active - ERROR' }
      end
    end
  end

  def disable_driver
    if !current_admin.nil? && current_admin.active == true
      @driver = Driver.find_for_authentication(id: message[:id])
      @driver.active = false
      if @driver.save
        send_message :xnotice, { 'message' => 'Status: Inactive - success.' }
      else
        send_message :xnotice, { 'message' => 'Status: Inactive - ERROR' }
      end
    end
  end

  def enable_driver
    if !current_admin.nil? && current_admin.active == true
      @driver = Driver.find_for_authentication(id: message[:id])
      @driver.active = true
      if @driver.save
        send_message :xnotice, { 'message' => 'Status: Active - success.' }
      else
        send_message :xnotice, { 'message' => 'Status: Active - ERROR' }
      end
    end
  end


  def new_admin
    if !current_admin.nil? && current_admin.active == true
      if !Admin.find_for_authentication(login: message[:login]).nil?
        send_message :xnotice, { 'message' => 'Admin with this login already exists' }
      else
        @admin = Admin.new(login: message[:login], password: message[:password])
        @admin.active = true
        if @admin.save
          send_message :xnotice, { 'message' => 'New admin successfully created' }
          admin_data = { 'type' => 'admin', 'login' => @admin.login, 'id' => @admin.id }
          send_message :get_new_admin_data, admin_data
        else
          send_message :xnotice, { 'message' => 'Creating admin: ERROR' }
        end
      end
    end
  end


  def edit_admin
    if !current_admin.nil? && current_admin.active == true
      @admin = Admin.find_for_authentication(id: message[:id])
      @admin.encrypted_password = Admin.new(password: message[:password]).encrypted_password
      if @admin.save
        send_message :xnotice, { 'message' => 'Password chenged successfully' }
      else
        send_message :xnotice, { 'message' => 'Changing password: ERROR' }
      end
    end
  end


  def new_dispatcher
    if !current_admin.nil? && current_admin.active == true
      if !Dispatcher.find_for_authentication(email: message[:email]).nil?
        send_message :xnotice, { 'message' => 'Dispatcher with this email already exists' }
      else
        @dispatcher = Dispatcher.new(email: message[:email], password: message[:password])
        @dispatcher.active = true
        if @dispatcher.save
          send_message :xnotice, { 'message' => 'New Dispatcher successfully created' }
          dispatcher_data = { 'type' => 'dispatcher', 'login' => @dispatcher.email, 'id' => @dispatcher.id }
          send_message :get_new_dispatcher_data, dispatcher_data
        else
          send_message :xnotice, { 'message' => 'Creating dispatcher: ERROR' }
        end
      end
    end
  end


  def edit_dispatcher
    if !current_admin.nil? && current_admin.active == true
      if !message[:email].nil? && !Dispatcher.find_for_authentication(email: message[:email]).nil?
        send_message :xnotice, { 'message' => 'Dispatcher with this email already exists' }
      else
        @dispatcher = Dispatcher.find_for_authentication(id: message[:id])
        dispatcher_data = { 'id' => @dispatcher.id }
        unless message[:email].nil?
          @dispatcher.email = message[:email]
          dispatcher_data[:email] = message[:email]
        end
        unless message[:password].nil?
          @dispatcher.encrypted_password = Dispatcher.new(password: message[:password]).encrypted_password
        end
        if @dispatcher.save
          send_message :xnotice, { 'message' => 'Changes successfully saved' }
          send_message :get_edit_dispatcher_data, dispatcher_data
        else
          send_message :xnotice, { 'message' => 'Changing dispatcher: ERROR' }
        end
      end
    end
  end


  def new_driver
    if !current_admin.nil? && current_admin.active == true
      if !Driver.find_for_authentication(number: message[:number]).nil?
        send_message :xnotice, { 'message' => 'Driver with this number already exists' }
      else
        @driver = Driver.new(number: message[:number], password: message[:password])
        @driver.active = true
        @driver.name = message[:name]
        @driver.car_type = message[:car_type]
        @driver.passengers = message[:passengers].to_i
        @driver.trunk = message[:trunk].to_i
        if @driver.save
          send_message :xnotice, { 'message' => 'New Driver successfully created' }
          driver_data = { 'type' => 'driver', 'login' => @driver.number, 'id' => @driver.id }
          driver_data[:name] = @driver.name
          send_message :get_new_driver_data, driver_data
        else
          send_message :xnotice, { 'message' => 'Creating driver: ERROR' }
        end
      end
    end
  end


  def get_driver_data
    if !current_admin.nil? && current_admin.active == true
      @driver = Driver.find_for_authentication(id: message[:id])
      driver_data = {}
      driver_data[:id] = @driver.id
      driver_data[:number] = @driver.number
      driver_data[:name] = @driver.name
      driver_data[:car_type] = @driver.car_type
      driver_data[:passengers] = @driver.passengers
      driver_data[:trunk] = @driver.trunk
      if message[:action] == 'details'
        send_message :open_details, driver_data
      elsif message[:action] == 'edit'
        send_message :edit_driver, driver_data
      end
    end
  end


  def edit_driver
    if !current_admin.nil? && current_admin.active == true
      if !message[:number].nil? && !Driver.find_for_authentication(number: message[:number]).nil?
        send_message :xnotice, { 'message' => 'Driver with this number already exists' }
      else
        @driver = Driver.find_for_authentication(id: message[:id])
        driver_data = { 'id' => @driver.id }
        unless message[:number].nil?
          @driver.number = message[:number]
          driver_data[:number] = message[:number]
        end
        unless message[:password].nil?
          @driver.encrypted_password = Driver.new(password: message[:password]).encrypted_password
        end
        @driver.name = message[:name]
        driver_data[:name] = message[:name]
        @driver.car_type = message[:car_type]
        @driver.passengers = message[:passengers].to_i
        @driver.trunk = message[:trunk].to_i
        if @driver.save
          send_message :xnotice, { 'message' => 'Changes successfully saved' }
          send_message :get_edit_driver_data, driver_data
        else
          send_message :xnotice, { 'message' => 'Changing driver: ERROR' }
        end
      end
    end
  end

end
