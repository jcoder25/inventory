import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./supabase";
import GramageDetails from "./pages/GramageDetails";
import ResetPassword from "./pages/ResetPassword";



import Sidebar from "./components/Sidebar";
import InventoryModal from "./components/InventoryModal";
import MaterialModal from "./components/MaterialModal";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Materials from "./pages/Materials";
import Activity from "./pages/Activity";
import Settings from "./pages/Settings";

import Home from "./pages/Home";
import SizeDetails from "./pages/SizeDetails";

import { validateInventory } from "./services/validation";

import Auth from "./pages/Auth";

export default function App(){

const [materials,setMaterials] = useState([]);
const [inventory,setInventory] = useState([]);

const[session,setSession] = useState(null);
const[loading,setLoading] = useState(true);

const [showInventory,setShowInventory] = useState(false);
const [showMaterial,setShowMaterial] = useState(false);
  
const [editingId,setEditingId] = useState(null);

const [error,setError] = useState("");

const [inventoryForm,setInventoryForm] = useState({
date:"",
size:"",
gramage:"",
material:"",
rollNo:"",
incoming:"",
outgoing:"",
remarks:""
});

const [materialForm,setMaterialForm] = useState({
name:"",
threshold:"",
remarks:""
});


useEffect(()=>{

supabase.auth.getSession()
.then(({ data:{ session } })=>{

setSession(session);

if(session){
fetchInventory();
fetchMaterials();
}

setLoading(false);

});

const {
data:{ subscription }
} = supabase.auth.onAuthStateChange(
(_,session)=>{

setSession(session);

if(session){
fetchInventory();
fetchMaterials();
}

}
);

return ()=>subscription.unsubscribe();

},[]);


  
async function saveInventory(){

const {
data:{ user }
} = await supabase.auth.getUser();

const validationError = validateInventory(
inventoryForm,

inventory,
editingId
);

if(validationError){
setError(validationError);
return;
}

const payload = {
id:Date.now(),
...inventoryForm,
balance: Number(
(
Number(inventoryForm.incoming || 0) -
Number(inventoryForm.outgoing || 0)
).toFixed(2)
)
};


if(editingId !== null){
  
const { error } = await supabase
.from("inventory")
.update({
entry_date: inventoryForm.date,
size: Number(inventoryForm.size),
gramage: Number(inventoryForm.gramage),
material: inventoryForm.material,
roll_no: Number(inventoryForm.rollNo),
incoming: Number(inventoryForm.incoming),
outgoing: Number(inventoryForm.outgoing || 0),
balance: payload.balance,
remarks: inventoryForm.remarks
})
.eq("id", editingId);

if(error){
setError(error.message);
return;
}

await fetchInventory();

}else{

const { error } = await supabase
.from("inventory")
.insert([
{
entry_date: inventoryForm.date,
size: Number(inventoryForm.size),
gramage: Number(inventoryForm.gramage),
material: inventoryForm.material,
roll_no: Number(inventoryForm.rollNo),
incoming: Number(inventoryForm.incoming),
outgoing: Number(inventoryForm.outgoing || 0),
balance: payload.balance,
remarks: inventoryForm.remarks,
user_id : user.id

}
]);

if(error){
setError(error.message);
return;
}
await fetchInventory();
}

setInventoryForm({
date:"",
size:"",
gramage:"",
material:"",
rollNo:"",
incoming:"",
outgoing:"",
remarks:""
});

setError("");

setShowInventory(false);

setEditingId(null);

}

async function deleteInventory(id)
{

await supabase
.from("inventory")
.delete()
.eq("id",id);

await fetchInventory();

}
  
async function fetchInventory(){

const {
data:{ user }
} = await supabase.auth.getUser();

if(!user) return;

const { data, error } = await supabase
.from("inventory")

.select("*")
.eq("user_id",user.id)
.order("id",{ascending:false});

if(error){
console.log(error);
return;
}

if(data){

const formatted = data.map(item=>({
id:item.id,
date:item.entry_date,
size:item.size,
gramage:item.gramage,
material:item.material,
rollNo:item.roll_no,
incoming:item.incoming,
outgoing:item.outgoing,
balance:item.balance,
remarks:item.remarks
}));

setInventory(formatted);

}
}


async function fetchMaterials(){

const {
data:{ user }
} = await supabase.auth.getUser();

if(!user) return;

const { data, error } = await supabase
.from("materials")
.select("*")
.eq("user_id",user.id)
.order("id",{ascending:false});

if(error){
console.log(error);
return;
}

if(data){
setMaterials(data);
}

}


function editInventory(item)
{

setInventoryForm(item);

setEditingId(item.id);

setShowInventory(true);

}

function addStockWithPrefill(item){

if(!item) return;

setInventoryForm({

date:new Date().toISOString().split("T")[0],

size:item.size || "",

gramage:item.gramage || "",

material:item.material || "",

rollNo:"",

incoming:"",

outgoing:"",

remarks:""

});

setEditingId(null);

setShowInventory(true);

}

async function saveMaterial(){

const {
data:{ user }
} = await supabase.auth.getUser();

const { error } = await supabase
.from("materials")
.insert([
{
name: materialForm.name,

threshold: Number(materialForm.threshold),

remarks: materialForm.remarks,

user_id:user.id
}
]);

if(error){
console.log(error);
return;
}

await fetchMaterials();

setMaterialForm({
name:"",
threshold:"",
remarks:""
});

setShowMaterial(false);

}

if(loading){
return <h2>Loading...</h2>;
}

if(!session){
return <Auth />;
}


return(
<div className="layout">

<Sidebar />

<div className="content">
  
<Routes>

<Route
path="/reset-password"
element={<ResetPassword />}
/>


<Route
path="/"
element={
<Home inventory={inventory} />
}
/>

<Route
path="/size/:size/gramage/:gramage"
element={
<GramageDetails
inventory={inventory}
onEdit={editInventory}
onDelete={deleteInventory}
onAddStock={addStockWithPrefill}
/>
}
/>


<Route
path="/size/:size"
element={
<SizeDetails
inventory={inventory}
onEdit={editInventory}
onAddStock={addStockWithPrefill}
/>
}
/>


<Route
path="/dashboard"
element={
<Dashboard
inventory={inventory}
materials={materials}
/>
}
/>

<Route
path="/inventory"
element={
<Inventory
inventory={inventory}
onDelete={deleteInventory}
onAdd={()=>setShowInventory(true)}
onEdit={editInventory}
/>
}
/>

<Route
path="/materials"
element={
<Materials
materials={materials}
onDelete={async(id)=>{

await supabase
.from("materials")
.delete()
.eq("id",id);

fetchMaterials();

}}
onAdd={()=>setShowMaterial(true)}
/>
}
/>

<Route
path="/activity"
element={<Activity />}
/>

<Route
path="/settings"
element={<Settings />}
/>

</Routes>
</div>

{showInventory && (
<InventoryModal
form={inventoryForm}
setForm={setInventoryForm}
onSave={saveInventory}
onClose={()=>setShowInventory(false)}
error={error}
materials={materials}
/>
)}

{showMaterial && (
<MaterialModal
form={materialForm}
setForm={setMaterialForm}
onSave={saveMaterial}
onClose={()=>setShowMaterial(false)}
/>
)}

</div>
)
}
