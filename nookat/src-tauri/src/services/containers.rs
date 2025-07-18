use bollard::models::ContainerSummary;
use bollard::query_parameters::{ListContainersOptionsBuilder, RemoveContainerOptions};
use bollard::Docker;

#[derive(Default, Debug)]
pub struct ContainersService {}

impl ContainersService {
    pub async fn get_containers() -> Vec<ContainerSummary> {
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


    pub async fn remove_container(id: String) -> Result<(), String> {
        let docker = Docker::connect_with_local_defaults().unwrap();

        docker.remove_container(&id, Some(RemoveContainerOptions::default())).await.unwrap();

        Ok(())
    }
}
