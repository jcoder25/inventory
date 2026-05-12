import { useState } from "react";
import { supabase } from "../supabase";

export default function ResetPassword(){

const [password,setPassword] = useState("");

async function updatePassword(){

const { error } = await supabase.auth.updateUser({
password
});

if(error){
alert(error.message);
}else{
alert("Password updated successfully");
window.location.href="/";
}

}

return(

<div className="card">

<h2>Reset Password</h2>

<input
type="password"
placeholder="Enter new password"
className="input"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="primary"
onClick={updatePassword}
>
Update Password
</button>

</div>

);

}