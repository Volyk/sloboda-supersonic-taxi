class Order < ApplicationRecord
	validates :email, format: { with: /\A(.+)@(.+)\z/ }, allow_blank: true
	validates :end_point, :passengers, :start_point, presence: true
	validates :phone, presence: true
	validates_format_of :phone, with: /\A(0)([0-9]{9})\z/
	validates :baggage, presence: true, allow_blank: true, allow_nil: false

  has_many :orders_blogs


  def as_json(options={})
    options[:accepted] ||= true if status == 1
    options[:arrived] ||= true if status == 2
    options[:declined] ||= true if status == 3
    options[:done] ||= true if status == 4
    options[:waiting] ||= true if status == 5
    options[:new] ||= true if status == 6 
    super
  end
end
