import React from 'react';
import { X, ChevronRight } from 'lucide-react';

interface LibraryItem {
  id: string;
  title: string;
  type: 'jurisprudence' | 'source' | 'doctrine' | 'adage';
}

interface LibraryProps {
  isOpen: boolean;
  items: LibraryItem[];
  onClose: () => void;
  onRestore: (item: LibraryItem) => void;
  type: 'library' | 'trash';
}

export const Library: React.FC<LibraryProps> = ({
  isOpen,
  items,
  onClose,
  onRestore,
  type
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-4 transition-transform z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {type === 'library' ? 'Bibliothèque' : 'Corbeille'}
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">
          {type === 'library' 
            ? 'Aucun élément validé' 
            : 'Aucun élément dans la corbeille'}
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="p-3 border-b border-gray-200">
              <p className="font-medium text-gray-800">{item.title}</p>
              <button
                onClick={() => onRestore(item)}
                className="text-sm text-blue-600 hover:text-blue-800 mt-2 flex items-center"
              >
                <ChevronRight className="w-4 h-4 mr-1" />
                {type === 'library' ? 'Retirer' : 'Restaurer'}
              </button>
            </div>
          ))}
        </div>
      )}

      {type === 'library' && items.length > 0 && (
        <div className="mt-6">
          <button 
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Valider et passer à l'étape suivante
          </button>
        </div>
      )}
    </div>
  );
};

export default Library;