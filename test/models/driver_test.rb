require 'test_helper'

class DriverTest < ActiveSupport::TestCase

  def setup
    @driver = drivers(:one)
  end

  test 'valid driver' do
    assert @driver.valid?
  end

  test 'invalid without number' do
    @driver.number = nil
    refute @driver.valid?, 'saved driver without a number'
    assert_not_nil @driver.errors[:number]
  end

  test 'update driver with a correct number' do
    @driver.number = '0508801392'
    assert @driver.valid?
  end

  test 'update driver with an incorrect number' do
    @driver.number = 'lol'
    refute @driver.valid?, 'saved driver with an incorrect number'
    assert_not_nil @driver.errors[:number]
  end
end
