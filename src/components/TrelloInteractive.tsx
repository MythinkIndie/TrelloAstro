import { useEffect, useRef, useState } from "react";
import { supabase } from "pages/supabase";
import Table from "components/ComponentForPages/TableComponent";
import TableColumnIcon from "./Icons/TablesColumnIcons";
import MoreVerticalIcon from "./Icons/MoreVerticalIcon";
import Header from "./UniversalAssets/UserHeader";
import type { User } from "@supabase/supabase-js";
import PersonalUserIcon from "./UniversalAssets/PersonalUserIcon";
import FilterIcon from "./Icons/FilterIcon";
import EmptyStarIcon from "./Icons/EmptyStarIcon";
import UsersIcon from "./Icons/UsersIcon";
import UserAddIcon from "./Icons/UserAddIcon";


export default function TrelloBoard({ lists }) {

  const [createNewTable, setCreateNewTable] = useState(false);
  const [titleTable, setTitle] = useState("");
  const [tables, setTables] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [UserSession, setUserSession] = useState<User>();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleAddNewTable = async () => {
    if (!titleTable.trim()) return;

    const { data, error } = await supabase
      .from("TrelloTable")
      .insert([{ title: titleTable.trim() }])
      .select()
      .single();


    if (error) {
      console.error("Error creando lista:", error);
      return;
    }

      setCreateNewTable(false);
      setTitle("");
  };

  useEffect(() => {

    async function catchUser() {

      const session = await supabase.auth.getUser();
      
      console.log(session)
      if (!session.data.user) {

        window.location.href = "/";

      }
      
    }

    catchUser();
    
    // Cargar datos iniciales
    const fetchLists = async () => {
      const { data } = await supabase
        .from("TrelloTable")
        .select("id, title, TrelloItemCards(*)")
        .order("position")
        .order("position", {foreignTable: "TrelloItemCards"});
      setTables(data);
    };

    fetchLists();

    // Suscribirse a cambios en la tabla 'lists'
    const subscription = supabase
      .channel("public:TrelloTable") // nombre del canal, puede ser cualquiera
      .on("postgres_changes", { event: "*", schema: "public", table: "TrelloTable" }, (payload) => {
        console.log("Cambio recibido:", payload);
        // Actualizar estado según tipo de evento
        if (payload.eventType === "INSERT") {
          setTables((prev) => [...prev, { ...payload.new, cards: [] }]);
        }
        if (payload.eventType === "UPDATE") {
          setTables((prev) =>
            prev.map((l) => (l.id === payload.new.id ? { ...l, ...payload.new } : l))
          );
        }
        if (payload.eventType === "DELETE") {
          setTables((prev) => prev.filter((l) => l.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);
  /*const [thelists, setTables] = useState(lists);
  const [openCard, setOpenCard] = useState<Card | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceListIndex = thelists.findIndex(l => l.id === source.droppableId);
    const destListIndex = thelists.findIndex(l => l.id === destination.droppableId);
    const sourceList = thelists[sourceListIndex];
    const destList = thelists[destListIndex];
    const [movedCard] = sourceList.cards.splice(source.index, 1);
    destList.cards.splice(destination.index, 0, movedCard);

    const newLists = [...thelists];
    newLists[sourceListIndex] = sourceList;
    newLists[destListIndex] = destList;
    setTables(newLists);
  };*/

  return (
    <>
      <Header/>
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600 me-2.5">Nombre del proyecto</h1>
          <div className="flex text-gray-900 mt-1 p-1 hover:bg-gray-100" onClick={() =>setOpenMenu(!openMenu)}>
            <TableColumnIcon myClass="w-4 h-4 text-gray-900"/>
            <MoreVerticalIcon myClass="w-4 h-4 text-gray-900"/>
          </div>
          {openMenu && (
            <div className="relative" onPointerLeave={() => setOpenMenu(false)}>
              <div className="absolute mt-2 w-72 bg-gray-800 text-white rounded-xl shadow-lg z-50 p-3">
                <h3 className="text-sm font-semibold mb-3">Ampliar para acceder a las vistas</h3>

                <div className="space-y-2">
                  <button className="flex items-center gap-2 w-full px-2 py-2 rounded hover:bg-gray-700">
                    <TableColumnIcon myClass="w-4 h-4 text-gray-800"/> Tablero
                  </button>
                  <button className="flex items-center gap-2 w-full px-2 py-2 rounded text-gray-400" disabled>
                    Icon Calendario 🔒
                  </button>
                  <button className="flex items-center gap-2 w-full px-2 py-2 rounded text-gray-400" disabled>
                    Icon Cronología 🔒
                  </button>
                  <button className="flex items-center gap-2 w-full px-2 py-2 rounded text-gray-400" disabled>
                    Icon Panel 🔒
                  </button>
                  <button className="flex items-center gap-2 w-full px-2 py-2 rounded text-gray-400" disabled>
                    Icon Mapa 🔒
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 justify-center items-center">
          <PersonalUserIcon myClass="w-4 h-4 text-white" />
          <FilterIcon myClass="w-4 h-4 text-white" />
          <EmptyStarIcon myClass="w-4 h-4 text-white" />
          <UsersIcon myClass="w-4 h-4 text-white" />
          <button type="button" className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 ">
            <UserAddIcon myClass="w-4 h-4 text-white" /> 
            <span>Compartir</span>
          </button>
        </div>
      </nav>

      <main>
        <div id="board" className="flex items-start gap-6 p-6 overflow-x-auto">
          {tables?.map(list => (
            <Table key={list.id} data-id={`list-${list.id}`} list={list} />
          ))}
          <button onClick={() => setCreateNewTable(true)} className="bg-gray-200 hover:bg-gray-300 bg-opacity-[25%] text-gray-800 hover:text-gray-900 font-medium rounded-lg px-4 w-64 h-fit py-3 flex items-center space-x-2">
            <span>+ Añade otra lista</span>
          </button>
        </div>
      </main>

      {createNewTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[500px] max-w-full">
                <div className="flex justify-between items-center border-b pb-2 mb-6">
                    <h2 className="text-xl font-semibold">Pon un nombre a la tabla</h2>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="newTableName" id="newTableName" className="block pb-1 pt-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" value={titleTable} onChange={(e) => setTitle(e.target.value)} required />
                    <label htmlFor="newTableName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Table</label>
                </div>

                <div className="mt-6 flex justify-end">
                    <button onClick={() => setCreateNewTable(false)} className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 mx-2 rounded-lg">
                        Cancelar
                    </button>
                    <button onClick={handleAddNewTable} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mx-2 rounded-lg">
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
}

// {/* <div key={list.id} id={`list-${list.id}`} className="list bg-gray-50 rounded-xl shadow-md p-4 w-72 flex flex-col">
//           <h2 className="font-semibold mb-4">{list.title}</h2>
//           <div className="cards space-y-3">
//             {list.TrelloItemCards?.map(card => (
//               <div key={card.id} data-id={card.id} className="task bg-white p-3 rounded-lg shadow cursor-pointer">
//                 {card.content}
//               </div>
//             ))}
//           </div>
//         </div> */}