use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Network {
    pub id: String,
    pub name: String,
    pub driver: String,
    pub scope: String,
    pub created: String,
    pub containers: u32,
}

#[tauri::command]
pub fn list_networks() -> Vec<Network> {
    println!("Listing networks");
    return vec![
        Network {
            id: "1".to_string(),
            name: "bridge".to_string(),
            driver: "bridge".to_string(),
            scope: "local".to_string(),
            created: "1 week ago".to_string(),
            containers: 3,
        },
        Network {
            id: "2".to_string(),
            name: "host".to_string(),
            driver: "host".to_string(),
            scope: "local".to_string(),
            created: "1 week ago".to_string(),
            containers: 0,
        },
        Network {
            id: "3".to_string(),
            name: "none".to_string(),
            driver: "null".to_string(),
            scope: "local".to_string(),
            created: "1 week ago".to_string(),
            containers: 0,
        },
    ];
}
