"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccountForm from './AccountForm';

import { useAuth } from '@/app/dashboard/provider/auth-provider';
import { Button } from '@/components/ui/button';

const AccountsPage = () => {
    const { getToken } = useAuth();
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch accounts from backend
    const fetchAccounts = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/accounts/", {
                headers: {
                    "Authorization": `Token ${getToken()}`,
                    "Content-Type": "application/json",
                },
            });
            setAccounts(response.data);
        } catch (err) {
            setError("Failed to fetch accounts");
        }
    };

    // Handle form submission
    const handleFormSubmit = async (values: any) => {
        await fetchAccounts();
    };

    // Fetch accounts on initial render
    useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <div className="flex h-screen bg-gradient-to-r from-blue-400 to-blue-700">
            {/* Left Section - Account Form */}
            <div className="w-1/2 p-8 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-semibold text-blue-600 mb-4">Be hopeful, these are the last details we ask of you</h1>
                <AccountForm onSubmit={handleFormSubmit} />
            </div>

            {/* Right Section - Display Accounts */}
            <div className="w-1/2 p-8 overflow-y-auto space-y-4">
                <h2 className="text-2xl font-semibold text-white">Your Accounts</h2>
                {error && <p className="text-red-500">{error}</p>}
                {accounts.length === 0 ? (
                    <p className="text-white mt-4">No accounts available. Add a new account to display here.</p>
                ) : (
                    <ul className="space-y-4">
                        {accounts.map((account, index) => (
                            <li
                                key={account.id}
                                className={`p-4 rounded-lg shadow-lg text-white ${index % 2 === 0 ? 'bg-blue-500' : 'bg-blue-600'}`}
                            >
                                <p><strong>Account Number:</strong> {account.account_number}</p>
                                <p><strong>Account Type:</strong> {account.account_type}</p>
                                <p><strong>Bank Name:</strong> {account.bank_name || 'N/A'}</p>
                                <p><strong>Amount:</strong> {account.amount}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AccountsPage;
