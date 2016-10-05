require 'test_helper'

class DriversControllerTest < ActionDispatch::IntegrationTest
  test "should get profile" do
    get drivers_profile_url
    assert_response :success
  end

end
