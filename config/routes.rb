Rails.application.routes.draw do
  
  get 'dispatchers/profile'

root 'orders#index'
resources :orders
resources :orders_blogs
devise_for :dispatchers
  as :dispatcher do
    get 'dispatcher' => 'devise/sessions#new', :as => :new_dispatchers_session
    post 'dispatcher' => 'devise/sessions#create', :as => :dispatchers_session
    delete 'dispatcher' => 'devise/sessions#destroy', :as => :destroy_dispatchers_session
    get 'dispatchers/profile' => 'dispatchers/profile', :as => :dispatcher_root
 end

devise_for :drivers, skip: :all, controllers: { sessions: 'drivers/sessions' }
  as :driver do
    get 'driver' => 'devise/sessions#new', :as => :new_driver_session
    post 'driver' => 'devise/sessions#create', :as => :driver_session
    delete 'driver' => 'devise/sessions#destroy', :as => :destroy_driver_session
    get 'drivers/profile' => 'drivers/profile', :as => :driver_root
  end

  devise_for :admins, path: 'admin', skip: :registrations, controllers: { sessions: 'admins/sessions' }

  devise_scope :admin do
    get '/admin', to: 'admins/sessions#new'
    get '/admins' => 'admins/panel#index', as: :admin_root
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
