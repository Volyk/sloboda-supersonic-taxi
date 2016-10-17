class DriversController < ApplicationController
	before_action :authenticate_driver!, only: [:orders]	
  before_action :set_order, except: [:orders]
	respond_to :html, :json

  def orders
  	@driver = current_driver
  	@orders = @driver.orders.all
    respond_with(@orders) do |format|
      format.json { render json: @orders.as_json }
      format.html
    end
  end

  def update_order
    params[:order][:status] = :accepted if params[:order].delete(:accepted) == 'true' 
    params[:order][:status] = :arrived if params[:order].delete(:arrived) == 'true'
    params[:order][:status] = :declined if params[:order].delete(:declined) == 'true'
    params[:order][:status] = :done if params[:order].delete(:done) == 'true'
    params[:order][:status] = :waiting if params[:order].delete(:waiting) == 'true'
    params[:order][:status] = :new if params[:order].delete(:new) == 'true'
    if @order.update(order_params)
      render json: @order.as_json
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end        

  private

  def order_params
    params.require(:order).permit(:status)
  end

  def set_order
    @order = Order.find(params[:id])
    render json: {status: :not_found} unless @order
  end

end
