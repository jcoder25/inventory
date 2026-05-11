import { Link, useParams } from "react-router-dom";
import { useState } from "react";

export default function SizeDetails({
inventory,
onEdit,
onAddStock
}){

const { size } = useParams();

const [sortField,setSortField] = useState("");
const [sortOrder,setSortOrder] = useState("asc");

const grouped = {};

inventory
.filter(item => String(item.size) === size)
.forEach(item=>{

const key = item.gramage;

if(!grouped[key]){

grouped[key] = {
date:item.date,
size:item.size,
gramage:item.gramage,
balance:0,
latest:item
};

}

grouped[key].balance += Number(item.balance || 0);

});

const rows = Object.values(grouped);

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
marginBottom:"20px",
flexWrap:"wrap",
gap:"12px"
}}>

<h2>Size {size} Summary</h2>

<button
className="primary"
onClick={()=>onAddStock(rows[0]?.latest)}
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

<th>
Action
</th>

</tr>

</thead>

<tbody>

{[...rows]

.sort((a,b)=>{

if(!sortField) return 0;

let valA;
let valB;

if(
sortField === "material" ||
sortField === "incoming" ||
sortField === "outgoing"
){

valA = a.latest[sortField];
valB = b.latest[sortField];

}else{

valA = a[sortField];
valB = b[sortField];

}

const numericFields = [
"size",
"gramage",
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

<tr key={index}>

<td>{formatDate(item.date)}</td>

<td>{item.size}</td>

<td>

<Link
to={`/size/${item.size}/gramage/${item.gramage}`}
style={{
textDecoration:"none",
fontWeight:"bold",
color:"#041b47"
}}
>
{item.gramage}
</Link>

</td>

<td>{item.latest.material}</td>

<td>{item.latest.incoming}</td>

<td>{item.latest.outgoing}</td>

<td>{item.balance}</td>

<td>

<button
className="blue"
onClick={()=>onEdit(item.latest)}
>
Modify
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}