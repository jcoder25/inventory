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

const [sizeFilter,setSizeFilter] = useState("");
const [materialFilter,setMaterialFilter] = useState("");


const uniqueSizes = [
...new Set(
inventory.map(item => item.size)
)
];

const uniqueMaterials = [
...new Set(
inventory.map(item => item.material)
)
];



function handleSort(field){

if(sortField === field){

setSortOrder(prev =>
prev === "asc" ? "desc" : "asc"
);

}else{

setSortField(field);
setSortOrder("asc");

}

}

const filteredInventory = [...inventory]


.filter(item => {

const query = search.toLowerCase();

const matchesSearch =

String(item.material || "")
.toLowerCase()
.includes(query)

||

String(item.rollNo || "")
.includes(query)

||

String(item.size || "")
.includes(query)

||

String(item.gramage || "")
.includes(query);

const matchesSize =
!sizeFilter ||
String(item.size) === String(sizeFilter);

const matchesMaterial =
!materialFilter ||
item.material === materialFilter;

return (
matchesSearch &&
matchesSize &&
matchesMaterial
);

})

.sort((a,b)=>{

if(!sortField) return 0;

let valA = a[sortField];
let valB = b[sortField];

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

<div className="top-filters">

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

<select
value={sizeFilter}
onChange={(e)=>setSizeFilter(e.target.value)}
className="filter-dropdown"
>

<option value="">
All Sizes
</option>

{uniqueSizes.map(size=>(
<option key={size} value={size}>
{size}
</option>
))}

</select>

<select
value={materialFilter}
onChange={(e)=>setMaterialFilter(e.target.value)}
className="filter-dropdown"
>

<option value="">
All Materials
</option>

{uniqueMaterials.map(material=>(
<option key={material} value={material}>
{material}
</option>
))}

</select>

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
  
<th onClick={()=>handleSort("size")}>
Size
{sortField==="size" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("gramage")}>
Gramage
{sortField==="gramage" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("material")}>
Material
{sortField==="material" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("rollNo")}>
Roll No
{sortField==="rollNo" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("incoming")}>
Incoming
{sortField==="incoming" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("outgoing")}>
Outgoing
{sortField==="outgoing" && (
sortOrder==="asc" ? " ↑" : " ↓"
)}
</th>
  
<th onClick={()=>handleSort("balance")}>
Balance
{sortField==="balance" && (
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