
export default function Dashboard({inventory,materials}){

const totalBalance = inventory.reduce(
(acc,item)=>acc + item.balance,
0
);

return(
<div>

<div className="cards">

<div className="card">
<h3>Total Rolls</h3>
<h1>{inventory.length}</h1>
</div>

<div className="card">
<h3>Total Balance</h3>
<h1>{totalBalance}</h1>
</div>

<div className="card">
<h3>Materials</h3>
<h1>{materials.length}</h1>
</div>

</div>

</div>
)
}
