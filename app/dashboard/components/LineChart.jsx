import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const LineChart = ({ isCustomLineColors = false, isDashboard = false ,dataProps}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("Data in line chart", dataProps.income)
const  totalIncome = dataProps.income
const  totalExpense = dataProps.income
const  accountBalance = dataProps.account_balance
const  debtBalance = dataProps.total_debt


  // Prepare data from the provided JSON
  const data = [
    {
      id: "Total Income",
      color: "hsl(252, 70%, 50%)",
      data: [
        { x: "Initial", y: 0 },
        { x: "Total Income", y: totalIncome },
      ],
    },
    {
      id: "Total Expenses",
      color: "hsl(152, 70%, 50%)",
      data: [
        { x: "Initial", y: 0 },
        { x: "Total Expenses", y: totalExpense},
      ],
    },
    {
      id: "Total Debt",
      color: "hsl(52, 70%, 50%)",
      data: [
        { x: "Initial", y: 0 },
        { x: "Total Debt", y: debtBalance },
      ],
    },
    {
      id: "Account Balance",
      color: "hsl(0, 70%, 50%)",
      data: [
        { x: "Initial", y: 0 },
        { x: "Account Balance", y: accountBalance  },
      ],
    },
  ];

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Categories",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Amount ($)",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
