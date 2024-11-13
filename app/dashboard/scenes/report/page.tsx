"use client"
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme"; // Assuming your theme setup
import StatBox from '../../components/StatBox';
import LineChart from "./LineChart";  // Make sure LineChart is capable of accepting data prop properly
import { useAuth } from '../../provider/auth-provider';
import { useRouter } from "next/navigation";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import TrafficIcon from '@mui/icons-material/Traffic';
import EmailIcon from '@mui/icons-material/Email';

const ReportPage = () => {
  const { getToken } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter();

  const [financialSummary, setFinancialSummary] = useState(null);
  const [totalDebt, setTotalDebt] = useState(null);
  const [accountBalance, setAccountBalance] = useState(null);
  const [lineChartData, setLineChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, debtRes, balanceRes] = await Promise.all([
          fetch('http://localhost:8000/api/financial-summary/', { method: 'GET', headers: { "Authorization": `Token ${getToken()}` } }),
          fetch('http://localhost:8000/api/total-debt/', { method: 'GET', headers: { "Authorization": `Token ${getToken()}` } }),
          fetch('http://localhost:8000/api/total-account-balance/', { method: 'GET', headers: { "Authorization": `Token ${getToken()}` } })
        ]);

        if (!summaryRes.ok || !debtRes.ok || !balanceRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const summaryData = await summaryRes.json();
        const debtData = await debtRes.json();
        const balanceData = await balanceRes.json();

        setFinancialSummary(summaryData);
        setTotalDebt(debtData);
        setAccountBalance(balanceData);

        // Update line chart data format for charting
        setLineChartData({
          labels: ['Income', 'Expenses', 'Balance', 'Debt'],
          datasets: [
            {
              label: 'Financial Overview',
              data: [
                summaryData.total_income,
                summaryData.total_expenses,
                balanceData.total_balance,
                debtData.total_debt
              ],
              borderColor: colors.primary[500],
              backgroundColor: colors.primary[200],
              fill: true,
            }
          ]
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [getToken, colors.primary]);

  // CSV generation function
  const generateCSV = () => {
    const header = ['Category', 'Amount'];
    const data = [
      ['Total Income', `$${financialSummary.total_income}`],
      ['Total Expenses', `$${financialSummary.total_expenses}`],
      ['Total Debt', `$${totalDebt.total_debt}`],
      ['Account Balance', `$${accountBalance.total_balance}`]
    ];

    const csvContent = [
      header.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'financial_report.csv';
    link.click();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box m="20px">
      <Typography variant="h5" color={colors.primary[500]}>Financial Report</Typography>

      {/* Financial Summary */}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="20px">
        <StatBox title={`$${financialSummary.total_income}`} subtitle="Total Income" icon={<PointOfSaleIcon />} />
        <StatBox title={`$${financialSummary.total_expenses}`} subtitle="Total Expenses" icon={<PointOfSaleIcon />} />
        <StatBox title={`$${totalDebt.total_debt}`} subtitle="Total Debt" icon={<TrafficIcon />} />
        <StatBox title={`$${accountBalance.total_balance}`} subtitle="Account Balance" icon={<EmailIcon />} />
      </Box>

      {/* Line Chart */}
      {lineChartData.datasets && <LineChart data={lineChartData} />}

      {/* Transaction History (optional, add a table here if needed) */}
      <Button variant="contained" color="primary" onClick={() => router.push("/dashboard/scenes/transactions")}>View Transactions</Button>

      {/* Download Report Button */}
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={generateCSV} 
        sx={{ mt: 2 }}
      >
        Download Report
      </Button>
    </Box>
  );
};

export default ReportPage;
