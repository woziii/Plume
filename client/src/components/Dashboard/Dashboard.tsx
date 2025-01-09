import React, { useState } from 'react';
import { HeaderSection } from './Sections/HeaderSection';
import { InternalSourcesSection } from './Sections/InternalSourcesSection';
import { JurisprudenceSection } from './Sections/JurisprudenceSection';
import { DoctrineSection } from './Sections/DoctrineSection';
import { AdagesSection } from './Sections/AdagesSection';
import DetailModal from '../Common/DetailModal';
import { DashboardItem, DetailContent } from '../../types';

interface DashboardProps {
  data: {
    header: {
      factsummary: string;
      legalquestion: string;
    };
    internalSources: DashboardItem[];
    jurisprudences: DashboardItem[];
    doctrine: DashboardItem[];
    adages: DashboardItem[];
  };
  onAddToLibrary: (item: DashboardItem) => void;
  onAddToTrash: (item: DashboardItem) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  data,
  onAddToLibrary,
  onAddToTrash,
}) => {
  // États
  const [selectedItem, setSelectedItem] = useState<DashboardItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers
  const handleItemClick = (item: DashboardItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const handleValidate = () => {
    if (selectedItem) {
      onAddToLibrary(selectedItem);
      handleCloseModal();
    }
  };

  const handleMarkInteresting = () => {
    // Fonctionnalité supplémentaire à implémenter si nécessaire
    handleCloseModal();
  };

  const handleDelete = () => {
    if (selectedItem) {
      onAddToTrash(selectedItem);
      handleCloseModal();
    }
  };

  // Le paramètre item est requis par l'interface mais n'est pas utilisé car nous utilisons selectedItem du state
const handleAddTag = (_item: DetailContent, tag: string) => {
  if (selectedItem && tag.trim()) {
    const updatedTags = [...(selectedItem.detailContent.actions.tags || []), tag];
    selectedItem.detailContent.actions.tags = updatedTags;
    console.log(`Tag ajouté : ${tag} à l'élément : ${selectedItem.id}`);
  }
};

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <HeaderSection
        factsummary={data.header.factsummary}
        legalquestion={data.header.legalquestion}
      />

      {/* Grid principale */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sources Internes */}
        <div className="col-span-3">
          <InternalSourcesSection
            sources={data.internalSources}
            onAddToLibrary={onAddToLibrary}
            onAddToTrash={onAddToTrash}
            onItemClick={handleItemClick}
          />
        </div>

        {/* Jurisprudences */}
        <div className="col-span-6">
          <JurisprudenceSection
            jurisprudences={data.jurisprudences}
            onAddToLibrary={onAddToLibrary}
            onAddToTrash={onAddToTrash}
            onItemClick={handleItemClick}
          />
        </div>

        {/* Doctrine et Adages */}
        <div className="col-span-3">
          <div className="space-y-6">
            <DoctrineSection
              doctrine={data.doctrine}
              onAddToLibrary={onAddToLibrary}
              onAddToTrash={onAddToTrash}
              onItemClick={handleItemClick}
            />
            <AdagesSection
              adages={data.adages}
              onAddToLibrary={onAddToLibrary}
              onAddToTrash={onAddToTrash}
              onItemClick={handleItemClick}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <DetailModal
          item={selectedItem.detailContent}
          onClose={handleCloseModal}
          onValidate={handleValidate}
          onMarkInteresting={handleMarkInteresting}
          onDelete={handleDelete}
          onAddTag={handleAddTag}
        />
      )}
    </div>
  );
};

export default Dashboard;