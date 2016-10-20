#
class DriversController < ApplicationController
  before_action :authenticate_driver!, only: [:orders]
  before_action :set_order, except: [:orders]
  respond_to :html, :json

  def orders
    @driver = current_driver
    @orders = @driver.orders.where(status: %w(waiting arrived accepted))
    @orders = @driver.orders.where('updated_at >=? AND status =?',
                                   Date.yesterday, 'done') if @orders.blank?
    respond_with(@orders) do |format|
      format.json { render json: @orders.as_json }
      format.html
    end
  end

  def update_order
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
    render json: { status: :not_found } unless @order
  end
end
