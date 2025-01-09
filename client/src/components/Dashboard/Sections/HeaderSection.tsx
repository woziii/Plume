import React from 'react';

interface HeaderSectionProps {
  factsummary: string;
  legalquestion: string;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  factsummary,
  legalquestion
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Analyse des Principes Juridiques
      </h1>
      <div className="text-gray-600">
        <p>
          <span className="font-semibold">Résumé des faits :</span> {factsummary}
        </p>
        <p className="mt-2 text-gray-500">
          <span className="font-semibold">Question de droit :</span> {legalquestion}
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;