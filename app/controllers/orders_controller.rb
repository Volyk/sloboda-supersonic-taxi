class OrdersController < ApplicationController
  before_action :get_order, except: [:index, :create, :new]
  respond_to :html, :json

  def index
    @users = Order.all
    respond_with(@orders) do |format|
      format.json { render :json => @users.as_json }
      format.html
    end
  end  

  def show
    respond_with(@order.as_json)
  end

  def new
    @order = Order.new
  end  

	def create
    @order = Order.new(orders_params)
    if @order.save
      render json: @order.as_json, status: :ok
    else
      render json: {user: @order.errors, status: :no_content}
    end
  end  

  def update
    if @order.update_attributes(order_params)
      render json: @order.as_json, status: :ok 
    else
      render json: {user: @order.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @order.destroy
    render json: {status: :ok}
  end

  private

  def orders_params
    params.require(:order).permit(:phone, :email, :start_point, :end_point, :comment, :passengers, :baggege)
  end

  def get_order
    @order = Order.find(params[:id])
    render json: {status: :not_found} unless @order
	end
	
end
