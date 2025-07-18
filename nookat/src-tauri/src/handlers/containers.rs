use crate::entities::Container;
use crate::services::ContainersService;

#[tauri::command]
pub async fn list_containers() -> Vec<Container> {
    println!("Listing containers");

    let containers = ContainersService::get_containers().await;

    containers.into_iter().map(|c| c.into()).collect()
}
