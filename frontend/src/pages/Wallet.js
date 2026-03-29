import React from "react";
import API from "../services/api";

function Wallet() {
  const [showModal, setShowModal] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [selected, setSelected] = React.useState(null);

  const [balance, setBalance] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);
  const [card, setCard] = React.useState("**** 4242");
  const [visible, setVisible] = React.useState(3);

  // 🔥 FETCH WALLET
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h2 className="text-2xl font-bold">AutoAssist Wallet</h2>
      <p className="text-gray-500 mb-6">
        Manage your wallet balance and transactions
      </p>

      <div className="grid grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="space-y-4">

          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 rounded-xl shadow">
            <p className="text-sm">Wallet Balance</p>
            <h3 className="text-3xl font-bold mt-2">₹{balance}.00</h3>

            <button
              onClick={() => setShowModal(true)}
              className="mt-4 w-full bg-white text-blue-600 py-2 rounded"
            >
              + Add Money
            </button>
          </div>

          {/* QUICK */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-3">Quick Actions</h3>

            <button
              type="button"
              onClick={() => alert("Rewards & Offers clicked 🎁")}
              className="w-full border p-2 rounded mb-2 text-left"
            >
              Rewards & Offers
            </button>

            <button
              type="button"
              onClick={() => alert("Linked Cards clicked 💳")}
              className="w-full border p-2 rounded text-left"
            >
              Linked Cards
            </button>
          </div>

          {/* LOYALTY */}
          <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-xl">
            <h3 className="font-semibold mb-2">Loyalty Points</h3>

            <p className="text-2xl font-bold text-yellow-600">2,450</p>

            <button
              type="button"
              onClick={() => alert("Points Redeemed 🎉")}
              className="w-full border p-2 rounded bg-white"
            >
              Redeem Points
            </button>
          </div>

        </div>

        {/* RIGHT */}
        <div className="col-span-2 space-y-4">

          {/* TRANSACTIONS */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-1">Transaction History</h3>

            {transactions
              .slice()
              .reverse()
              .slice(0, visible)
              .map((t, i) => (
                <div key={i} className="flex justify-between items-center border p-3 rounded mb-2">
                  <p>{t.description}</p>

                  <p className={t.type === "credit" ? "text-green-600" : "text-red-500"}>
                    {t.type === "credit"
                      ? `+₹${t.amount}`
                      : `-₹${t.amount}`}
                  </p>
                </div>
              ))}

            <button
              type="button"
              onClick={() => setVisible((prev) => prev + 2)}
              className="w-full border p-2 rounded"
            >
              Load More
            </button>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">

          <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold">Add Money</h2>

            {/* QUICK */}
            <div className="flex gap-2 mb-4 mt-4">
              {[50, 100, 200].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setAmount(val);
                    setSelected(val);
                  }}
                  className={`border px-4 py-2 rounded ${
                    selected === val ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  ₹{val}
                </button>
              ))}
            </div>

            {/* INPUT */}
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setSelected(null);
              }}
              className="w-full border p-2 rounded mb-4"
            />

            {/* CARD */}
            <div className="flex justify-between mb-4">
              <span>💳 {card}</span>

              <button
                onClick={() =>
                  setCard((prev) =>
                    prev === "**** 4242" ? "**** 1111" : "**** 4242"
                  )
                }
                className="text-blue-600 text-sm"
              >
                Change
              </button>
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!amount || Number(amount) <= 0) {
                    alert("Enter valid amount ❌");
                    return;
                  }

                  try {
                    const res = await API.post("/wallet/add", {
                      amount: Number(amount),
                    });

                    setBalance(res.data.data.balance);
                    setTransactions(res.data.data.transactions);

                    alert("Money added ✅");

                    setShowModal(false);
                    setAmount("");
                    setSelected(null);
                  } catch (err) {
                    console.log(err);
                    alert("Error ❌");
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Money
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Wallet;