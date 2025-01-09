// JurisprudenceSection.tsx
import React, { useState } from 'react';
import { Book, Star, CheckCircle, Trash2, Plus, ChevronRight } from 'lucide-react';
import { DashboardItem, RelatedDocument } from '../../../types';

interface JurisprudenceSectionProps {
 jurisprudences: DashboardItem[];
 onAddToLibrary: (item: DashboardItem) => void;
 onAddToTrash: (item: DashboardItem) => void;
 onItemClick: (item: DashboardItem) => void;
}

export const JurisprudenceSection: React.FC<JurisprudenceSectionProps> = ({
 jurisprudences,
 onAddToLibrary,
 onAddToTrash,
 onItemClick
}) => {
 const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
 const [interestingItems, setInterestingItems] = useState<Record<string, boolean>>({});

 const handleItemClick = (item: DashboardItem, event: React.MouseEvent) => {
   if (!(event.target as HTMLElement).closest('.action-buttons, .related-cases-button, .related-case')) {
     onItemClick(item);
   }
 };

 const toggleExpanded = (id: string, event: React.MouseEvent) => {
   event.stopPropagation();
   setExpandedItems(prev => ({
     ...prev,
     [id]: !prev[id]
   }));
 };

 const handleRelatedClick = (related: RelatedDocument, event: React.MouseEvent) => {
  event.stopPropagation();
  if (related.link) {
    window.open(related.link, '_blank');
  }
};

 return (
   <div className="bg-white rounded-lg shadow-lg p-4">
     <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
       <Book className="w-5 h-5 mr-2" />
       Jurisprudences Pertinentes
     </h2>
     <div className="space-y-4">
       {jurisprudences.map((juris) => (
         <div 
           key={juris.id}
           className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
             juris.displayData.isPrimary ? 'border-green-200 bg-green-50' : 'border-blue-200'
           } ${interestingItems[juris.id] ? 'border-yellow-300 bg-yellow-50' : ''}`}
           onClick={(e) => handleItemClick(juris, e)}
           role="button"
           tabIndex={0}
         >
           {/* En-tête */}
           <div className="flex justify-between items-start">
             <h3 className="font-semibold text-green-800">{juris.displayData.title}</h3>
             <div className="flex items-center gap-2">
               {juris.displayData.relevanceScore && (
                 <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                   {juris.displayData.relevanceScore}%
                 </span>
               )}
               {juris.displayData.isPrimary && (
                 <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                   Pertinent
                 </span>
               )}
             </div>
           </div>

           {/* Contenu */}
           <p className="text-gray-600 mt-2">{juris.displayData.summary}</p>

           {/* Actions */}
           <div className="action-buttons flex mt-3 space-x-3" onClick={(e) => e.stopPropagation()}>
             <button 
               onClick={() => onAddToLibrary(juris)}
               className="text-green-700 hover:text-green-800 text-sm flex items-center"
             >
               <CheckCircle className="w-4 h-4 mr-1" /> Valider
             </button>
             <button 
               onClick={() => {
                 setInterestingItems(prev => ({
                   ...prev,
                   [juris.id]: !prev[juris.id]
                 }));
               }}
               className="text-yellow-500 hover:text-yellow-600 text-sm flex items-center"
             >
               <Star className="w-4 h-4 mr-1" /> Intéressant
             </button>
             <button 
               onClick={() => onAddToTrash(juris)}
               className="text-red-500 hover:text-red-600 text-sm flex items-center"
             >
               <Trash2 className="w-4 h-4 mr-1" /> Supprimer
             </button>
           </div>

           {/* Jurisprudences similaires */}
           {juris.metadata?.relatedDocs && juris.metadata.relatedDocs.length > 0 && (
  <>
    <button 
      onClick={(e) => toggleExpanded(juris.id, e)}
      className="related-cases-button mt-3 text-green-700 hover:text-green-800 text-sm flex items-center"
    >
      <Plus className="w-4 h-4 mr-1" />
      Voir jurisprudences similaires
    </button>
    {expandedItems[juris.id] && (
      <div className="mt-3 pl-4 border-l-2 border-green-300">
        <div className="text-sm space-y-3">
          {juris.metadata.relatedDocs.map((related) => (
            <div 
              key={related.id} 
              className="related-case p-2 bg-green-100 rounded hover:bg-green-200 transition-colors"
              onClick={(e) => handleRelatedClick(related, e)}
            >
              <p className="font-medium">{related.title}</p>
              <p className="text-gray-600">{related.summary}</p>
              {related.link && (
                <button className="mt-2 text-green-700 hover:text-green-800 text-sm flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Voir source
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </>
)}

           {/* Tags */}
           {juris.displayData.tags && juris.displayData.tags.length > 0 && (
             <div className="flex flex-wrap gap-2 mt-3">
               {juris.displayData.tags.map((tag, index) => (
                 <span 
                   key={index}
                   className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
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

export default JurisprudenceSection;