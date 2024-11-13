"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ArrowUpDown,
  Bot,
  CreditCard,
  DollarSign,
  Home,
  MessageCircle,
  PieChart,
  Send,
  Settings,
  TrendingUp,
  User,
  X,
  AlertTriangle,
  Zap,
  Briefcase,
} from "lucide-react";
import Transactions from "@/components/Transactions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";


const AIInsight = () => {
    const [totalDebt, setTotalDebt] = useState(null);
    const [allTransactions, setAllTransactions] = useState([]); // State for all transactions
    const [financialGoals, setFinancialGoals] = useState([]); // State for financial goals
    const [financialSummary, setFinancialSummary] = useState(null); // State for financial summary
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [context, setContext] = useState({}); // New state for context

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
                console.log("Total debt:", data);
                setTotalDebt(data);
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
            fetchFinancialSummary()
        ]);
        setLoading(false);
    };

    fetchAllData();
}, []);

// Update context state and log it after all data is fetched
useEffect(() => {
    if (!loading) {
        setContext({
            totalDebt,
            allTransactions,
            financialGoals,
            financialSummary
        });
        console.log(context); // Log the context after it's updated
    }
}, [loading, totalDebt, allTransactions, financialGoals, financialSummary]); // Dependency array




    
      const fraudAlerts = [
        {
          id: 1,
          date: "2024-03-16",
          description: "Unusual login attempt",
          severity: "high",
        },
        {
          id: 2,
          date: "2024-03-15",
          description: "Large transaction outside normal pattern",
          severity: "medium",
        },
        {
          id: 3,
          date: "2024-03-14",
          description: "Multiple failed password attempts",
          severity: "low",
        },
      ];
      
      const investmentRecommendations = [
        {
          id: 1,
          name: "Tech Growth Fund",
          risk: "High",
          potentialReturn: "12-15%",
        },
        {
          id: 2,
          name: "Balanced Index Fund",
          risk: "Medium",
          potentialReturn: "7-10%",
        },
        {
          id: 3,
          name: "Government Bonds",
          risk: "Low",
          potentialReturn: "3-5%",
        },
      ];
      
      const creditScore = 720;
  return (
    <div>
        <Card className="bg-g3 border-gray-700">
                  <CardHeader>
                    <CardTitle>AI-Powered Insights</CardTitle>
                    <CardDescription>
                      Personalized financial recommendations and alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Fraud Detection Card */}
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <AlertTriangle className="mr-2 h-4 w-4 text-yellow-400" />
                            Fraud Detection
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {fraudAlerts.map((alert) => (
                              <li
                                key={alert.id}
                                className="flex items-center justify-between"
                              >
                                <span>{alert.description}</span>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    alert.severity === "high"
                                      ? "bg-red-500"
                                      : alert.severity === "medium"
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                  }`}
                                >
                                  {alert.severity}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Personalized Advice Card */}
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Zap className="mr-2 h-4 w-4 text-emerald-400" />
                            Personalized Advice
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-2">
                            Based on your spending habits, we recommend:
                          </p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Reduce dining out expenses by 15%</li>
                            <li>Increase your emergency fund by $200/month</li>
                            <li>Consider refinancing your mortgage</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Investment Portfolio Optimization Card */}
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Briefcase className="mr-2 h-4 w-4 text-blue-400" />
                          Investment Portfolio Optimization
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-2">
                          Recommended portfolio adjustments:
                        </p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Investment</TableHead>
                              <TableHead>Risk Level</TableHead>
                              <TableHead>Potential Return</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {investmentRecommendations.map((investment) => (
                              <TableRow key={investment.id}>
                                <TableCell>{investment.name}</TableCell>
                                <TableCell>{investment.risk}</TableCell>
                                <TableCell>
                                  {investment.potentialReturn}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    {/* Credit Score Analysis Card */}
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <TrendingUp className="mr-2 h-4 w-4 text-purple-400" />
                          Credit Score Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <p className="mb-2">
                              Your current credit score:
                            </p>
                            <Progress
                              value={creditScore / 8.5} // Assuming max score is 850
                              className="h-2 bg-gray-600"
                            />
                          </div>
                          <div className="text-2xl font-bold">
                            {creditScore}
                          </div>
                        </div>
                        <p className="mt-4">
                          Your score is considered "Good". Here are some tips to
                          improve it:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Pay all bills on time</li>
                          <li>Keep credit utilization below 30%</li>
                          <li>Avoid applying for new credit</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card> 
    </div>
  )
}

export default AIInsight