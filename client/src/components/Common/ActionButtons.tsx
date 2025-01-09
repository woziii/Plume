import React from 'react';
import { Star, CheckCircle, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onValidate: () => void;
  onInteresting: () => void;
  onDelete: () => void;
  showText?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onValidate,
  onInteresting,
  onDelete,
  showText = false
}) => {
  return (
    <div className="flex mt-3 space-x-3">
      <button 
        onClick={onValidate}
        className="text-green-700 hover:text-green-800 text-sm flex items-center"
      >
        <CheckCircle className="w-4 h-4 mr-1" />
        {showText && "Valider"}
      </button>
      <button 
        onClick={onInteresting}
        className="text-yellow-500 hover:text-yellow-600 text-sm flex items-center"
      >
        <Star className="w-4 h-4 mr-1" />
        {showText && "Intéressant"}
      </button>
      <button 
        onClick={onDelete}
        className="text-red-500 hover:text-red-600 text-sm flex items-center"
      >
        <Trash2 className="w-4 h-4 mr-1" />
        {showText && "Supprimer"}
      </button>
    </div>
  );
};

export default ActionButtons;