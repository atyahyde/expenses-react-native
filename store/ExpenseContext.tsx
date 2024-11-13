import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.99,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-01-12'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-18'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 14.99,
    date: new Date('2022-02-18'),
  },
  {
    id: 'e6',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e7',
    description: 'A pair of trousers',
    amount: 89.99,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e8',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-01-12'),
  },
  {
    id: 'e9',
    description: 'A book',
    amount: 14.99,
    date: new Date('2024-11-04'),
  },
  {
    id: 'e10',
    description: 'Another book',
    amount: 14.99,
    date: new Date('2024-11-03'),
  },
];

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
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, { description, amount, date }: ExpensesProps) => {},
});

function expensesReducer(state: any, action: any) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: any) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id: string) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id: string, expenseData: any) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
