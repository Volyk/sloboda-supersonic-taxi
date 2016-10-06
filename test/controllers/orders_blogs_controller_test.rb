require 'test_helper'

class OrdersBlogsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @orders_blog = orders_blogs(:one)
  end

  test "should get index" do
    get orders_blogs_url
    assert_response :success
  end

  test "should get new" do
    get new_orders_blog_url
    assert_response :success
  end

  test "should create orders_blog" do
    assert_difference('OrdersBlog.count') do
      post orders_blogs_url, params: { orders_blog: { action: @orders_blog.action } }
    end

    assert_redirected_to orders_blog_url(OrdersBlog.last)
  end

  test "should show orders_blog" do
    get orders_blog_url(@orders_blog)
    assert_response :success
  end

  test "should get edit" do
    get edit_orders_blog_url(@orders_blog)
    assert_response :success
  end

  test "should update orders_blog" do
    patch orders_blog_url(@orders_blog), params: { orders_blog: { action: @orders_blog.action } }
    assert_redirected_to orders_blog_url(@orders_blog)
  end

  test "should destroy orders_blog" do
    assert_difference('OrdersBlog.count', -1) do
      delete orders_blog_url(@orders_blog)
    end

    assert_redirected_to orders_blogs_url
  end
end
