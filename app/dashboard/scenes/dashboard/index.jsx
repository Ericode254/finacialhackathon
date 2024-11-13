import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalDebt, setTotalDebt] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]); // State for all transactions
  const [financialGoals, setFinancialGoals] = useState([]); // State for financial goals
  const [financialSummary, setFinancialSummary] = useState(null); // State for financial summary
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [context, setContext] = useState({}); // New state for context
  const [accountBalance, setTotalAccountBalance] = useState(null); // Corrected naming convention
  const [lineChartData, setLineChartData] = useState([]);


  useEffect(() => {
    if (!loading && financialSummary) {
      const dataForLineChart = {
        income: financialSummary.total_income,
        expense: financialSummary.total_expenses,
        account_balance: accountBalance.total_balance,
        total_debt: totalDebt.total_debt,
      }
      setLineChartData(dataForLineChart);
    }
  }, [loading, financialSummary, accountBalance, totalDebt]);




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
        setTotalDebt(data);
      } catch (err) {
        setError(err.message);
      }
    };

    // Moved the totalAccountBalance function to be a separate function
    const totalAccountBalance = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/total-account-balance/`, {
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
        console.log("Total account balance:", data); // Changed log message
        setTotalAccountBalance(data); // Changed variable name
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

    // Fetch Financial Summary
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
        fetchFinancialSummary(),
        totalAccountBalance()
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []); // Added missing closing brace for useEffect

  // Update context state and log it after all data is fetched
  useEffect(() => {
    if (!loading) {
      setContext({
        totalDebt,
        allTransactions,
        financialGoals,
        financialSummary,
        accountBalance
      });
      console.log(context); // Log the context after it's updated
    }
  }, [loading, totalDebt, allTransactions, accountBalance, financialGoals, financialSummary]); // Dependency array

  // Loading and error handling
  if (loading) {
    return <p className="text-center text-blue-500">Loading transactions, financial goals, and summary...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const handleReportClick = () =>{
    console.log("Hello world")
    router.push("/dashboard/scenes/report")
  
  }






  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={accountBalance.total_balance}
            subtitle="Account Balance"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={financialSummary.total_income}

            subtitle="Income"

            progress="0.50"
            // increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />

            }
          />
          <StatBox
            title={financialSummary.total_expenses}

            subtitle="Expense"

            progress="0.50"
            // increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />

            }
          />
 
        </Box>
{/* 
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={accountBalance.total_balance}
            subtitle="Total Account Balance"
            progress="0.30"

            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalDebt.total_debt}
            subtitle="Total Debt"


            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Savings"
            subtitle="savings"


            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Finance Analysis
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {accountBalance.total_balance}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart dataProps={lineChartData} isDashboard={true} />
          </Box>
        </Box>
{/* //accounts  */}
<Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={financialSummary.total_income}

            subtitle="Mpesa"

            progress="0.50"
            // increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />

            }
          />
                  <StatBox
            title={financialSummary.total_income}

            subtitle="KCB"

            progress="0.50"
            // increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />

            }
          />
          </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {allTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.description}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.transaction_type}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.category}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.description}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.amount}
              </Box>
            </Box>
          ))}

        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Fraud Detection Analysis
          </Typography>
          Under Development
          
          {/* <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
            >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box> */}


        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
           Investement Portfolio Analysis
          </Typography>
          {/* <Box height="250px" mt="-20px"> */}
          <Box height="250px">

            {/* <BarChart isDashboard={true} /> */}
            Under Development
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Credit Score Analysis
          </Typography>
          <Box height="200px">
            Under Development
            {/* <GeographyChart isDashboard={true} /> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
