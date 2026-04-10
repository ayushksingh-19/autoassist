import React from "react";
import API from "../services/api";

function WalletV2() {
  const [showModal, setShowModal] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const [balance, setBalance] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);
  const card = "**** 4242";
  const [visible, setVisible] = React.useState(4);

  React.useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await API.get("/wallet");
      setBalance(res.data.data.balance);
      setTransactions(res.data.data.transactions);
    } catch (err) {
      console.log(err);
    }
  };

  const addMoney = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    try {
      const res = await API.post("/wallet/add", { amount: Number(amount) });
      setBalance(res.data.data.balance);
      setTransactions(res.data.data.transactions);
      setShowModal(false);
      setAmount("");
      setSelected(null);
    } catch (err) {
      console.log(err);
      alert("Unable to add money right now.");
    }
  };

  return (
    <main className="page-shell app-grid">
      <section className="hero-card" style={{ padding: "36px" }}>
        <span className="eyebrow">Wallet</span>
        <h1 className="section-title">Your wallet</h1>
        <p className="section-copy">Balance, cards, and transactions.</p>
      </section>

      <section className="stat-strip">
        <div className="stat-card">
          <strong>Rs {balance}</strong>
          <span>Available balance</span>
        </div>
        <div className="stat-card">
          <strong>{transactions.length}</strong>
          <span>Total transactions</span>
        </div>
        <div className="stat-card">
          <strong>2450</strong>
          <span>Loyalty points</span>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 0.85fr) minmax(0, 1.15fr)",
          gap: "18px",
          alignItems: "start",
        }}
      >
        <div className="app-grid">
          <article className="list-card">
            <span className="eyebrow">Balance Card</span>
            <h2 style={{ margin: "18px 0 6px" }}>AutoAssist Wallet</h2>
            <p className="section-copy">Use wallet balance for faster checkout on future services.</p>
            <p style={{ margin: "18px 0 0", fontSize: "2.4rem", fontWeight: 800 }}>Rs {balance}.00</p>

            <div className="inline-actions" style={{ marginTop: "18px" }}>
              <button type="button" className="primary-btn" onClick={() => setShowModal(true)}>
                Add Money
              </button>
              <button type="button" className="secondary-btn">
                {card}
              </button>
            </div>
          </article>

          <article className="list-card">
            <h3 style={{ marginTop: 0 }}>Quick Actions</h3>
            <div className="app-grid" style={{ gap: "12px" }}>
              <button type="button" className="secondary-btn" style={{ textAlign: "left" }}>
                Rewards & Offers
              </button>
              <button type="button" className="secondary-btn" style={{ textAlign: "left" }}>
                Linked Cards
              </button>
              <button type="button" className="secondary-btn" style={{ textAlign: "left" }}>
                Redeem Loyalty Points
              </button>
            </div>
          </article>
        </div>

        <article className="list-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 6px" }}>Transaction History</h3>
              <p className="section-copy">Recent wallet activity and service payments.</p>
            </div>
          </div>

          <div className="app-grid" style={{ marginTop: "18px", gap: "12px" }}>
            {transactions
              .slice()
              .reverse()
              .slice(0, visible)
              .map((transaction, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    alignItems: "center",
                    padding: "16px",
                    borderRadius: "16px",
                    border: "1px solid var(--line)",
                    background: "rgba(255, 255, 255, 0.68)",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: 700 }}>{transaction.description}</p>
                    <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>{transaction.type}</p>
                  </div>

                  <strong style={{ color: transaction.type === "credit" ? "var(--teal)" : "var(--text)" }}>
                    {transaction.type === "credit" ? `+Rs ${transaction.amount}` : `-Rs ${transaction.amount}`}
                  </strong>
                </div>
              ))}
          </div>

          <button
            type="button"
            className="secondary-btn"
            style={{ marginTop: "18px", width: "100%" }}
            onClick={() => setVisible((prev) => prev + 3)}
          >
            Load More
          </button>
        </article>
      </section>

      {showModal ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.32)",
            display: "grid",
            placeItems: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div className="surface-card" style={{ padding: "24px", width: "min(420px, 100%)" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <h3 style={{ margin: 0 }}>Add Money</h3>
              <button type="button" className="link-btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>

            <div className="chip-row" style={{ marginTop: "18px" }}>
              {[100, 250, 500].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={selected === value ? "primary-btn" : "secondary-btn"}
                  onClick={() => {
                    setAmount(value);
                    setSelected(value);
                  }}
                >
                  Rs {value}
                </button>
              ))}
            </div>

            <div className="field" style={{ marginTop: "18px" }}>
              <label htmlFor="wallet-amount">Amount</label>
              <input
                id="wallet-amount"
                type="number"
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                  setSelected(null);
                }}
              />
            </div>

            <div className="inline-actions" style={{ marginTop: "20px" }}>
              <button type="button" className="secondary-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="button" className="primary-btn" onClick={addMoney}>
                Add Money
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default WalletV2;
