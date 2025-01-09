// AdagesSection.tsx
import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import ActionButtons from '../../Common/ActionButtons';
import { DashboardItem } from '../../../types';

interface AdagesSectionProps {
  adages: DashboardItem[];
  onAddToLibrary: (item: DashboardItem) => void;
  onAddToTrash: (item: DashboardItem) => void;
  onItemClick: (item: DashboardItem) => void;  // Nouveau handler
}

export const AdagesSection: React.FC<AdagesSectionProps> = ({
  adages,
  onAddToLibrary,
  onAddToTrash,
  onItemClick
}) => {
  const [interestingItems, setInterestingItems] = useState<Record<string, boolean>>({});

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Bookmark className="w-5 h-5 mr-2" />
        Adages Pertinents
      </h2>
      <div className="space-y-3">
        {adages.map((adage) => (
          <div 
            key={adage.id} 
            className={`p-3 rounded-lg transition-all duration-200 ${
              interestingItems[adage.id]
                ? 'bg-yellow-50 border-yellow-300 shadow-md'
                : 'bg-yellow-50 hover:bg-yellow-100'
            }`}
            onClick={() => onItemClick(adage)}  // Ajout du click handler
            role="button"
            tabIndex={0}
          >
            <div>
              <p className="italic text-yellow-800 font-medium">
                {adage.displayData.title}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {adage.displayData.summary}
              </p>
            </div>

            <ActionButtons
              onValidate={() => onAddToLibrary(adage)}
              onInteresting={() => {
                setInterestingItems(prev => ({
                  ...prev,
                  [adage.id]: !prev[adage.id]
                }));
              }}
              onDelete={() => onAddToTrash(adage)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdagesSection;