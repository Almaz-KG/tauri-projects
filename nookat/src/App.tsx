import React, { useState } from 'react';
import { Container, Image, Network, HardDrive, Settings, Search, Play, Square, RotateCcw, Trash2, Plus, Download, Upload, Monitor, Cpu, MemoryStick, Activity } from 'lucide-react';

// Mock data types
interface ContainerData {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'paused' | 'restarting';
  created: string;
  ports: string;
  size: string;
}

interface ImageData {
  id: string;
  repository: string;
  tag: string;
  imageId: string;
  created: string;
  size: string;
  inUse: boolean;
}

interface NetworkData {
  id: string;
  name: string;
  driver: string;
  scope: string;
  created: string;
  containers: number;
}

interface VolumeData {
  id: string;
  name: string;
  driver: string;
  mountpoint: string;
  created: string;
  size: string;
}

// Mock data
const mockContainers: ContainerData[] = [
  {
    id: '1',
    name: 'nginx-web',
    image: 'nginx:latest',
    status: 'running',
    created: '2 hours ago',
    ports: '80:8080',
    size: '142MB'
  },
  {
    id: '2',
    name: 'postgres-db',
    image: 'postgres:14',
    status: 'running',
    created: '1 day ago',
    ports: '5432:5432',
    size: '374MB'
  },
  {
    id: '3',
    name: 'redis-cache',
    image: 'redis:alpine',
    status: 'stopped',
    created: '3 days ago',
    ports: '6379:6379',
    size: '32MB'
  }
];

const mockImages: ImageData[] = [
  {
    id: '1',
    repository: 'nginx',
    tag: 'latest',
    imageId: 'sha256:abcd1234',
    created: '2 weeks ago',
    size: '142MB',
    inUse: true
  },
  {
    id: '2',
    repository: 'postgres',
    tag: '14',
    imageId: 'sha256:efgh5678',
    created: '1 month ago',
    size: '374MB',
    inUse: true
  },
  {
    id: '3',
    repository: 'redis',
    tag: 'alpine',
    imageId: 'sha256:ijkl9012',
    created: '2 months ago',
    size: '32MB',
    inUse: false
  }
];

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

// Component for status badge
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500';
      case 'stopped':
        return 'bg-red-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'restarting':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}></div>
      <span className="text-sm font-medium capitalize">{status}</span>
    </div>
  );
};

// Container actions component
const ContainerActions: React.FC<{ container: ContainerData }> = ({ container }) => {
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
const ContainersTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredContainers = mockContainers.filter(container =>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            Create
          </button>
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

// Images tab component
const ImagesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredImages = mockImages.filter(image =>
    image.repository.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Images</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download size={16} />
            Pull
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Upload size={16} />
            Build
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredImages.map(image => (
          <div key={image.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image size={20} className="text-green-400" />
                <div>
                  <h3 className="font-semibold text-white">{image.repository}:{image.tag}</h3>
                  <p className="text-sm text-gray-400 font-mono">{image.imageId}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${image.inUse ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span className="text-sm font-medium">{image.inUse ? 'In Use' : 'Unused'}</span>
                </div>
                <div className="text-sm text-gray-400 text-right">
                  <p>Created: {image.created}</p>
                  <p>Size: {image.size}</p>
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

// Networks tab component
const NetworksTab: React.FC = () => {
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

// Volumes tab component
const VolumesTab: React.FC = () => {
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

// System info component
const SystemTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">System</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="text-blue-400" size={24} />
            <h3 className="font-semibold text-white">System Info</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-400">Docker Version: <span className="text-white">24.0.7</span></p>
            <p className="text-gray-400">API Version: <span className="text-white">1.43</span></p>
            <p className="text-gray-400">Go Version: <span className="text-white">go1.20.10</span></p>
            <p className="text-gray-400">OS/Arch: <span className="text-white">linux/amd64</span></p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="text-green-400" size={24} />
            <h3 className="font-semibold text-white">CPU Usage</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Current</span>
              <span className="text-white">23.5%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '23.5%' }}></div>
            </div>
            <p className="text-xs text-gray-400">8 cores available</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <MemoryStick className="text-purple-400" size={24} />
            <h3 className="font-semibold text-white">Memory</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Used</span>
              <span className="text-white">4.2GB / 16GB</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-400 h-2 rounded-full" style={{ width: '26.25%' }}></div>
            </div>
            <p className="text-xs text-gray-400">26.25% used</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-yellow-400" size={24} />
            <h3 className="font-semibold text-white">Containers</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-400">Running: <span className="text-green-400">2</span></p>
            <p className="text-gray-400">Stopped: <span className="text-red-400">1</span></p>
            <p className="text-gray-400">Total: <span className="text-white">3</span></p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Image className="text-blue-400" size={24} />
            <h3 className="font-semibold text-white">Images</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-400">Total: <span className="text-white">3</span></p>
            <p className="text-gray-400">Size: <span className="text-white">548MB</span></p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <HardDrive className="text-green-400" size={24} />
            <h3 className="font-semibold text-white">Storage</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-400">Volumes: <span className="text-white">2</span></p>
            <p className="text-gray-400">Size: <span className="text-white">257MB</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('containers');

  const tabs = [
    { id: 'containers', label: 'Containers', icon: Container },
    { id: 'images', label: 'Images', icon: Image },
    { id: 'networks', label: 'Networks', icon: Network },
    { id: 'volumes', label: 'Volumes', icon: HardDrive },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'containers':
        return <ContainersTab />;
      case 'images':
        return <ImagesTab />;
      case 'networks':
        return <NetworksTab />;
      case 'volumes':
        return <VolumesTab />;
      case 'system':
        return <SystemTab />;
      default:
        return <ContainersTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Container className="text-blue-400" size={24} />
            <h1 className="text-xl font-bold">Nookat</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

export default App;