"use client"
    
    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { useAuth } from '../../provider/auth-provider';

    const Insight = () => {
  const { getToken } = useAuth();

      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [financialSummary, setFinancialSummary] = useState(null);
      const [totalDebt, setTotalDebt] = useState(null);
      const [accountBalance, setAccountBalance] = useState(null);
      const [allTransactions, setAllTransactions] = useState([]);
      const [financialGoals, setFinancialGoals] = useState([]);
      const [aiInsights, setAiInsights] = useState('');
      const [upcomingBills, setUpcomingBills] = useState([]); 
      // Hardcoded prompt for AI analysis


      const [currentPage, setCurrentPage] = useState(1);
      const transactionsPerPage = 5; // Number of transactions per page
      const totalPages = Math.ceil(allTransactions.length / transactionsPerPage);
      // Calculate total pages
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

      const aiAnalysisPrompt = `
        Analyze my spending patterns and provide recommendations for cost-cutting, along with reminders for upcoming bills to help me stay on budget.
        Evaluate current market trends and suggest investment strategies that align with my financial goals, making the investment process easier for me.
        Create a personalized financial plan based on my income, expenses, and goals, including retirement planning, and adjust it dynamically as my financial situation changes.
        Analyze my existing loans and provide strategies for effective debt repayment, including options for loan consolidation or negotiation of better terms.
        Serve as my educational resource by offering articles and real-time answers on financial topics to improve my financial literacy and decision-making skills.
      `;

      // User debts data and calculation
      const userDebts = {
        personal_loan_1: 1450.00,
        mortgage: 1000.00,
        personal_loan_2: 1500.00,
        personal_loan_3: 1500.00,
        student_loan: 123.00,
        personal_loan_4: 123.00
      };
      const totalDebts = Object.values(userDebts).reduce((acc, curr) => acc + curr, 0);

      const categorySummary = {
        personal_loans: 0,
        mortgages: 0,
        student_loans: 0
      };

      for (const [debtType, amount] of Object.entries(userDebts)) {
        if (debtType.includes("personal_loan")) {
          categorySummary.personal_loans += amount;
        } else if (debtType === "mortgage") {
          categorySummary.mortgages += amount;
        } else if (debtType === "student_loan") {
          categorySummary.student_loans += amount;
        }
      }

      const generateInsights = () => {
        return {
          costCuttingRecommendations: `You have a total debt of $${totalDebts} across personal loans ($${categorySummary.personal_loans}), mortgage ($${categorySummary.mortgages}), and student loans ($${categorySummary.student_loans}). Consider reducing discretionary spending such as dining out and entertainment to allocate more towards debt repayment.`,
          upcomingBills: [
            { name: 'Mortgage', amount: userDebts.mortgage, due_date: '15th of every month' },
            { name: 'Personal Loan', amount: userDebts.personal_loan_1, due_date: '20th of every month' }
          ],
          marketTrends: "Current market trends suggest a shift towards sustainable investments. Consider diversifying into ESG funds that align with your values.",
          investmentStrategies: "Focus on low-cost index funds and consider setting up automatic contributions to your investment accounts to build wealth over time.",
        };
      };

      const fetchData = async (url, setter) => {
        try {
          const response = await axios.get(url, {
            headers: { Authorization:`Token ${getToken()}` }
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
        setLoading(false);
      }, []);

      if (loading) return <p>Loading insights...</p>;
      if (error) return <p>{error}</p>;

      return (
        <div className="insight-container">
          <h2 style={{ padding: '20px' }}>AI Insights</h2>
      
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr >
                <th style={{ padding: '20px', textAlign: 'left', fontSize: '16px' }}>Insight</th>
                <th style={{ padding: '20px', textAlign: 'left', fontSize: '16px' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ height: '100px', verticalAlign: 'top', whiteSpace: 'normal' }}>
                <td style={{ padding: '20px', overflow: 'hidden', textOverflow: 'ellipsis' }}>Cost Cutting Recommendations</td>
                <td style={{ padding: '20px', overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{generateInsights().costCuttingRecommendations}</td>
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
          <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Debt Analysis</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.2em' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
                <th style={{ padding: '15px 20px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Debt Type</th>
                <th style={{ padding: '15px 20px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>Total Debt</td>
                <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>${totalDebts}</td>
              </tr>
              <tr >
                <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>Personal Loans</td>
                <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>${categorySummary.personal_loans}</td>
              </tr>
              <tr >
                <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>Mortgage</td>
                <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>${categorySummary.mortgages}</td>
              </tr>
              <tr >
                <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>Student Loans</td>
                <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>${categorySummary.student_loans}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
          {/* Upcoming Bills Table */}
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Upcoming Bills</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.2em', marginBottom: '40px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
                <th style={{ padding: '15px 20px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Bill Name</th>
                <th style={{ padding: '15px 20px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Amount</th>
                <th style={{ padding: '15px 20px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {upcomingBills.map((bill, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                  <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>{bill.name}</td>
                  <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>${bill.amount}</td>
                  <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>{bill.due_date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Financial Goals Table */}
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Financial Goals</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.2em', marginBottom: '40px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
                <th style={{ padding: '15px 20px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Goal</th>
              </tr>
            </thead>
            <tbody>
              {financialGoals.map((goal, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                  <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>{goal.title}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Recent Transactions Table */}
          <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
            {/* Recent Transactions Table with Pagination */}
            <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Recent Transactions</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.2em' }}>
              <thead>
                <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
                  <th style={{ padding: '15px 20px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Description</th>
                  <th style={{ padding: '15px 20px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>{transaction.description}</td>
                    <td style={{ padding: '15px 20px', borderBottom: '1px solid #ddd' }}>${transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={{ padding: '10px 20px', marginRight: '10px' }}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                style={{ padding: '10px 20px', marginLeft: '10px' }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        </div>  
      );
    };

    export default Insight;
