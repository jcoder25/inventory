import { Link } from "react-router-dom";

export default function Home({ inventory }){

const groupedSizes = {};

inventory.forEach(item=>{

const size = item.size;

if(!groupedSizes[size]){
groupedSizes[size] = 0;
}

groupedSizes[size] += Number(item.balance || 0);

});

const sizeData = Object.entries(groupedSizes);

return(

<div className="card">

<h2 style={{marginBottom:"24px"}}>
Size Stock Summary
</h2>

<table>

<thead>
<tr>

<th>Sr No</th>
<th>Size</th>
<th>Total Balance</th>

</tr>
</thead>

<tbody>

{sizeData.map(([size,balance],index)=>(

<tr key={size}>

<td>{index + 1}</td>

<td>

<Link
to={`/size/${size}`}
style={{
color:"#0b2b63",
fontWeight:"bold",
textDecoration:"none"
}}
>
{size}
</Link>

</td>

<td>{balance}</td>

</tr>

))}

</tbody>

</table>

</div>

)

}