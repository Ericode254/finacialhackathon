"use client"
import React, { useState } from "react";
import axios from "axios";
import './FinancialInputPage.css'; // Import the CSS file

const FinancialInputPage = () => {
  const [transactions, setTransactions] = useState([
    { account_number: "", amount: 0, transaction_type: "", category: "", description: "" },
  ]);
  const [debt, setDebt] = useState([{ amount: 0, debt_type: "", debt_name: "" }]);
  const [banks, setBanks] = useState([{ bank_name: "", amount: 0, account_type: "", account_number: "" }]);

  // Handlers to manage inputs
  const handleAddTransaction = () => {
    setTransactions([...transactions, { account_number: "", amount: 0, transaction_type: "", category: "", description: "" }]);
  };

  const handleAddDebt = () => {
    setDebt([...debt, { amount: 0, debt_type: "", debt_name: "" }]);
  };

  const handleAddBank = () => {
    setBanks([...banks, { bank_name: "", amount: 0, account_type: "", account_number: "" }]);
  };

  // API Calls to save data
  const saveTransactionData = async (transactionData) => {
    try {
      const transactionPayload = {
        account_number: "002",
        amount: transactionData.amount,
        transaction_type: transactionData.transaction_type,
        category: transactionData.category,
        description: transactionData.description,
      };
      const response = await axios.post(
        "http://localhost:8000/api/transactions/",
        transactionPayload,
        {
          headers: {
            Authorization:`Token ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Transaction saved:", response.data);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const saveDebtData = async (debtData) => {
    try {
      const debtPayload = {
        "amount": debtData.amount,
        "debt_type": debtData.debt_type,
        "status": "active",
        "name": debtData.debt_name,
      };

      const response = await axios.post(
        "http://localhost:8000/api/debts/",
        debtPayload,
        {
          headers: {
            Authorization:`Token ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Debt saved:", response.data);
    } catch (error) {
      console.error("Error saving debt:", error);
    }
  };

  const saveBankData = async (bankData) => {
    try {
      const bankPayload = {
        user: 1,
        account_number: bankData.account_number,
        account_type: bankData.account_type,
        bank_name: bankData.bank_name,
        amount: bankData.amount,
      };

      const response = await axios.post(
        "http://localhost:8000/api/accounts/",
        bankPayload,
        {
          headers: {
            Authorization: "Token your_token_here",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Bank saved:", response.data);
    } catch (error) {
      console.error("Error saving bank:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await Promise.all([
        ...transactions.map(saveTransactionData),
        ...debt.map(saveDebtData),
        ...banks.map(saveBankData),
      ]);

      alert("Financial data saved!");
    } catch (error) {
      console.error("Error saving financial data:", error);
      alert("An error occurred while saving your data.");
    }
  };

  return (
    <div className="financial-input-page">
      <div className="container">
        <h1 className="title">Track Your Finances</h1>
        <p className="description">
          Enter your daily transactions, current debt, financial goals, and banks you use.
        </p>

        <section className="section">
          <h2 className="section-title">Daily Transactions</h2>
          {transactions.map((transaction, index) => (
            <div key={index} className="input-group">
              <label>Account Number:</label>
              <input
                type="number"
                placeholder="Account (as number)"
                className="input-field"
                value={transaction.account_number}
                onChange={(e) =>
                  setTransactions(transactions.map((t, i) =>
                    i === index ? { ...t, account_number: parseInt(e.target.value) } : t
                  ))
                }
              />
              <label>Amount:</label>
              <input
                type="number"
                placeholder="Amount"
                className="input-field"
                value={transaction.amount}
                onChange={(e) =>
                  setTransactions(transactions.map((t, i) =>
                    i === index ? { ...t, amount: parseFloat(e.target.value) || 0 } : t
                  ))
                }
              />
              <label>Transaction Type:</label>
              <input
                type="text"
                placeholder="Transaction Type (e.g., income)"
                className="input-field"
                value={transaction.transaction_type}
                onChange={(e) =>
                  setTransactions(transactions.map((t, i) =>
                    i === index ? { ...t, transaction_type: e.target.value } : t
                  ))
                }
              />
              <label>Category:</label>
              <input
                type="text"
                placeholder="Category (e.g., salary)"
                className="input-field"
                value={transaction.category}
                onChange={(e) =>
                  setTransactions(transactions.map((t, i) =>
                    i === index ? { ...t, category: e.target.value } : t
                  ))
                }
              />
              <label>Description:</label>
              <input
                type="text"
                placeholder="Description"
                className="input-field"
                value={transaction.description}
                onChange={(e) =>
                  setTransactions(transactions.map((t, i) =>
                    i === index ? { ...t, description: e.target.value } : t
                  ))
                }
              />
            </div>
          ))}
          <button
            onClick={handleAddTransaction}
            className="button add-transaction"
          >
            + Add Transaction
          </button>
        </section>

        {/* Debt Section */}
        <section className="section">
          <h2 className="section-title">Current Debts</h2>
          {debt.map((d, index) => (
            <div key={index} className="input-group">
              <label>Debt Amount:</label>
              <input
                type="number"
                placeholder="Debt Amount"
                className="input-field"
                value={d.amount}
                onChange={(e) =>
                  setDebt(debt.map((debtItem, i) =>
                    i === index ? { ...debtItem, amount: parseFloat(e.target.value) || 0 } : debtItem
                  ))
                }
              />
              <label>Debt Type:</label>
              <input
                type="text"
                placeholder="Debt Type"
                className="input-field"
                value={d.debt_type}
                onChange={(e) =>
                  setDebt(debt.map((debtItem, i) =>
                    i === index ? { ...debtItem, debt_type: e.target.value } : debtItem
                  ))
                }
              />
              <label>Debt Name:</label>
              <input
                type="text"
                placeholder="Debt Name"
                className="input-field"
                value={d.debt_name}
                onChange={(e) =>
                  setDebt(debt.map((debtItem, i) =>
                    i === index ? { ...debtItem, debt_name: e.target.value } : debtItem
                  ))
                }
              />
            </div>
          ))}
          <button
            onClick={handleAddDebt}
            className="button add-debt"
          >
            + Add Debt
          </button>
        </section>

        {/* Banks Section */}
        <section className="section">
          <h2 className="section-title">Bank Accounts</h2>
          {banks.map((bank, index) => (
            <div key={index} className="input-group">
              <label>Bank Name:</label>
              <input
                type="text"
                placeholder="Bank Name"
                className="input-field"
                value={bank.bank_name}
                onChange={(e) =>
                  setBanks(banks.map((b, i) =>
                    i === index ? { ...b, bank_name: e.target.value } : b
                  ))
                }
              />
              <label>Account Type:</label>
              <input
                type="text"
                placeholder="Account Type"
                className="input-field"
                value={bank.account_type}
                onChange={(e) =>
                  setBanks(banks.map((b, i) =>
                    i === index ? { ...b, account_type: e.target.value } : b
                  ))
                }
              />
              <label>Account Number:</label>
              <input
                type="number"
                placeholder="Account Number"
                className="input-field"
                value={bank.account_number}
                onChange={(e) =>
                  setBanks(banks.map((b, i) =>
                    i === index ? { ...b, account_number: parseInt(e.target.value) } : b
                  ))
                }
              />
              <label>Amount:</label>
              <input
                type="number"
                placeholder="Amount"
                className="input-field"
                value={bank.amount}
                onChange={(e) =>
                  setBanks(banks.map((b, i) =>
                    i === index ? { ...b, amount: parseFloat(e.target.value) || 0 } : b
                  ))
                }
              />
            </div>
          ))}
          <button
            onClick={handleAddBank}
            className="button add-bank"
          >
            + Add Bank
          </button>
        </section>

        <button onClick={handleSubmit} className="button submit">
          Save All
        </button>
      </div>
    </div>
  );
};

export default FinancialInputPage;
