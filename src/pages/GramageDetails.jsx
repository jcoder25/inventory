import { useParams } from "react-router-dom";

export default function GramageDetails({
inventory,
onEdit,
onDelete,
onAddStock
}){

const { size, gramage } = useParams();

const filtered = inventory.filter(item =>

String(item.size) === size &&
String(item.gramage) === gramage

);

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

<th>Sr No</th>
<th>Size</th>
<th>Gramage</th>
<th>Material</th>
<th>Incoming</th>
<th>Outgoing</th>
<th>Total Balance</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{filtered.map((item,index)=>(

<tr key={item.id}>

<td>{index + 1}</td>
<td>{item.size}</td>
<td>{item.gramage}</td>
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