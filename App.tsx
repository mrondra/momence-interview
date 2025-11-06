import { StatusBar, useColorScheme } from 'react-native';
import { AppProviders } from './src/providers/AppProviders';
import { AppContent } from './src/navigation/AppContent.tsx';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProviders>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </AppProviders>
  );
}

export default App;
