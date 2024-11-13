import ExpenseOutput from 'components/expenseOutput/ExpenseOutput';
import { useContext } from 'react';
import { ExpensesContext } from 'store/ExpenseContext';
import { getDateMinusDays } from 'utils/date';

function RecentExpenses() {
  const expenseCtx = useContext(ExpensesContext);

  const recentExpenses = expenseCtx.expenses.filter((expense: any) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpenseOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;