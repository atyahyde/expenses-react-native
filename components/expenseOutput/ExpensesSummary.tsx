import { GlobalStyles } from 'constants/styles';
import { StyleSheet, Text, View } from 'react-native';

interface Expense {
  amount: number;
}

interface ExpensesSummaryProps {
  periodName: string;
  expenses: Expense[];
}

function ExpensesSummary({ periodName, expenses }: ExpensesSummaryProps) {
  const expensesSum = expenses.reduce((sum: number, expense: Expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
});
