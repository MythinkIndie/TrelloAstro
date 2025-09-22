

export default function CardModal({ card, onPointerLeave }) {

  //Primero loading al llamarlo para hacer la consulta en supabase


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 rounded">
      <div className="relative p-4 w-full max-w-[70%] max-h-[85%] rounded-md" onPointerLeave={onPointerLeave}>

          <div className="flex w-full h-full min-h-[70vh] bg-gray-900 text-white rounded-xl">
            {/* Columna izquierda */}
            <div className="flex-[70%] p-6 space-y-6 overflow-y-auto">
              <h1 className="text-2xl font-bold">{card.content}</h1>

              {/* Botones */}
              <div className="flex gap-2 flex-wrap">
                <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 text-sm">+ Añadir</button>
                <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 text-sm">Etiquetas</button>
                <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 text-sm">Fechas</button>
                <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 text-sm">Checklist</button>
                <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 text-sm">Miembros</button>
              </div>

              {/* Descripción */}
              <div>
                <h2 className="font-semibold mb-2">Descripción</h2>
                <textarea
                  placeholder="Añadir una descripción más detallada..."
                  className="w-full p-3 bg-gray-800 rounded-lg resize-none text-sm"
                  rows={3}
                />
              </div>

              {/* Checklist */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold">Checklist</h2>
                  <button className="text-red-400 hover:text-red-600">Eliminar</button>
                </div>
                <div className="space-y-2">
                  
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="accent-blue-500"
                      />
                      <span className="line-through text-gray-400">
                        item.text
                      </span>
                    </label>
                </div>
                <button className="mt-3 text-sm text-blue-400 hover:underline">
                  + Añade un elemento
                </button>
              </div>
            </div>

                {/* Columna derecha */}
                <div className="flex-[30%] border-l border-gray-700 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">Comentarios y Actividad</h2>
                    <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 text-sm">
                      Mostrar detalles
                    </button>
                  </div>

                  <textarea
                    placeholder="Escribe un comentario..."
                    className="w-full p-3 bg-gray-800 rounded-lg resize-none text-sm"
                    rows={2}
                  />

                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-bold text-blue-400">Carlos</span> ha añadido
                      esta tarjeta a <span className="font-semibold">3D</span>
                    </p>
                    <p className="text-gray-400 text-xs">26 ago 2025, 12:56</p>
                  </div>
                </div>
              </div>
      </div>
  </div>

    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    //   <div className="bg-white rounded-xl shadow-lg p-6 w-[500px] max-w-full">
    //     <div className="flex justify-between items-center border-b pb-3 mb-4">
    //       <h2 className="text-xl font-semibold">{card.content}</h2>
    //       <button
    //         onClick={onClose}
    //         className="text-gray-400 hover:text-gray-600 text-lg"
    //       >
    //         X
    //       </button>
    //     </div>

    //     <div>
    //       <p className="text-gray-700">{card.content}</p>
    //       {/* Aquí puedes añadir más campos: descripción, checklist, comentarios, etc */}
    //     </div>

    //     <div className="mt-6 flex justify-end">
    //       <button
    //         onClick={onClose}
    //         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
    //       >
    //         Cerrar
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
