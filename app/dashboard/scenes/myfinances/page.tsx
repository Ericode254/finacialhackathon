import React from 'react'

const MyFinances = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl text-black font-semibold text-center mb-8">Your Finances Overview</h1>
      
      <div className="space-y-8">
        
        {/* Debts Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Debts</h2>
          <p className="text-gray-600">Here, you can view your outstanding debts and their due dates. Stay on top of your payments!</p>
          
          <div className="mt-4">
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="font-medium">Credit Card:</span>
                <span className="text-gray-600">$500</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Student Loan:</span>
                <span className="text-gray-600">$2000</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Car Loan:</span>
                <span className="text-gray-600">$7000</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Goals Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Financial Goals</h2>
          <p className="text-gray-600">Track your financial goals to stay motivated and make progress toward your future!</p>
          
          <div className="mt-4">
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="font-medium">Emergency Fund:</span>
                <span className="text-gray-600">$3000</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Vacation Savings:</span>
                <span className="text-gray-600">$1200</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Home Down Payment:</span>
                <span className="text-gray-600">$5000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
          <p className="text-gray-600">Review your most recent transactions to ensure your spending is aligned with your financial goals.</p>
          
          <div className="mt-4">
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="font-medium">Grocery Store:</span>
                <span className="text-gray-600">-$75.30</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Electric Bill:</span>
                <span className="text-gray-600">-$100.00</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Salary Payment:</span>
                <span className="text-gray-600">+$1500.00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyFinances
