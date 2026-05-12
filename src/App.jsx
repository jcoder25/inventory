import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Auth from "./pages/Auth";

export default function App(){

const [session,setSession] = useState(null);

useEffect(()=>{

supabase.auth.getSession()
.then(({ data:{ session } })=>{

setSession(session);

});

const {
data:{ subscription }
} = supabase.auth.onAuthStateChange(
(_,session)=>{

setSession(session);

}
);

return ()=>subscription.unsubscribe();

},[]);

if(!session){
return <Auth />;
}

return(

<div>

<h1>
Logged In Successfully
</h1>

</div>

)

}