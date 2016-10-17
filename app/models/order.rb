class Order < ApplicationRecord
	validates :email, format: { with: /\A(.+)@(.+)\z/ }, allow_blank: true
	validates :end_point, :passengers, :start_point, presence: true
	validates :phone, presence: true
	validates_format_of :phone, with: /\A(0)([0-9]{9})\z/
	validates :baggage, presence: true, allow_blank: true, allow_nil: false

  has_many :orders_blogs

  def as_json(options={})
    hash = Hash.new
    hash[:accepted] ||= true if status == 'accepted'
    hash[:arrived] ||= true if status == 'arrived'
    hash[:declined] ||= true if status == 'declined'
    hash[:done] ||= true if status == 'done'
    hash[:waiting] ||= true if status == 'waiting'
    hash[:new] ||= true if status == 'new' 
    super.as_json(options).merge(hash)
  end
end
