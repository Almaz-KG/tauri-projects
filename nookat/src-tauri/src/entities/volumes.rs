use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Volume {
    pub id: String,
    pub name: String,
    pub driver: String,
    pub mountpoint: String,
    pub created: String,
    pub size: String,
}

#[tauri::command]
pub fn list_volumes() -> Vec<Volume> {
    println!("Listing volumes");
    return vec![
        Volume {
            id: "1".to_string(),
            name: "postgres_data-from-rust".to_string(),
            driver: "local".to_string(),
            mountpoint: "/var/lib/docker/volumes/postgres_data/_data".to_string(),
            created: "1 day ago".to_string(),
            size: "245MB".to_string(),
        },
        Volume {
            id: "2".to_string(),
            name: "nginx_config-from-rust".to_string(),
            driver: "local".to_string(),
            mountpoint: "/var/lib/docker/volumes/nginx_config/_data".to_string(),
            created: "2 hours ago".to_string(),
            size: "12KB".to_string(),
        },
    ];
}
