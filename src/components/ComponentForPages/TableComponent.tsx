import DotsVerticalIcon from "components/Icons/DotsVerticalIcon.tsx";
import CardComponent from "./CardComponent.tsx";
import { useEffect, useState } from "react";
import CloseIcon from "components/Icons/CloseIcon.tsx";


export default function Table({ list }) {

    const [renamedTitle, setChangedTitle] = useState("");
    const [createNewCard, setCreateNewCard] = useState(false);
    const [editingTable, setEditingTable] = useState(false);
    const [tables, setTables] = useState([]);

    return (
        <>
            <div className="list bg-gray-50 rounded-xl shadow-md px-4 pt-3 pb-2 w-72 inline-flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold ms-1">{list.title}</h2>
                    <button onClick={() => setEditingTable(true)} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-gray-800 focus:ring-1 focus:outline-none focus:ring-gray-100">
                        <span className="relative transition-all ease-in duration-75 bg-gray-50 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            <DotsVerticalIcon />
                        </span>
                    </button>
                </div>
                <div className="cards space-y-3">
                    {list.TrelloItemCards?.map(card => (
                        <CardComponent key={card.id} data-id={card.id} card={card}/>
                    ))}
                    <button className="flex items-center justify-between text-gray-700 hover:text-gray-500 rounded-md px-2 py-0.5 mt-auto">
                        <div className="flex items-center space-x-2">
                            <span>+ Añade una tarjeta</span>
                        </div>
                    </button>
                </div>
            </div>

            {editingTable && (
                <div className="fixed inset-0 z-51 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[350px] max-w-full">



                        <div className="flex justify-between items-center border-b pb-2 mb-5">
                            <span></span>
                            <h2 className="text-lg font-semibold">Acciones</h2>
                            <button onClick={() => setEditingTable(false)}>
                                <CloseIcon/>
                            </button>
                        </div>

                        <div className="flex justify-between items-left flex-col border-b border-dashed pb-2 mb-3">
                            <span>Añadir tarjeta</span>
                            <span>Copiar lista</span>
                            <span>Mover lista</span>
                            <span>Mover todas las tarjetas de esta lista</span>
                            <span>Ordenar por...</span>
                            <span>Seguir</span>
                        </div>

                        <div className="flex justify-between items-left flex-col border-b border-dashed pb-2 mb-3">
                            <span>TITLE - Cambiar color</span>
                            <span>Aqui iria una paleta de colores</span>
                        </div>

                        <div className="flex justify-between items-left flex-col border-b border-dashed pb-2 mb-3">
                            <span>TITLE - Automatiazción</span>
                            <span>Cuando se añada una tarjeta a la lista...</span>
                            <span>Todos los dias, ordenar lista por...</span>
                        </div>

                        <div className="flex justify-between items-left flex-col mb-1.5">
                            <span>Archivar esta lista</span>
                            <span>Archivar todas las tarjetas de esta lista</span>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}