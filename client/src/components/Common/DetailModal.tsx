// DetailModal.tsx

import React, { useState } from 'react';
import { X, CheckCircle, Star, Trash2, Plus } from 'lucide-react';
import { DetailContent } from '../../types';

interface DetailModalProps {
  item: DetailContent;
  onClose: () => void;
  onValidate: (item: DetailContent) => void;
  onMarkInteresting: (item: DetailContent) => void;
  onDelete: (item: DetailContent) => void;
  onAddTag?: (item: DetailContent, tag: string) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({
  item,
  onClose,
  onValidate,
  onMarkInteresting,
  onDelete,
  onAddTag,
}) => {
  const [newTag, setNewTag] = useState<string>('');
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);

  const handleAddTag = () => {
    if (newTag.trim() && onAddTag) {
      onAddTag(item, newTag.trim());
      setNewTag('');
      setIsAddingTag(false);
    }
  };

  const renderSections = () => (
    <div className="space-y-4">
      {item.mainContent.sections.map((section, index: number) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">{section.title}</h3>
          {section.type === 'text' && (
            <div className="prose prose-sm max-w-none text-gray-600">{section.content as string}</div>
          )}
          {section.type === 'numbered' && (
            <div className="space-y-2">
              {(section.content as Array<{ key: string; value: string }>).map((item, idx) => (
                <div key={idx} className="flex">
                  <div className="font-medium text-gray-700 mr-2">{item.key}</div>
                  <div className="text-gray-600">{item.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderRelatedDocs = () => {
    if (!item.metadata?.relatedDocs?.length) return null;

    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Documents similaires</h3>
        <div className="space-y-3">
          {item.metadata.relatedDocs.map((doc, index: number) => (
            <div key={index} className="p-3 bg-white rounded shadow-sm">
              <div className="font-medium text-gray-800">{doc.title}</div>
              <p className="text-sm text-gray-600 mt-1">{doc.summary}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMetadataLink = () => {
    if (!item.metadata?.link) return null;

    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Lien associé</h3>
        <a
          href={item.metadata.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline break-words"
        >
          {item.metadata.link}
        </a>
      </div>
    );
  };

  const renderTags = () => (
    <div className="pt-4 border-t border-gray-200">
      <div className="flex flex-wrap gap-2">
        {item.actions.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
        {isAddingTag ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Nouveau tag"
              className="px-2 py-1 text-sm border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleAddTag}
              className="px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
            >
              Ajouter
            </button>
            <button
              onClick={() => {
                setIsAddingTag(false);
                setNewTag('');
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTag(true)}
            className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm border border-dashed border-gray-300 rounded-full hover:border-gray-400 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Ajouter un tag
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-800">{item.header.title}</h2>
                    {item.header.relevanceScore && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {item.header.relevanceScore}% pertinent
                      </span>
                    )}
                  </div>
                  {item.header.date && (
                    <p className="text-sm text-gray-500 mt-1">{item.header.date}</p>
                  )}
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Relevance Note */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Résumé</h3>
                <p className="text-gray-600">{item.mainContent.summary}</p>
              </div>

              {/* Main Sections */}
              {renderSections()}

              {/* Metadata Link */}
              {renderMetadataLink()}

              {/* Related Documents */}
              {renderRelatedDocs()}

              {/* Tags */}
              {renderTags()}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => onValidate(item)}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Valider
                </button>
                <button
                  onClick={() => onMarkInteresting(item)}
                  className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 flex items-center"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Intéressant
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailModal;