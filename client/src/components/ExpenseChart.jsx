import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseChart({ expenses }) {

  // 🧠 Step 1: Group data by month + category
  const dataMap = {};

  expenses.forEach((exp) => {
    if (!exp.date || !exp.category) return;

    const month = new Date(exp.date).toLocaleString("default", {
      month: "long",
    });

    if (!dataMap[month]) dataMap[month] = {};

    if (!dataMap[month][exp.category]) {
      dataMap[month][exp.category] = 0;
    }

    dataMap[month][exp.category] += Number(exp.amount);
  });

  // 🧠 Step 2: Convert to array
  const data = Object.keys(dataMap).map((month) => ({
    month,
    ...dataMap[month],
  }));

  // 🧠 Step 3: Sort months correctly
  const monthOrder = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  data.sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  // 🧠 Step 4: Get unique categories
  const categories = [
    ...new Set(expenses.map(e => e.category).filter(Boolean))
  ];

  // 🎨 Colors
  const colors = [
    "#f87171", "#60a5fa", "#34d399",
    "#fbbf24", "#a78bfa", "#fb923c"
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl shadow mt-6">
      <h2 className="text-lg font-bold text-center mb-4">
        Monthly Category Analysis 📊
      </h2>

      <ResponsiveContainer width="50%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          {categories.map((cat, index) => (
            <Bar
              key={cat}
              dataKey={cat}
              fill={colors[index % colors.length]}
            />
          ))}

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}