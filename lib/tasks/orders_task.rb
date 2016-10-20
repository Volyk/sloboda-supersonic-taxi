# This class used for additional methods of Orders
class OrdersTask < OrdersController
  def time_check
    @orders = Order.where(status: 'waiting')
    return if @orders.nil?
    @orders.each do |order|
      if Time.now.utc - order.updated_at > 300
        order.update(status: 'declined', driver_id: nil)
      end
    end
  end
end
