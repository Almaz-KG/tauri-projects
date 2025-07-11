// import RecentOrders from "../../components/ecommerce/RecentOrders";
import RunningContainers from "./RunningContainers";
import StoppedContainers from "./StoppedContainers";


export interface IContainerEnvVars {
  name: string;
  value: string;
}

export interface IContainerPortMapping {
  container_port: string;
  host_port: string;
  protocol: string;
}

export interface IContainerNetworks {
  network_id: string;
  network_name: string;
}

export interface IContainerParams {
  image: string;
  networks: IContainerNetworks[];
  env_vars: IContainerEnvVars[];
  port_mapping: IContainerPortMapping[];
}

export interface IContainer {
  id: string; 
  name: string; 
  params: IContainerParams;
  started: string; 
  status: "Running" | "Stopped"; 
}


export default function Containers() {
  return (
    <>
      <div className="col-span-12 xl:col-span-7">
        <RunningContainers />
      </div>

      <div className="col-span-12 xl:col-span-7 mt-4">
        <StoppedContainers />
      </div>
    </>
  );
}
