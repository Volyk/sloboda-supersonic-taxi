class Order < ApplicationRecord
	belongs_to :dispatcher
  has_many :orders_blogs

end
