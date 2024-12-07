import { GlobalStyles } from 'constants/styles';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function LoadingOverlay() {
  return (
    <View style={styles.contaner}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
