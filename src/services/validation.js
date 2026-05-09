export function validateInventory(
form,
inventory,
editingId
){

// Required fields

if(
!form.date ||
!form.size ||
!form.gramage ||
!form.material ||
!form.rollNo ||
form.incoming === "" ||
form.outgoing === ""
){
return "Please fill all required fields";
}

// Material validation

if(!/^[A-Za-z ]*$/.test(form.material)){
return "Material name should contain only letters";
}

// Duplicate roll validation

const duplicate = inventory.find(
item =>
item.rollNo === form.rollNo &&
item.id !== editingId
);

if(duplicate){
return "Duplicate roll number not allowed";
}

// Outgoing validation

if(
Number(form.outgoing) >
Number(form.incoming)
){
return "Outgoing cannot exceed incoming";
}

return "";
}
