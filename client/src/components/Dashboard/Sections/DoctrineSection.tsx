// DoctrineSection.tsx
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import ActionButtons from '../../Common/ActionButtons';
import { DashboardItem } from '../../../types';

interface DoctrineSectionProps {
  doctrine: DashboardItem[];
  onAddToLibrary: (item: DashboardItem) => void;
  onAddToTrash: (item: DashboardItem) => void;
  onItemClick: (item: DashboardItem) => void;  // Nouveau handler
}

export const DoctrineSection: React.FC<DoctrineSectionProps> = ({
  doctrine,
  onAddToLibrary,
  onAddToTrash,
  onItemClick
}) => {
  const [interestingItems, setInterestingItems] = useState<Record<string, boolean>>({});

  const handleItemClick = (item: DashboardItem, event: React.MouseEvent) => {
    // Empêche le déclenchement du click lors de l'utilisation des boutons d'action
    if (!(event.target as HTMLElement).closest('.action-buttons')) {
      onItemClick(item);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2" />
        Doctrine
      </h2>
      <div className="space-y-3">
        {doctrine.map((doc) => (
          <div 
            key={doc.id} 
            className={`p-3 rounded-lg transition-all duration-200 cursor-pointer ${
              interestingItems[doc.id]
                ? 'bg-yellow-50 border-yellow-300 shadow-md'
                : 'bg-purple-50 hover:bg-purple-100'
            }`}
            onClick={(e) => handleItemClick(doc, e)}
            role="button"
            tabIndex={0}
          >
            <p className="font-medium text-purple-800">{doc.displayData.title}</p>
            <p className="text-sm text-gray-600">{doc.displayData.summary}</p>
            
            {doc.metadata?.link && (
              <a 
                href={doc.metadata.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 text-sm inline-flex items-center mt-2"
                onClick={(e) => e.stopPropagation()} // Évite de déclencher le modal
              >
                <FileText className="w-4 h-4 mr-1" />
                Source originale
              </a>
            )}

            <div className="action-buttons" onClick={(e) => e.stopPropagation()}>
              <ActionButtons
                onValidate={() => onAddToLibrary(doc)}
                onInteresting={() => {
                  setInterestingItems(prev => ({
                    ...prev,
                    [doc.id]: !prev[doc.id]
                  }));
                }}
                onDelete={() => onAddToTrash(doc)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctrineSection;