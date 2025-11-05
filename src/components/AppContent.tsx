import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CnbRatesList } from './CnbRatesList';

export function AppContent() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <CnbRatesList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

