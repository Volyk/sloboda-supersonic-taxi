FactoryGirl.define do
  factory :order do
    start_point "MyString"
    end_point "MyString"
    comment "MyText"
    client_id 1
    driver_id 1
    dispatcher_id 1
    passengers 1
    baggage false
  end
end
