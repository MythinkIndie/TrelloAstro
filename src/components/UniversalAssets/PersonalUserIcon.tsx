type HTMLCustomClass = {
    myClass: string;
}

import { supabase } from "pages/supabase";
import { useEffect, useState } from "react";
import type { SupabaseUser } from "src/types/AllMyTypes";

export default function PersonalUserIcon({myClass}: HTMLCustomClass) {

    const [userName, setUserName] = useState("");

    useEffect(() => {

        async function catchUserInfo() {

            const {data: {user}} = await supabase.auth.getUser();
            const {data, error} = await supabase.from("users").select("*").eq("id", user?.id);
            
            setUserName(data![0].username);

        }

        catchUserInfo();

    });

    
    //let { data: listsData } = await supabase.from("TrelloItemCards").select("*").order("id");
    

    myClass = myClass + " rounded-full flex items-center justify-center font-bold";

    return (
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
            {userName[0]}
        </div>
    )

}