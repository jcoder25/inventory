
export default function Inventory({
inventory,
onDelete,
onAdd
}){

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

<table>

<thead>
<tr>
<th>Date</th>
<th>Material</th>
<th>Roll</th>
<th>Balance</th>
<th>Remarks</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{inventory.map(item=>(
<tr key={item.id}>

<td>{item.date}</td>
<td>{item.material}</td>
<td>{item.rollNo}</td>
<td>{item.balance}</td>
<td>{item.remarks}</td>

<td>
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
