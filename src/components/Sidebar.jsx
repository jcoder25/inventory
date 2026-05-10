import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar(){

const [open,setOpen] = useState(false);

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

<Link to="/">Home</Link>

<Link to="/inventory">Inventory</Link>

<Link to="/materials">Materials</Link>

<Link to="/activity">Activity</Link>

<Link to="/settings">Settings</Link>

</div>

</>

)

}