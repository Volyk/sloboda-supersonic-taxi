
class OrdersController < ApplicationController
  include WsBroadcast
  before_action :authenticate_dispatcher!, only: [:edit]
  before_action :get_order, except: [:index, :create, :new]
  respond_to :html, :json

  def index
  end

  def create
    @order = Order.new(order_params)
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
    respond_to do |format|
      if @order.save
        ws_broadcast_order(@order.id)
        OrderMailer.order_email(@order).deliver
        format.html { redirect_to root_path, notice: 'Order was successfully created.' }
        format.json { render :show, status: :created, location: @order }
      else
        format.html { render :new }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @order.dispatcher_id = current_dispatcher.id if current_dispatcher.present?
    respond_to do |format|
      if @order.update(order_params)
        format.html { redirect_to @order, notice: 'Order was successfully updated.' }
        format.json { render :show, status: :ok, location: @order }
      else
        format.html { render :edit }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @order.destroy
    render json: {status: :ok}
  end

  private

  def order_params
    if current_dispatcher
      params.require(:order).permit(:phone, :email, :start_point, :end_point,
                                    :comment, :passengers, :baggage, :driver_id,
                                    :status)
    else
      params.require(:order).permit(:phone, :email, :start_point, :end_point,
                                    :comment, :passengers, :baggage)
    end
  end

  def get_order
    @order = Order.find(params[:id])
    render json: { status: :not_found } unless @order
  end
end
