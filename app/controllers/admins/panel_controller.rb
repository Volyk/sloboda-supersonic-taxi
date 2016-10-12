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

  private

  def check_admin
    if current_admin.nil?
      redirect_to '/admin'
    end
  end
end
