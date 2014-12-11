Rails.application.routes.draw do
  # resources :incidents, only: [:index]
  # resources :aggregates, only: [:index]

  # root to: 'pages#index'

  get '/' => 'high_voltage/pages#show', id: 'index'

  mount Blotter => '/'
end
