class Admins::PanelController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  before_action :check_admin
  before_action :authenticate_admin!
  layout false

  def index
    @admins = Admin.order('active DESC').all
    @dispatchers = Dispatcher.order('active DESC').all
    @drivers = Driver.order('active DESC').all
  end

  # Render form for adding new avatar
  def edit_driver_photo
    @driver = Driver.find_for_authentication(id: params[:id])
  end

  #
  def update_driver_photo
    @driver = Driver.find_for_authentication(id: params[:id])
    if params[:submit] == 'Save'
      @driver.avatar = params[:avatar] unless params[:avatar].nil?
    elsif params[:submit] == 'Delete'
      @driver.avatar = nil
    end
    @driver.save
  end

  private

  def check_admin
    if current_admin.nil?
      redirect_to '/admin'
    end
  end
end
