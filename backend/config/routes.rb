Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  namespace :api do
    namespace :v1 do
      get "/users/me", to: "users#me"
      resources :users, only: [ :show ]
      resources :users, only: [ :create ], path: "signup"
      post "/login", to: "sessions#create"
      post "/refresh", to: "sessions#refresh"
      delete "/logout", to: "sessions#destroy"
      resources :pace_calculator, only: [ :create ], path: "pace-calculator"
      resources :account_activations, only: [ :create, :update ], path: "account-activation"
      resources :password_resets, only: [ :create, :update ], path: "password-reset"
      resources :training_sessions, only: [ :index ]
    end
  end

  match "*path", to: "api/application#not_found", via: :all
end
