# README
 # DB構造

 ## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user




 ## groupsテーブル

 |Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true| <= 一度消します・・・
|group_id|integer|null: false, foreign_key: true|
|master_member|string|null: false| <= 一度null: falseを中止します・・・
|sub_member|string|null: true|
### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages




 ## usersテーブル

 |Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :groups_users
- has_many :groups, through: groups_users
- has_many :messages
## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: true|
### Association
- belongs_to :user
- belongs_to :group
