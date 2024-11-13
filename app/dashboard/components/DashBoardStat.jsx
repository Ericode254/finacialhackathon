"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ArrowUpDown, TrendingUp, PieChart } from "lucide-react";

const DashBoardStat = () => {
    const [totalDebt, setTotalDebt] = useState(null);
    const [financialGoals, setFinancialGoals] = useState([]); 
    const [financialSummary, setFinancialSummary] = useState({ income: 0, expense: 0 }); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accounts, setAccounts] = useState([]);

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
                console.log("Total debt:", data.total_debt);
                setTotalDebt(data.total_debt);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchAccounts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/accounts/`, {
                    method: "GET",
                    headers: {
                        "Authorization":`Token ${getToken()}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch accounts");
                }

                const data = await response.json();
                console.log("Accounts:", data);
                setAccounts(data);
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
                setFinancialSummary({
                    income: parseFloat(data.total_income) || 0,
                    expense: parseFloat(data.total_expenses) || 0,
                });
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchAllData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    fetchTotalDebt(),
                    fetchFinancialGoals(),
                    fetchFinancialSummary(),
                    fetchAccounts(),
                ]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                
                {/* Total Balance Card */}
                <Card className="bg-blue-700 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(financialSummary.income - financialSummary.expense).toFixed(2)}</div>
                    </CardContent>
                </Card>

                {/* Income Card */}
                <Card className="bg-blue-700 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Income</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${financialSummary.income.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                {/* Expenses Card */}
                <Card className="bg-blue-700 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${financialSummary.expense.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                </Card>

                {/* Accounts Card */}
                {accounts.map((account, index) => (
                    <Card
                        key={index}
                        className={`border-gray-700 ${
                            account.amount >= 0 ? 'bg-green-700' : 'bg-red-700'
                        }`}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
                            <CardTitle className="text-sm font-medium">${Math.abs(account.amount).toFixed(2)}</CardTitle>
                            <CardTitle className="text-sm font-medium">{account.bank_name}</CardTitle>
                            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${Math.abs(account.amount).toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">+5% from last month</p>
                        </CardContent>
                    </Card>
                ))}

                {/* Total Debts Card */}
                <Card className="bg-blue-700 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Debts</CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {totalDebt ? (
                            <>
                                <div className="text-2xl font-bold">${totalDebt.toFixed(2)}</div>
                                <p className="text-xs text-muted-foreground">+2% from last month</p>
                            </>
                        ) : (
                            <div>No debt information available</div>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

export default DashBoardStat;
