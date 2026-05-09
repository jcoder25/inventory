
export function validateInventory(form, inventory){

const duplicate = inventory.find(
item => item.rollNo === form.rollNo
);

if(duplicate){
return "Duplicate roll number not allowed";
}

if(Number(form.outgoing) > Number(form.incoming)){
return "Outgoing cannot exceed incoming";
}

return "";
}
