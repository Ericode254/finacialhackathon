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
import Reports from"@/components/Reports"
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

const Notifications = () => {
  return (
    <div>

<Card className="bg-g3 border-gray-700">
                  <CardHeader>
                    <CardTitle>Recent Notifications</CardTitle>
                    <CardDescription>
                      Stay updated on your financial activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-2">
                        <div className="h-2 w-2 mt-2 rounded-full bg-emerald-400"></div>
                        <div>
                          <p className="font-medium">
                            Large Deposit Detected
                          </p>
                          <p className="text-sm text-gray-400">
                            A deposit of $5,000 was made to your account.
                          </p>
                          <p className="text-xs text-gray-500">
                            2 hours ago
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="h-2 w-2 mt-2 rounded-full bg-yellow-400"></div>
                        <div>
                          <p className="font-medium">
                            Upcoming Bill Payment
                          </p>
                          <p className="text-sm text-gray-400">
                            Your electricity bill of $150 is due in 3 days.
                          </p>
                          <p className="text-xs text-gray-500">
                            1 day ago
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="h-2 w-2 mt-2 rounded-full bg-emerald-400"></div>
                        <div>
                          <p className="font-medium">
                            Savings Goal Achieved
                          </p>
                          <p className="text-sm text-gray-400">
                            Congratulations! You've reached your savings goal of $10,000.
                          </p>
                          <p className="text-xs text-gray-500">
                            3 days ago
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
    </div>
  )
}

export default Notifications