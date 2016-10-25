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
    order_status = params[:order][:status]
    unless current_dispatcher.nil?
      @order.dispatcher_id = current_dispatcher.id
      if order_status == 'waiting'
        @driver = Driver.find_for_authentication(id: params[:order][:driver_id])
        @driver.status = 'busy'
        @driver.save
        ws_new_order(@driver.id)
        ws_broadcast_driver(@driver.id)
      end
    end
    unless current_driver.nil?
      if order_status == 'declined' || order_status == 'done'
        current_driver.status = 'available'
        current_driver.save
        @order.driver_id = nil
        ws_broadcast_driver(current_driver.id)
      end
    end
    if @order.update(order_params)
      OrderMailer.accept_order(@order).deliver if @order.status == 'accepted'
      OrderMailer.execute_order(@order).deliver if @order.status == 'done'
      OrderMailer.arrive(@order).deliver if @order.status == 'arrived'
      render json: @order.as_json
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  private

  def order_params
    if current_dispatcher
      params.require(:order).permit(:phone, :email, :start_point, :end_point,
                                    :comment, :passengers, :baggage, :driver_id,
                                    :status)
    elsif current_driver
      params.require(:order).permit(:status)
    end
  end

  def set_order
    @order = Order.find(params[:id])
    render json: { status: :not_found } unless @order
  end
end
