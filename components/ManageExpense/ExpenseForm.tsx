import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';

function ExpenseForm() {
  function ampuntChangeHandler() {}
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Ammount"
          textInputConfig={{ keyboardType: 'decimal-pad', onChangeText: ampuntChangeHandler }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{ placeholder: 'YYYY-MM-DD', maxLength: 10, onChangeText: () => {} }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none',
          // autocorrect: false
        }}
      />
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
});
