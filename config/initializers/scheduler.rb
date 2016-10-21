require 'rufus-scheduler'
require_relative '../../lib/tasks/orders_task'

scheduler = Rufus::Scheduler.new
order = OrdersTask.new
scheduler.every '10s' do
  if order.time_check != false
    scheduler.in '5s' do
      order.ws_warn
    end
  end
end
