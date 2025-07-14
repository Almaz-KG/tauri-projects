use bollard::models::Network;
use bollard::query_parameters::ListNetworksOptionsBuilder;

use bollard::Docker;

async fn get_networks() -> Vec<Network> {
    let docker = Docker::connect_with_local_defaults().unwrap();

    let networks: Vec<bollard::secret::Network> = docker
        .list_networks(Some(ListNetworksOptionsBuilder::new().build()))
        .await
        .unwrap();
    return networks;
}

#[tauri::command]
pub async fn list_networks() -> Vec<Network> {
    println!("Listing networks");

    let networks = get_networks().await;
    return networks;
}
