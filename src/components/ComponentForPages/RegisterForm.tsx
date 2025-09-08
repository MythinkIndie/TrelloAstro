import type { AuthError } from "@supabase/supabase-js";
import { supabase } from "pages/supabase";
import { useEffect, useState } from "react";

type LoginRegisterProps = {
  switchMode: () => void;
  closeAuth: () => void;
};

export default function RegisterForm({ switchMode, closeAuth }: LoginRegisterProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  const [errorMessage, setErrorMessaje] = useState("");
  const [haveAnError, setHaveAnError] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
            username: username,
        }
      }
      
    });

    const user = data.user;

    if (user) {

      // 2. Insertar en la tabla pública
      const { error: insertError } = await supabase.from("users").insert([
          { id: user.id } // aquí solo insertamos el id
      ]);

      if (insertError) {
          showError(insertError);
      } else {
          console.log("Usuario añadido en la tabla users:", user.id);
      }
      
    }

    if (error) {
      showError(error);
    } else {
      console.log("Usuario registrado:", data);
      //redirect
    }
  };

  function showError(e: AuthError) {
  
    setHaveAnError(true);
    setErrorMessaje(e.message);
  
  }

  return (

    <div className="flex-1 p-6 transition-all duration-500 opacity-100 translate-x-0">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Registrarse</h2>
            <button onClick={closeAuth} className="text-gray-900 hover:text-gray-600 font-bold text-lg">
                X
            </button> 
        </div>
        
        <form className="space-y-4">
            <input
            type="text"
            placeholder="Nombre"
            className="w-full border rounded-lg px-3 py-2"
            value={username} 
            onChange={(e) => {setUsername(e.target.value); setHaveAnError(false);}} 
            required />

            <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border rounded-lg px-3 py-2"
            value={email} 
            onChange={(e) => {setEmail(e.target.value); setHaveAnError(false);}} 
            required />

            <input
            type="password"
            placeholder="Contraseña"
            className="w-full border rounded-lg px-3 py-2"
            value={password} 
            onChange={(e) => {setPassword(e.target.value); setHaveAnError(false);}} 
            required />

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg" onClick={handleRegister}>
            Crear cuenta
            </button>
            {haveAnError && (
              <div className="p-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Error!</span> {errorMessage}
              </div>
            )}
        </form>
        <p className="mt-4 text-sm text-gray-500">
            ¿Ya tienes cuenta?
            <button onClick={switchMode} className="text-blue-500 font-semibold px-1.25 hover:text-blue-700">
            Inicia sesión
            </button>
        </p>
    </div>
    
  );
}