import { useState } from "react";
import { supabase } from "../supabase";

export default function ResetPassword(){

const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

async function handleReset(){

if(!password){
alert("Enter new password");
return;
}

setLoading(true);

const { error } =
await supabase.auth.updateUser({
password: password
});

setLoading(false);

if(error){
alert(error.message);
}else{
alert("Password updated successfully");
window.location.href = "/";
}

}

return(

<div
style={{
maxWidth:"400px",
margin:"100px auto",
padding:"30px",
background:"#fff",
borderRadius:"12px"
}}
>

<h2>Reset Password</h2>

<input
type="password"
placeholder="Enter new password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginTop:"20px"
}}
/>

<button
onClick={handleReset}
style={{
marginTop:"20px",
padding:"12px 20px",
background:"#f4b400",
border:"none",
borderRadius:"8px",
fontWeight:"bold",
cursor:"pointer"
}}
>

{loading ? "Updating..." : "Update Password"}

</button>

</div>

);

}