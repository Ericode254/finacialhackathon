"use client";
import Analytics from "@/components/Analytics"
import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashBoardStat from "@/components/DashBoardStat"
import MyBanks from "@/components/MyBanks"
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
import axios from 'axios';
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Revenue from "@/components/Revenue"
import { Progress } from "@/components/ui/progress";
import Finance from "@/components/Finance";
import ExpenseBreakdown from "@/components/ExpenseBreakdown"
// Data Constants
const revenueData = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 9800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
];

const expenseBreakdown = [
  { name: "Housing", value: 1500 },
  { name: "Food", value: 500 },
  { name: "Transportation", value: 300 },
  { name: "Utilities", value: 200 },
  { name: "Entertainment", value: 150 },
];



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

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

const Reports = () => {
  return (
    <div>


<Card className="bg-g3 border-gray-700">
                  <CardHeader>
                    <CardTitle>Monthly Summary</CardTitle>
                    <CardDescription>
                      Overview of your financial activity this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>% of Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expenseBreakdown.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>${item.value.toFixed(2)}</TableCell>
                            <TableCell>
                              {(
                                (item.value /
                                  expenseBreakdown.reduce(
                                    (acc, curr) => acc + curr.value,
                                    0
                                  )) *
                                100
                              ).toFixed(2)}
                              %
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="bg-g3 border-gray-700">
                  <CardHeader>
                    <CardTitle>Annual Report</CardTitle>
                    <CardDescription>
                      Yearly financial overview
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Chart>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="income"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="expenses"
                          stroke="#82ca9d"
                        />
                      </LineChart>
                    </Chart>
                  </CardContent>
                </Card>
    </div>
  )
}

export default Reports