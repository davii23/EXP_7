import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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

    const R = annualRate / 12 / 100;
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emiValue * N;
    const interest = totalAmount - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(interest.toFixed(2));
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">💰 EMI Calculator</h2>
          <p className="text-muted mb-0">Estimate your monthly loan repayment</p>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Loan Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter loan amount"
            value={loan}
            onChange={(e) => setLoan(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Interest Rate (%)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter annual interest rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Tenure (Months)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter loan tenure"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </div>

        <button
          className="btn btn-gradient w-100 fw-semibold py-2 mt-2"
          onClick={calculateEMI}
          style={{
            background: "linear-gradient(90deg, #2575fc, #6a11cb)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.9")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Calculate EMI
        </button>

        {emi && (
          <div className="mt-4 bg-light p-3 rounded text-center shadow-sm">
            <h5 className="fw-bold text-success mb-3">📊 Result Summary</h5>
            <p className="mb-1"><strong>Loan Amount:</strong> ₹{loan}</p>
            <p className="mb-1"><strong>Monthly EMI:</strong> ₹{emi}</p>
            <p className="mb-0"><strong>Total Interest:</strong> ₹{totalInterest}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
