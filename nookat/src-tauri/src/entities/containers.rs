use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum ContainerStatus {
    Running,
    Stopped,
    Paused,
    Restarting,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Container {
    pub id: String,
    pub name: String,
    pub image: String,
    pub status: ContainerStatus,
    pub created: String,
    pub ports: String,
    pub size: String,
}

#[tauri::command]
pub fn list_containers() -> Vec<Container> {
    println!("Listing containers");
    return vec![
        Container {
            id: "1".to_string(),
            name: "nginx-web-from-rust".to_string(),
            image: "nginx:latest".to_string(),
            status: ContainerStatus::Running,
            created: "2 hours ago".to_string(),
            ports: "80:8080".to_string(),
            size: "142MB".to_string(),
        },
        Container {
            id: "2".to_string(),
            name: "postgres-db-from-rust".to_string(),
            image: "postgres:14".to_string(),
            status: ContainerStatus::Running,
            created: "1 day ago".to_string(),
            ports: "5432:5432".to_string(),
            size: "374MB".to_string(),
        },
        Container {
            id: "3".to_string(),
            name: "redis-cache-from-rust".to_string(),
            image: "redis:alpine".to_string(),
            status: ContainerStatus::Stopped,
            created: "3 days ago".to_string(),
            ports: "6379:6379".to_string(),
            size: "32MB".to_string(),
        },
    ];
}
