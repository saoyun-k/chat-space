# Chat-space DB設計
## usesテーブル

|Coloumn|Type|Options|
|------|----|-------|
|email|string|null: false, unique: ture|
|password|string|null: false|
|name|string|null: false, add_index: ture|
### Association
- has_many :groups_users
- has_many :groups,through: groups_users
- has_many :massages

## massagesテーブル

|Coloumn|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル

|Coloumn|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
### Association
- has_many :groups_users
- has_many :users,through: groups_users
- has_many :messages

## groups_usersテーブル

|Coloumn|Type|Options|
|------|----|-------|
|user_id|integer|null: false,foreign_key: true|
|group_id|integer|null: false,foreign_key: true|
### Association
- belong_to :user
- belong_to :group