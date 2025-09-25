import SortableCard from "./SortableCard";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Card, Column } from "src/types/AllMyTypes";

export default function Column({ 
  column, 
  onAddCard, 
  onEditCard, 
  onDeleteCard 
}: { 
  column: Column;
  onAddCard: (columnId: string) => void;
  onEditCard: (card: Card) => void;
  onDeleteCard: (cardId: string) => void;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 w-80 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{column.title}</h3>
        <button
          onClick={() => onAddCard(column.id)}
          className="p-1 rounded hover:bg-gray-200 transition-colors"
        >
          {/* <Plus className="w-4 h-4 text-gray-600" /> */}
        </button>
      </div>

      <SortableContext 
        items={column.cards.map(card => card.id)} 
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 min-h-[100px]">
          {column.cards.map((card) => (
            <SortableCard
              key={card.id}
              card={card}
              onEdit={onEditCard}
              onDelete={onDeleteCard}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}