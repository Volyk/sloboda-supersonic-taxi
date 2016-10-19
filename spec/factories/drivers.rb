FactoryGirl.define do
  factory :driver do
    phone '050' + Faker::Number.number(7)
    password Faker::Internet.password(8)
    active true
  end
end
