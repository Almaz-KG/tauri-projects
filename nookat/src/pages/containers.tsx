import { Container, Play, RotateCcw, Search, Square, Trash2 } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";

export interface ContainerData {
    id: string;
    name: string;
    image: string;
    status: 'running' | 'stopped' | 'paused' | 'restarting';
    created: string;
    ports: string;
    size: string;
  }


// Container actions component
export const ContainerActions: React.FC<{ container: ContainerData }> = ({ container }) => {
  return (
    <div className="flex items-center gap-2">
      {container.status === 'running' ? (
        <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
          <Square size={16} />
        </button>
      ) : (
        <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
          <Play size={16} />
        </button>
      )}
      <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
        <RotateCcw size={16} />
      </button>
      <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
        <Trash2 size={16} />
      </button>
    </div>
  );
};


// Containers tab component
export const ContainersTab: React.FC = () => {
  const [containers, setContainers] = useState<ContainerData[]>([]);

  async function getContainers() {
    try {
      const result = await invoke<ContainerData[]>("list_containers");
      setContainers(result);
    } catch (error) {
      console.error("Error getting containers:", error);
    }
  }

  useEffect(() => {
    getContainers();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredContainers = containers?.filter(container =>
    container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    container.image.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredContainers.map(container => (
          <div key={container.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Container size={20} className="text-blue-400" />
                <div>
                  <h3 className="font-semibold text-white">{container.name}</h3>
                  <p className="text-sm text-gray-400">{container.image}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <StatusBadge status={container.status} />
                <div className="text-sm text-gray-400 text-right">
                  <p>Created: {container.created}</p>
                  <p>Ports: {container.ports}</p>
                </div>
                <div className="text-sm text-gray-400">
                  <p>Size: {container.size}</p>
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

