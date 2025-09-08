import React,{ useState, useRef } from "react";
import CardModal from "./CardModal.tsx";

export default function CardOnTable({ card }) {

    const [open, setOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div onClick={() => setOpen(true)} className="task bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition">
                {card.content}
            </div>

            {open && (
                    <CardModal card={card} onPointerLeave={() => setOpen(false)}/>
                // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                //     <div className="bg-white rounded-xl shadow-lg p-6 w-[500px] max-w-full">
                //         <div className="flex justify-between items-center border-b pb-3 mb-4">
                //             <h2 className="text-xl font-semibold">Detalle de la tarjeta</h2>
                //             <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                //                 X
                //             </button>
                //         </div>

                //         <div>
                //             <p className="text-gray-700">{card.content}</p>
                //             {/* Aquí puedes añadir más campos */}
                //         </div>

                //         <div className="mt-6 flex justify-end">
                //             <button onClick={() => setOpen(false)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                //                 Cerrar
                //             </button>
                //         </div>
                //     </div>
                // </div>
            )}

        </>
    );
}