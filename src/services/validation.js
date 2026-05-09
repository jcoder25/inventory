export function validateInventory(form, inventory){

// Required fields validation

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

// Duplicate roll number

const duplicate = inventory.find(
item => item.rollNo === form.rollNo
);

if(duplicate){
return "Duplicate roll number not allowed";
}

// Negative balance prevention

if(Number(form.outgoing) > Number(form.incoming)){
return "Outgoing cannot exceed incoming";
}

return "";
}
