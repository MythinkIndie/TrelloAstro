import { useState, useEffect } from "react";
import { supabase } from "pages/supabase";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        const channel = supabase
            .channel("users-updates")
            .on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "users" },
            (payload) => {
                if (payload.new.username) {
                setUsername(payload.new.username);
                }
            }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

  // Guardar cambios
  const updateUsername = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("users")
        .update({ username })
        .eq("id", user.id);

      if (error) {
        alert("Error al actualizar: " + error.message);
      } else {
        alert("Nombre actualizado con éxito ✅");
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Perfil</h2>

      <label className="block mb-2 font-medium">Nombre de usuario</label>
      <input
        className="w-full border rounded-lg px-3 py-2 mb-4"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={updateUsername}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}