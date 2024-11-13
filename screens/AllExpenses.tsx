import ExpenseOutput from 'components/expenseOutput/ExpenseOutput';
import { useContext } from 'react';
import { ExpensesContext } from 'store/ExpenseContext';

function AllExpenses() {
  const expenseCtx = useContext(ExpensesContext);

  return (
    <ExpenseOutput
      expenses={expenseCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No expenses registered."
    />
  );
}

export default AllExpenses;
