import { createContext, useReducer } from 'react';

interface ExpensesProps {
  description: string;
  amount: number;
  date: Date;
}

interface ExpensesContextProviderProps {
  children: React.ReactNode;
}

export const ExpensesContext = createContext<any>({
  expenses: [],
  addExpense: ({ description, amount, date }: ExpensesProps) => {},
  setExpenses: (expenses: any) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, { description, amount, date }: ExpensesProps) => {},
});

function expensesReducer(state: any, action: any) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense: any) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpneses = [...state];
      updatedExpneses[updatableExpenseIndex] = updatedItem;

      return updatedExpneses;
    case 'DELETE':
      return state.filter((expense: any) => expense.id !== action.payload);
    default:
      state;
  }
}

function ExpensesContextProvider({ children }: ExpensesContextProviderProps) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: any) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function setExpenses(expenses: any) {
    dispatch({ type: 'SET', payload: expenses });
  }

  function deleteExpense(id: string) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id: string, expenseData: any) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
