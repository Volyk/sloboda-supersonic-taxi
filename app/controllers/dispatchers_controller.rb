#
class DispatchersController < ApplicationController
  before_action :authenticate_dispatcher!, only: [:profile]

  def profile
  end
end
