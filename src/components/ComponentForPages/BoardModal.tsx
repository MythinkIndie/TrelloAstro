import { useState } from "react";
import type { Board, Card } from "src/types/AllMyTypes";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from "./Column";
import CardModal from "./CardModal";

export default function TrelloInteractive() {
  const [board, setBoard] = useState<Board>();
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [newCardColumnId, setNewCardColumnId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Obtener todas las tarjetas de todas las columnas
  const getAllCards = () => {
    return board!.columns.flatMap(col => col.cards);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeCard = getAllCards()?.find(card => card.id === active.id);
    if (activeCard) {
      setActiveCard(activeCard);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeCard = getAllCards()?.find(card => card.id === activeId);
    if (!activeCard) return;

    const activeColumn = board!.columns.find(col => col.id === activeCard.columnId);
    const overCard = getAllCards()?.find(card => card.id === overId);
    let overColumn = overCard 
      ? board!.columns.find(col => col.id === overCard.columnId)
      : board!.columns.find(col => col.id === overId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id === overColumn.id) return;

    setBoard(prevBoard => {
      const newBoard = { ...prevBoard };
      const newColumns = [...newBoard.columns];

      const activeColIndex = newColumns.findIndex(col => col.id === activeColumn.id);
      const overColIndex = newColumns.findIndex(col => col.id === overColumn.id);

      // Remover la tarjeta de la columna activa
      newColumns[activeColIndex] = {
        ...newColumns[activeColIndex],
        cards: newColumns[activeColIndex].cards.filter(card => card.id !== activeId)
      };

      // Agregar la tarjeta a la nueva columna
      const updatedCard = { ...activeCard, columnId: overColumn.id };
      
      if (overCard) {
        const overCardIndex = newColumns[overColIndex].cards.findIndex(card => card.id === overId);
        newColumns[overColIndex] = {
          ...newColumns[overColIndex],
          cards: [
            ...newColumns[overColIndex].cards.slice(0, overCardIndex),
            updatedCard,
            ...newColumns[overColIndex].cards.slice(overCardIndex)
          ]
        };
      } else {
        newColumns[overColIndex] = {
          ...newColumns[overColIndex],
          cards: [...newColumns[overColIndex].cards, updatedCard]
        };
      }

      return {
        ...newBoard,
        columns: newColumns
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeCard = getAllCards().find(card => card.id === activeId);
    if (!activeCard) return;

    const activeColumn = board.columns.find(col => col.id === activeCard.columnId);
    if (!activeColumn) return;

    const overCard = getAllCards().find(card => card.id === overId);
    if (overCard && overCard.columnId === activeCard.columnId) {
      // Reordenar dentro de la misma columna
      setBoard(prevBoard => {
        const newBoard = { ...prevBoard };
        const newColumns = [...newBoard.columns];
        const columnIndex = newColumns.findIndex(col => col.id === activeColumn.id);
        
        const oldIndex = newColumns[columnIndex].cards.findIndex(card => card.id === activeId);
        const newIndex = newColumns[columnIndex].cards.findIndex(card => card.id === overId);

        newColumns[columnIndex] = {
          ...newColumns[columnIndex],
          cards: arrayMove(newColumns[columnIndex].cards, oldIndex, newIndex)
        };

        return {
          ...newBoard,
          columns: newColumns
        };
      });
    }
  };

  const handleAddCard = (columnId: string) => {
    setNewCardColumnId(columnId);
    setEditingCard(null);
    setModalOpen(true);
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setNewCardColumnId(null);
    setModalOpen(true);
  };

  const handleDeleteCard = (cardId: string) => {
    setBoard(prevBoard => {
      const newBoard = { ...prevBoard };
      const newColumns = newBoard.columns.map(column => ({
        ...column,
        cards: column.cards.filter(card => card.id !== cardId)
      }));

      return {
        ...newBoard,
        columns: newColumns
      };
    });
  };

  const handleSaveCard = (cardData: Partial<Card>) => {
    if (editingCard) {
      // Editar tarjeta existente
      setBoard(prevBoard => {
        const newBoard = { ...prevBoard };
        const newColumns = newBoard.columns.map(column => ({
          ...column,
          cards: column.cards.map(card => 
            card.id === editingCard.id 
              ? { ...card, ...cardData }
              : card
          )
        }));

        return {
          ...newBoard,
          columns: newColumns
        };
      });
    } else if (newCardColumnId) {
      // Crear nueva tarjeta
      const newCard: Card = {
        id: `card-${Date.now()}`,
        title: cardData.title!,
        description: cardData.description,
        columnId: newCardColumnId,
      };

      setBoard(prevBoard => {
        const newBoard = { ...prevBoard };
        const newColumns = newBoard.columns.map(column => 
          column.id === newCardColumnId
            ? { ...column, cards: [...column.cards, newCard] }
            : column
        );

        return {
          ...newBoard,
          columns: newColumns
        };
      });
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-full mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{board.title}</h1>
          <p className="text-gray-600">Organiza tus tareas de manera eficiente</p>
        </div>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex space-x-6 overflow-x-auto pb-6">
            {board.columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                onAddCard={handleAddCard}
                onEditCard={handleEditCard}
                onDeleteCard={handleDeleteCard}
              />
            ))}
          </div>

          <DragOverlay>
            {activeCard ? (
              <div className="bg-white rounded-lg p-3 shadow-lg border border-gray-200 rotate-3">
                <h4 className="text-sm font-medium text-gray-900">
                  {activeCard.title}
                </h4>
                {activeCard.description && (
                  <p className="text-xs text-gray-600 mt-1">
                    {activeCard.description}
                  </p>
                )}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        <CardModal
          card={editingCard || undefined}
          columnId={newCardColumnId || undefined}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveCard}
        />
      </div>
    </div>
  );
}