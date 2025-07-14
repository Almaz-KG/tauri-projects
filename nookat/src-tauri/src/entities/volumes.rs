use bollard::models::Volume;
use bollard::query_parameters::ListVolumesOptionsBuilder;

use bollard::Docker;

async fn get_volumes() -> Vec<Volume> {
    let docker = Docker::connect_with_local_defaults().unwrap();

    return docker
        .list_volumes(Some(ListVolumesOptionsBuilder::new().build()))
        .await
        .expect("Failed to list volumes")
        .volumes
        .unwrap_or_default();
}

#[tauri::command]
pub async fn list_volumes() -> Vec<Volume> {
    println!("Listing volumes");

    let volumes = get_volumes().await;
    return volumes;
}
