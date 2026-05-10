export function validateInventory(
form,
inventory,
editingId
){

if(
!form.date ||
!form.size ||
!form.gramage ||
!form.material ||
!form.rollNo ||
form.incoming === ""
){
return "Please fill all required fields";
}

if(!/^[A-Za-z ]*$/.test(form.material)){
return "Material name should contain only letters";
}

const duplicate = inventory.find(
item =>
item.rollNo === form.rollNo &&
item.id !== editingId
);

if(duplicate){
return "Duplicate roll number not allowed";
}

if(
Number(form.outgoing || 0) >
Number(form.incoming || 0)
){
return "Outgoing cannot exceed incoming";
}

return "";

}