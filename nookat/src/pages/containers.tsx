import { Container, Play, RotateCcw, Search, Square, Trash2, Terminal, FileSearch, Folder } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";

export interface ContainerData {
  id: string;
  Names: string[];
  Image: string;
  State: 'running' | 'stopped' | 'paused' | 'restarting';
  Created: number;
  Ports: string[];
  size: string;
}


export const ContainerActions: React.FC<{ container: ContainerData }> = ({ container }) => {
  return (
    <div className="flex items-center gap-2">
      {container.State?.toLowerCase() === 'running' ? (
        <button
          className="p-1 text-gray-400 hover:text-blue-400 transition-colors relative group"
          type="button"
          aria-label="Stop container"
        >
          <span className="absolute left-1/2 -translate-x-1/2 -top-8 z-10 whitespace-nowrap bg-gray-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            Stop container
          </span>
          <Square size={16} />
        </button>
      ) : (
        <button
          className="p-1 text-gray-400 hover:text-blue-400 transition-colors relative group"
          type="button"
          aria-label="Start container"
        >
          <span className="absolute left-1/2 -translate-x-1/2 -top-8 z-10 whitespace-nowrap bg-gray-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            Start container
          </span>
          <Play size={16} />
        </button>
      )}
      <button
        className="p-1 text-gray-400 hover:text-blue-400 transition-colors relative group"
        type="button"
        aria-label="Restart container"
      >
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 z-10 whitespace-nowrap bg-gray-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          Restart container
        </span>
        <RotateCcw size={16} />
      </button>

      <button
        className="p-1 text-gray-400 hover:text-blue-400 transition-colors relative group"
        type="button"
        aria-label="Open terminal in container"
      >
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 z-10 whitespace-nowrap bg-gray-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          Open terminal
        </span>
        <Terminal size={16} />
      </button>

      <button
        className="p-1 text-gray-400 hover:text-blue-400 transition-colors relative group"
        type="button"
        aria-label="Search logs"
      >
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 z-10 whitespace-nowrap bg-gray-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          Search logs
        </span>
        <FileSearch size={16} />
      </button>


      <button
        type="button"
        className="p-1 text-gray-400 hover:text-blue-400 transition-colors relative group"
        aria-label="View files"
      >
        <Folder size={16} />
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 z-10 whitespace-nowrap bg-gray-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          View files
        </span>
      </button>


      <button
        type="button"
        className="p-1 text-gray-400 hover:text-red-400 transition-colors relative group"
        aria-label="Remove container"
      >
        <Trash2 size={16} />
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 z-10 whitespace-nowrap bg-gray-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          Remove container
        </span>
      </button>
    </div>
  );
};

function formatContainerName(container: ContainerData) {
  if (container.Names.length > 0) {
    let first_name = container.Names[0];
    if (first_name.startsWith("/")) {
      first_name = first_name.slice(1);
    }
    return first_name;
  }
  return "";
}

function formatContainerImage(image: string) {
  if (image.includes("@")) {
    return image.split("@")[0];
  }
  return image;
}

function formatContainerPortMapping(ports: string[]) {
  if (ports && ports.length > 0) {
    const mappings = ports.map(port => {
      const privatePort = port.PrivatePort;
      const publicPort = port.PublicPort;
      if (privatePort !== publicPort && publicPort) {
        return `${privatePort}:${publicPort}`;
      }
      return privatePort;
    });
    const uniqueMappings = Array.from(new Set(mappings));
    return uniqueMappings.join(", ");
  }
  return "No port mapping";
}

function formatContainerCreatedDaysAgo(created: number) {
  const date = new Date(created * 1000);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} days ago`;
}


function formatContainerCreated(created: number) {
  const date = new Date(created * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Containers tab component
export const ContainersTab: React.FC = () => {
  const [containers, setContainers] = useState<ContainerData[]>([]);

  async function getContainers() {
    try {
      const result = await invoke<ContainerData[]>("list_containers");
      setContainers(result);
      console.log(result);
    } catch (error) {
      console.error("Error getting containers:", error);
    }
  }

  useEffect(() => {
    getContainers();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  // const filteredContainers = containers?.filter(container =>
  //   container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   container.image.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredContainers = containers;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Containers</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search containers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredContainers.sort((a, b) => b.State.localeCompare(a.State)).map(container => (
          <div key={container.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 truncate">
                <Container size={20} className={`text-${container.State === 'running' ? 'green' : 'red'}-400`} />
                <div className="truncate max-w-lg">
                  <h3 className="font-semibold text-white truncate max-w-xxxl select-text">{formatContainerName(container)}</h3>
                  <p className="text-sm text-gray-400 truncate max-w-xxxl select-text">{formatContainerImage(container.Image)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={container.State ?? 'unknown'} />
                <div className="text-sm text-gray-400 text-right truncate max-w-xs">
                  <p className="truncate max-w-xs">Created:
                    <span className="hidden lg:inline relative group cursor-pointer">
                      {formatContainerCreatedDaysAgo(container.Created)}
                      <span className="absolute left-1/2 -translate-x-1/2 -top-8 z-10 whitespace-nowrap bg-gray-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                        {formatContainerCreated(container.Created)}
                      </span>
                    </span>
                  </p>
                  <p className="hidden lg:block">Ports: {formatContainerPortMapping(container.Ports)}</p>
                </div>
                <ContainerActions container={container} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

