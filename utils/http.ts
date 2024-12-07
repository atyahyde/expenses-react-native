import axios from 'axios';

const BASE_URL =
  'https://react-native-course-c400c-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function storeExpense(expenseData: any) {
  const response = await axios.post(`${BASE_URL}/expenses.json`, expenseData);
  const id = response.data.id;
  return response;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BASE_URL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id: string, expenseData: any) {
  return axios.put(`${BASE_URL}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(`${BASE_URL}/expenses/${id}.json`);
}
