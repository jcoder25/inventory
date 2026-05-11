import { useParams } from "react-router-dom";
import { useState } from "react";

export default function GramageDetails({
inventory,
onEdit,
onDelete,
onAddStock
}){

const { size, gramage } = useParams();

const [sortField,setSortField] = useState("");
const [sortOrder,setSortOrder] = useState("asc");

const filtered = inventory.filter(item =>

String(item.size) === size &&
String(item.gramage) === gramage

);

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
marginBottom:"20px",
flexWrap:"wrap",
gap:"12px"
}}>

<h2>
Size {size} | Gramage {gramage}
</h2>

<button
className="primary"
onClick={()=>onAddStock(filtered[0])}
>
Add Stock
</button>

</div>

<table>

<thead>

<tr>

<th onClick={()=>handleSort("date")}>
Date
{sortField==="date" &&
(sortOrder==="asc" ? " ↑" : " ↓")}
</th>

<th onClick={()=>handleSort("size")}>
Size
{sortField==="size" &&
(sortOrder==="asc" ? " ↑" : " ↓")}
</th>


<th onClick={()=>handleSort("gramage")}>
Gramage
{sortField==="gramage" &&
(sortOrder==="asc" ? " ↑" : " ↓")}
</th>

<th onClick={()=>handleSort("material")}>
Material
{sortField==="material" &&
(sortOrder==="asc" ? " ↑" : " ↓")}
</th>

<th onClick={()=>handleSort("incoming")}>
Incoming
{sortField==="incoming" &&
(sortOrder==="asc" ? " ↑" : " ↓")}
</th>

<th onClick={()=>handleSort("outgoing")}>
Outgoing
{sortField==="outgoing" &&
(sortOrder==="asc" ? " ↑" : " ↓")}
</th>

<th onClick={()=>handleSort("balance")}>
Total Balance
{sortField==="balance" &&
(sortOrder==="asc" ? " ↑" : " ↓")}
</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{[...filtered]

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

})

.map((item,index)=>(
<tr key={item.id}>

<td>{item.date}</td>
<td>{item.size}</td>
<td>{item.gramage}</td>
<td>{item.rollNo}</td>
<td>{item.material}</td>
<td>{item.incoming}</td>
<td>{item.outgoing}</td>
<td>{item.balance}</td>

<td style={{
display:"flex",
gap:"10px"
}}>

<button
className="blue"
onClick={()=>onEdit(item)}
>
Modify
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