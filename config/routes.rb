Rails.application.routes.draw do
  
root 'orders#index'
resources :orders
resources :orders_blogs
devise_for :dispatchers

=begin
devise_for :dispatchers, path: 'dispatcher'
  devise_scope :dispatcher do
    get 'dispatcher' => 'dispatchers/sessions#new', :as => :new_dispatcher_session
    post 'dispatcher' => 'dispatchers/sessions#create', :as => :dispatcher_session
    delete 'dispatcher' => 'dispatchers/sessions#destroy', :as => :destroy_dispatcher_session
  end
=end  

devise_for :drivers, skip: :all, controllers: { sessions: 'drivers/sessions' }
  as :driver do
    get 'driver' => 'devise/sessions#new', :as => :new_driver_session
    post 'driver' => 'devise/sessions#create', :as => :driver_session
    delete 'driver' => 'devise/sessions#destroy', :as => :destroy_driver_session
  end

  devise_for :admins, path: 'admin', skip: :registrations, controllers: { sessions: 'admins/sessions' }

  devise_scope :admin do
    get '/admin', to: 'admins/sessions#new'
    get '/admins' => 'admins/panel#index', as: :admin_root
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
