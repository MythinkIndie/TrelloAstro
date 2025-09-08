import { useEffect, useState } from "react";
import { supabase } from "pages/supabase";
import { useNavigate } from "react-router";
import AuthPopup from "components/ComponentForPages/AuthPopup";

export default function MainPage() {
    
    useEffect(() => {

        async function catchUser() {

            const session = await supabase.auth.getUser();
            console.log(session)
            if (session.data.user) {

                window.location.href = "/boards";

            }
        
        }

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                window.location.href = "/boards"; // redirige automáticamente
            }
        });

    catchUser();

    }, []);

    const [MainAuthActive, setIsMainAuthActive] = useState(false);

    return (
        <>
            <main className="min-h-screen flex flex-col">
                <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-5xl font-bold text-blue-600 mb-4">MiTrello</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mb-8">
                        Una aplicación construida con <span className="font-semibold">Astro</span>, 
                        <span className="font-semibold"> React</span>, y potenciada por 
                        <span className="font-semibold"> Supabase</span> y 
                        <span className="font-semibold"> Firebase</span>.  
                        Organiza temarios, proyectos y tareas en un sistema sencillo e interactivo.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsMainAuthActive(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md">
                            Empezar ahora
                        </button>
                        <a
                            href="https://github.com/"
                            target="_blank"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl shadow-md"
                        >
                            Ver código
                        </a>
                    </div>
                </section>

                <section className="py-16 bg-white shadow-inner">
                    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
                        <div>
                            <h3 className="font-semibold text-xl mb-2">UI Moderna</h3>
                            <p className="text-gray-600">
                            Construida con <span className="font-semibold">Astro</span> y <span className="font-semibold">React</span>,
                            estilizada con <span className="font-semibold">TailwindCSS</span>.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl mb-2">Base de datos en tiempo real</h3>
                            <p className="text-gray-600">
                            Usamos <span className="font-semibold">Supabase</span> para autenticación y datos sincronizados en tiempo real.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl mb-2">Escalable en la nube</h3>
                            <p className="text-gray-600">
                            Integración con <span className="font-semibold">Supabase</span> para almacenamiento y despliegue rápido.
                            </p>
                        </div>
                    </div>
                </section>

                <footer className="py-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} MiTrello — Hecho con Astro 🚀
                </footer>
            </main>

            {MainAuthActive && <AuthPopup closeAuth={() => setIsMainAuthActive(false)}/>}
            
        </>

      

    // <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
    //   {/* Logo / título */}
    //   <h1 className="text-4xl font-bold text-blue-600 mb-6">MiTrello</h1>
    //   <p className="text-gray-600 mb-10 text-center max-w-md">
    //     Organiza tus tareas, proyectos y temarios de forma sencilla y colaborativa.
    //   </p>

    //   {/* Botones */}
    //   <div className="flex gap-4">
    //     <a
    //       href="/register"
    //       className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md"
    //     >
    //       Registrarse
    //     </a>
    //     <a
    //       href="/login"
    //       className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl shadow-md"
    //     >
    //       Iniciar Sesión
    //     </a>
    //   </div>

    //   {/* Imagen ilustrativa */}
    //   <div className="mt-12">
    //     <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/office-laptop.png" alt="App preview" className="rounded-xl shadow-lg w-full max-w-lg"/>
    //   </div>
    // </div>
  );

}