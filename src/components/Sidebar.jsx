import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar(){

const [open,setOpen] = useState(false);

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

</div>

</>

)

}