import { GlobalStyles } from 'constants/styles';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  mode?: 'flat';
  children: React.ReactNode;
  style?: any;
}

function Button({ onPress, children, mode, style }: ButtonProps) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: GlobalStyles.colors.primary500,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
  },
});
