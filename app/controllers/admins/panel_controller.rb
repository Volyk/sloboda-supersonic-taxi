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

  def edit_driver_photo
    @driver = Driver.find_for_authentication(id: params[:id])
    if request.post?
      if params[:submit] == 'Save'
        @driver.avatar = params[:avatar] unless params[:avatar].nil?
      elsif params[:submit] == 'Delete'
        @driver.avatar = nil
      end
      @driver.save
      html_body = '<script>window.opener.update_driver_avatar('
      html_body += @driver.id.to_s + ');'
      html_body += 'window.close();</script>'
      render html: html_body.html_safe
    end
  end

  private

  def check_admin
    if current_admin.nil?
      redirect_to '/admin'
    end
  end
end
