FactoryBot.define do
  factory :group do
    name {Faker::Beer.name}
  end
end