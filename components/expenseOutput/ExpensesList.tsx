import { FlatList, Text } from 'react-native';
import ExpenseItem from './ExpenseItem';

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export type Props = {
  expenses: Expense[];
};

function renderExpenseItem(itemData: { item: Expense }) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }: Props) {
  return (
    <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
  );
}

export default ExpensesList;
