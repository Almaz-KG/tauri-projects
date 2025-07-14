import { HardDrive, Plus, Trash2 } from "lucide-react";


interface VolumeData {
    id: string;
    name: string;
    driver: string;
    mountpoint: string;
    created: string;
    size: string;
  }


  
  const mockVolumes: VolumeData[] = [
    {
      id: '1',
      name: 'postgres_data',
      driver: 'local',
      mountpoint: '/var/lib/docker/volumes/postgres_data/_data',
      created: '1 day ago',
      size: '245MB'
    },
    {
      id: '2',
      name: 'nginx_config',
      driver: 'local',
      mountpoint: '/var/lib/docker/volumes/nginx_config/_data',
      created: '2 hours ago',
      size: '12KB'
    }
  ];


// Volumes tab component
export const VolumesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Volumes</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          Create
        </button>
      </div>

      <div className="grid gap-4">
        {mockVolumes.map(volume => (
          <div key={volume.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <HardDrive size={20} className="text-yellow-400" />
                <div>
                  <h3 className="font-semibold text-white">{volume.name}</h3>
                  <p className="text-sm text-gray-400 font-mono">{volume.mountpoint}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-sm text-gray-400">
                  <p>Driver: {volume.driver}</p>
                </div>
                <div className="text-sm text-gray-400">
                  <p>Size: {volume.size}</p>
                </div>
                <div className="text-sm text-gray-400 text-right">
                  <p>Created: {volume.created}</p>
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

