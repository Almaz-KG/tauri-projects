import ContainersTable from "./tables/ContainersTable";


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


const stoppedContainers: IContainer[] = [
  {
    id: "f4b8e7c2a1d943b6b8e2c7d1e5a4f3c2",
    name: "quirky_babbage",
    params: {
      image: "ubuntu:latest",
      networks: [],
      env_vars: [],
      port_mapping: [],
    },
    started: "2021-01-01 12:00:00",
    status: "Stopped",
  },
];

const runningContainers: IContainer[] = [
  {
    id: "e4da3b7fbbce2345d7772b0674a318d5",
    name: "hopeful_morse",
    params: {
      image: "ubuntu:latest",
      networks: [],
      env_vars: [],
      port_mapping: [],
    },
    started: "2021-01-01 12:00:00",
    status: "Running",
  },
  {
    id: "27c24cb0ed52f8adf60e4b7a9aea3a6b",
    name: "nostalgic_turing",
    params: {
      image: "jupyter/scipy-notebook:latest",
      networks: [],
      env_vars: [],
      port_mapping: [],
    },
    started: "2021-01-01 12:00:00",
    status: "Running",
  },
  {
    id: "363b122c528f54df4a941ee70ad5d334",
    name: "vibrant_banach",
    params: {
      image: "postgres:15.1",
      networks: [],
      env_vars: [],
      port_mapping: [],
    },
    started: "2021-01-01 12:00:00",
    status: "Running",
  },
];


export default function Containers() {
  return (
    <>
      <div className="col-span-12 xl:col-span-7 mt-4">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
          <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Running
            </h3>
          </div>
          <div className="max-w-full overflow-x-auto">
            <ContainersTable containers={runningContainers} />
          </div>
        </div>
      </div>

      <div className="col-span-12 xl:col-span-7 mt-4">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
          <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Stopped
            </h3>
          </div>
          <div className="max-w-full overflow-x-auto">
            <ContainersTable containers={stoppedContainers} />
          </div>
        </div>
      </div>
    </>
  );
}
