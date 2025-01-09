// InternalSourcesSection.tsx
import React, { useState } from 'react';
import { Folder } from 'lucide-react';
import ActionButtons from '../../Common/ActionButtons';
import { DashboardItem } from '../../../types';

interface InternalSourcesSectionProps {
 sources: DashboardItem[];
 onAddToLibrary: (item: DashboardItem) => void; 
 onAddToTrash: (item: DashboardItem) => void;
 onItemClick: (item: DashboardItem) => void;
}

export const InternalSourcesSection: React.FC<InternalSourcesSectionProps> = ({
 sources,
 onAddToLibrary,
 onAddToTrash,
 onItemClick
}) => {
 const [interestingItems, setInterestingItems] = useState<Record<string, boolean>>({});

 const handleItemClick = (item: DashboardItem, event: React.MouseEvent) => {
   if (!(event.target as HTMLElement).closest('.action-buttons')) {
     onItemClick(item);
   }
 };

 return (
   <div className="bg-white rounded-lg shadow-lg p-4">
     <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
       <Folder className="w-5 h-5 mr-2" />
       Sources Internes
     </h2>
     <div className="space-y-3">
       {sources.map((source) => (
         <div 
           key={source.id} 
           className={`p-3 rounded-lg transition-all duration-200 cursor-pointer ${
             interestingItems[source.id] 
               ? 'bg-yellow-50 border-yellow-300 shadow-md' 
               : 'bg-blue-50 hover:bg-blue-100'
           }`}
           onClick={(e) => handleItemClick(source, e)}
           role="button"
           tabIndex={0}
         >
           <div className="flex justify-between items-start">
             <p className="font-medium text-blue-800">{source.displayData.title}</p>
             {source.displayData.relevanceScore && (
               <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                 {source.displayData.relevanceScore}%
               </span>
             )}
           </div>
           <p className="text-sm text-gray-600">{source.displayData.summary}</p>
           {source.displayData.date && (
             <p className="text-xs text-gray-500 mt-1">{source.displayData.date}</p>
           )}
           
           <div className="action-buttons mt-2" onClick={(e) => e.stopPropagation()}>
             <ActionButtons
               onValidate={() => onAddToLibrary(source)}
               onInteresting={() => {
                 setInterestingItems(prev => ({
                   ...prev,
                   [source.id]: !prev[source.id]
                 }));
               }}
               onDelete={() => onAddToTrash(source)}
             />
           </div>

           {/* Tags */}
           {source.displayData.tags && source.displayData.tags.length > 0 && (
             <div className="flex flex-wrap gap-2 mt-2">
               {source.displayData.tags.map((tag, index) => (
                 <span 
                   key={index}
                   className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                 >
                   #{tag}
                 </span>
               ))}
             </div>
           )}
         </div>
       ))}
     </div>
   </div>
 );
};

export default InternalSourcesSection;