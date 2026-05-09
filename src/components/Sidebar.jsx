
import { Link } from "react-router-dom";

export default function Sidebar(){

return(
<div className="sidebar">

<h1>FactoryStock</h1>

<Link to="/">Dashboard</Link>
<Link to="/inventory">Inventory</Link>
<Link to="/materials">Materials</Link>
<Link to="/activity">Activity</Link>
<Link to="/settings">Settings</Link>

</div>
)
}
