# This class used for additional methods of Orders
class OrdersTask < OrdersController
  include WsBroadcast
  def time_check
    @warn_drivers = []
    @warn_orders = []
    @orders = Order.where(status: 'waiting')
    return false if @orders.nil?
    @orders.each do |order|
      if Time.now.utc - order.updated_at > 300
        @driver = Driver.find_for_authentication(id: order.driver_id)
        @driver.status = 'available'
        @driver.save
        order.status = 'declined'
        order.driver_id = nil
        order.save
        @warn_drivers.push(@driver.id)
        @warn_orders.push(order.id)
      end
    end
    return false if @warn_orders.empty?
    true
  end

  def ws_warn
    @warn_drivers.each do |driver_id|
      ws_new_order(driver_id)
      ws_broadcast_driver(driver_id)
    end
    @warn_orders.each do |order_id|
      ws_broadcast_order(order_id)
    end
  end
end
