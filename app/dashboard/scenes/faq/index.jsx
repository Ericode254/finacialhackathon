import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How does the AI analyze my spending habits?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our AI utilizes advanced algorithms to track and categorize your transactions. It identifies patterns in your spending and provides personalized insights and recommendations to help you manage your finances more effectively.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can the AI help me set financial goals?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes! The AI can assist you in setting realistic financial goals based on your income, expenses, and savings potential. It will provide reminders and strategies to help you stay on track towards achieving those goals.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What types of investment strategies does the AI recommend?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The AI analyzes market trends and your financial situation to suggest investment strategies that align with your risk tolerance and financial objectives. This may include recommendations for index funds, ETFs, or sustainable investments.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How does the AI keep track of my upcoming bills?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The AI monitors your financial data to identify recurring expenses and upcoming bills. It sends you timely reminders so you can avoid late fees and manage your cash flow efficiently.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Is my financial data secure with the AI?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Absolutely! We prioritize your privacy and security. Our platform uses industry-standard encryption and security measures to protect your financial data. We also comply with all relevant regulations to ensure your information is safe.
          </Typography>
        </AccordionDetails>
      </Accordion>

    </Box>
  );
};

export default FAQ;
