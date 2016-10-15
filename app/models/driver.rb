class Driver < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :rememberable, :trackable, authentication_keys: [:phone]
  validates :phone, presence: true, uniqueness: true
  validates_format_of :phone, with: /\A(0)([0-9]{9})\z/
  
  def active_for_authentication?
  	super && active?
  end	
	
end

