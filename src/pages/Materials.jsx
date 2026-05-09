
export default function Materials({
materials,
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

<h2>Materials Master</h2>

<button
className="green"
onClick={onAdd}
>
Add Material
</button>

</div>

<table>

<thead>
<tr>
<th>Name</th>
<th>Threshold</th>
<th>Remarks</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{materials.map(item=>(
<tr key={item.id}>

<td>{item.name}</td>
<td>{item.threshold}</td>
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
