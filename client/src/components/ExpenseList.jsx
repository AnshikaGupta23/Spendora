export default function ExpenseList({ expenses }) {
  return (
    <div className="mt-6 space-y-3">
      {expenses.map((exp) => (
        <div
  key={exp._id}
  className="bg-white p-4 rounded-xl shadow hover:shadow-xl hover:scale-105 transition duration-300"
>
  <h3 className="font-semibold">{exp.title}</h3>
  <p>₹{exp.amount}</p>
  <p className="text-sm text-blue-500">{exp.category}</p>
</div>
      ))}
    </div>
  );
}