Rails.application.routes.draw do
  devise_for :users
  root 'users#index'
  resources :users, only: [:edit, :update, :index]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:create, :index]
  end
end
