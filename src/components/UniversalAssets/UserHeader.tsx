import SearchIcon from "components/Icons/SearchIcon";
import PersonalUserIcon from "./PersonalUserIcon";
import { supabase } from "pages/supabase";
import type { SupabaseUser } from "src/types/AllMyTypes";

export default function Header() {

    const logout = async () => {

      let { error } = await supabase.auth.signOut()
      window.location.reload();

    }

  return (
    <header className="w-full bg-gray-900 text-white flex items-center justify-between px-4 py-2">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 w-8 h-8 rounded flex items-center justify-center font-bold">
          T
        </div>
        <span className="font-semibold text-lg">Trello</span>
      </div>

      {/* Center: Search + Crear */}
      <div className="flex items-center gap-2 flex-1 justify-center max-w-2xl">
        <div className="flex items-center bg-gray-800 rounded-lg px-2 w-full">
          <SearchIcon />
          <input
            type="text"
            placeholder="Buscar"
            className="bg-transparent px-2 py-1 w-full focus:outline-none text-sm"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium">
          Crear
        </button>
      </div>

      {/* Right: Icons + User */}
      <div className="flex items-center gap-4">
        <div className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white">
            A
        </div>
        <div className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white">
            B
        </div>
        <div className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white">
            Z
        </div>
        <button onClick={logout}>
          <PersonalUserIcon myClass="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}