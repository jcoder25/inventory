
export default function MaterialModal({
form,
setForm,
onSave,
onClose
}){

return(
<div className="modal">

<div className="modal-box">

<h2>Add Material</h2>

<input
className="input"
placeholder="Material Name"
value={form.name}
onChange={(e)=>setForm({...form,name:e.target.value})}
/>

<input
className="input"
placeholder="Threshold"
value={form.threshold}
onChange={(e)=>setForm({...form,threshold:e.target.value})}
/>

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
