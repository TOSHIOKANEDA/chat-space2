FactoryBot.define do
  factory :user do
    password = Faker::Internet.password(8)
    name {Faker::Kpop.name}
    email {Faker::Internet.email}
    password {password}
    password_confirmation {password}
  end
end