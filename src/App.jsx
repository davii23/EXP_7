import React, { useState } from "react";

function App() {
  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(loan);
    const annualRate = parseFloat(rate);
    const N = parseInt(tenure);

    if (isNaN(P) || isNaN(annualRate) || isNaN(N) || P <= 0 || annualRate <= 0 || N <= 0) {
      alert("Please enter valid positive values for all fields.");
      return;
    }

    const R = annualRate / 12 / 100; // monthly rate
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emiValue * N;
    const interest = totalAmount - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(interest.toFixed(2));
  };

  return (
    <div className="container mt-5 p-4 rounded shadow bg-light text-center">
      <h2 className="mb-4">React JS EMI Calculator</h2>

      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Enter Loan Amount"
          value={loan}
          onChange={(e) => setLoan(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Enter Annual Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Enter Loan Tenure (in months)"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100" onClick={calculateEMI}>
        Calculate EMI
      </button>

      {emi && (
        <div className="mt-4">
          <h5>Results</h5>
          <p>Loan Amount: ₹{loan}</p>
          <p>EMI: ₹{emi}</p>
          <p>Total Interest to be Paid: ₹{totalInterest}</p>
        </div>
      )}
    </div>
  );
}

export default App;
