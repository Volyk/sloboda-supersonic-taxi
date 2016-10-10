class Admins::PanelController < Devise::SessionsController
# before_action :configure_sign_in_params, only: [:create]
  before_action :authenticate_admin!
  layout false

  def index
    @admins = Admin.all
    @dispatchers = Dispatcher.all
    @drivers = Driver.all
  end
end
