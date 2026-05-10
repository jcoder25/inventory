import { Link, useParams } from "react-router-dom";

export default function SizeDetails({
inventory,
onEdit,
onAddStock
}){

const { size } = useParams();

const grouped = {};

inventory
.filter(item => String(item.size) === size)
.forEach(item=>{

const key = item.gramage;

if(!grouped[key]){

grouped[key] = {
size:item.size,
gramage:item.gramage,
material:item.material,
balance:0,
latest:item
};

}

grouped[key].balance += Number(item.balance);

});

const rows = Object.values(grouped);

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

<th>Sr No</th>

<th>Size</th>

<th>Gramage</th>

<th>Total Balance</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{rows.map((item,index)=>(

<tr key={index}>

<td>{index + 1}</td>

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