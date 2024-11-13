import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Insight = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [financialSummary, setFinancialSummary] = useState({});
  const [totalDebt, setTotalDebt] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);
  const [financialGoals, setFinancialGoals] = useState([]);
  const [aiInsights, setAiInsights] = useState('');
  const [upcomingBills, setUpcomingBills] = useState([]);

  // Hardcoded prompt for AI analysis
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5; // Number of transactions per page

  // Calculate total pages
  const totalPages = Math.ceil(allTransactions.length / transactionsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  // Get the transactions for the current page
  const currentTransactions = allTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  // User debts data and calculation
  const userDebts = {
    personal_loan_1: 1450.00,
    mortgage: 1000.00,
    personal_loan_2: 1500.00,
    personal_loan_3: 1500.00,
    student_loan: 123.00,
    personal_loan_4: 123.00
  };

  // Calculate total debts
  const totalDebts = Object.values(userDebts).reduce((acc, curr) => acc + curr, 0);

  // Generate insights based on debts
  const generateInsights = () => {
    return {
      costCuttingRecommendations: `You have a total debt of $${totalDebts}. Consider reducing discretionary spending to allocate more towards debt repayment.`,
      upcomingBills: [
        { name: 'Mortgage', amount: userDebts.mortgage, due_date: '15th of every month' },
        { name: 'Personal Loan', amount: userDebts.personal_loan_1, due_date: '20th of every month' }
      ],
      marketTrends: "Current market trends suggest a shift towards sustainable investments.",
      investmentStrategies: "Focus on low-cost index funds to build wealth over time."
    };
  };

  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization:`Token ${getToken()}`
        }
      });
      setter(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    
    fetchData("http://localhost:8000/api/total-debt/", setTotalDebt);
    fetchData("http://localhost:8000/api/total-account-balance/", setAccountBalance);
    fetchData("http://localhost:8000/api/transactions/", setAllTransactions);
    fetchData("http://localhost:8000/api/financial-goals/", setFinancialGoals);

    // Generate insights based on fetched data
    const insights = generateInsights();
    setAiInsights(insights.costCuttingRecommendations);
    
    setLoading(false);
    
  }, []);

  if (loading) return <p>Loading insights...</p>;
  
  if (error) return <p>{error}</p>;

  return (
    <div className="insight-container">
      <h2 style={{ padding: '20px' }}>AI Insights</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '20px', textAlign: 'left', fontSize: '16px' }}>Insight</th>
            <th style={{ padding: '20px', textAlign: 'left', fontSize: '16px' }}>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ height: '100px', verticalAlign: 'top', whiteSpace: 'normal' }}>
            <td style={{ padding: '20px', overflow: 'hidden', textOverflow: 'ellipsis' }}>Cost Cutting Recommendations</td>
            <td style={{ padding: '20px', overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{aiInsights}</td>
          </tr>
          <tr style={{ height: '100px', verticalAlign: 'top', whiteSpace: 'normal' }}>
            <td style={{ padding: '20px', overflow: 'hidden', textOverflow: 'ellipsis' }}>Market Trends</td>
            <td style={{ padding: '20px', overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{generateInsights().marketTrends}</td>
          </tr>
          <tr style={{ height: '100px', verticalAlign: 'top', whiteSpace: 'normal' }}>
            <td style={{ padding: '20px', overflow: 'hidden', textOverflow: 'ellipsis' }}>Investment Strategies</td>
            <td style={{ padding: '20px', overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{generateInsights().investmentStrategies}</td>
          </tr>
        </tbody>
      </table>

      {/* Upcoming Bills Table */}
      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize:'2em', marginBottom:'20px', color:'#333'}}>Upcoming Bills</h2>
        <table style={{ width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr style={{ backgroundColor:'#f4f4f4'}}>
              <th>Bill Name</th>
              <th>Amount</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {generateInsights().upcomingBills.map((bill, index) => (
              <tr key={index}>
                <td>{bill.name}</td>
                <td>${bill.amount}</td>
                <td>{bill.due_date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Recent Transactions Table */}
        <h2 style={{ fontSize:'2em', marginBottom:'20px'}}>Recent Transactions</h2>
        <table style={{ width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr style={{ backgroundColor:'#f4f4f4'}}>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.description || "N/A"}</td> {/* Fallback to "N/A" if description is missing */}
                <td>${transaction.amount || "0.00"}</td> {/* Fallback to "0.00" if amount is missing */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div style={{ marginTop:'20px'}}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          {' '}
          Page {currentPage} of {totalPages}
          {' '}
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>

      </div>

    </div>
  );
};

export default Insight;
