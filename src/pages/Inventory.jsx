import { useState } from "react";

export default function Inventory({
inventory,
onDelete,
onAdd,
onEdit
}){

const [search,setSearch] = useState("");

const [sortField,setSortField] = useState("");
const [sortOrder,setSortOrder] = useState("asc");

const filteredInventory = [...inventory]

.filter(item => {

const query = search.toLowerCase();

return (
item.material?.toLowerCase().includes(query) ||
String(item.rollNo).includes(query) ||
String(item.size).includes(query) ||
String(item.gramage).includes(query)
);

})

.sort((a,b)=>{

if(!sortField) return 0;

let valA = a[sortField];
let valB = b[sortField];

if(sortField === "date"){
valA = new Date(valA);
valB = new Date(valB);
}

const numericFields = [
"size",
"gramage",
"rollNo",
"incoming",
"outgoing",
"balance"
];

if(sortField === "date"){
valA = new Date(valA);
valB = new Date(valB);
}

else if(numericFields.includes(sortField)){
valA = Number(valA);
valB = Number(valB);
}

else{
valA = String(valA).toLowerCase();
valB = String(valB).toLowerCase();
}

if(valA < valB){
return sortOrder === "asc" ? -1 : 1;
}

if(valA > valB){
return sortOrder === "asc" ? 1 : -1;
}

return 0;

});

function handleSort(field){

if(sortField === field){

setSortOrder(
sortOrder === "asc"
? "desc"
: "asc"
);

}else{

setSortField(field);
setSortOrder("asc");

}

}
  
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
  
<th onClick={()=>handleSort("date")}>
Date
{sortField==="date" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("Size")}>
Size
{sortField==="Size" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("Gramage")}>
Gramage
{sortField==="Gramage" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("Material")}>
Material
{sortField==="Material" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("Roll No")}>
Roll No
{sortField==="Roll No" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("Incoming")}>
Incoming
{sortField==="Incoming" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("Outgoing")}>
Outgoing
{sortField==="Outgoing" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("Balance")}>
Balance
{sortField==="Balance" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th>Remarks</th>
  
<th>Action</th>
  
</tr>
</thead>

<tbody>

{filteredInventory.map(item=>(
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
