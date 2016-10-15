class DriversController < ApplicationController
	before_action :authenticate_driver!, only: [:profile]	
	respond_to :html, :json

  def orders
  	@driver = current_driver
  	@orders = @driver.orders.all
  	respond_with(@orders) do |format|
      format.json { render json: @orders.as_json }
      format.html
    end
  end

end
