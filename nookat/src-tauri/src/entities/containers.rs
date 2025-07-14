use bollard::query_parameters::ListContainersOptionsBuilder;
use bollard::Docker;
use bollard::models::{ContainerSummary, ContainerState, Mount, NetworkSettings, Port, HostConfig};
use serde::{Deserialize, Serialize};


async fn get_containers() -> Vec<ContainerSummary> {
    let docker = Docker::connect_with_local_defaults().unwrap();

    let params = ListContainersOptionsBuilder::new()
        .all(true)
        .size(true)
        .build();

    let containers = &docker
        .list_containers(Some(params))
        .await
        .expect("Failed to list containers");

    containers.iter().map(|c| c.clone()).collect()
}

#[tauri::command]
pub async fn list_containers() -> Vec<ContainerSummary> {
    println!("Listing containers");
    
    get_containers().await
}
