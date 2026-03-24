function CarMechanicForm({ problem, setProblem, setPrice }) {

  const mechanicProblems = [
    { name: "Engine Service", price: 1500 },
    { name: "Oil Change", price: 800 },
    { name: "Brake Issue", price: 1000 }
  ];

  return (
    <select
      value={problem}
      onChange={(e) => {
        const selected = mechanicProblems.find(
          (i) => i.name === e.target.value
        );
        setProblem(e.target.value);
        if (selected) setPrice(selected.price);
      }}
      className="border p-3 w-full"
    >
      <option value="">Select Car Issue</option>
      {mechanicProblems.map((item, i) => (
        <option key={i} value={item.name}>
          {item.name} - ₹{item.price}
        </option>
      ))}
    </select>
  );
}

export default CarMechanicForm;