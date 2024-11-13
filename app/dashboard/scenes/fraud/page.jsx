"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all transactions from the API
  const fetchAllTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/transactions/`, {
        method: 'GET',
        headers: {
          Authorization: 'Token a01f62ad50e3b6396af09169b66ec073162a8bb6',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      setAllTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send transactions to AI for fraud detection
  const sendTransactionsToAI = async (transactions) => {
    try {
      const transactionsString = JSON.stringify(transactions);
      const response = await axios.post(
        'http://localhost:8000/api/chat/send_chat/',
        { message: transactionsString },
        {
          headers: {
            Authorization: 'Token a01f62ad50e3b6396af09169b66ec073162a8bb6',
            'Content-Type': 'application/json',
          },
        }
      );

      const fraudResults = response.data; // Assume AI response contains an array with fraud status for each transaction
      const updatedTransactions = transactions.map((transaction, index) => ({
        ...transaction,
        isFraud: fraudResults[index]?.isFraud || false,
      }));

      setAllTransactions(updatedTransactions);
    } catch (err) {
      console.error('Error sending transactions to AI:', err);
    }
  };

  // Fetch transactions on component mount
  useEffect(() => {
    fetchAllTransactions();
  }, []);

  // Send transactions to AI after fetching
  useEffect(() => {
    if (allTransactions.length > 0) {
      sendTransactionsToAI(allTransactions);
    }
  }, [allTransactions]);

  // Loading and error states handling
  if (loading) return <p style={{ fontSize: '18px' }}>Loading transactions...</p>;
  if (error) return <p style={{ fontSize: '18px', color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Transaction Table with Fraud Detection</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', fontSize: '18px', border: '1px solid black', }}>Account Number</th>
            <th style={{ padding: '10px', fontSize: '18px', border: '1px solid black', }}>Amount</th>
            <th style={{ padding: '10px', fontSize: '18px', border: '1px solid black', }}>Transaction Type</th>
            <th style={{ padding: '10px', fontSize: '18px', border: '1px solid black', }}>Category</th>
            <th style={{ padding: '10px', fontSize: '18px', border: '1px solid black', }}>Description</th>
            <th style={{ padding: '10px', fontSize: '18px', border: '1px solid black',  }}>Fraud Status</th>
          </tr>
        </thead>
        <tbody>
          {allTransactions.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ padding: '10px', fontSize: '18px', textAlign: 'center' }}>No transactions found.</td>
            </tr>
          ) : (
            allTransactions.map((transaction, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', fontSize: '18px', border: '1px solid black' }}>{transaction.account_number}</td>
                <td style={{ padding: '10px', fontSize: '18px', border: '1px solid black' }}>${Number(transaction.amount).toFixed(2)}</td>
                <td style={{ padding: '10px', fontSize: '18px', border: '1px solid black' }}>{transaction.transaction_type}</td>
                <td style={{ padding: '10px', fontSize: '18px', border: '1px solid black' }}>{transaction.category}</td>
                <td style={{ padding: '10px', fontSize: '18px', border: '1px solid black' }}>{transaction.description}</td>
                <td style={{ padding: '10px', fontSize: '18px', border: '1px solid black' }}>{transaction.isFraud ? "Fraudulent" : "Not Fraudulent"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
