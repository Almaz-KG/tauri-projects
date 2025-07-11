import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useState } from "react";
import { IContainer } from "./Containers";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { MoreDotIcon, TrashBinIcon, InfoIcon } from "../../icons";
import Checkbox from "../../components/form/input/Checkbox";


// Define the table data using the interface
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

export default function RunningContainers() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Running Containers
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
               >
                <Checkbox checked={false} onChange={() => {}} />
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Image
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Port(s)
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Started
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {runningContainers.map((container) => (
              <TableRow key={container.id} className="">
                <TableCell className="py-3">
                  <Checkbox checked={false} onChange={() => {}} />
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {container.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {container.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {container.params.image}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {container.params.port_mapping.map((port) => port.container_port).join(", ")}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {(() => {
                      const startedDate = new Date(container.started);
                      const now = new Date();
                      const diffMs = now.getTime() - startedDate.getTime();
                      const diffMins = Math.floor(diffMs / 60000).toLocaleString();
                      return `${diffMins} min${diffMins !== "1" ? "s" : ""} ago`;
                    })()}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {container.params.port_mapping.map((port) => port.container_port).join(", ")}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <button className="dropdown-toggle">
                    <InfoIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                  </button>
                  
                  <button className="dropdown-toggle">
                    <TrashBinIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                  </button>

                  <button className="dropdown-toggle" onClick={toggleDropdown}>
                    <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                  </button>
                
                  <Dropdown
                    isOpen={isOpen}
                    onClose={closeDropdown}
                    className="w-40 p-2"
                  >
                    <DropdownItem
                      onItemClick={closeDropdown}
                      className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      Logs
                    </DropdownItem>
                    <DropdownItem
                      onItemClick={closeDropdown}
                      className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      Terminal
                    </DropdownItem>
                    <DropdownItem
                      onItemClick={closeDropdown}
                      className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      Files
                    </DropdownItem>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
