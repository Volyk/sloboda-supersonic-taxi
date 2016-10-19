require 'rails_helper'

describe Admins::PanelController do
  include Devise::Test::ControllerHelpers

  describe 'GET #edit_driver_photo' do
    it 'should redirect to sessions#new if admin not sign in' do
      @request.env['devise.mapping'] = Devise.mappings[:admin]
      @driver = Driver.create(phone: '0980000000', password: '00000000')
      get :edit_driver_photo, id: @driver.id
      expect(response).to redirect_to('/admin')
    end
  end

  describe 'POST #update_driver_photo' do
    it 'should redirect to sessions#new if admin not sign in' do
      @request.env['devise.mapping'] = Devise.mappings[:admin]
      @driver = Driver.create(phone: '0980000001', password: '00000001')
      post :update_driver_photo, id: @driver.id
      expect(response).to redirect_to('/admin')
    end
  end
end
