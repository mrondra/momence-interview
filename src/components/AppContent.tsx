import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigator } from '../navigation/RootNavigator';

export function AppContent() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <RootNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

