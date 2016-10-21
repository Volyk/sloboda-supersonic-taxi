class DriversController < ApplicationController
  include WsBroadcast
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
    unless current_dispatcher.nil?
      @order.dispatcher_id = current_dispatcher.id
      if params[:order][:status] == 'waiting'
        @driver = Driver.find_for_authentication(id: params[:order][:driver_id])
        @driver.status = 'busy'
        @driver.save
        ws_new_order(@driver.id)
        ws_broadcast_driver(@driver.id)
      end
    end
    unless current_driver.nil?
      if params[:order][:status] == 'declined' || params[:order][:status] == 'done'
        current_driver.status = 'available'
        current_driver.save
        ws_broadcast_driver(current_driver.id)
      end
    end
    if @order.update(order_params)
      render json: @order.as_json
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  private

  def order_params
    params.require(:order).permit(:status, :driver_id)
  end

  def set_order
    @order = Order.find(params[:id])
    render json: {status: :not_found} unless @order
  end

end
