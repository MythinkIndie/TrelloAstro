import type { Card } from "src/types/AllMyTypes";
import { useState } from "react";

export default function CardModal({
  card,
  columnId,
  isOpen,
  onClose,
  onSave,
}: {
  card?: Card;
  columnId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (cardData: Partial<Card>) => void;
}) {

    const [title, setTitle] = useState(card?.title || '');
    const [description, setDescription] = useState(card?.description || '');

    const handleSave = () => {
        if (!title.trim()) return;
        
        onSave({
        title: title.trim(),
        description: description.trim(),
        columnId: columnId || card?.columnId,
        });
        
        setTitle('');
        setDescription('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                        {card ? 'Editar Tarjeta' : 'Nueva Tarjeta'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-100"
                    >
                        {/* <X className="w-5 h-5" /> */}
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título
                        </label>
                        <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingresa el título de la tarjeta"
                        autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción
                        </label>
                        <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Descripción opcional"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!title.trim()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {card ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </div>
        </div>
  );
}