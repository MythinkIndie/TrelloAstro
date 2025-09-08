import { useEffect, useState } from "react";
import { supabase } from "../pages/supabase";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("❌ Error: " + error.message);
    }
    else {
      setStatus("✅ Contraseña actualizada correctamente");
      window.location.href = "/";
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Cambia tu contraseña</h1>
        <input
          type="password"
          placeholder="Nueva contraseña"
          className="w-full p-2 mb-4 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Actualizar contraseña
        </button>
        {status && <p className="mt-3 text-sm">{status}</p>}
      </div>
    </div>
  );
}