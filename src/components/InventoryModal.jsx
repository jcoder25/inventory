
export default function InventoryModal({
form,
setForm,
onSave,
onClose,
error,
materials
}){

return(
<div className="modal">

<div className="modal-box">

<h2>Add Inventory</h2>

{error && (
<div className="error">
{error}
</div>
)}

<div className="grid">

<input
className="input"
type="date"
value={form.date}
onChange={(e)=>setForm({...form,date:e.target.value})}
/>

<input
className="input"
placeholder="Size"
value={form.size}
onChange={(e)=>setForm({...form,size:e.target.value})}
/>

<input
className="input"
placeholder="Gramage"
value={form.gramage}
onChange={(e)=>setForm({...form,gramage:e.target.value})}
/>

<select
className="input"
value={form.material}
onChange={(e)=>setForm({...form,material:e.target.value})}
>
<option value="">Select Material</option>

{materials.map(item=>(
<option key={item.id}>
{item.name}
</option>
))}

</select>

<input
className="input"
placeholder="Roll No"
value={form.rollNo}
onChange={(e)=>setForm({...form,rollNo:e.target.value})}
/>

<input
className="input"
placeholder="Incoming Supply"
value={form.incoming}
onChange={(e)=>setForm({...form,incoming:e.target.value})}
/>

<input
className="input"
placeholder="Outgoing Supply"
value={form.outgoing}
onChange={(e)=>setForm({...form,outgoing:e.target.value})}
/>

<input
className="input"
disabled
value={
(Number(form.incoming || 0) -
Number(form.outgoing || 0))
}
/>

</div>

<textarea
className="input"
rows="4"
placeholder="Remarks"
value={form.remarks}
onChange={(e)=>setForm({...form,remarks:e.target.value})}
/>

<div style={{display:"flex",gap:"12px"}}>

<button className="green" onClick={onSave}>
Save
</button>

<button className="red" onClick={onClose}>
Cancel
</button>

</div>

</div>

</div>
)
}
