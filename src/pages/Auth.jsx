import { useState } from "react";
import { supabase } from "../supabase";

export default function Auth(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

async function handleSignup(){

setLoading(true);

const { error } = await supabase.auth.signUp({
email,
password
});

if(error){
alert(error.message);
}else{
alert("Signup successful");
}

setLoading(false);

}

async function handleLogin(){

setLoading(true);

const { error } = await supabase.auth.signInWithPassword({
email,
password
});

if(error){
alert(error.message);
}else{
alert("Login successful");
}

setLoading(false);

}

return(

<div className="auth-container">

<div className="auth-box">

<h2>Welcome to Stockonomy</h2>

<input
type="email"
placeholder="Enter email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="input"
/>

<input
type="password"
placeholder="Enter password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="input"
/>

<div className="auth-buttons">

<button
className="primary"
onClick={handleLogin}
>
Login
</button>

<button
className="green"
onClick={handleSignup}
>
Signup
</button>

<p
className="forgot-password"
onClick={handleForgotPassword}
>
Forgot Password?
</p>

</div>


</div>

</div>

)

async function handleForgotPassword(){

if(!email){
alert("Please enter your email first");
return;
}

const { error } = await supabase.auth.resetPasswordForEmail(
email,
{
redirectTo:"https://inventory-6eid.vercel.app/reset-password"
}
);

if(error){
alert(error.message);
}else{
alert("Password reset email sent");
}

}
}