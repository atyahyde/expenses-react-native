import ExpenseOutput from 'components/expenseOutput/ExpenseOutput';
import ErrorOverlay from 'components/UI/ErrorOverlay';
import LoadingOverlay from 'components/UI/LoadingOverlay';
import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ExpensesContext } from 'store/ExpenseContext';
import { getDateMinusDays, getFormattedDate } from 'utils/date';
import { fetchExpenses } from 'utils/http';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  const expenseCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expenseCtx.setExpenses(expenses);
      } catch (error: any) {
        setError('Could not fetch expenses!');
      } finally {
        setIsFetching(false);
      }
    }

    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expenseCtx.expenses.filter((expense: any) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const newDate = new Date(getFormattedDate(expense.date));

    return newDate > date7DaysAgo && newDate <= today;
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
