import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabase";

export default function Sidebar(){

const [open,setOpen] = useState(false);

async function handleLogout()
{
    await supabase.auth.signOut();
    window.location.reload();
}


function closeMenu(){
setOpen(false);
}

return(

<>

<div className="mobile-topbar">

<h1>FactoryStock</h1>

<button
className="hamburger"
onClick={()=>setOpen(!open)}
>
☰
</button>

</div>

<div className={`sidebar ${open ? "show-sidebar" : ""}`}>

<Link to="/" onClick={closeMenu}>
Home
</Link>

<Link to="/dashboard" onClick={closeMenu}>
Dashboard
</Link>

<Link to="/inventory" onClick={closeMenu}>
Inventory
</Link>

<Link to="/materials" onClick={closeMenu}>
Materials
</Link>

<Link to="/activity" onClick={closeMenu}>
Activity
</Link>

<Link to="/settings" onClick={closeMenu}>
Settings
</Link>

<button onClick = {handleLogout}
className="sidebar-logout">Logout
</button>

</div>

</>

)

}