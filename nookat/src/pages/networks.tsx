import { Network, Plus, Trash2 } from "lucide-react";

interface NetworkData {
    id: string;
    name: string;
    driver: string;
    scope: string;
    created: string;
    containers: number;
  }
  
  
  const mockNetworks: NetworkData[] = [
    {
      id: '1',
      name: 'bridge',
      driver: 'bridge',
      scope: 'local',
      created: '1 week ago',
      containers: 3
    },
    {
      id: '2',
      name: 'host',
      driver: 'host',
      scope: 'local',
      created: '1 week ago',
      containers: 0
    },
    {
      id: '3',
      name: 'none',
      driver: 'null',
      scope: 'local',
      created: '1 week ago',
      containers: 0
    }
  ];


// Networks tab component
export const NetworksTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Networks</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          Create
        </button>
      </div>

      <div className="grid gap-4">
        {mockNetworks.map(network => (
          <div key={network.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Network size={20} className="text-purple-400" />
                <div>
                  <h3 className="font-semibold text-white">{network.name}</h3>
                  <p className="text-sm text-gray-400">Driver: {network.driver}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-sm text-gray-400">
                  <p>Scope: {network.scope}</p>
                </div>
                <div className="text-sm text-gray-400">
                  <p>Containers: {network.containers}</p>
                </div>
                <div className="text-sm text-gray-400 text-right">
                  <p>Created: {network.created}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
