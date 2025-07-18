mod entities;
mod handlers;
mod services;

use crate::entities::list_images;
use crate::entities::list_networks;
use crate::entities::list_volumes;
use crate::handlers::list_containers;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            list_containers,
            list_images,
            list_networks,
            list_volumes
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
