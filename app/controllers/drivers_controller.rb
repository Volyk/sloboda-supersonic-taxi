class DriversController < ApplicationController
	before_action :authenticate_driver!, only: [:orders]	
  before_action :set_order, except: [:orders]
	respond_to :html, :json

  def orders
  	@driver = current_driver
  	@orders = @driver.orders.all
  	respond_with(@orders) do |format|

      format.json { render json: @orders.as_json }
    end
  end

  def update_order
    @order.status = 1 if params[:accepted] == true 
    @order.status = 2 if params[:arrived] == true
    @order.status = 3 if params[:declined] == true
    @order.status = 4 if params[:done] == true
    @order.status = 5 if params[:waiting] == true
    @order.status = 6 if params[:new] == true
      if @order.update(order_params)
        render json: @order.as_json
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    end
  end        

  private

  def order_params
    params.require(:order).permit(:new, :accepted, :arrived, :declined, :waiting, :done)
  end

  def set_order
    @order = Order.find(params[:id])
    render json: {status: :not_found} unless @order
  end

end
