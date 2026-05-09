import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import InventoryModal from "./components/InventoryModal";
import MaterialModal from "./components/MaterialModal";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Materials from "./pages/Materials";
import Activity from "./pages/Activity";
import Settings from "./pages/Settings";

import { validateInventory } from "./services/validation";

export default function App(){

const [materials,setMaterials] = useState([]);
const [inventory,setInventory] = useState([]);

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

function saveInventory(){

const validationError = validateInventory(
inventoryForm,
inventory
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
Number(inventoryForm.incoming) -
Number(inventoryForm.outgoing)
).toFixed(2)
)
};

if(editingId){

setInventory(
inventory.map(item =>
item.id === editingId
? { ...payload, id: editingId }
: item
)
);

}else{

setInventory([...inventory,payload]);

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

function editInventory(item)
{

setInventoryForm(item);

setEditingId(item.id);

setShowInventory(true);

}

function saveMaterial(){

setMaterials([
...materials,
{
id:Date.now(),
...materialForm
}
]);

setMaterialForm({
name:"",
threshold:"",
remarks:""
});

setShowMaterial(false);
}

return(
<div className="layout">

<Sidebar />

<div className="content">

<Routes>

<Route
path="/"
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
onDelete={(id)=>
setInventory(
inventory.filter(i=>i.id !== id)
)
}
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
onDelete={(id)=>
setMaterials(
materials.filter(i=>i.id !== id)
)
}
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
