class Admins::PanelController < Devise::SessionsController
# before_action :configure_sign_in_params, only: [:create]
  before_action :authenticate_admin!

  def index
    @admins = Admin.all
  end
end
