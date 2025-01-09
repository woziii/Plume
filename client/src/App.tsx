import { useState } from 'react';
import { Book, Trash2 } from 'lucide-react';
import Dashboard from './components/Dashboard/Dashboard';
import Library from './components/Library/Library';
import Chat from './components/Chat/Chat';
import { initialState } from './data/initialState';
import { DashboardItem, DashboardData } from './types';

// Fonction de transformation pour convertir DashboardItem en LibraryItem
const transformToDashboardItem = (item: DashboardItem) => ({
  id: item.id,
  title: item.displayData.title,
  type: item.type
});

function App() {
  const [data, setData] = useState<DashboardData>(initialState);
  const [library, setLibrary] = useState<DashboardItem[]>([]);
  const [trash, setTrash] = useState<DashboardItem[]>([]);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const addToLibrary = (item: DashboardItem) => {
    setLibrary(prev => [...prev, { ...item, timestamp: Date.now() }]);
    removeFromSource(item);
  };

  const addToTrash = (item: DashboardItem) => {
    setTrash(prev => [...prev, { ...item, timestamp: Date.now() }]);
    removeFromSource(item);
  };

  const removeFromSource = (item: DashboardItem) => {
    const sourceKey = getSourceKey(item);
    setData(prev => ({
      ...prev,
      [sourceKey]: Array.isArray(prev[sourceKey]) 
        ? prev[sourceKey].filter((i: DashboardItem) => i.id !== item.id)
        : prev[sourceKey]
    }));
  };

  const getSourceKey = (item: DashboardItem): keyof DashboardData => {
    if (item.id.startsWith('juris')) return 'jurisprudences';
    if (item.id.startsWith('src')) return 'internalSources';
    if (item.id.startsWith('doc')) return 'doctrine';
    return 'adages';
  };

  const restoreFromLibrary = (item: DashboardItem) => {
    const sourceKey = getSourceKey(item);
    setData(prev => ({
      ...prev,
      [sourceKey]: Array.isArray(prev[sourceKey]) 
        ? [...prev[sourceKey], item]
        : prev[sourceKey]
    }));
    setLibrary(prev => prev.filter(i => i.id !== item.id));
  };

  const restoreFromTrash = (item: DashboardItem) => {
    const sourceKey = getSourceKey(item);
    setData(prev => ({
      ...prev,
      [sourceKey]: Array.isArray(prev[sourceKey]) 
        ? [...prev[sourceKey], item]
        : prev[sourceKey]
    }));
    setTrash(prev => prev.filter(i => i.id !== item.id));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Dashboard 
        data={data}
        onAddToLibrary={addToLibrary}
        onAddToTrash={addToTrash}
      />

      {/* Boutons fixes */}
      <div className="fixed top-5 right-5 space-y-2">
        <button 
          onClick={() => setShowLibrary(!showLibrary)}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 relative"
        >
          <Book className="w-6 h-6" />
          {library.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {library.length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setShowTrash(!showTrash)}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 relative"
        >
          <Trash2 className="w-6 h-6" />
          {trash.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {trash.length}
            </span>
          )}
        </button>
      </div>

      {/* Bouton Chat */}
      <button 
        onClick={() => setShowChat(!showChat)} 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-3xl text-gray-700 hover:text-gray-900"
      >
        ...
      </button>

      {/* Composants modaux */}
      <Library 
        isOpen={showLibrary}
        items={library.map(transformToDashboardItem)}
        onClose={() => setShowLibrary(false)}
        onRestore={(libItem) => {
          const originalItem = library.find(item => item.id === libItem.id);
          if (originalItem) restoreFromLibrary(originalItem);
        }}
        type="library"
      />

      <Library 
        isOpen={showTrash}
        items={trash.map(transformToDashboardItem)}
        onClose={() => setShowTrash(false)}
        onRestore={(libItem) => {
          const originalItem = trash.find(item => item.id === libItem.id);
          if (originalItem) restoreFromTrash(originalItem);
        }}
        type="trash"
      />

      <Chat 
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />
    </div>
  );
}

export default App;