Rails.application.routes.draw do
  
  devise_for :dispatchers
  resources :orders
  resources :orders_blogs

  root 'orders#index'

  devise_for :drivers, skip: :all
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
