import { StyleSheet, View } from 'react-native';
import { useCnbRates } from '../api/cnb';

export function AppContent() {
  // Trigger data load on app start; UI will be added later
  useCnbRates();

  return (
    <View style={styles.container}>
      {/* Intentionally no UI for now */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

