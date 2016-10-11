require File.dirname(__FILE__) + '/../spec_helper'
describe OrdersController, "it creating new order" do
  integrate_views
  fixtures :menu_orders
  
  it  "should redirect to index" do
    post 'create'  
  end 
end
