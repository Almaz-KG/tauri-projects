use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Image {
    pub id: String,
    pub repository: String,
    pub tag: String,
    pub image_id: String,
    pub created: String,
    pub size: String,
    pub in_use: bool,
}

#[tauri::command]
pub fn list_images() -> Vec<Image> {
    println!("Listing images");
    return vec![
        Image {
            id: "1".to_string(),
            repository: "nginx-from-rust".to_string(),
            tag: "latest".to_string(),
            image_id: "sha256:abcd1234".to_string(),
            created: "2 weeks ago".to_string(),
            size: "142MB".to_string(),
            in_use: true,
        },
        Image {
            id: "2".to_string(),
            repository: "postgres-from-rust".to_string(),
            tag: "14".to_string(),
            image_id: "sha256:efgh5678".to_string(),
            created: "1 month ago".to_string(),
            size: "374MB".to_string(),
            in_use: true,
        },
        Image {
            id: "3".to_string(),
            repository: "redis-from-rust".to_string(),
            tag: "alpine".to_string(),
            image_id: "sha256:ijkl9012".to_string(),
            created: "2 months ago".to_string(),
            size: "32MB".to_string(),
            in_use: false,
        },
    ];
}
