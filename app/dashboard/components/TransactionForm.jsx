"use client";
import React from 'react';
import { useState } from 'react';

const TransactionForm = () => {
  const [transactions, setTransactions] = useState([
    { account_number: "", amount: 0, transaction_type: "", category: "", description: "" },
  ]);

  const handleAddTransaction = () => {
    setTransactions([
      ...transactions,
      { account_number: "", amount: 0, transaction_type: "", category: "", description: "" },
    ]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen"> {/* Centering div */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <p className="text-gray-600 mb-8">
          Enter your daily transactions, current debt, financial goals, and banks you use.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Daily Transactions</h2>
          {transactions.map((transaction, index) => (
            <div key={index} className="mb-4">
              <label>Account Number:</label>
              <input
                type="number"
                placeholder="Account (as number)"
                className="border p-2 mr-2"
                value={transaction.account}
                onChange={(e) =>
                  setTransactions(
                    transactions.map((t, i) =>
                      i === index ? { ...t, account: parseInt(e.target.value) } : t
                    )
                  )
                }
              />
              <label>Amount:</label>
              <input
                type="number"
                placeholder="Amount"
                className="border p-2 mr-2"
                value={transaction.amount}
                onChange={(e) =>
                  setTransactions(
                    transactions.map((t, i) =>
                      i === index ? { ...t, amount: e.target.value } : t
                    )
                  )
                }
              />
              <label>Transaction Type:</label>
              <input
                type="text"
                placeholder="Transaction Type (e.g., income)"
                className="border p-2 mr-2"
                value={transaction.transaction_type}
                onChange={(e) =>
                  setTransactions(
                    transactions.map((t, i) =>
                      i === index ? { ...t, transaction_type: e.target.value } : t
                    )
                  )
                }
              />
              <label>Category:</label>
              <input
                type="text"
                placeholder="Category (e.g., salary)"
                className="border p-2 mr-2"
                value={transaction.category}
                onChange={(e) =>
                  setTransactions(
                    transactions.map((t, i) =>
                      i === index ? { ...t, category: e.target.value } : t
                    )
                  )
                }
              />
              <label>Description:</label>
              <input
                type="text"
                placeholder="Description"
                className="border p-2"
                value={transaction.description}
                onChange={(e) =>
                  setTransactions(
                    transactions.map((t, i) =>
                      i === index ? { ...t, description: e.target.value } : t
                    )
                  )
                }
              />
            </div>
          ))}
          <button
            onClick={handleAddTransaction}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            + Add Transaction
          </button>
        </section>
      </div>
    </div>
  );
};

export default TransactionForm;
