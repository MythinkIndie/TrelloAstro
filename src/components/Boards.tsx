import { supabase } from "pages/supabase";
import { useState, useEffect } from "react";

type Board = {
  id: string;
  title: string;
};

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([
    { id: "1", title: "Proyecto React" },
    { id: "2", title: "Temarios" },
    { id: "3", title: "Ideas de diseño" },
  ]);

  const [newBoardTitle, setNewBoardTitle] = useState("");

  const createBoard = () => {
    if (!newBoardTitle.trim()) return;

    const newBoard = {
      id: Date.now().toString(),
      title: newBoardTitle,
    };

    setBoards([...boards, newBoard]);
    setNewBoardTitle("");
  };

  useEffect(() => {

    const session = supabase.auth.getUser();
    if (!session) {

      window.location.href = "/";

    }
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Mis tableros</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {boards.map((board) => (
          <div
            key={board.id}
            className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{board.title}</h2>
          </div>
        ))}

        <div className="bg-gray-200 rounded-xl p-6 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300 transition">
          <input
            type="text"
            placeholder="Nuevo tablero"
            className="border rounded-lg px-3 py-2 mb-2 w-full"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />
          <button
            onClick={createBoard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
    
  );
}