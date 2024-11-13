'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Loader2, TrendingDown, TrendingUp, DollarSign, PieChart, ArrowUpRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type SpendingCategory = {
  name: string
  amount: number
  percentage: number
  color: string
}

type SpendingSummary = {
  totalSpending: number
  categories: SpendingCategory[]
  monthlyData: { month: string; amount: number }[]
  insights: string[]
}

export default function Component() {
  const [summary, setSummary] = useState<SpendingSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating AI-generated data fetch
    const fetchAIGeneratedSummary = async () => {
      setLoading(true)
      // In a real application, this would be an API call to your AI service
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulating API delay
      const aiGeneratedSummary: SpendingSummary = {
        totalSpending: 4567.89,
        categories: [
          { name: 'Housing', amount: 1500, percentage: 32.8, color: '#ef4444' },
          { name: 'Food', amount: 800, percentage: 17.5, color: '#22c55e' },
          { name: 'Transportation', amount: 400, percentage: 8.8, color: '#3b82f6' },
          { name: 'Entertainment', amount: 300, percentage: 6.6, color: '#eab308' },
          { name: 'Shopping', amount: 600, percentage: 13.1, color: '#a855f7' },
          { name: 'Others', amount: 967.89, percentage: 21.2, color: '#6366f1' },
        ],
        monthlyData: [
          { month: 'Jan', amount: 4200 },
          { month: 'Feb', amount: 4100 },
          { month: 'Mar', amount: 4300 },
          { month: 'Apr', amount: 4150 },
          { month: 'May', amount: 4400 },
          { month: 'Jun', amount: 4567.89 },
        ],
        insights: [
          "Your spending has increased by 3.8% compared to last month.",
          "You've spent 15% more on entertainment this month. Consider setting a budget for this category.",
          "Great job reducing your food expenses by 5%! Keep up the good work.",
          "Your housing costs are 32.8% of your total spending, which is within the recommended range.",
        ],
      }
      setSummary(aiGeneratedSummary)
      setLoading(false)
    }

    fetchAIGeneratedSummary()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!summary) {
    return <div>Error loading spending summary.</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Your AI-Generated Spending Summary</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Total Spending</CardTitle>
          <CardDescription>Your total spending for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold flex items-center">
            <DollarSign className="h-8 w-8 mr-2" />
            {summary.totalSpending.toFixed(2)}
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
            <span className="text-green-500 font-medium">3.8% increase</span>
            <span className="ml-1 text-muted-foreground">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summary.categories.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{category.name}</span>
                  <span>${category.amount.toFixed(2)}</span>
                </div>
                <Progress value={category.percentage} className="h-2" style={{ backgroundColor: category.color }} />
                <div className="text-right text-sm text-muted-foreground mt-1">{category.percentage.toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Monthly Spending Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">AI Insights</CardTitle>
          <CardDescription>Personalized insights based on your spending habits</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {summary.insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <ArrowUpRight className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Get More Insights</Button>
        </CardFooter>
      </Card>
    </div>
  )
}