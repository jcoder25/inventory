import { useState } from "react";

export default function Inventory({
inventory,
onDelete,
onAdd,
onEdit
}){
  
const [search,setSearch] = useState("");

const filteredInventory = inventory.filter(item => {

const query = search.toLowerCase();

return (
item.material?.toLowerCase().includes(query) ||
String(item.rollNo).includes(query) ||
String(item.size).includes(query) ||
String(item.gramage).includes(query)
);

});

  
return(
<div className="card">

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"20px"
}}>

<h2>Inventory Ledger</h2>

<button
className="primary"
onClick={onAdd}
>
Add Inventory
</button>

</div>

<div className="search-bar-wrapper">

<input
type="text"
placeholder="Search material, roll no, size..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="search-input"
/>

{search && (
<button
className="clear-search"
onClick={()=>setSearch("")}
>
×
</button>
)}

</div>
  
<table>

<thead>
<tr>
<th>Date</th>
<th>Size</th>
<th>Gramage</th>
<th>Material</th>
<th>Roll No</th>
<th>Incoming</th>
<th>Outgoing</th>
<th>Balance</th>
<th>Remarks</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{inventory.map(item=>(
<tr key={item.id}>

<td>{item.date}</td>
<td>{item.size}</td>
<td>{item.gramage}</td>
<td>{item.material}</td>
<td>{item.rollNo}</td>
<td>{item.incoming}</td>
<td>{item.outgoing}</td>
<td>{item.balance}</td>
<td>{item.remarks}</td>

<td style={{display:"flex",gap:"10px"}}>

<button
className="blue"
onClick={()=>onEdit(item)}
>
Update
</button>

<button
className="red"
onClick={()=>onDelete(item.id)}
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>
)
}
