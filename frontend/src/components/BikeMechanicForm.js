function BikeMechanicForm({ problem, setProblem }) {
  return (
    <select
      value={problem}
      onChange={(e) => setProblem(e.target.value)}
      className="border p-3 w-full"
    >
      <option value="">Select Bike Service</option>

      <optgroup label="Core Services">
        <option>Engine Oil Change</option>
        <option>Chain Lubrication</option>
        <option>Brake Adjustment</option>
      </optgroup>

      <optgroup label="Repairs">
        <option>Carburetor Cleaning</option>
        <option>Engine Overhaul</option>
      </optgroup>
    </select>
  );
}

export default BikeMechanicForm;