json.content  @message.content
json.user_id  @message.user.id
json.image  @message.image.url
json.created_at @message.created_at.strftime("%Y-%m-%d %H:%M")
json.user_name  @message.user.name