# This class used for additional methods of Orders
class OrdersTask < OrdersController
  include WsBroadcast
  def time_check
    @orders = Order.where(status: 'waiting')
    return if @orders.nil?
    @orders.each do |order|
      next unless Time.now.utc - order.updated_at > 300
      driver = Driver.find(order.driver_id)
      driver.update status: 'available'
      order.update status: 'declined', driver_id: nil
      ws_update_message(driver, order)
    end
  end

  def ws_update_message(driver, order)
    # *** Old !WO ***
    ws_new_order(driver.id)
    ws_broadcast_driver(driver.id)
    ws_broadcast_order(order.id)

    # ***New !WN ***
    ws_message('driver', driver.id, 'order_timed_out', order.as_json)
    broadcast('dispatcher', 'new_driver', driver.as_json)
    broadcast('dispatcher', 'new_order', order.as_json)
  end
end
