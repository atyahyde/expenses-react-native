import { GlobalStyles } from 'constants/styles';
import { StyleSheet, Text, View } from 'react-native';

interface ErrorOverlayProps {
  message: string;
}

function ErrorOverlay({ message }: ErrorOverlayProps) {
  return (
    <View style={styles.contaner}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
