use bollard::models::ContainerSummary;
use bollard::query_parameters::ListContainersOptionsBuilder;
use bollard::Docker;

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
