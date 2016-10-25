# Orders controller
class OrdersController < ApplicationController
  include WsBroadcast
  before_action :set_order, except: [:index, :create]
  respond_to :html, :json

  def index
  end

  def create
    @order = Order.new(order_params)
    dispatcher_presence
    respond_to do |format|
      @order.save ? create_success(format) : create_failure(format)
    end
  end

  def destroy
    @order.destroy
    render json: { status: :ok }
  end

  private

  def create_success(format)
    # *** Old !WO ***
    ws_broadcast_order(@order.id)

    # *** New !WN ***
    driver_assigned = @order.status == 'waiting' ? true : false
    broadcast('dispatcher', 'new_order', @order.as_json) unless driver_assigned

    OrderMailer.order_email(@order).deliver
    format.html { redirect_to root_path, notice: 'Order successfully created.' }
    format.json { render :show, status: :created, location: @order }
  end

  def create_failure(format)
    format.html { render :new }
    format.json { render json: @order.errors, status: :unprocessable_entity }
  end

  def order_params
    filters = [:phone, :email, :start_point, :end_point,
               :comment, :passengers, :baggage]
    filters += [:driver_id, :status] if current_dispatcher
    params.require(:order).permit(filters)
  end

  def set_order
    @order = Order.find(params[:id])
    render json: { status: :not_found } unless @order
  end

  def dispatcher_presence
    return if current_dispatcher.nil?
    @order.dispatcher_id = current_dispatcher.id
    assign_driver
  end

  def assign_driver
    return if params[:order][:status] != 'waiting'
    driver = Driver.find(params[:order][:driver_id])
    driver.update status: 'busy'
    # *** Old !WO ***
    ws_new_order(driver.id)
    ws_broadcast_driver(driver.id)

    # *** New !WN ***
    ws_message('driver', driver.id, 'receive_order', @order.as_json)
    broadcast('dispatcher', 'remove_driver', driver.as_json)
  end
end
