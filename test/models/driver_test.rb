require 'test_helper'

class DriverTest < ActiveSupport::TestCase
  def setup
    @driver = drivers(:one)
  end

  test 'valid driver' do
    assert @driver.valid?
  end

  test 'invalid without phone' do
    @driver.phone = nil
    refute @driver.valid?, 'saved driver without a phone'
    assert_not_nil @driver.errors[:phone]
  end

  test 'update driver with a correct phone' do
    @driver.phone = '0508801392'
    assert @driver.valid?
  end

  test 'update driver with an incorrect phone' do
    @driver.phone = 'lol'
    refute @driver.valid?, 'saved driver with an incorrect phone'
    assert_not_nil @driver.errors[:phone]
  end
end
