import { useParams } from "react-router-dom";

export default function SizeDetails({
inventory,
onEdit,
onAddStock
}){

const { size } = useParams();

const filtered = inventory.filter(
item => String(item.size) === String(size)
);

const grouped = {};

filtered.forEach(item=>{

const key = item.gramage;

if(!grouped[key]){

grouped[key] = {
gramage:item.gramage,
balance:0,
sample:item
};

}

grouped[key].balance += Number(item.balance || 0);

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

<h2>
Size {size} Summary
</h2>

<button
className="primary"
onClick={()=>onAddStock({
size:size
})}
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

<td>{size}</td>

<td>{item.gramage}</td>

<td>{item.balance}</td>

<td>

<button
className="green"
onClick={()=>onAddStock(item.sample)}
style={{marginRight:"10px"}}
>
Add Stock
</button>

<button
className="primary"
onClick={()=>onEdit(item.sample)}
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