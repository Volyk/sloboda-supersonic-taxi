class DriversController < ApplicationController
before_action :authenticate_driver!, only: [:profile]	

  def profile
 
  end
end
