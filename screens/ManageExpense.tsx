import ExpenseForm from 'components/ManageExpense/ExpenseForm';
import ErrorOverlay from 'components/UI/ErrorOverlay';
import IconButton from 'components/UI/IconButton';
import LoadingOverlay from 'components/UI/LoadingOverlay';
import { GlobalStyles } from 'constants/styles';
import { useContext, useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { ExpensesContext } from 'store/ExpenseContext';
import { deleteExpense, storeExpense, updateExpense } from 'utils/http';
interface ManageExpenseProps {
  route: any;
  navigation: any;
}

function ManageExpense({ route, navigation }: ManageExpenseProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense: any) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    try {
      setIsSubmitting(true);
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
    } catch (error) {
      setError('Could not delete expense! - please try again later.');
    } finally {
      setIsSubmitting(false);
      navigation.goBack();
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: any) {
    try {
      setIsSubmitting(true);
      if (isEditing) {
        await updateExpense(editedExpenseId, expenseData);
        expensesCtx.updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save expense! - please try again later.');
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  const labelSubmit = isEditing ? 'Update' : 'Add';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ExpenseForm
          submitButtonLabel={labelSubmit}
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
          defaultValues={selectedExpense}
        />
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              onPress={deleteExpenseHandler}
              icon="trash"
              size={36}
              color={GlobalStyles.colors.error500}
            />
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
