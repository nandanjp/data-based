use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct User {
    pub user_email: String,
    pub user_name: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct Follows {
    pub follower_email: String,
    pub following_email: String,
}

#[derive(Debug, Deserialize)]
pub struct GroupMember {
    pub member_email: String,
    pub group_id: i32,
}

#[derive(Debug, Deserialize)]
pub struct Group {
    pub group_id: i32,
    pub name: String,
    pub user_email: String,
}

#[derive(Debug, Deserialize)]
pub struct Likes {
    pub liker_email: String,
    pub liking_email: String,
    pub list_name: String,
}