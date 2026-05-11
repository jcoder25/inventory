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

const [fromDate,setFromDate] = useState("");
const [toDate,setToDate] = useState("");

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

const itemDate = new Date(item.date);

const matchesFromDate =
!fromDate ||
itemDate >= new Date(fromDate);

const matchesToDate =
!toDate ||
itemDate <= new Date(toDate);

return (
matchesSearch &&
matchesSize &&
matchesMaterial &&
matchesFromDate &&
matchesToDate
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

function formatDate(dateString){

if(!dateString) return "";

const date = new Date(dateString);

const day = String(date.getDate())
.padStart(2,"0");

const month = String(date.getMonth() + 1)
.padStart(2,"0");

const year = date.getFullYear();

return `${day}-${month}-${year}`;

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

<div className="top-filters">

<div className="search-bar-wrapper">

<input
type="text"
placeholder="Search"
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

<div className="date-filter">

<label>From Date</label>

<input
type="date"
value={fromDate}
onChange={(e)=>setFromDate(e.target.value)}
className="filter-dropdown"
/>

</div>

<div className="date-filter">

<label>To Date</label>

<input
type="date"
value={toDate}
onChange={(e)=>setToDate(e.target.value)}
className="filter-dropdown"
/>

</div>

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

{formatDate(item.date)}
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