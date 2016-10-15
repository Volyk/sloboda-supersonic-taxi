class Order < ApplicationRecord
	validates_format_of :email, with: /\A(.+)@(.+)\z/
	validates :end_point, :passengers, :start_point, presence: true
	validates :phone, presence: true
	validates_format_of :phone, with: /\A(0)([0-9]{9})\z/
	validates :baggage, presence: true, allow_blank: false

  	has_many :orders_blogs
  	belongs_to :driver
end
