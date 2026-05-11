import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer,
Legend,
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid
} from "recharts";

export default function Dashboard({
inventory,
materials
}){

// TOTALS

const totalRolls = inventory.length;

const totalBalance = inventory.reduce(
(sum,item)=>
sum + Number(item.balance || 0),
0
);

// MATERIAL PIE DATA

const materialMap = {};

inventory.forEach(item=>{

const material =
(item.material || "Unknown")
.toLowerCase();

if(!materialMap[material]){
materialMap[material] = 0;
}

materialMap[material] +=
Number(item.balance || 0);

});

const pieData = Object.entries(materialMap)
.map(([name,value])=>({
name,
value
}));

// SIZE BAR DATA

const sizeMap = {};

inventory.forEach(item=>{

const size = item.size || "Unknown";

if(!sizeMap[size]){
sizeMap[size] = 0;
}

sizeMap[size] +=
Number(item.balance || 0);

});

const barData = Object.entries(sizeMap)
.map(([size,balance])=>({
size,
balance
}))
.sort((a,b)=>
Number(a.size) - Number(b.size)
);

// RECENT INVENTORY

const recentInventory = [...inventory]
.slice(0,5);

// COLORS

const COLORS = [
"#f4b400",
"#4285f4",
"#0f9d58",
"#db4437",
"#7e57c2",
"#ff7043",
"#26c6da"
];

return(

<div>

{/* TOP CARDS */}

<div className="cards">

<div className="card">
<h3>Total Rolls</h3>
<h1>{totalRolls}</h1>
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

{/* CHART SECTION */}

<div className="dashboard-charts">

{/* PIE CHART */}

<div className="card chart-card">

<h2 className="chart-title">
Material Distribution
</h2>

<div className="chart-container">

<ResponsiveContainer>

<PieChart>

<Pie
data={pieData}
dataKey="value"
nameKey="name"
cx="50%"
cy="50%"
outerRadius={120}
label
>

{pieData.map((entry,index)=>(

<Cell
key={index}
fill={COLORS[index % COLORS.length]}
/>

))}

</Pie>

<Tooltip
formatter={(value,name)=>[
`${value} balance`,
name
]}
/>

<Legend />

</PieChart>

</ResponsiveContainer>

</div>

</div>

{/* BAR CHART */}

<div className="card chart-card">

<h2 className="chart-title">
Size-wise Balance
</h2>

<div className="chart-container">

<ResponsiveContainer>

<BarChart data={barData}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="size" />

<YAxis />

<Tooltip />

<Bar
dataKey="balance"
fill="#4285f4"
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

</div>

{/* RECENT INVENTORY */}

<div className="card">

<h2 style={{
marginBottom:"20px"
}}>
Recent Inventory Entries
</h2>

<table>

<thead>

<tr>

<th>Date</th>
<th>Size</th>
<th>Gramage</th>
<th>Material</th>
<th>Balance</th>

</tr>

</thead>

<tbody>

{recentInventory.map(item=>(

<tr key={item.id}>

<td>{item.date}</td>
<td>{item.size}</td>
<td>{item.gramage}</td>
<td>{item.material}</td>
<td>{item.balance}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}