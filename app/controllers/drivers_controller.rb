class DriversController < ApplicationController
  def profile
  	@driver = Driver.find_by(params[:id])
  end
end
