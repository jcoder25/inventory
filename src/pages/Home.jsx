import { Link } from "react-router-dom";

export default function Home({ inventory }){

const grouped = {};

inventory.forEach(item=>{

const size = item.size;

if(!grouped[size]){
grouped[size] = 0;
}

grouped[size] += Number(item.balance);

});

const rows = Object.entries(grouped);


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

<h2>Size Summary</h2>

<table>

<thead>

<tr>

<th>Sr No</th>

<th>Size</th>

<th>Total Balance</th>

</tr>

</thead>

<tbody>

{rows.map(([size,total],index)=>(

<tr key={size}>

<td>{index + 1}</td>

<td>

<Link
to={`/size/${size}`}
style={{
textDecoration:"none",
fontWeight:"bold",
color:"#041b47"
}}
>
{size}
</Link>

</td>

<td>{total}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}