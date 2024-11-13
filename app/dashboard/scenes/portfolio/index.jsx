"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, TrendingDown, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Sector } from "recharts";

const portfolioData = [
  { name: "Stocks", value: 50000 },
  { name: "Bonds", value: 30000 },
  { name: "Real Estate", value: 20000 },
  { name: "Cryptocurrencies", value: 10000 },
];

const performanceData = [
  { month: "Jan", value: 100000 },
  { month: "Feb", value: 105000 },
  { month: "Mar", value: 110000 },
  { month: "Apr", value: 108000 },
  { month: "May", value: 115000 },
  { month: "Jun", value: 120000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PortfolioOptimization() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <Link href="/dashboard">
        <a className="inline-flex items-center mb-6 text-gray-300 hover:text-white">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </a>
      </Link>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Investment Portfolio</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Portfolio Overview Card */}
          <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Portfolio Overview</h2>
            <p className="text-gray-400">Total Value: ${totalValue.toLocaleString()}</p>
            <div className="mt-4 h-[300px]">
              <PieChart width={300} height={300}>
                <Pie
                  activeIndex={activeIndex}
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>

          {/* Performance Card */}
          <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Performance</h2>
            <p className="text-gray-400">6-month portfolio performance</p>
            <div className="mt-4 h-[300px]">
              <LineChart width={300} height={300} data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#10B981" activeDot={{ r: 8 }} />
              </LineChart>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-gray-900 border border-gray-700 mt-6 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Holdings</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4 text-gray-400">Asset</th>
                  <th className="py-2 px-4 text-gray-400">Value</th>
                  <th className="py-2 px-4 text-gray-400">Allocation</th>
                  <th className="py-2 px-4 text-gray-400">Performance</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">${item.value.toLocaleString()}</td>
                    <td className="py-2 px-4">{((item.value / totalValue) * 100).toFixed(2)}%</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        {index % 2 === 0 ? (
                          <TrendingUp className="mr-2 h-4 w-4 text-green-400" />
                        ) : (
                          <TrendingDown className="mr-2 h-4 w-4 text-red-400" />
                        )}
                        {index % 2 === 0 ? "+2.5%" : "-1.2%"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from 'react'

// const index = () => {
//   return (
//     <div>index</div>
//   )
// }

// export default index