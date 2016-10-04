Rails.application.routes.draw do

  devise_for :admins, path: 'admin', skip: :registrations, controllers: { sessions: 'admins/sessions' }

  devise_scope :admin do
    get 'admin', to: 'admins/sessions#new'
    get '/admins' => 'admins/panel#index', as: :admin_root
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
