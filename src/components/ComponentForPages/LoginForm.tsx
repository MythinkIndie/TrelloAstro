import { useState, useEffect } from "react";
import { supabase } from "pages/supabase";
import type { AuthError } from "@supabase/supabase-js";

type LoginRegisterProps = {
  switchMode: () => void;
  closeAuth: () => void;
};

export default function LoginForm({ switchMode, closeAuth }: LoginRegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessaje] = useState("");
  const [haveAnError, setHaveAnError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {

      showError(error);

    } else {

      console.log("Usuario logueado:", data);

    }
  };

  const handleRecoverPassword = async (e: React.FormEvent) => {

    e.preventDefault();

    let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:4321/update-password",
    });

    if (error) {

      showError(error);

    } else {

      console.log("Correo enviado para resetear password")

    }
  
  };

  function showError(e: AuthError) {

    setHaveAnError(true);
    setErrorMessaje(e.message);

  }

  return (

        <div className="flex-1 p-6 transition-all duration-500 opacity-100 translate-x-0">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
                <button onClick={closeAuth} className="text-gray-900 hover:text-gray-600 font-bold text-lg">
                    X
                </button> 
            </div>
          
          <form className="space-y-3">
            <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full border rounded-lg px-3 py-2"
                value={email} 
                onChange={(e) => {setEmail(e.target.value); setHaveAnError(false);}} 
                required
                />
            <input
                type="password"
                placeholder="Contraseña"
                className="w-full border rounded-lg px-3 py-2"
                value={password} 
                onChange={(e) => {setPassword(e.target.value); setHaveAnError(false);}} 
                required />
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg" onClick={handleLogin}>
              Entrar
            </button>
            {haveAnError && (
              <div className="p-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Error!</span> {errorMessage}
              </div>
            )}
          </form>
            <p className="mt-2 text-sm text-gray-500">
                ¿No tienes cuenta?
                <button onClick={switchMode} className="text-green-500 font-semibold px-1.25 hover:text-green-700">
                Regístrate
                </button>
            </p>
            <p className="text-sm text-gray-500">
                ¿No te acuerdas de la contraseña?
                <button onClick={handleRecoverPassword} className="text-green-500 font-semibold px-1.25 hover:text-green-700">
                Recuperala aquí
                </button>
            </p>
        </div>
  );
}