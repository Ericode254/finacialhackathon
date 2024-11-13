"use client";
import React, { useEffect, useState } from 'react';

const Finance = () => {
    const [totalDebt, setTotalDebt] = useState(null);
    const [allTransactions, setAllTransactions] = useState([]); // State for all transactions
    const [financialGoals, setFinancialGoals] = useState([]); // State for financial goals
    const [financialSummary, setFinancialSummary] = useState(null); // State for financial summary
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [context, setContext] = useState({}); // New state for context
    const [accountBalance, setTotalAccountBalance] = useState(null); // Corrected naming convention

    // Fetch total debt, all transactions, financial goals, and financial summary
    useEffect(() => {
        const fetchTotalDebt = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/total-debt/`, {
                    method: "GET",
                    headers: {
                        "Authorization":`Token ${getToken()}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch total debt");
                }

                const data = await response.json();
                console.log("Total debt:", data.total_debt.total_debt);
                setTotalDebt(data);
            } catch (err) {
                setError(err.message);
            }
        };

        // Moved the totalAccountBalance function to be a separate function
        const totalAccountBalance = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/total-account-balance/`, {
                    method: "GET",
                    headers: {
                        "Authorization":`Token ${getToken()}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch total debt");
                }

                const data = await response.json();
                console.log("Total account balance:", data); // Changed log message
                setTotalAccountBalance(data); // Changed variable name
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchAllTransactions = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/transactions/`, {
                    method: "GET",
                    headers: {
                        "Authorization":`Token ${getToken()}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch transactions");
                }

                const data = await response.json();
                console.log("Total transactions:", data);
                setAllTransactions(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchFinancialGoals = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/financial-goals/`, {
                    method: "GET",
                    headers: {
                        "Authorization":`Token ${getToken()}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch financial goals");
                }

                const data = await response.json();
                console.log("Financial Goals:", data);
                setFinancialGoals(data);
            } catch (err) {
                setError(err.message);
            }
        };

        // Fetch Financial Summary
        const fetchFinancialSummary = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/financial-summary/`, {
                    method: "GET",
                    headers: {
                        "Authorization":`Token ${getToken()}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch financial summary");
                }

                const data = await response.json();
                console.log("Financial Summary:", data);
                setFinancialSummary(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchAllData = async () => {
            await Promise.all([
                fetchTotalDebt(),
                fetchAllTransactions(),
                fetchFinancialGoals(),
                fetchFinancialSummary(),
                totalAccountBalance()
            ]);
            setLoading(false);
        };

        fetchAllData();
    }, []); // Added missing closing brace for useEffect

    // Update context state and log it after all data is fetched
    useEffect(() => {
        if (!loading) {
            setContext({
                totalDebt,
                allTransactions,
                financialGoals,
                financialSummary,
               accountBalance
            });
            console.log(context); // Log the context after it's updated
        }
    }, [loading, totalDebt, allTransactions,accountBalance, financialGoals, financialSummary]); // Dependency array

    // Loading and error handling
    if (loading) {
        return <p className="text-center text-blue-500">Loading transactions, financial goals, and summary...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Financial Summary Card */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">Financial Summary</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-lg font-medium text-gray-700">
                        <span className="font-semibold">Total Income:</span> ${financialSummary?.total_income}
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                        <span className="font-semibold">Total Expenses:</span> ${financialSummary?.total_expenses}
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                        <span className="font-semibold">Net Income:</span> ${financialSummary?.net_income}
                    </p>
                </div>
            </div>

            {/* Total Debt Card */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">Total Debt</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-lg font-medium text-gray-700">
                        <span className="font-semibold">Total Amount:</span> ${totalDebt?.total_debt}
                    </p>
                </div>
            </div>

            {/* All Transactions List */}
            <h1 className="text-2xl font-semibold text-blue-800 mb-4">All Transactions</h1>
            <div>
                {allTransactions.map((tran) => (
                    <div key={tran.id} className="bg-white rounded-lg shadow p-6 mb-4">
                        <h2 className="text-xl font-semibold text-blue-700 mb-2">{tran.title}</h2>
                        <p className="text-lg text-blue-600 mb-2">
                            <span className="font-medium">Amount:</span> ${tran.amount}
                        </p>
                        <p className="text-lg text-blue-600 mb-2">
                            <span className="font-medium">Transaction Type:</span> {tran.transaction_type}
                        </p>
                        <p className="text-lg text-blue-600 mb-2">
                            <span className="font-medium">Payment Method:</span> {tran.payment_method}
                        </p>
                        <p className="text-lg text-blue-600 mb-2">
                            <span className="font-medium">Category:</span> {tran.category}
                        </p>
                        <p className="text-lg text-blue-600 mb-2">
                            <span className="font-medium">Date:</span> {new Date(tran.date).toLocaleDateString()}
                        </p>
                        <p className="text-lg text-blue-600">
                            <span className="font-medium">Description:</span> {tran.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Financial Goals List */}
            <h1 className="text-2xl font-semibold text-blue-800 mb-4 mt-8">Your Financial Goals</h1>
            <div>
                {financialGoals.length === 0 && (
                    <p className="text-gray-600 text-center">No financial goals found.</p>
                )}
                <ul className="space-y-4">
                    {financialGoals.map((goal) => (
                        <li key={goal.id} className="bg-white p-4 border border-blue-300 rounded-lg">
                            <h2 className="font-semibold text-lg text-blue-700">{goal.description}</h2>
                            <p className="text-gray-600">
                                <span className="font-medium">Target Amount:</span> ${goal.target_amount}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Due Date:</span> {new Date(goal.due_date).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Finance;
