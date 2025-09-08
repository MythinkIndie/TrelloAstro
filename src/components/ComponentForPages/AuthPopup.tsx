import { useState } from "react"
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

type AuthProps = {
  closeAuth: () => void;
};

export default function AuthPopup({ closeAuth }: AuthProps) {

  const [isRegister, setIsRegister] = useState(true);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[700px] max-w-full flex overflow-hidden">

        {isRegister ? 
            (<RegisterForm closeAuth={closeAuth} switchMode={() => setIsRegister(false)}/>) :
            (<LoginForm closeAuth={closeAuth} switchMode={() => setIsRegister(true)}/>)    
        }
        
      </div>
    </div>
  );
}