json.array! @users do |user|
  json.name  user.name
  json.email  user.email
  json.id  user.id
end