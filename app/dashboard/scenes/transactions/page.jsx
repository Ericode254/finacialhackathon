"use client"
import React, { useEffect, useState } from 'react';

import { useAuth } from '../../provider/auth-provider';
const TransactionTable = () => {
  const { getToken } = useAuth();

  const [allTransactions, setAllTransactions] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/transactions/`, {
        method: "GET",
        headers: {
          "Authorization":`Token ${getToken()}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      setAllTransactions(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  return (
    <div className="p-6  rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>
      {error && <p className="text-red-500">{error}</p>}
      
    <div className="container">
      <h2 className="title">Transaction History</h2>
      {error && <p className="error">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Amount</th>
            <th>Transaction Type</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {allTransactions.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                No transactions found.
              </td>
            </tr>
          ) : (
            allTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.account_number}</td>
                <td>${Number(transaction.amount).toFixed(2)}</td>
                <td>{transaction.transaction_type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default TransactionTable;
